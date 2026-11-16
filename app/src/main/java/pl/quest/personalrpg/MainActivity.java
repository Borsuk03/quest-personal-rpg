package pl.quest.personalrpg;

import android.app.Activity;
import android.content.Intent;
import android.net.Uri;
import android.webkit.ValueCallback;
import android.os.Bundle;
import android.os.Build;
import android.webkit.JavascriptInterface;
import android.webkit.WebChromeClient;
import android.webkit.WebResourceRequest;
import android.webkit.WebResourceResponse;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.webkit.WebSettings;
import android.view.WindowManager;
import android.graphics.Color;
import android.widget.Toast;
import org.json.JSONObject;
import org.json.JSONArray;
import java.io.File;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.HttpURLConnection;
import java.net.URL;
import java.nio.charset.StandardCharsets;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

public class MainActivity extends Activity {
  private static final String BASE = "https://appassets.androidplatform.net/assets/";
  private static final String RAW = "https://raw.githubusercontent.com/Borsuk03/quest-personal-rpg/main/";
  private final ExecutorService executor = Executors.newSingleThreadExecutor();
  private WebView web;
  private File active;
  private volatile boolean updating = false;
  private static final int PICK_BACKUP = 201;
  private static final int SAVE_BACKUP = 202;
  private ValueCallback<Uri[]> fileCallback;
  private String pendingBackup;

  @Override public void onCreate(Bundle state) {
    super.onCreate(state);
    getWindow().setStatusBarColor(Color.rgb(16,20,38));
    getWindow().setNavigationBarColor(Color.rgb(16,20,38));
    active = new File(getFilesDir(), "web-updates/current");
    web = new WebView(this);
    setContentView(web);
    WebSettings settings = web.getSettings();
    settings.setJavaScriptEnabled(true);
    settings.setDomStorageEnabled(true);
    settings.setAllowFileAccess(false);
    settings.setAllowContentAccess(false);
    settings.setMixedContentMode(WebSettings.MIXED_CONTENT_NEVER_ALLOW);
    web.addJavascriptInterface(new NativeBridge(), "QuestNative");
    web.setWebChromeClient(new WebChromeClient(){
      @Override public boolean onShowFileChooser(WebView view, ValueCallback<Uri[]> callback, FileChooserParams params){
        if(fileCallback!=null)fileCallback.onReceiveValue(null);
        fileCallback=callback;
        try{
          Intent intent=new Intent(Intent.ACTION_OPEN_DOCUMENT);
          intent.setType("application/json");
          intent.addCategory(Intent.CATEGORY_OPENABLE);
          startActivityForResult(intent,PICK_BACKUP);
          return true;
        }catch(Exception e){fileCallback=null;return false;}
      }
    });
    web.setWebViewClient(new WebViewClient() {
      @Override public WebResourceResponse shouldInterceptRequest(WebView view, WebResourceRequest request) {
        URL url;
        try { url = new URL(request.getUrl().toString()); } catch(Exception e) { return null; }
        if (!"appassets.androidplatform.net".equals(url.getHost())) return null;
        String path = url.getPath();
        if (!path.startsWith("/assets/")) return null;
        String name = path.substring("/assets/".length());
        if (name.isEmpty()) name = "index.html";
        if (!name.matches("[A-Za-z0-9._-]+") || name.contains("..")) return new WebResourceResponse("text/plain", "UTF-8", 404, "Not Found", java.util.Collections.emptyMap(), new java.io.ByteArrayInputStream(new byte[0]));
        String mime = name.endsWith(".js")?"application/javascript":name.endsWith(".css")?"text/css":name.endsWith(".svg")?"image/svg+xml":name.endsWith(".webmanifest")||name.endsWith(".json")?"application/json":"text/html";
        try {
          InputStream stream;
          File local = new File(active,name);
          if (active.isDirectory() && local.isFile()) stream = new java.io.FileInputStream(local);
          else stream = getAssets().open("web/"+name);
          return new WebResourceResponse(mime,"UTF-8",stream);
        } catch(IOException e) {
          return new WebResourceResponse("text/plain","UTF-8",404,"Not Found",java.util.Collections.emptyMap(),new java.io.ByteArrayInputStream(new byte[0]));
        }
      }
      @Override public void onPageFinished(WebView view, String url) {
        // Never navigate to the Cloudflare page: local origin keeps data and works offline.
      }
    });
    web.loadUrl(BASE+"index.html");
    checkUpdates(false);
  }

  public class NativeBridge {
    @JavascriptInterface public void checkForUpdates() { runOnUiThread(()->checkUpdates(true)); }
    @JavascriptInterface public String platform() { return "android"; }
    @JavascriptInterface public void exportBackup(String json) {
      if(json==null||json.length()>10_000_000)return;
      runOnUiThread(()->{
        pendingBackup=json;
        Intent intent=new Intent(Intent.ACTION_CREATE_DOCUMENT);
        intent.setType("application/json");
        intent.addCategory(Intent.CATEGORY_OPENABLE);
        intent.putExtra(Intent.EXTRA_TITLE,"quest-backup.json");
        startActivityForResult(intent,SAVE_BACKUP);
      });
    }
  }

  private void notifyWeb(String message, boolean reload) {
    runOnUiThread(()->{
      if (reload) {
        Toast.makeText(this,message,Toast.LENGTH_LONG).show();
        web.reload();
      } else {
        web.evaluateJavascript("window.questUpdateResult && window.questUpdateResult("+JSONObject.quote(message)+")",null);
      }
    });
  }

  private static byte[] download(String uri, int limit) throws IOException {
    HttpURLConnection connection = (HttpURLConnection)new URL(uri).openConnection();
    connection.setConnectTimeout(10000);
    connection.setReadTimeout(15000);
    connection.setInstanceFollowRedirects(false);
    connection.setRequestProperty("Cache-Control","no-cache");
    try {
      if(connection.getResponseCode()!=200) throw new IOException("HTTP "+connection.getResponseCode());
      ByteArrayOutputStream out = new ByteArrayOutputStream();
      try(InputStream in=connection.getInputStream()){
        byte[] buffer=new byte[8192];int n;
        while((n=in.read(buffer))!=-1){out.write(buffer,0,n);if(out.size()>limit)throw new IOException("Plik za duży");}
      }
      return out.toByteArray();
    } finally { connection.disconnect(); }
  }
  private static void write(File file,byte[] bytes) throws IOException {
    try(FileOutputStream out=new FileOutputStream(file)){out.write(bytes);out.getFD().sync();}
  }
  private String installedVersion() {
    try {
      File file=new File(active,"version.json");
      byte[] bytes;
      if(file.isFile())try(InputStream in=new java.io.FileInputStream(file)){bytes=readAll(in);}
      else try(InputStream in=getAssets().open("version.json")){bytes=readAll(in);}
      return new JSONObject(new String(bytes,StandardCharsets.UTF_8)).getString("version");
    } catch(Exception e){return "4.0.0";}
  }
  private static byte[] readAll(InputStream in)throws IOException {
    ByteArrayOutputStream out=new ByteArrayOutputStream();byte[] b=new byte[4096];int n;while((n=in.read(b))!=-1)out.write(b,0,n);return out.toByteArray();
  }
  private static boolean delete(File f) {
    if(f.isDirectory()){File[] children=f.listFiles();if(children!=null)for(File child:children)if(!delete(child))return false;}
    return !f.exists()||f.delete();
  }
  private void checkUpdates(boolean manual) {
    if(updating)return;
    updating=true;
    executor.execute(()->{
      try {
        byte[] manifestBytes=download(RAW+"version.json?t="+System.currentTimeMillis(),20000);
        JSONObject manifest=new JSONObject(new String(manifestBytes,StandardCharsets.UTF_8));
        String remote=manifest.getString("version");
        if(remote.equals(installedVersion())){if(manual)notifyWeb("Masz aktualną wersję QUEST ("+remote+").",false);return;}
        JSONArray names=manifest.getJSONArray("files");
        File root=new File(getFilesDir(),"web-updates");
        if(!root.exists()&&!root.mkdirs())throw new IOException("Nie można utworzyć katalogu");
        File staging=new File(root,"staging");delete(staging);
        if(!staging.mkdirs())throw new IOException("Nie można przygotować aktualizacji");
        for(int i=0;i<names.length();i++){
          String name=names.getString(i);
          if(!name.matches("[A-Za-z0-9._-]+")||name.contains(".."))throw new IOException("Nieprawidłowy plik");
          byte[] bytes=download(RAW+name+"?v="+System.currentTimeMillis(),2_000_000);
          if(bytes.length<1)throw new IOException("Pusty plik: "+name);
          write(new File(staging,name),bytes);
        }
        write(new File(staging,"version.json"),manifestBytes);
        File old=new File(root,"previous");delete(old);
        if(active.exists()&&!active.renameTo(old))throw new IOException("Nie można zachować poprzedniej wersji");
        if(!staging.renameTo(active)){
          if(old.exists())old.renameTo(active);
          throw new IOException("Nie można aktywować aktualizacji");
        }
        delete(old);
        notifyWeb("Zaktualizowano QUEST do "+remote+".",true);
      } catch(Exception e){
        if(manual)notifyWeb("Aktualizacja niedostępna. Tryb offline działa nadal.",false);
      } finally {updating=false;}
    });
  }
  @Override protected void onActivityResult(int requestCode,int resultCode,Intent result){
    super.onActivityResult(requestCode,resultCode,result);
    if(requestCode==PICK_BACKUP){
      if(fileCallback!=null){
        fileCallback.onReceiveValue(resultCode==RESULT_OK&&result!=null&&result.getData()!=null?new Uri[]{result.getData()}:null);
        fileCallback=null;
      }
    }else if(requestCode==SAVE_BACKUP){
      if(resultCode==RESULT_OK&&result!=null&&result.getData()!=null&&pendingBackup!=null){
        try(java.io.OutputStream out=getContentResolver().openOutputStream(result.getData())){
          if(out!=null)out.write(pendingBackup.getBytes(StandardCharsets.UTF_8));
          Toast.makeText(this,"Kopia zapasowa zapisana",Toast.LENGTH_SHORT).show();
        }catch(Exception e){Toast.makeText(this,"Nie udało się zapisać kopii",Toast.LENGTH_LONG).show();}
      }
      pendingBackup=null;
    }
  }
  @Override public void onBackPressed() {
    if(web.canGoBack())web.goBack();else super.onBackPressed();
  }
  @Override public void onDestroy(){web.destroy();executor.shutdownNow();super.onDestroy();}
}

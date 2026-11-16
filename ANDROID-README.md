# QUEST 4.0 — Android Offline

## Instalacja APK
1. Otwórz **GitHub → Actions → QUEST Android APK**: https://github.com/Borsuk03/quest-personal-rpg/actions/workflows/android-apk.yml
2. Otwórz najnowsze zakończone powodzeniem uruchomienie.
3. W sekcji **Artifacts** pobierz **QUEST-4.0-Android-debug-APK**.
4. Rozpakuj ZIP i zainstaluj plik **app-debug.apk** na Androidzie (zezwól na instalację z tego źródła).
5. W wersji przeglądarkowej wybierz **Ustawienia → Eksportuj dane**, a w aplikacji Android **Ustawienia → Importuj dane**. Import zastępuje obecne dane APK — zrób go przed rozpoczęciem zapisywania nowych aktywności.

## Jak działa
- Wszystkie pliki interfejsu, przepisy i logika aplikacji są wbudowane w APK. QUEST uruchamia się bez sieci.
- Wpisy, XP i lista zakupów są zapisane w lokalnej pamięci WebView, oddzielnie od pamięci Chrome.
- Po uruchomieniu lub użyciu przycisku aktualizacji aplikacja sprawdza plik `version.json` w publicznym repozytorium GitHub. Przy nowej wersji pobiera zestaw plików i aktywuje go po kompletnym pobraniu. Jeśli internet nie działa, poprzednia wersja pozostaje dostępna.
- Aktualizacje interfejsu i JavaScript nie wymagają nowego APK. Zmiany w kodzie natywnym Androida wymagają nowego APK.
- Aby wypuścić kolejną aktualizację zawartości, zaktualizuj wersję w `version.json`, `app.js` i `index.html` oraz opublikuj pliki.
- Cloudflare Access nie jest potrzebny do aktualizacji APK: aktualizacje pobierane są z **publicznego** repozytorium GitHub. Nie przechowuj tam danych prywatnych.

## Status / ograniczenia
- To jest **debug APK**, podpisywany przez środowisko GitHub Actions. Jest przeznaczony do testów, a nie dystrybucji produkcyjnej.
- Kolejne kompilacje debug APK mogą mieć różne podpisy; aby aktualizować samą aplikację bez odinstalowania, trzeba przygotować stały klucz podpisywania i release APK.
- Przed codziennym użytkowaniem sprawdź na telefonie: działanie bez sieci, przycisk aktualizacji, eksport/import, zachowanie XP po ponownym uruchomieniu.
- Nie odinstalowuj aplikacji bez wyeksportowania danych.

'use strict';
const QUEST_RECIPES=[
  {
    "id": "bowl",
    "name": "Ultimate bowl z kurczakiem",
    "type": "Obiad",
    "minutes": 25,
    "servings": 1,
    "source": "Dopracowany wspólnie przepis",
    "ingredients": [
      "75 g ryżu jaśminowego (suchego)",
      "170 g piersi kurczaka",
      "½ czerwonej cebuli",
      "½ ogórka",
      "1 marchewka",
      "1 łyżka masła orzechowego",
      "2 łyżki sosu sojowego",
      "1 łyżka octu ryżowego",
      "1 łyżeczka miodu",
      "Czosnek, papryka, chili, szczypiorek"
    ],
    "steps": [
      "Ugotuj ryż jaśminowy zgodnie z instrukcją.",
      "Ogórek pokrój i marynuj 10–20 minut z octem ryżowym, odrobiną sosu sojowego i miodu.",
      "Kurczaka dopraw czosnkiem, papryką i sosem sojowym. Smaż na woku 6–8 minut, aż będzie gotowy.",
      "Wymieszaj masło orzechowe z pozostałym sosem sojowym, ciepłą wodą i chili.",
      "Ułóż ryż, kurczaka, cebulę, marchewkę i marynowany ogórek. Polej sosem i posyp szczypiorkiem."
    ]
  },
  {
    "id": "potato-salad",
    "name": "Białkowa sałatka ziemniaczano-jajeczna",
    "type": "Obiad",
    "minutes": 40,
    "servings": 4,
    "source": "High-Protein Loaded Potato & Egg Salad",
    "ingredients": [
      "680 g ziemniaków",
      "6 jajek",
      "4 plastry boczku",
      "50 g czerwonej cebuli",
      "50 g ogórków kiszonych",
      "Szczypiorek i koperek",
      "170 g serka wiejskiego 2%",
      "113 g jogurtu greckiego 0%",
      "30 g lekkiego majonezu",
      "1 łyżka musztardy Dijon",
      "1 łyżka łagodnej musztardy",
      "2 łyżki zalewy z ogórków",
      "Czosnek i cebula granulowane, wędzona papryka, sól, pieprz"
    ],
    "steps": [
      "Pokrój i ugotuj ziemniaki przez 10–15 minut, następnie ostudź.",
      "Ugotuj jajka na twardo i pokrój.",
      "Podsmaż boczek i pokrusz. Posiekaj cebulę, ogórki oraz zioła.",
      "Zblenduj serek wiejski, jogurt, majonez, musztardy, zalewę i przyprawy.",
      "Połącz składniki i schłodź przez około 30 minut."
    ]
  },
  {
    "id": "chicken-ranch",
    "name": "Chicken Bacon Ranch — białkowa sałatka",
    "type": "Obiad",
    "minutes": 30,
    "servings": 4,
    "source": "High Protein Smash & Scoop",
    "ingredients": [
      "6 jajek",
      "250 g piersi kurczaka",
      "5 plastrów boczku",
      "80 g jogurtu greckiego 0%",
      "100 g lekkiego majonezu",
      "2 łyżki parmezanu",
      "1 łyżeczka musztardy Dijon",
      "Natka pietruszki i szczypiorek",
      "Czosnek i cebula granulowane, sól, pieprz"
    ],
    "steps": [
      "Ugotuj jajka na twardo.",
      "Kurczaka dopraw i przygotuj w airfryerze około 12–15 minut w 200°C; sprawdź temperaturę wewnętrzną 74°C.",
      "Usmaż boczek i pokrusz. Posiekaj kurczaka, jajka i zioła.",
      "Połącz jogurt, majonez, musztardę, parmezan i przyprawy.",
      "Wymieszaj wszystkie składniki."
    ]
  },
  {
    "id": "onion-chips",
    "name": "Chipsy cebulowe z parmezanem",
    "type": "Przekąska",
    "minutes": 30,
    "servings": 2,
    "source": "@j.newtrition / @hungry.happens",
    "ingredients": [
      "2 małe białe cebule",
      "198 g tartego parmezanu",
      "½ łyżki oliwy",
      "Sól, czosnek granulowany i papryka"
    ],
    "steps": [
      "Rozgrzej piekarnik do 200–205°C. Wyłóż blachę papierem.",
      "Rozsyp parmezan cienką, równą warstwą.",
      "Ułóż krążki cebuli o grubości około 6 mm bez nakładania.",
      "Lekko posmaruj oliwą i dopraw.",
      "Piecz około 18 minut do zrumienienia. Ostudź 5–10 minut i połam na chipsy."
    ]
  },
  {
    "id": "butter-chicken",
    "name": "Butter chicken z ryżem",
    "type": "Obiad",
    "minutes": 40,
    "servings": 6,
    "source": "Wcześniej ustalony przepis",
    "ingredients": [
      "1 kg piersi kurczaka",
      "2 cebule",
      "4 ząbki czosnku",
      "500 g passaty pomidorowej",
      "200 ml lekkiego mleka kokosowego",
      "300 g suchego ryżu basmati",
      "2 łyżki oliwy",
      "Curry, garam masala, kurkuma, papryka słodka i wędzona",
      "Sól, pieprz i opcjonalnie chili"
    ],
    "steps": [
      "Ugotuj ryż basmati.",
      "Pokrój i przypraw kurczaka, obsmaż na oliwie.",
      "Podsmaż cebulę i czosnek, dodaj przyprawy.",
      "Wlej passatę i mleko kokosowe; gotuj około 10 minut.",
      "Dodaj kurczaka i gotuj jeszcze 8–10 minut, aż będzie całkowicie gotowy. Podaj z ryżem."
    ]
  },
  {
    "id": "udon",
    "name": "Kurczak teriyaki z udon",
    "type": "Obiad",
    "minutes": 25,
    "servings": 4,
    "source": "Wcześniej ustalony przepis",
    "ingredients": [
      "1 kg piersi kurczaka",
      "2–3 papryki",
      "1 cebula",
      "2–3 ząbki czosnku",
      "2 opakowania makaronu udon",
      "100 ml sosu teriyaki",
      "2 łyżki sosu sojowego",
      "Oliwa",
      "Opcjonalnie miód, skrobia i olej sezamowy"
    ],
    "steps": [
      "Pokrój kurczaka i obsmaż na woku.",
      "Dodaj cebulę, paprykę i czosnek, smaż do zmięknięcia.",
      "Wlej sos teriyaki i sojowy; opcjonalnie zagęść odrobiną skrobi.",
      "Dodaj podgrzany makaron udon i mieszaj przez 2–3 minuty."
    ]
  },
  {
    "id": "peanut-noodles",
    "name": "Orzechowy makaron azjatycki",
    "type": "Obiad",
    "minutes": 20,
    "servings": 2,
    "source": "@mraucin_ — wersja z zachowanych składników",
    "ingredients": [
      "150 g makaronu udon lub ramen",
      "3 łyżki masła orzechowego",
      "2 łyżki sosu sojowego",
      "60 ml oleju",
      "2 łyżki sezamu",
      "1 łyżka szczypiorku",
      "1 łyżka szalotki",
      "1 łyżeczka czosnku",
      "1 łyżeczka imbiru",
      "Sól i płatki chili"
    ],
    "steps": [
      "Ugotuj makaron zgodnie z opakowaniem.",
      "Posiekaj szalotkę, czosnek, imbir i szczypiorek.",
      "Wymieszaj masło orzechowe, sos sojowy, sezam, przyprawy i odrobinę wody z makaronu.",
      "Dodaj składniki aromatyczne i wymieszaj sos z gorącym makaronem.",
      "Dodawaj olej stopniowo, do preferowanej konsystencji. Uwaga: sposób wykonania jest adaptacją, bo zachował się niepełny oryginalny opis."
    ]
  },
  {
    "id": "egg-sandwich",
    "name": "Japońska kanapka jajeczna",
    "type": "Śniadanie",
    "minutes": 15,
    "servings": 1,
    "source": "Uproszczona wersja znanego wcześniej dania",
    "ingredients": [
      "2 jajka",
      "2 kromki miękkiego pieczywa tostowego",
      "1 łyżka majonezu",
      "Sól i pieprz"
    ],
    "steps": [
      "Ugotuj jajka na twardo, ostudź i obierz.",
      "Rozgnieć jajka z majonezem, solą i pieprzem.",
      "Rozłóż farsz między kromkami i przekrój kanapkę."
    ]
  }
,
  {
    "id": "pulled-bbq",
    "name": "Kanapka z szarpanym kurczakiem — Smokey BBQ",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@themealprepstop",
    "ingredients": [
      "2 kromki pieczywa",
      "135 g ugotowanego szarpanego kurczaka",
      "120 g jogurtu greckiego 0%",
      "30 g sosu BBQ",
      "¾ łyżeczki wędzonej papryki",
      "½ łyżeczki czosnku w proszku",
      "¼ łyżeczki cebuli w proszku",
      "½ łyżeczki sosu Worcestershire (opcjonalnie)",
      "Pieprz i ¼ łyżeczki soli"
    ],
    "steps": [
      "Wymieszaj ugotowanego szarpanego kurczaka z jogurtem i składnikami sosu. Nałóż między kromki. Pieczywo przechowuj osobno."
    ]
  },
  {
    "id": "pulled-honey",
    "name": "Kanapka z szarpanym kurczakiem — Honey Garlic",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "Seria kanapek z kurczakiem",
    "ingredients": [
      "2 kromki pieczywa",
      "135 g ugotowanego szarpanego kurczaka",
      "120 g jogurtu greckiego 0%",
      "15 g sosu sojowego",
      "14 g miodu",
      "4 g oleju sezamowego",
      "½ łyżeczki czosnku w proszku",
      "¼ łyżeczki pieprzu",
      "Opcjonalnie chili i szczypiorek"
    ],
    "steps": [
      "Wymieszaj ugotowanego szarpanego kurczaka z jogurtem i składnikami sosu. Nałóż między kromki. Pieczywo przechowuj osobno."
    ]
  },
  {
    "id": "pulled-coleslaw",
    "name": "Kanapka z szarpanym kurczakiem — Coleslaw",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@themealprepstop",
    "ingredients": [
      "2 kromki pieczywa",
      "135 g ugotowanego szarpanego kurczaka",
      "120 g jogurtu greckiego 0%",
      "30 g majonezu light",
      "7 g octu białego lub jabłkowego",
      "5 g miodu",
      "70 g kapusty coleslaw",
      "Pieprz i ¼ łyżeczki soli"
    ],
    "steps": [
      "Wymieszaj ugotowanego szarpanego kurczaka z jogurtem i składnikami sosu. Nałóż między kromki. Pieczywo przechowuj osobno."
    ]
  },
  {
    "id": "pulled-jalapeno",
    "name": "Kanapka z szarpanym kurczakiem — Jalapeño Ranch",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@themealprepstop",
    "ingredients": [
      "2 kromki pieczywa",
      "135 g ugotowanego szarpanego kurczaka",
      "120 g jogurtu greckiego 0%",
      "15 g majonezu light",
      "22 g jalapeño bez nasion",
      "1 łyżeczka soku z cytryny",
      "½ łyżeczki suszonej pietruszki",
      "½ łyżeczki suszonego koperku",
      "½ łyżeczki czosnku w proszku",
      "½ łyżeczki cebuli w proszku",
      "Pieprz i ¼ łyżeczki soli"
    ],
    "steps": [
      "Wymieszaj ugotowanego szarpanego kurczaka z jogurtem i składnikami sosu. Nałóż między kromki. Pieczywo przechowuj osobno."
    ]
  },
  {
    "id": "egg-themeal",
    "name": "Japońska kanapka jajeczna — @themealprepstop",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@themealprepstop",
    "ingredients": [
      "2 kromki pieczywa",
      "135 g jajek na twardo (ok. 3 szt.)",
      "80 g jogurtu greckiego 0%",
      "30 g majonezu light",
      "½ łyżeczki miodu",
      "¼ łyżeczki octu ryżowego",
      "½ łyżeczki musztardy Dijon",
      "⅛ łyżeczki soli",
      "Pieprz"
    ],
    "steps": [
      "Ugotuj jajka, posiekaj i wymieszaj z jogurtem, majonezem, musztardą i przyprawami. Przełóż pieczywo."
    ]
  },
  {
    "id": "egg-panacea",
    "name": "Japońska kanapka jajeczna — @panaceapalm",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@panaceapalm",
    "ingredients": [
      "4 jajka",
      "30 g majonezu light",
      "½ łyżeczki soli",
      "¼ łyżeczki pieprzu",
      "¼ łyżeczki cukru",
      "15 ml mleka odtłuszczonego",
      "2 kromki białego pieczywa"
    ],
    "steps": [
      "Ugotuj jajka, posiekaj, wymieszaj z pozostałymi składnikami i przełóż pieczywo."
    ]
  },
  {
    "id": "egg-bacon-chili",
    "name": "Pasta jajeczna z bekonem i chili",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@adrian_fit_protein",
    "ingredients": [
      "3 jajka na twardo",
      "3 plastry usmażonego bekonu",
      "1 łyżeczka majonezu light",
      "1 łyżeczka oleju chili z miąższem",
      "½ łyżeczki musztardy francuskiej",
      "Szczypiorek",
      "Parmezan",
      "Sól i pieprz"
    ],
    "steps": [
      "Ugotuj jajka, usmaż bekon, posiekaj i wymieszaj z majonezem, chili, musztardą, szczypiorkiem i parmezanem."
    ]
  },
  {
    "id": "egg-yogurt",
    "name": "Lekka pasta jajeczna z jogurtem",
    "type": "Śniadanie",
    "minutes": 0,
    "servings": 1,
    "source": "@healthleads — gramatury niepodane",
    "ingredients": [
      "Jajka na twardo",
      "Jogurt grecki",
      "Musztarda Dijon",
      "Czerwona cebula",
      "Szczypiorek",
      "Papryka",
      "Sól i pieprz"
    ],
    "steps": [
      "Ugotuj jajka, posiekaj jajka i warzywa, wymieszaj z jogurtem, musztardą i przyprawami. Źródło nie podaje gramatur."
    ]
  },
  {
    "id": "tuna-egg",
    "name": "Chrupiąca pasta jajeczna z tuńczykiem",
    "type": "Obiad",
    "minutes": 0,
    "servings": 2,
    "source": "@stefan_agcoaching",
    "ingredients": [
      "3 jajka",
      "2 puszki tuńczyka lite chilli",
      "100 g ogórka",
      "100 g cebuli",
      "50 g ogórków konserwowych lub kiszonych",
      "50 g ciecierzycy",
      "100 g wysokobiałkowego jogurtu greckiego",
      "20 g majonezu light",
      "10 g musztardy Dijon",
      "Sól i pieprz"
    ],
    "steps": [
      "Odsącz tuńczyka, posiekaj ugotowane jajka i warzywa, wymieszaj z ciecierzycą, jogurtem, majonezem i musztardą."
    ]
  },
  {
    "id": "beef-wrap",
    "name": "Wrap z wołowiną",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@odchudzaniezwiola — liczba porcji niepodana",
    "ingredients": [
      "500 g mielonej wołowiny",
      "Placki tortilli",
      "1 cebula",
      "3–4 ząbki czosnku",
      "1 łyżka jogurtu naturalnego",
      "Po 1 łyżeczce papryki wędzonej i słodkiej",
      "Sól i czosnek",
      "Jogurt, czosnek i majonez light na sos",
      "Sałata, pomidor, cebula, ogórek"
    ],
    "steps": [
      "Wymieszaj wołowinę z cebulą, czosnkiem, jogurtem i przyprawami. Rozwałkuj między papierem, zwiń i piecz 190°C ok. 25–30 minut, aż mięso będzie gotowe. Podgrzej tortille, dodaj mięso, sos i warzywa."
    ]
  },
  {
    "id": "chinese-chicken",
    "name": "Kurczak po chińsku",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@lisek.app — liczba porcji niepodana",
    "ingredients": [
      "500 g udek kurczaka bez skóry",
      "20 ml oliwy",
      "2 papryki",
      "1 czerwona cebula",
      "2 marchewki",
      "Ostra papryka, czosnek granulowany, chili",
      "2 łyżki sosu sojowego",
      "400 ml wody",
      "40 ml sosu sojowego do sosu",
      "1 łyżka sosu chili",
      "1 łyżka sosu teriyaki",
      "1 łyżka miodu",
      "2 łyżeczki octu ryżowego",
      "1 łyżka skrobi ziemniaczanej"
    ],
    "steps": [
      "Dopraw kurczaka, obsmaż na oliwie. Dodaj warzywa. Wymieszaj składniki sosu, skrobię najpierw rozprowadź w zimnej wodzie. Wlej i gotuj do zgęstnienia i pełnego dopieczenia mięsa."
    ]
  },
  {
    "id": "crispy-teriyaki",
    "name": "Chrupiący kurczak teriyaki",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@adrian_fit_protein — liczba porcji niepodana",
    "ingredients": [
      "500 g piersi kurczaka",
      "Przyprawa do mięsa, ostra papryka, pieprz, czosnek, sól",
      "2 jajka",
      "100 g płatków kukurydzianych",
      "20 g skrobi ziemniaczanej",
      "10 g masła",
      "30 ml sosu sojowego",
      "100 ml wody",
      "1 łyżeczka skrobi do glazury",
      "1 łyżeczka miodu"
    ],
    "steps": [
      "Pokrój i dopraw kurczaka, obtocz w skrobi, jajku i płatkach. Piecz ok. 16 minut w 190°C do temperatury wewnętrznej 74°C. Podgrzej składniki glazury do zgęstnienia i obtocz kurczaka. Kolejność panierowania jest praktyczną rekonstrukcją."
    ]
  },
  {
    "id": "gochujang-chicken",
    "name": "Kurczak gochujang",
    "type": "Obiad",
    "minutes": 0,
    "servings": 3,
    "source": "Wcześniejszy wspólny przepis",
    "ingredients": [
      "600 g piersi lub udek kurczaka",
      "1 czerwona papryka",
      "1 cebula",
      "2 ząbki czosnku",
      "25 g gochujang",
      "25 ml sosu sojowego",
      "10 g miodu",
      "10 g oleju",
      "50 ml wody",
      "Opcjonalnie 150 g pieczarek",
      "Opcjonalnie 150 g suchego ryżu"
    ],
    "steps": [
      "Obsmaż kurczaka partiami na woku (5/7), po 4–5 minut. Wyjmij, obsmaż warzywa, dodaj kurczaka i sos z gochujang, sosu sojowego, miodu i wody. Duś na 3/7 przez 4–6 minut do 74°C. Podaj z ryżem."
    ]
  },
  {
    "id": "kfc-strips",
    "name": "Stripsy jak KFC",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@milosc_od_kuchni — liczba porcji niepodana",
    "ingredients": [
      "600 g piersi kurczaka",
      "2 jajka",
      "200 g mąki do ciasta i 150 g do panierki",
      "75 g grana padano",
      "Pieprz ziołowy, cayenne, sól, pieprz, curry",
      "100–120 ml wody",
      "Olej do smażenia",
      "3 łyżki majonezu",
      "1 łyżka śmietany 18%",
      "Po 1 łyżce ketchupu, musztardy, miodu i zalewy z ogórków"
    ],
    "steps": [
      "Pokrój kurczaka w paski. Wymieszaj jajka, 200 g mąki, ser, przyprawy i wodę na ciasto. Zanurz mięso, obtocz w pozostałej mące z curry i smaż do pełnego dopieczenia. Wymieszaj składniki sosu."
    ]
  },
  {
    "id": "zinger",
    "name": "Burger Zinger z airfryera",
    "type": "Obiad",
    "minutes": 0,
    "servings": 2,
    "source": "Autor niewidoczny na zrzucie",
    "ingredients": [
      "300 g piersi kurczaka",
      "2 bułki brioche",
      "1 jajko",
      "40 g płatków kukurydzianych",
      "Papryka wędzona, chili, cayenne, sól, czosnek, cebula, pieprz i zioła",
      "Sałata",
      "40 g majonezu light",
      "1½ łyżki ostrego sosu"
    ],
    "steps": [
      "Rozbij filety, dopraw, zanurz w jajku i płatkach. Piecz w airfryerze 200°C przez 12–15 minut, przewracając w połowie, do 74°C. Złóż burgery z sałatą i sosem."
    ]
  },
  {
    "id": "biryani",
    "name": "Jednogarnkowy kurczak z ryżem — biryani",
    "type": "Obiad",
    "minutes": 0,
    "servings": 4,
    "source": "@ollieshawcoaching — sposób przygotowania odtworzony",
    "ingredients": [
      "600 g piersi kurczaka",
      "200 g ryżu basmati",
      "1 cebula",
      "1 czerwona papryka",
      "150 g jogurtu greckiego 0%",
      "100 g groszku",
      "100 ml lekkiego mleczka kokosowego",
      "300 ml bulionu drobiowego",
      "1 łyżka oliwy",
      "Garam masala, papryka, kurkuma, chili, sól i pieprz"
    ],
    "steps": [
      "Przygotowanie odtworzone, autor podał składniki: obsmaż cebulę, kurczaka i paprykę. Dodaj przyprawy, ryż, bulion i mleczko. Gotuj pod przykryciem, dodaj groszek, po zmniejszeniu temperatury jogurt. Dopiecz kurczaka do 74°C."
    ]
  },
  {
    "id": "spring-rolls",
    "name": "Sajgonki wietnamskie",
    "type": "Obiad",
    "minutes": 0,
    "servings": 55,
    "source": "@kochamgotowac / @nina.hoang.ha — duża partia",
    "ingredients": [
      "1 kg wieprzowiny",
      "10–12 grzybów mun",
      "400 g makaronu sojowego",
      "1 kalarepa",
      "¼ kapusty",
      "Mięta",
      "2 marchewki",
      "Kiełki mung",
      "3 jajka",
      "3–4 łyżki sosu rybnego",
      "Pieprz",
      "50–60 arkuszy papieru ryżowego",
      "2 białka jaj i 2 łyżki wody",
      "Olej do smażenia"
    ],
    "steps": [
      "Przygotowanie odtworzone z listy składników: posiekaj składniki farszu i połącz, zwiń w zwilżony papier ryżowy, zabezpiecz białkiem. Smaż partiami do pełnego dopieczenia mięsa. Oryginał zawiera kolendrę — pominięta według preferencji."
    ]
  },
  {
    "id": "no-fold-dumplings",
    "name": "Pierogi bez lepienia",
    "type": "Obiad",
    "minutes": 0,
    "servings": 24,
    "source": "@coocharz — brak pełnej metody",
    "ingredients": [
      "600 g mielonej wieprzowiny",
      "Po 1 łyżeczce soli, pieprzu, cukru, wędzonej papryki i imbiru",
      "2 ząbki czosnku",
      "1 łyżka sosu sojowego",
      "½ łyżeczki oleju sezamowego",
      "1 pęczek szczypiorku",
      "1 szklanka mąki pszennej i 1 łyżeczka soli"
    ],
    "steps": [
      "Źródło nie podaje pełnej metody ani ilości wody do ciasta. Zdjęcie przedstawia kulki mięsne w delikatnej otoczce; nie dopisano niepotwierdzonych kroków."
    ]
  },
  {
    "id": "mung-stirfry",
    "name": "Makaron stir-fry z kiełkami mung",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@ozubko — liczba porcji niepodana",
    "ingredients": [
      "2–3 pęczki szczypiorku",
      "300 g makaronu chińskiego",
      "180 g kiełków mung",
      "½ łyżeczki cukru i soli",
      "2–3 łyżki ciemnego sosu sojowego",
      "1 łyżeczka pieprzu",
      "200 ml bulionu wołowego",
      "Sezam",
      "1–2 łyżeczki oleju sezamowego",
      "Olej do smażenia"
    ],
    "steps": [
      "Szczypiorek podziel na białą i zieloną część. Wymieszaj sos sojowy, bulion, cukier i pieprz. Przesmaż szczypiorek i kiełki, dodaj olej sezamowy i przygotowany makaron. Wlej sos i odparuj, posyp sezamem."
    ]
  },
  {
    "id": "sf-garlic-noodles",
    "name": "Makaron czosnkowy San Francisco",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@bisongainz — liczba porcji niepodana",
    "ingredients": [
      "250 g spaghetti",
      "2 łyżki masła",
      "12 ząbków czosnku",
      "1 łyżka sosu ostrygowego",
      "2 łyżeczki sosu sojowego",
      "2 łyżeczki sosu rybnego",
      "30 g parmezanu lub pecorino",
      "Szczypiorek"
    ],
    "steps": [
      "Ugotuj makaron al dente, zachowaj wodę. Podsmaż czosnek na maśle ok. 2 minuty. Zdejmij z ognia, dodaj sosy. Wymieszaj z makaronem, wodą i serem. Posyp szczypiorkiem."
    ]
  },
  {
    "id": "sweet-potato-gnocchi",
    "name": "Kluski z batatów w sosie miodowym",
    "type": "Obiad",
    "minutes": 0,
    "servings": 4,
    "source": "@bartlomiej_wlodarczyk",
    "ingredients": [
      "1 kg batatów",
      "500 g skrobi ziemniaczanej",
      "100 ml ciepłej wody",
      "1½ łyżeczki soli",
      "60 ml sosu sojowego",
      "60 g ketchupu",
      "20 g sosu słodko-kwaśnego",
      "4 ząbki czosnku",
      "50 g miodu",
      "10 g sriracha mayo",
      "10 ml octu ryżowego",
      "80 ml wody",
      "10 g mąki ziemniaczanej",
      "2 g chili",
      "30 g szczypiorku"
    ],
    "steps": [
      "Ugotuj bataty, rozgnieć, wymieszaj ze skrobią, wodą i solą. Uformuj 30 klusek, gotuj do wypłynięcia, przełóż do zimnej wody. Zagotuj składniki sosu, dodaj kluski i szczypiorek."
    ]
  },
  {
    "id": "almond-chicken-salad",
    "name": "Sałatka z kurczakiem i sosem migdałowo-chili",
    "type": "Obiad",
    "minutes": 0,
    "servings": 1,
    "source": "@coach_brettcarrington — przygotowanie odtworzone",
    "ingredients": [
      "200 g ogórka",
      "15 g masła migdałowego",
      "10 ml sosu sojowego",
      "10 g oleju chili",
      "3 g czosnku",
      "10 ml miodu",
      "Sok z limonki",
      "75 g mieszanki coleslaw",
      "20 g czerwonej cebuli",
      "75 g gotowanej piersi kurczaka",
      "1 łyżeczka sezamu"
    ],
    "steps": [
      "Przygotowanie odtworzone: wymieszaj masło migdałowe, sos sojowy, olej chili, czosnek, miód i limonkę. Dodaj warzywa i ugotowanego kurczaka, posyp sezamem. Ogórek można wcześniej zamarynować."
    ]
  },
  {
    "id": "chicken-buns",
    "name": "Mięsne bułeczki z kurczakiem",
    "type": "Obiad",
    "minutes": 0,
    "servings": 3,
    "source": "@grubekalorie",
    "ingredients": [
      "190 g mąki",
      "200 g skyru",
      "½ łyżeczki sody",
      "25 g serka kanapkowego",
      "40 g cebuli",
      "180 g piersi kurczaka",
      "50 g goudy",
      "10 g ketchupu",
      "Przyprawy"
    ],
    "steps": [
      "Podsmaż kurczaka, dodaj cebulę i serek. Zagnieć ciasto z mąki, skyru i sody, podziel na 3 części. Dodaj nadzienie, ser i ketchup, zamknij. Piecz ok. 20 minut w 200°C, obracając w połowie."
    ]
  },
  {
    "id": "cheese-naan",
    "name": "Serowe naany z jogurtem",
    "type": "Przekąska",
    "minutes": 0,
    "servings": 4,
    "source": "Inspiracja @panaceapalm",
    "ingredients": [
      "190 g mąki samorosnącej",
      "250 g jogurtu greckiego 0%",
      "Sól",
      "120 g sera o obniżonej zawartości tłuszczu",
      "Spray do smażenia",
      "Opcjonalnie 2 łyżki lekkiego masła, czosnek i pietruszka"
    ],
    "steps": [
      "Wymieszaj mąkę, jogurt i sól, odstaw 5–10 minut. Podziel na 4, nadziej serem, zamknij i rozwałkuj. Smaż pod przykryciem po 1–2 minuty na stronę do upieczenia. Opcjonalnie posmaruj masłem czosnkowym."
    ]
  },
  {
    "id": "cheese-garlic-sticks",
    "name": "Białkowe paluchy serowo-czosnkowe",
    "type": "Przekąska",
    "minutes": 0,
    "servings": 3,
    "source": "@natalia_aksiucik",
    "ingredients": [
      "150 g twarogu półtłustego",
      "1 jajko",
      "60 g mozzarelli",
      "50 g mąki",
      "½ łyżeczki proszku do pieczenia",
      "Sól",
      "Czosnek granulowany"
    ],
    "steps": [
      "Wymieszaj twaróg, jajko i 30 g mozzarelli, dodaj mąkę, proszek i przyprawy. Uformuj 3 paluchy. Piecz w airfryerze 180°C 8–10 minut, posyp pozostałą mozzarellą i dopiecz."
    ]
  },
  {
    "id": "mole-cake",
    "name": "Kopiec Kreta bez piekarnika",
    "type": "Deser",
    "minutes": 0,
    "servings": 2,
    "source": "@mirella.dietetyk",
    "ingredients": [
      "3 jajka",
      "150 g skyru waniliowego",
      "60 g ricotty",
      "1 banan",
      "60 g mąki orkiszowej",
      "10 g oliwy",
      "10 g kakao",
      "30 g erytrytolu",
      "Proszek do pieczenia — ilości nie podano"
    ],
    "steps": [
      "Wymieszaj jajka, mąkę, kakao, erytrytol, proszek i połowę oliwy. Usmaż omlet pod przykryciem, ostudź i porwij. Układaj warstwami omlet, krem ze skyru i ricotty oraz banana."
    ]
  },
  {
    "id": "maxi-king",
    "name": "Deser Kinder Maxi King w pucharkach",
    "type": "Deser",
    "minutes": 0,
    "servings": 2,
    "source": "@jablko_gruszka_i_pietruszka",
    "ingredients": [
      "100 g puddingu karmelowego proteinowego",
      "30 g Śnieżki",
      "80 ml mleka 2%",
      "4 herbatniki (25 g)",
      "150 g skyru lub kvargu waniliowego",
      "8 g żelatyny i 50 ml wody",
      "30 g czekolady",
      "5 g oleju kokosowego",
      "10 g orzechów laskowych",
      "1 baton Kinder Maxi King 35 g"
    ],
    "steps": [
      "Rozpuść żelatynę, ostudź. Ubij Śnieżkę z mlekiem, dodaj skyr i żelatynę. Układaj herbatniki, piankę, pudding i piankę. Chłodź 2 godziny. Polej czekoladą z olejem i orzechami, schłodź, dodaj po pół batonika."
    ]
  },
  {
    "id": "chocolate-curd-mousse",
    "name": "Mus twarogowo-czekoladowy",
    "type": "Deser",
    "minutes": 0,
    "servings": 2,
    "source": "@adrian_fit_protein — instrukcja odtworzona",
    "ingredients": [
      "200 g twarogu",
      "40 g kakao",
      "4 kostki gorzkiej czekolady",
      "2 łyżki miodu lub słodzika",
      "200 g mleka",
      "15 g nasion chia",
      "Opcjonalnie 6 g żelatyny i 50 ml wody"
    ],
    "steps": [
      "Instrukcja odtworzona: rozpuść czekoladę, zblenduj z twarogiem, kakao, mlekiem i miodem. Dodaj chia, opcjonalnie żelatynę i schłodź."
    ]
  },
  {
    "id": "protein-cloud",
    "name": "Protein Cloud — deser jogurtowy",
    "type": "Deser",
    "minutes": 0,
    "servings": 4,
    "source": "@hera_performance",
    "ingredients": [
      "410 g waniliowego jogurtu proteinowego",
      "5 jajek",
      "30 g mąki lub skrobi kukurydzianej",
      "30 g bezcukrowego toppingu karmelowego"
    ],
    "steps": [
      "Wymieszaj składniki na gładką masę, przelej do formy i piecz ok. 45 minut w 200°C. Ostudź i podziel na 4 kawałki."
    ]
  }
];
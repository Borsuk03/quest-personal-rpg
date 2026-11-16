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
];

# Jatkokehitysideat

## Toiminnallisuudet

1. Valvojalle oma näkymä, jossa näkyy hyväksymättömät tapahtumat

2. Tapahtumien ja työtuntien hyväksymismahdollisuus

3. Palkanmaksutietojen ulosottaminen CSV tiedostona

## Koodiin ja ohjelmointiprosessiin liittyvät parannukset

### Testaus ja CI

1. Frontendiin yksikkötestaus
  - Frontendin testaamiseen käytetään ainoastaan end to end -testejä. E2E-testit sisältävät paljon sellaista, mitä voitasiin testata yksikkötesteillä. Yksikkötestien lisäämisellä nopeutetaan e2e-testien suorittamista. 

2. CI-putken tarkempi konfiguraatio
  - Esim cypress testejä ei tarvitse ajaa joka puskun yhteydessä.






Toiminnallisuudet
-Valvojan näkymä 1.
-Tapahtumien ja työtuntien hyväksymismahdollisuus 2.
-Palkanmaksutietojen ulosottaminen CSV tiedostona 3.

Koodin parannus
-Token logiikan parannus
-CSRF-tokenin lisäys
-Frontendiin yksikkötestaus 1.
-CI:sta pois cypress puskujen yhteydessä 2.
-Käyttäjän etusivunäkymä
-Cypress reset testien korjaus

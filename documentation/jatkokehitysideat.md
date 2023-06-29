# Jatkokehitysideat

## Toiminnallisuudet

1. Valvojalle oma näkymä, jossa näkyy hyväksymättömät tapahtumat

2. Tapahtumien ja työtuntien hyväksymismahdollisuus

3. Palkanmaksutietojen ulosottaminen CSV-tiedostona

4. Eri käyttäjäroolien etusivunäkymän parantaminen

5. Adminin toiminnallisuudet

## Koodiin ja ohjelmointiprosessiin liittyvät parannukset

### Testaus ja CI

1. Frontendiin yksikkötestaus
   - Frontendin testaamiseen käytetään ainoastaan end to end -testejä. End to end -testit sisältävät paljon sellaista, mitä voitasiin testata yksikkötesteillä. Yksikkötestien lisäämisellä nopeutetaan end to end -testien suorittamista. 

2. CI-putken tarkempi konfiguraatio
   - Esim. Cypress-testejä ei tarvitse ajaa joka puskun yhteydessä.

3. Cypressin password reset -testien korjaus
   - Tämänhetkinen sähköpostinlähetys toimii välillä liian hitaasti, mikä johtaa testin satunnaiseen hajoamiseen.

### Token

1. Käyttäjän session token-logiikan parannus
   - Token vanhentuu 30 minuutin kuluttua kirjautumisesta, jolloin käyttäjä kirjataan ulos ilman varoitusta.

2. CSRF-tokenin lisäys lomakkeisiin
   - Kun sovelluksen siirtää varsinaiseen tuotantoympäristöön, csrf-haavoittuvuus kannattaa ottaa huomioon. Katso lisätietoja [täältä](https://hy-tsoha.github.io/materiaali/osa-4/#tietoturva) kohdasta CSRF-haavoittuvuus.



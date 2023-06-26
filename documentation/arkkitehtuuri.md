# Arkkitehtuuri
## Kehitysympäristö
### Yleisrakenne
![Frontend-Backend-Database-image](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/FRONTEND-BACKEND-database.drawio.png)

### Frontend

#### Teknologiat
- React
   * käyttöliittymä

- Axios
   * selaimen ja palvelimen välinen kommunikointi

- React Router
  * navigointi
 
- Tailwind
  * tyylittely

#### Hakemistot

Frontendin hallinta tapahtuu kansiossa **client**, joka sisältää hakemistot

- components
    * sisältää eri näkymät, jotka renderöidään näytölle
- services
    * hoitaa palvelimelle menevät pyynnöt

### Backend

#### Teknologiat

- Node.js

- Express

- Sequelize
    * ORM-kirjasto, eli mahdollistaa Javascript-olioiden tallentamisen tietokantaan ilman SQL-kielen käyttöä
    * tarjoaa migraation, eli tavan tehdä muutoksia tietokantaan


#### Hakemistot

Backendin hallinta tapahtuu kansiossa **server**. Serverin sisältämien hakemistojen tehtävät kerrotaan alla.

- config
    * kertoo seeding-tiedostoille (tietokantataulun datan alustustiedostot), mihin alustus tehdään
- controllers
    * routejen määrittely
- migrations
    * tietokantamuutoksiin liittyvät tiedostot
- models
    * tietokantaskeemat
- seeders
    * tietokantataulujen datan alustustiedostot
- utils
    * tarjoaa säiltyspaikan useasti käytettäville moduuleille ja funktioille

### Database

#### Teknologiat

- PostgreSQL
   - tarjoaa relaatiotietokannan sovelluksen käyttöön
- Docker
  - kehitysympäristössä käytetään Dockeria PSQL-tietokannan ajamiseen

[Kuva tietokantataulusta](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/Tietokantakaavio.png)

## Tuotantoympäristö

#### Docker
  - Tuotantoversio kontitetaan sovelluksen juuressa sijaitsevassa Dockerfilessä. Dockerfilessä clientin koodista tehdään staattinen versio, joka ajetaan server-hakemistossa Expressin **static-middlewaren** avulla.

#### Fly.io
  - toimii sovelluksen tuotantoversion palvelimena
  - hoitaa PSQL-tietokannan kontituksen ja suorittamisen

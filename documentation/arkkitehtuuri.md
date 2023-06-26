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

Frontendin hallinta tapahtuu kansiossa Client. Clientin sisältämien hakemistojen tehtävät kerrotaan alla.

- components
    * sisältää eri näkymät, jotka renderöidään näytölle
- services
    * hoitaa palvelimelle menevät pyynnöt

### Backend

#### Teknologiat

- Node.js
    * tarjoaa suoritusympäristön Javascript-koodin suorittamiselle

- Express
    *  tarjoaa:
        * reitityksen 
        * rajapinnan selaimen kanssa kommunikointiin
        * middleware-funktioiden käytön

- Sequelize
    * ORM-kirjasto, eli mahdollistaa Javascript olioiden tallentamisen tietokantaan ilman SQL-kielen käyttöä
    * tarjoaa migraation, eli tavan tehdä muutoksia tietokantaan


#### Hakemisto- ja tiedostorakenne

Backendin hallinta tapahtuu kansiossa Server. Serverin sisältämien hakemistojen tehtävät kerrotaan alla.

- config
    *
- controllers
    * routejen määrittely
- migrations
    * tietokantamuutoksiin liittyvät tiedostot
- models
    * tietokanta skeemat
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

## Docker

Sovelluksen kehitys- ja tuotantoympäristöissä käytetään hyödyksi Docker-kontteja. Docker-kontit tarjoavat kevyen ja tehokkaan ajoympäristön Urheiluseura-sovellukselle tuotantoversiossa. Tuotantoversiota varten sovellushakemiston juuresta löytyy Dockerfile. Siinä client- ja server -hakemistojen koodit buildataan erikseen. Clientin koodista tehdään staattinen versio, joka kopiodaan server-hakemistoon. Tiedoston lopusta löytyy sovelluksen käynnityskomento.

Kehitysympäristössä käytetään Docker-konttia PostgreSQL-tietokannan ajamiseen.

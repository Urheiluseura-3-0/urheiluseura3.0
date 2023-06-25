# Arkkitehtuuri

## Yleisrakenne


VAIHDA UUSI KUVA
![Client-Server-Database-image](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/client-server-database.png)


## Frontend

### Teknologiat
- React
    * tarjoaa käyttöliittymän

- Axios
    * selaimen ja palvelimen välinen kommunikointi

### Rakenne

Frontendin hallinta tapahtuu kansiossa Client.

![Client directory tree image](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/client_tree_structure.png)

- components-kansio
    * sisältää eri näkymät, jotka renderöidään näytölle
- services-kansio
    * hoitaa palvelimelle menevät pyynnöt

- App.js
    * aloituskomponentti
    * React Router mahdollistaa React-sovelluksen navigoinnin
- index.js
    * ottaa reactin käyttöön ja renderöi App-komponentin

## Backend

### Teknologiat

- Node.js
    * tarjoaa ajoympäristön Javascript-koodin suorittamiselle

- Express
    *  tarjoaa:
        * reitityksen 
        * rajapinnan selaimen kanssa kommunikointiin
        * middleware-funktioiden käytön

- Sequelize
    * ORM-kirjasto, eli mahdollistaa Javascript olioiden tallentamisen tietokantaan ilman SQL-kielen käyttöä
    * tarjoaa migraation, eli tavan tehdä muutoksia tietokantaan


### Rakenne

Backendin hallinta tapahtuu kansiossa Server.

![Server directory tree image](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/server_tree_structure.png)

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

## Database

![Database image](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/Tietokantakaavio.png)

### Docker

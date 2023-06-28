# Arkkitehtuuri

Sovellus on toteutettu hyvin pitkälti [Full stack open](https://fullstackopen.com/en/#course-contents) kurssin materiaaleja hyödyntäen. Jos teknologia on merkitty tähdellä *, sitä ei löydy kurssin materiaaleista.
## Kehitysympäristö
### Yleisrakenne
![Frontend-Backend-Database-image](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/FRONTEND-BACKEND-database.drawio.png)

### Frontend
Frontendin koodi löytyy kansiosta [**client**](https://github.com/Urheiluseura-3-0/urheiluseura3.0/tree/main/client).

#### Teknologiat
- [React](https://react.dev/learn)
   * käyttöliittymä

- [Axios](https://axios-http.com/docs/intro)
   * selaimen ja palvelimen välinen kommunikointi

- [React Router](https://reactrouter.com/en/main)
  * navigointi
 
- [Tailwind CSS*](https://tailwindcss.com/docs/guides/create-react-app)
  * tyylittely

#### Hakemistot
- cypress
    * E2E-testaukseen liittyvät tiedostot
- public
    * reactin oletuskansio
- src
    * frontendin varsinainen lähdekoodi
      - components
          * sisältää eri näkymät, jotka renderöidään näytölle
      - services
          * hoitaa palvelimelle menevät pyynnöt
      - utils
          * frontendin apufunktiot

### Backend
Backendin koodi löytyy kansiosta [**server**](https://github.com/Urheiluseura-3-0/urheiluseura3.0/tree/main/server). 

#### Teknologiat

- [Node.js](https://nodejs.org/en/docs)
  * palvelimen suoritusympäristö

- [Express](https://expressjs.com/)
  * http-pyynnöt ja -vastaukset, reittien määrittely, middlewarejen hallinta

- [Sequelize](https://sequelize.org/docs/v6/)
    * ORM-kirjasto, eli mahdollistaa Javascript-olioiden tallentamisen tietokantaan ilman SQL-kielen käyttöä
    * tarjoaa migraation, eli tavan tehdä muutoksia tietokantaan

- [Nodemailer*](https://nodemailer.com/about/)
    * sähköpostien lähetyksen käsittely


#### Hakemistot

- config
    * tietokantojen alustuksen (seeding) konfiguraatio
- controllers
    * reitityksen määrittely
- migrations
    * tietokantaan tehdyt muutokset
- models
    * tietokannan skeemat
- seeders
    * tietokantataulujen datan alustustiedostot (vain kehitysympäristö)
- tests
    * backend-testit
- utils
    * backendin apufunktiot

### Tietokanta

Sovelluksen tietokantana käytetään [Postgresql-tietokantaa](https://www.postgresql.org/docs/), jota käsitellään jo aiemmin mainitun Sequelize ORM-kirjaston avulla.
Tietokanta pyörii kehitysympäristössä Docker-kontissa. Kontteja on kaksi erillistä, [yksi kehityskäyttöön ja toinen testaukseen](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/main/documentation/dev_setup.md#tietokannan-ensimm%C3%A4inen-k%C3%A4ytt%C3%B6%C3%B6notto-kehitysymp%C3%A4rist%C3%B6%C3%A4-varten).

[Kuva tietokantataulusta](https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/documentation-up/documentation/pictures/Tietokantakaavio.png)

## Tuotantoympäristö

#### Dockerfile
  - Tuotantoversio rakennetaan Dockerfilestä. Frontendin koodista tehdään staattinen versio, joka tarjoillaan palvelimelta Expressin static-middlewaren avulla.
  - Dockerfile ei luo tuotantoversion käyttämää tietokantaa

#### Fly.io
  - Palvelu, johon projektin "main"-haaran versio viedään automaattisesti Github Actionsin kautta.
  - Hoitaa tietokannan luomisen, konfiguraation ja yhdistämisen sovellukseen.

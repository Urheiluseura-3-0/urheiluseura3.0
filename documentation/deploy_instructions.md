# Tuotantoon viemisen ohjeet

Alta löydät yleiset ohjeet sovelluksen tuotantoversion käyttämisestä. Olemme sisällyttäneet myös tarkemmat ohjeet fly.io-palvelun käyttöön.

## Ympäristömuuttujat (secrets)
Riippumatta siitä minne sovellusta olet laittamassa, tarvitsee se toimiakseen pääsyn seuraaviin ympäristömuuttujiin (secrets):

| Muuttuja     | Kuvaus                                                                                                                                                                        |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| DATABASE_URL | Tietokannan osoite. Jotkin palvelut, kuten fly.io, määrittävät tämän käyttöönoton yhteydessä. |
| BASE_URL | Sivuston tuotantoversion osoite. Tällä hetkellä käytetään vain sähköpostia lähetettäessä. |	
| EMAIL_HOST | Sähköpostipalvelimen osoite |
| EMAIL_PORT | Sähköpostipalvelimen portti |
| EMAIL_USER | Sähköpostipalvelun käyttäjänimi |
| EMAIL_PASSWORD | Sähköpostipalvelun salasana |
| PORT | Portti, jota sovellus palvelimella käyttää |
| SECRET | Salainen avain, jota käytetään salasanojen ja tokeneiden kryptaukseen |

## Dockerfile

Sovelluksen juuresta löytyvä Dockerfile rakentaa sovelluksesta [docker imagen](https://fullstackopen.com/en/part12/introduction_to_containers#containers-and-images), jossa sovelluksen frontend on 'buildattu' staattiseksi kansioksi. Tätä sisältöä tarjoilee sovelluksen backend. 
[Fly.io asennusohjeita](#flyio-asennusohjeet) seuraamalla tietokanta luodaan ja määritetään, mutta jos aiot viedä sovelluksen toiselle alustalle voi määritys olla erilainen ja sinun täytyy tällöin selvittää se erikseen. Voit esimerkiksi hyvinkin "kontittaa" ja "orkestroida" tietokannan ja sovelluksen tuotantoversion [docker-composen avulla](https://fullstackopen.com/en/part12/basics_of_orchestration). Tätä vaihtoehtoa ei kuitenkaan tällä hetkellä ole tehtynä.


## Fly.io asennusohjeet

Nämä ohjeet on luotu [tietokantasovelluksen materiaalia hyödyntäen](https://hy-tsoha.github.io/materiaali/osa-3/#sovellus-tuotantoon).

1. Luo tunnus [Fly.io-palveluun](https://fly.io/app/sign-up)
2. Asenna [flyctl-komentorivityökalu](https://fly.io/docs/hands-on/install-flyctl/)
3. Kirjaudu sisään fly.io:hon

```fly auth login```

4. Siirry paikalliseen repositorioosi sovelluksesta. Jos sinulla ei vielä ole sellaista, kloonaa sovellus [Githubista](https://github.com/Urheiluseura-3-0/urheiluseura3.0)

``` cd ~/urheiluseura3.0```

5. Poista olemassa oleva fly.toml konfiguraatio.

```rm fly.toml```

5. Aloita oman fly.io-konfiguraation määritys. **HUOM! Älä vielä tässä vaiheessa määrittele tietokantoja, kun sitä kysytään**. Nimeä sovellus haluamallasi tavalla, vaikka "sovelluksennimi".

```fly launch```

6. Luo tietokanta ja määrittele sen konfiguraatio. Nimeksi kannattaa laittaa "sovelluksennimi-db".

```fly postgres create```

7. Yhdistä tietokanta sovellukseen.

```fly postgres attach --app sovelluksennimi sovelluksennimi-db --database-name postgres```

8. Aseta [ympäristömuuttujat](#ympäristömuuttujat-secrets). **HUOM! DATABASE_URL määrittelyn hoitaa fly.io"

```fly secrets set SECRET=(avain tähän)```

9. Tarkasta että kaikki vaaditut [ympäristömuuttujat](#ympäristömuuttujat-secrets) on määritelty oikein.

```fly secrets list```

10. Julkaise sovellus.

```fly deploy```
# Ohjeet testien ajamiseen paikallisesti

## Backend testit

1. Käynnistä testitietokanta (ks. tarvittaessa tietokantojen asennusohjeet: https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/main/documentation/dev_setup.md)

```shell
~$ docker start postgres-test
```


```shell
~/server$ npm run test
```

2. Testikattavuusraportin voi muodostaa ajamalla testit komennolla:
```shell
~/server$ npm run test-coverage
```
Konsoliin muodostuu yksinkertainen yhteenveto. Tarkempi testikattavuusraportti generoituu coverage-kansioon html-muodossa.

## E2E-testit

1. Käynnistä testitietokanta (ks. tarvittaessa tietokantojen asennusohjeet: https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/main/documentation/dev_setup.md)

```shell
~$ docker start postgres-test
```

2. Käynnistetään serveri testi-moodissa:

```shell
~/server$ npm run start:test
```

3. Käynnistetään React-sovellus:

```shell
~/client$ npm start
```

4. Aja Cypress-testit joko...:

..visuaalisessa testiohjelmassa:

```shell
~/client$ npm run cypress:open
```

**tai**

..komentoriviltä:

```shell
~/client$ npm run test:e2e
```
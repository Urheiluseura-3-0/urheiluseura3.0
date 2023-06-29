# Ohjeet testien ajamiseen paikallisesti

## Backend-testit

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

## End to end -testit

1. Käynnistä testitietokanta (ks. tarvittaessa tietokantojen asennusohjeet: https://github.com/Urheiluseura-3-0/urheiluseura3.0/blob/main/documentation/dev_setup.md)

```shell
~$ docker start postgres-test
```


2. Buildataan frontend

```shell
~/client$ npm ci
```

```shell
~/client$ npm run build
```


3. Siirretään build-kansio serverin juureen

```shell
~/urheiluseura3.0$ cp -R client/build server/build
```


4. Käynnistetään serveri testi-moodissa:

```shell
~/server$ npm run start:test
```


5. Aja Cypress-testit joko...:

..visuaalisessa testiohjelmassa:

```shell
~/client$ npm run cypress:open
```

**tai**

..komentoriviltä:

```shell
~/client$ npm run test:e2e
```

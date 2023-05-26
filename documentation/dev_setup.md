# Kehitysympäristön ohjeet


## Tietokannan käyttöönotto kehitysympäristöä varten

1. Asenna Docker (https://docs.docker.com/engine/install/)

2. Käynnistä kehitystietokanta:

```docker run --name postgres-dev -e POSTGRES_PASSWORD=devsecretpassword -p 5432:5432 postgres```

3. Lisää ympäristömuuttuja kansion server tiedostoon .env

```DATABASE_URL=postgres://postgres:devsecretpassword@localhost:5432/postgres```

4. Käynnistä testitietokanta:

```docker run --name postgres-test -e POSTGRES_PASSWORD=testsecretpassword -p 5433:5432 postgres```

5.  Lisää ympäristömuuttuja kansion server tiedostoon .env

```TEST_DATABASE_URL=postgres://postgres:testsecretpassword@localhost:5433/postgres```


### Tietokannan käyttö komentoriviltä kehitysympäristössä

1. Kehitystietokantaan voit muodostaa yhteyden seuraavasti:
```docker exec -it postgres-dev psql -U postgres```

2. Testitietokantaan voit muodostaa yhteyden seuraavasti:
```docker exec -it postgres-test psql -U postgres```

## Tailwindin käyttöönotto

1. Mene client-kansion juureen ja suorita komennot

```npm install```

```npx tailwindcss init -p```

2. Vaihda tailwind.config.js tiedoston sisällöksi seuraava:
```
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```
3. On erittäin suositeltavaa lisätä editoriisi lisäosa tailwindia varten.
[Ohjeet täältä](https://tailwindcss.com/docs/editor-setup)
# Tredje Boligsektor - Aktørkartlegging

Dette er et statisk nettsted bygget med Next.js, TypeScript og Tailwind CSS for å visualisere aktørkartleggingen av Tredje Boligsektor i Norge.

Nettstedet presenterer data fra `actors_master.json`, en konsolidert fil basert på fem uavhengige AI-rapporter.

## Datastrøm (Task A-B-C)

Prosessen for å komme frem til de presenterte dataene kan deles inn i tre hovedsteg:

### Task A: Innsamling

Utgangspunktet var fem separate JSON-filer, generert av fem forskjellige AI-modeller (Gemini, GPT-4, Claude, Manus, Perplexity). Hver rapport hadde som mål å kartlegge relevante aktører, initiativer og konsepter knyttet til en tredje boligsektor i Norge.

- `actors_Gemini.json`
- `actors_GPT.json`
- `actors_Claude.json`
- `actors_Manus.json`
- `actors_Perplexity.json`

### Task B: Konsolidering

Dataene fra de fem rapportene ble slått sammen til én masterfil: `actors_master.json`. Denne prosessen innebar:

1.  **Matching**: Duplikate aktører ble identifisert ved å sammenligne navn (med en likhetsterskel) og overlappende temaer.
2.  **Syntetisering**: For duplikate aktører ble felter som `rolle_kort` og `relevans_for_TBS` slått sammen til en mest mulig dekkende og konsis beskrivelse.
3.  **Kombinering**: Lister som `temaer` og `rapporter_som_omtaler` ble kombinert for å gi et komplett bilde.

Resultatet er en renset og konsolidert liste over unike aktører.

### Task C: Presentasjon

Dette Next.js-prosjektet leser `actors_master.json` og bygger et statisk nettsted. Ved å bruke `getStaticProps` og `getStaticPaths` blir alle sider forhåndsgenerert under byggeprosessen. Dette gir svært raske lastetider og en robust brukeropplevelse.

- **`lib/loadActors.ts`**: Inneholder all logikk for å lese og prosessere data fra JSON-filen.
- **`src/app/`**: Inneholder sidestrukturen, inkludert dynamiske ruter for `[topic]` og `[id]`.
- **`src/components/`**: Inneholder gjenbrukbare React-komponenter som `ActorCard`, `FilterBar` og `Layout`.

## Hvordan kjøre prosjektet

Prosjektet bruker `pnpm` som pakkebehandler.

1.  **Installer avhengigheter:**

    ```bash
    pnpm install
    ```

2.  **Start utviklingsserveren:**

    ```bash
    pnpm run dev
    ```

3.  **Åpne i nettleseren:**

    Åpne [http://localhost:3000](http://localhost:3000) for å se resultatet.

## Bygg for produksjon

For å bygge en produksjonsklar versjon av nettstedet, kjør:

```bash
pnpm run build
```

Dette vil generere en statisk versjon av nettstedet i `.next`-mappen.

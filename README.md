# Portfolio — Mehdi Oulad Khlie

Persoonlijke portfolio rond één concept: **topologie**. Eén node-graph loopt door
de hele pagina en hertekent zichzelf per sectie — een driftend mesh in de hero,
een sterschema bij de expertise-index, het werkelijke architectuurdiagram per
case, een tijdlijn bij de certificeringen, en tot slot één verbinding naar het
mailadres. Dezelfde nodes, telkens anders gerangschikt. De scrollpositie is de
parameter die de interpolatie stuurt.

## Stack

| | |
|---|---|
| Framework | React 18 + TypeScript |
| Build | Vite 7 |
| Styling | Handgeschreven CSS met custom properties — geen framework |
| Graph | Inline SVG, aangestuurd via één `requestAnimationFrame`-lus |
| Fonts | Inter Tight + JetBrains Mono, zelf gehost (woff2, latin subset) |
| Runtime-afhankelijkheden | `react`, `react-dom` — verder niets |

Geen animatiebibliotheek, geen scroll-library, geen icon font, geen router.
Alle iconografie is inline SVG op `currentColor`.

## Commando's

```bash
npm install
npm run dev        # ontwikkelserver
npm run typecheck  # tsc --noEmit
npm run build      # typecheck + client build + prerender
npm run preview    # productiebuild bekijken op :4173
```

`npm run build` doet drie dingen: de client bundelen, dezelfde app naar HTML
renderen met `react-dom/server`, en die HTML in `dist/index.html` zetten. De
pagina is daardoor volledig leesbaar vóórdat er JavaScript draait; React
hydrateert er daarna overheen. Dat scheelt op een trage mobiele verbinding
ruim een seconde tot de eerste tekst.

## Structuur

```
index.html              meta, Open Graph, JSON-LD Person, font-preloads
prerender.mjs           zet de gerenderde HTML in dist/index.html
src/
  main.tsx              hydrateert (of rendert) de app
  entry-server.tsx      build-time render naar HTML
  App.tsx               opbouw van de pagina + hash-route voor de privacypagina
  lib/
    content.ts          alle teksten, cases, certificeringen — één plek
    topology.ts         de graph: layouts per staat, interpolatie
    highlight.ts        syntax highlighting voor PowerShell en Cisco IOS
    hooks.ts            reduced motion, viewport, in-view, actieve sectie
  components/
    TopologyLayer.tsx   de vaste graph-laag en de tekenlus
    InlineDiagram.tsx   het diagram in de documentstroom (smalle schermen)
    Cursor.tsx          magnetische cursor
    Chrome.tsx          topbalk, sectienavigatie, statusregel
    CodeBlock.tsx       uitklapbaar codeblok met kopieerknop
    Reveal.tsx          clip-path reveal per regel
    Icons.tsx           inline SVG-iconen
  sections/             Hero, Systeem, Werk, Traject, Contact, Privacy
  styles/app.css        het volledige designsysteem
```

## Inhoud aanpassen

Alle tekst staat in `src/lib/content.ts`. Een case bestaat uit context,
probleem, aanpak, resultaat, drie meetbare cijfers, een componentenlijst en een
codefragment. Het bijbehorende architectuurdiagram staat als coördinatenlijst
in `ARCH` in `src/lib/topology.ts`; de sleutel daar moet gelijk zijn aan de `id`
van de case.

## Toegankelijkheid

- Volledige toetsenbordnavigatie, focus-states in de accentkleur
- `prefers-reduced-motion` krijgt een volwaardige statische variant: de graph
  wordt één stilstaand diagram per sectie
- Elk diagram heeft een tekstuele componentenlijst en een beschrijving
- Contrastverhoudingen halen WCAG AA, ook de secundaire grijstinten

## Gemeten

Lighthouse op de productiebuild:

| | Mobiel | Desktop |
|---|---|---|
| Performance | 99 | 100 |
| Accessibility | 100 | 100 |
| Best Practices | 100 | 100 |
| SEO | 100 | 100 |

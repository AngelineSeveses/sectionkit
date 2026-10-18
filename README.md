# Sectionkit

A personal library of landing page sections for businesses in the United States and Canada.
Browse, filter, preview at desktop, tablet and mobile widths, edit content and styles, then copy
React, HTML/CSS or an Elementor build recipe.

Stack: React 19, Vite, JavaScript, Material UI 9, React Router 7. No backend. Favorites, theme and
section edits are stored in the browser's `localStorage`.

## Run it

```bash
npm install
npm run dev        # http://localhost:5173
npm test           # unit and render tests (Vitest)
npm run build      # production build in dist/
npm run preview    # serve the production build
```

Development builds also include `/qa?w=390` (optionally `&cat=hero`), which renders every section
at one width. In the browser console, `__qaReport()` lists horizontal overflow and broken images.

## What is in the library

129 implemented sections across all 21 categories. The live count per category, against the
long-term target, is on the **Library coverage** page (Settings menu → Library coverage).

| Category | Implemented | Target |
| --- | ---: | ---: |
| Navigation & headers | 6 | 25 |
| Hero sections | 15 | 50 |
| Logo bars & trust badges | 5 | 15 |
| Benefits & features | 8 | 45 |
| Products & services | 6 | 30 |
| How it works | 5 | 20 |
| Testimonials & reviews | 6 | 25 |
| Case studies & results | 5 | 20 |
| Portfolio & galleries | 5 | 20 |
| Pricing & packages | 7 | 25 |
| Comparison tables | 5 | 15 |
| Lead-generation forms | 6 | 20 |
| CTA sections | 7 | 25 |
| FAQ sections | 5 | 15 |
| Contact sections | 5 | 15 |
| Statistics & metrics | 5 | 15 |
| Team & company | 5 | 15 |
| Industry-specific | 8 | 40 |
| Blog & resources | 5 | 20 |
| Footers | 5 | 15 |
| Banners, guarantees & offers | 5 | 15 |
| **Total** | **129** | **485** |

The original brief lists a total of 520, but its per-category targets add up to 485. The app uses
the per-category numbers.

Sections flagged **Contains sample content** (testimonials, ratings, statistics, team members) use
placeholder names, quotes and figures. Replace them with real, verifiable content before publishing.
Stock photos come from Unsplash (`src/data/images.js`) and should be swapped for the client's own.

## How it is built

```
src/
  app/            App providers and routes (detail, coverage and full view load lazily)
  theme/          Library UI tokens, MUI theme, light/dark context
  context/        Favorites, toasts, settings
  hooks/          URL-synced library query, element size and in-view helpers
  components/
    layout/       Header, sidebar, settings menu, app shell
    library/      Gallery cards, live thumbnails, toolbar, filter chips, empty states
    filters/      Faceted filter group
    preview/      Isolated iframe renderer, resizable canvas, property editor, code panels
    ui/           Favorite button
  data/
    categories.js, taxonomy.js   Categories, industries, goals, layouts, styles, markets, traits
    fields.js                    Editable-field helpers (each field carries its default)
    images.js                    Photography used in default content
    sections/<category>.js       Section metadata, one file per category
    sectionRegistry.js           Validates metadata and builds the index
  sections/
    _base.css                    Shared base layer, scoped to .lp-section
    <category>/<Name>.jsx|.css   The sections themselves
  services/       Section loader, export builders, favorites and customization storage
  utils/          Search/filter/sort, input validation
  pages/          Library, detail, coverage, full view, not found, dev QA
```

### Preview isolation

Each section renders through a React portal into a same-origin `<iframe>` whose document contains
only the base layer, that section's CSS and its Google Fonts. Section CSS is imported with `?raw`, so it
is never added to the app document. The app's MUI theme, `CssBaseline` and light/dark mode cannot
reach a section, and a section's media queries respond to the preview width. Links and form submits
inside previews are intercepted so the frame never navigates.

### Registry and metadata

Metadata is plain data. Nothing is evaluated from strings. Each entry names its component with
`file: '<category>/<Name>'`, which resolves to `src/sections/<category>/<Name>.jsx` (and `.css`)
through `import.meta.glob`, so every section is code-split and loaded only when needed.
`sectionRegistry.js` validates each entry (required fields, kebab-case slug, known category,
existing component file, unique id/slug, safe default URLs and colors). Entries that fail are
listed on the coverage page and left out of the gallery.

### Exports

- **HTML**: the actual component rendered with `renderToStaticMarkup` using the current edits,
  plus the Google Fonts link. "Page" downloads a standalone `.html` file with the CSS inlined.
- **CSS**: the shared base layer plus the section's scoped stylesheet.
- **React**: the component's real source file and a usage example with the current props.
- **Elementor**: a manual build recipe (containers, structure, typography, buttons, responsive
  notes) generated from the section's metadata and current colors. It does not create Elementor
  JSON or native widgets.

Interactive behavior (mobile menus, accordions, billing switch, portfolio filters, color swatches)
uses `<details>` and radio inputs with CSS, so the exported HTML works without JavaScript.

### Safety

Text is rendered by React and always escaped. URLs must be `http(s)`, `mailto:`, `tel:`, a root
path or an `#anchor`; `javascript:` and `data:` are rejected in the editor and on load. Colors must
be hex values. Stored customizations are re-sanitized against the field schema every time they are
read.

## Adding a section

1. **Write the component** in `src/sections/<category>/MySection.jsx`. Content arrives as props. The
   root element needs `className="lp-section my-section"`; put design tokens on it as CSS variables,
   for example `style={{ '--accent': accent }}`. Avoid `vh` units; previews size the frame to the
   content height.

2. **Write the CSS** in `MySection.css`. Every selector starts with `.my-section` (a test enforces
   this), including rules inside `@media`. Use the base helpers `.lp-container`, `.lp-btn` and
   `.lp-sr-only`, and the spacing variable `var(--lp-pad)`, which is driven by `data-spacing`.

3. **Register it** in `src/data/sections/<category>.js`:

   ```js
   section({
     id: 'hero-my-section-014',
     slug: 'my-section',
     name: 'My section',
     description: 'One sentence describing the layout.',
     category: 'hero',
     file: 'hero/MySection',
     industries: ['saas'],
     goals: ['free-trial'],
     audience: 'Who this is for.',
     markets: ['US', 'CA'],
     layout: 'split',
     styles: ['minimal'],
     fonts: ['Inter:wght@400;600'],
     structure: ['Headline', 'Supporting text', 'Button'],
     rationale: ['Why the layout helps the visitor decide.'],
     responsive: ['Stacks under 900px.'],
     tokens: { font: 'Inter', headingSize: 56, accent: '$accent', radius: '$radius', maxWidth: 1200, paddingY: 96 },
     elementor: { structure: ['Row container 50/50 …'] },
     fields: [
       text('headline', 'Headline', 'Default headline'),
       url('ctaUrl', 'Button link', '/signup'),
       color('accent', 'Accent color', '#3446D4'),
       radius(8),
       spacing('regular'),
     ],
   })
   ```

   Field helpers live in `src/data/fields.js`: `text`, `textarea`, `url`, `image`, `color`,
   `select`, `range`, `toggle` and `list` (repeatable items with their own fields). Each field's
   default is also the section's default prop. Tokens that start with `$` are read from the current
   props in the Elementor recipe. Use only values from `src/data/taxonomy.js` for industries, goals,
   layout, styles, markets and traits. Set `sampleContent: true` and the `sample-data` trait when
   default content includes reviews, ratings or figures.

4. **Check it**: run `npm test` (renders every section, checks CSS scoping and taxonomy) and open
   `/qa?w=390` and `/qa?w=1440` in development.

## Known limitations

- Section CSS uses `color-mix()`, which needs browsers from 2023 or later (Safari 16.2+,
  Chrome 111+, Firefox 113+).
- The CSS-only portfolio filter supports up to four filter categories, and IDs inside a section
  (filters, billing switch) assume one instance of that section per page.
- Forms in exported HTML post to the configured `action` URL. Wiring them to a backend, spam
  protection and consent records is up to the site that uses them.
- Gallery thumbnails are live iframes. They load as cards scroll into view, which is smooth for
  24 cards per page but should be watched if the page size grows.
- Copy uses the async clipboard API with a fallback. If the browser blocks both, the app says so
  and the code can be selected manually.

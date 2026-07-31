# Felt Design Tokens

Design tokens using [Style Dictionary](https://styledictionary.com/) v5 with the [DTCG](https://tr.designtokens.org/format/) format.

## Setup

```
npm install
```

## Build

```
npm run build
```

Outputs to `build/`:

- `css/primitives.css` — raw palette values
- `css/semantic.css` — intent-based tokens
- `css/scheme.css` — color scheme tokens with `light-dark()` resolution
- `js/tokens.js` — ESM export of all tokens

## Token structure

```
src/
├── primitive/       # Raw values (colors, spacing, radii, font sizes)
├── semantic/        # Intent tokens referencing primitives (dimensions)
└── scheme/          # Light/dark color mappings → -on-light / -on-dark vars
```

Scheme tokens produce three layers in `scheme.css`:

1. `color-scheme: light dark;`
2. `--rh-*-on-light` / `--rh-*-on-dark` per-scheme values
3. `--rh-*` resolved via `light-dark()` for automatic switching

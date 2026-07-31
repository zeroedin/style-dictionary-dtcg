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

## Output

```
build/
├── css/
│   ├── global.css                  # Combined file with @layer ordering
│   ├── primitive/
│   │   ├── color.css               # @layer primitive.color
│   │   ├── dimension.css           # @layer primitive.dimension
│   │   └── font-family.css         # @layer primitive.font-family
│   ├── semantic/
│   │   ├── radius.css              # @layer semantic.radius
│   │   └── typography.css          # @layer semantic.typography
│   ├── prefers/
│   │   ├── scheme.css              # @layer prefers.scheme
│   │   └── contrast.css            # @layer prefers.contrast
│   └── density/
│       └── compact.css             # @layer density.compact (opt-in)
└── js/
    ├── tokens.js                   # Primitives + semantic ESM export
    ├── prefers/
    │   ├── scheme.js
    │   └── contrast.js
    └── density/
        └── compact.js
```

## Token structure

```
src/
├── primitive/       # Raw values (colors, spacing, radii, font sizes, font families)
├── semantic/        # Intent tokens referencing primitives (radius, typography)
├── prefers/         # OS user preferences (maps to @media prefers-*)
│   ├── scheme.json  # Light/dark via light-dark() and color-scheme: light dark
│   └── contrast.json # High contrast via @media (prefers-contrast: more)
└── density/           # Opt-in density overrides (loaded after global.css)
    └── compact.json # Reduced density
```

## Layers

Each CSS file declares its own `@layer`. `global.css` combines them with explicit ordering:

```
@layer primitive, semantic, prefers;
```

Sub-layers: `primitive.color`, `primitive.dimension`, `primitive.font-family`, `semantic.radius`, `semantic.typography`, `prefers.scheme`, `prefers.contrast`.

## Scheme tokens

Scheme tokens use `--felt-*-on-light` / `--felt-*-on-dark` naming with `light-dark()` resolution:

```css
--felt-color-text-default-on-light: var(--felt-color-neutral-gray-900);
--felt-color-text-default-on-dark: var(--felt-color-neutral-gray-100);
--felt-color-text-default: light-dark(var(--felt-color-text-default-on-light), var(--felt-color-text-default-on-dark));
```

## Density vs preferences

- **Preferences** (`src/prefers/`) respond to OS settings via `@media` queries. Included in `global.css`.
- **Density** (`src/density/`) are opt-in overrides loaded separately after `global.css`.

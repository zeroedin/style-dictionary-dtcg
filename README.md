# Felt Design Tokens

Design tokens using [Style Dictionary](https://styledictionary.com/) v5 with the [DTCG](https://tr.designtokens.org/format/) format. Source files are YAML.

## Setup

```
npm install
```

## Build

```
npm run build
```

## Token structure

```
src/
├── primitive/           # Raw values — no references, no intent
│   ├── color.yaml       # Brand and neutral palette
│   ├── font-family.yaml # Font stacks (body, heading, code)
│   └── size/
│       ├── spacing.yaml      # Spacing scale (xs–2xl)
│       ├── radius.yaml       # Border radius scale (none–full)
│       ├── border-width.yaml # Border width scale (xs–xl)
│       └── font-size.yaml    # Font size scales (body-text, heading, code)
├── semantic/            # Structural intent — references primitives
│   ├── container.yaml   # Container border and corner tokens
│   └── typography.yaml  # Typographic hierarchy (title–caption)
└── scheme/              # Color scheme (light/dark)
    └── scheme.yaml      # Light/dark via light-dark() and color-scheme
```

## Pipeline

```
pipeline/
├── parser.js            # YAML parser registration
├── shared.js            # Common source globs and config
├── formats.js           # Custom SD formats (css/layer, css/scheme)
├── css/
│   ├── primitive.js     # Primitives → per-file CSS with @layer
│   ├── semantic.js      # Semantics → per-concern CSS with @layer
│   ├── scheme.js        # Scheme → CSS with light-dark() combos
│   └── post-process.js  # Assembles global.css
└── js/
    └── tokens.js        # All tokens → single ESM export
```

## Layers

Each CSS file declares its own `@layer`. `global.css` combines them with explicit ordering:

```
@layer primitive, semantic, scheme;
```

Sub-layers: `primitive.color`, `primitive.font-family`, `primitive.size.spacing`, `primitive.size.radius`, `primitive.size.border-width`, `primitive.size.font`, `semantic.container`, `semantic.typography`, `scheme`.

## Scheme tokens

Scheme tokens use `--felt-*-on-light` / `--felt-*-on-dark` naming with `light-dark()` resolution:

```css
--felt-color-text-default-on-light: var(--felt-color-neutral-gray-900);
--felt-color-text-default-on-dark: var(--felt-color-neutral-gray-100);
--felt-color-text-default: light-dark(var(--felt-color-text-default-on-light), var(--felt-color-text-default-on-dark));
```

## Output

```
build/
├── css/
│   ├── global.css                       # Combined file with @layer ordering
│   ├── primitive/
│   │   ├── color.css                    # @layer primitive.color
│   │   ├── font-family.css              # @layer primitive.font-family
│   │   └── size/
│   │       ├── spacing.css              # @layer primitive.size.spacing
│   │       ├── radius.css               # @layer primitive.size.radius
│   │       ├── border-width.css         # @layer primitive.size.border-width
│   │       └── font-size.css            # @layer primitive.size.font
│   ├── semantic/
│   │   ├── container.css                # @layer semantic.container
│   │   └── typography.css               # @layer semantic.typography
│   └── scheme/
│       └── scheme.css                   # @layer scheme
└── js/
    └── tokens.js                        # All tokens ESM export
```

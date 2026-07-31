import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';

const primitiveSource = ['src/primitive/**/*.json'];
const semanticSource = ['src/semantic/**/*.json'];
const schemeSource = ['src/scheme/**/*.json'];

const base = new StyleDictionary({
  source: [...primitiveSource, ...semanticSource],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      prefix: 'rh',
      files: [
        {
          destination: 'primitives.css',
          format: formats.cssVariables,
          filter: (token) => token.filePath.includes('src/primitive/'),
        },
        {
          destination: 'semantic.css',
          format: formats.cssVariables,
          filter: (token) => token.filePath.includes('src/semantic/'),
          options: {
            outputReferences: true,
          },
        },
      ],
    },
    js: {
      transformGroup: transformGroups.js,
      buildPath: 'build/js/',
      prefix: 'rh',
      files: [
        {
          destination: 'tokens.js',
          format: formats.javascriptEsm,
        },
      ],
    },
  },
});

const scheme = new StyleDictionary({
  source: [...primitiveSource, ...schemeSource],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      prefix: 'rh',
      files: [
        {
          destination: 'scheme.css',
          format: formats.cssVariables,
          filter: (token) => token.filePath.includes('src/scheme/'),
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
  },
});

await base.buildAllPlatforms();
await scheme.buildAllPlatforms();

import { readFileSync, writeFileSync } from 'node:fs';
const schemePath = 'build/css/scheme.css';
const css = readFileSync(schemePath, 'utf8');

const varPattern = /--([\w-]+)-on-light/g;
const semanticNames = new Set();
for (const match of css.matchAll(varPattern)) {
  semanticNames.add(match[1]);
}

const lightDarkVars = [...semanticNames]
  .map(
    (name) =>
      `  --${name}: light-dark(var(--${name}-on-light), var(--${name}-on-dark));`,
  )
  .join('\n');

const patched = css.replace(
  ':root {',
  `:root {\n  color-scheme: light dark;\n`,
);
const closed = patched.replace(/\n}\n$/, `\n\n${lightDarkVars}\n}\n`);

writeFileSync(schemePath, closed);

const primitivesCss = readFileSync('build/css/primitives.css', 'utf8');
const semanticCss = readFileSync('build/css/semantic.css', 'utf8');
const schemeCss = readFileSync(schemePath, 'utf8');

const stripHeader = (s) => s.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');
const unwrapRoot = (s) => stripHeader(s).replace(/^:root \{\n/, '').replace(/\n}\n?$/, '');

writeFileSync(
  'build/css/global.css',
  `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n:root {\n${unwrapRoot(primitivesCss)}\n\n${unwrapRoot(semanticCss)}\n\n${unwrapRoot(schemeCss)}\n}\n`,
);

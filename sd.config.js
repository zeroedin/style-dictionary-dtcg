import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';

const primitiveSource = ['src/primitive/**/*.json'];
const semanticSource = ['src/semantic/**/*.json'];
const prefersSource = ['src/prefers/**/*.json'];

const jsOutput = {
  transformGroup: transformGroups.js,
  buildPath: 'build/js/',
  prefix: 'felt',
};

const base = new StyleDictionary({
  source: [...primitiveSource, ...semanticSource],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      prefix: 'felt',
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
      ...jsOutput,
      files: [
        {
          destination: 'tokens.js',
          format: formats.javascriptEsm,
        },
      ],
    },
  },
});

const prefersFilter = (token) => token.filePath.includes('src/prefers/');

const scheme = new StyleDictionary({
  source: [...primitiveSource, 'src/prefers/scheme.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      prefix: 'felt',
      files: [
        {
          destination: 'scheme.css',
          format: formats.cssVariables,
          filter: prefersFilter,
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
    js: {
      ...jsOutput,
      files: [
        {
          destination: 'scheme.js',
          format: formats.javascriptEsm,
          filter: prefersFilter,
        },
      ],
    },
  },
});

const contrast = new StyleDictionary({
  source: [...primitiveSource, ...semanticSource, 'src/prefers/contrast.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      prefix: 'felt',
      files: [
        {
          destination: 'contrast.css',
          format: formats.cssVariables,
          filter: prefersFilter,
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
    js: {
      ...jsOutput,
      files: [
        {
          destination: 'contrast.js',
          format: formats.javascriptEsm,
          filter: prefersFilter,
        },
      ],
    },
  },
});

const themeFilter = (token) => token.filePath.includes('src/theme/');

const compact = new StyleDictionary({
  source: [...primitiveSource, ...semanticSource, 'src/theme/compact.json'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/theme/',
      prefix: 'felt',
      files: [
        {
          destination: 'compact.css',
          format: formats.cssVariables,
          filter: themeFilter,
          options: {
            outputReferences: true,
            selector: ':root',
          },
        },
      ],
    },
    js: {
      ...jsOutput,
      buildPath: 'build/js/theme/',
      files: [
        {
          destination: 'compact.js',
          format: formats.javascriptEsm,
          filter: themeFilter,
        },
      ],
    },
  },
});

await base.buildAllPlatforms();
await scheme.buildAllPlatforms();
await contrast.buildAllPlatforms();
await compact.buildAllPlatforms();

const contrastPath = 'build/css/contrast.css';
const contrastCss = readFileSync(contrastPath, 'utf8');
const contrastLines = contrastCss.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');
const indented = contrastLines
  .split('\n')
  .map((line) => (line.trim() ? '  ' + line : line))
  .join('\n');
const contrastPatched = `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n@media (prefers-contrast: more) {\n${indented}}\n`;
writeFileSync(contrastPath, contrastPatched);

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

const contrastFinal = readFileSync(contrastPath, 'utf8');

writeFileSync(
  'build/css/global.css',
  `/**\n * Do not edit directly, this file was auto-generated.\n */\n\n:root {\n${unwrapRoot(primitivesCss)}\n\n${unwrapRoot(semanticCss)}\n\n${unwrapRoot(schemeCss)}\n}\n\n${stripHeader(contrastFinal)}`,
);

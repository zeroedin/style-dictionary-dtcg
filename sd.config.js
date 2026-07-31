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
          destination: 'primitive/color.css',
          format: formats.cssVariables,
          filter: (token) => token.filePath === 'src/primitive/color.json',
        },
        {
          destination: 'primitive/dimension.css',
          format: formats.cssVariables,
          filter: (token) => token.filePath === 'src/primitive/dimension.json',
        },
        {
          destination: 'primitive/font-family.css',
          format: formats.cssVariables,
          filter: (token) => token.filePath === 'src/primitive/font-family.json',
        },
        {
          destination: 'semantic/radius.css',
          format: formats.cssVariables,
          filter: (token) =>
            token.filePath.includes('src/semantic/') && token.path[0] === 'radius',
          options: { outputReferences: true },
        },
        {
          destination: 'semantic/typography.css',
          format: formats.cssVariables,
          filter: (token) =>
            token.filePath.includes('src/semantic/') && token.path[0] !== 'radius',
          options: { outputReferences: true },
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

import { readFileSync, writeFileSync } from 'node:fs';

const header = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
const read = (f) => readFileSync(f, 'utf8');
const stripHeader = (s) => s.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');
const getRoot = (s) => stripHeader(s).replace(/^:root \{\n/, '').replace(/\n}\n?$/, '').trim();
const indent = (s, n) =>
  s
    .split('\n')
    .map((l) => (l.trim() ? '  '.repeat(n) + l.trim() : ''))
    .join('\n');

function wrapFile(filePath, layerName) {
  const raw = read(filePath);
  const vars = getRoot(raw);
  const content = `${header}@layer ${layerName} {\n  :root {\n${indent(vars, 2)}\n  }\n}\n`;
  writeFileSync(filePath, content);
  return content;
}

wrapFile('build/css/primitive/color.css', 'primitive.color');
wrapFile('build/css/primitive/dimension.css', 'primitive.dimension');
wrapFile('build/css/primitive/font-family.css', 'primitive.font-family');
wrapFile('build/css/semantic/radius.css', 'semantic.radius');
wrapFile('build/css/semantic/typography.css', 'semantic.typography');

const schemePath = 'build/css/scheme.css';
const schemeRaw = read(schemePath);
const schemeVars = getRoot(schemeRaw);
const varPattern = /--([\w-]+)-on-light/g;
const semanticNames = new Set();
for (const match of schemeRaw.matchAll(varPattern)) {
  semanticNames.add(match[1]);
}
const lightDarkVars = [...semanticNames]
  .map(
    (name) =>
      `--${name}: light-dark(var(--${name}-on-light), var(--${name}-on-dark));`,
  )
  .join('\n');
const schemeContent = `${header}@layer prefers.scheme {\n  :root {\n${indent('color-scheme: light dark;\n' + schemeVars + '\n\n' + lightDarkVars, 2)}\n  }\n}\n`;
writeFileSync(schemePath, schemeContent);

const contrastPath = 'build/css/contrast.css';
const contrastVars = getRoot(read(contrastPath));
const contrastContent = `${header}@layer prefers.contrast {\n  @media (prefers-contrast: more) {\n    :root {\n${indent(contrastVars, 3)}\n    }\n  }\n}\n`;
writeFileSync(contrastPath, contrastContent);

const globalParts = [
  'build/css/primitive/color.css',
  'build/css/primitive/dimension.css',
  'build/css/primitive/font-family.css',
  'build/css/semantic/radius.css',
  'build/css/semantic/typography.css',
  schemePath,
  contrastPath,
].map((f) => stripHeader(read(f)));

writeFileSync(
  'build/css/global.css',
  `${header}@layer primitive, semantic, prefers;\n\n${globalParts.join('\n')}`
);

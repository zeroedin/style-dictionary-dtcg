import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource, semanticSource, jsOutput } from '../shared.js';

const contrastFilter = (token) => token.filePath.includes('src/prefers/contrast.yaml');
const densityFilter = (token) => token.filePath.includes('src/density/');

export const js = new StyleDictionary({
  ...parserConfig,
  source: [
    ...primitiveSource,
    ...semanticSource,
    'src/prefers/**/*.yaml',
    'src/density/**/*.yaml',
  ],
  platforms: {
    tokens: {
      ...jsOutput,
      files: [
        {
          destination: 'tokens.js',
          format: formats.javascriptEsm,
          filter: (token) => !contrastFilter(token) && !densityFilter(token),
        },
      ],
    },
    prefers: {
      ...jsOutput,
      buildPath: 'build/js/prefers/',
      files: [
        {
          destination: 'scheme.js',
          format: formats.javascriptEsm,
          filter: (token) => token.filePath.includes('src/prefers/scheme.yaml'),
        },
        {
          destination: 'contrast.js',
          format: formats.javascriptEsm,
          filter: (token) => token.filePath.includes('src/prefers/contrast.yaml'),
        },
      ],
    },
    density: {
      ...jsOutput,
      buildPath: 'build/js/density/',
      files: [
        {
          destination: 'compact.js',
          format: formats.javascriptEsm,
          filter: densityFilter,
        },
      ],
    },
  },
});

import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource, semanticSource, jsOutput } from '../shared.js';

export const js = new StyleDictionary({
  ...parserConfig,
  source: [
    ...primitiveSource,
    ...semanticSource,
    'tokens/scheme/**/*.yaml',
  ],
  platforms: {
    js: {
      ...jsOutput,
      files: [
        {
          destination: 'tokens.js',
          format: formats.javascriptEsm,
        },
      ],
    },
    json: {
      ...jsOutput,
      buildPath: './json/',
      files: [
        {
          destination: 'tokens.json',
          format: formats.json,
        },
      ],
    },
  },
});

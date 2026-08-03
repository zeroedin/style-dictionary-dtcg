import StyleDictionary from 'style-dictionary';
import { formats, transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource, semanticSource, jsOutput } from '../shared.js';

export const js = new StyleDictionary({
  ...parserConfig,
  source: [
    ...primitiveSource,
    ...semanticSource,
    'src/scheme/**/*.yaml',
  ],
  platforms: {
    tokens: {
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

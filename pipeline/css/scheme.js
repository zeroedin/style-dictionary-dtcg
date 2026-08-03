import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource } from '../shared.js';
import '../formats.js';

const schemeFilter = (token) => token.filePath.includes('src/scheme/');

export const scheme = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource, 'src/scheme/scheme.yaml'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/scheme/',
      prefix: 'felt',
      files: [
        {
          destination: 'scheme.css',
          format: 'css/scheme',
          filter: schemeFilter,
          options: { layerName: 'scheme' },
        },
      ],
    },
  },
});

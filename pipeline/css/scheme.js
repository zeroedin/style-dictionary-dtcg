import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource } from '../shared.js';
import '../formats.js';

const prefersFilter = (token) => token.filePath.includes('src/prefers/');

export const scheme = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource, 'src/prefers/scheme.yaml'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/prefers/',
      prefix: 'felt',
      files: [
        {
          destination: 'scheme.css',
          format: 'css/scheme',
          filter: prefersFilter,
          options: { layerName: 'prefers.scheme' },
        },
      ],
    },
  },
});

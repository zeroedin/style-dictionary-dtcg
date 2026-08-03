import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource } from '../shared.js';
import '../formats.js';

export const scheme = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource, 'src/scheme/**/*.yaml'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/scheme/',
      prefix: 'felt',
      files: [
        {
          destination: 'text.css',
          format: 'css/scheme',
          filter: (token) => token.path[1] === 'text',
          options: { layerName: 'scheme.text' },
        },
        {
          destination: 'surface.css',
          format: 'css/scheme',
          filter: (token) => token.path[1] === 'surface',
          options: { layerName: 'scheme.surface' },
        },
        {
          destination: 'border.css',
          format: 'css/scheme',
          filter: (token) => token.path[1] === 'border',
          options: { layerName: 'scheme.border' },
        },
        {
          destination: 'action.css',
          format: 'css/scheme',
          filter: (token) => token.path[1] === 'action',
          options: { layerName: 'scheme.action' },
        },
      ],
    },
  },
});

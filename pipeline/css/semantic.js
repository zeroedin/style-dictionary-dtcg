import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { prefix, primitiveSource, semanticSource } from '../shared.js';
import '../formats.js';

const semanticFilter = (token) => token.filePath.includes('tokens/semantic/');

export const semantic = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource, ...semanticSource],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: './css/',
      prefix,
      files: [
        {
          destination: 'semantic/container.css',
          format: 'css/layer',
          filter: (token) => semanticFilter(token) && token.path[0] === 'container',
          options: { layerName: 'semantic.container' },
        },
        {
          destination: 'semantic/typography.css',
          format: 'css/layer',
          filter: (token) => semanticFilter(token) && token.path[0] !== 'container',
          options: { layerName: 'semantic.typography' },
        },
      ],
    },
  },
});

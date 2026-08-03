import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource, semanticSource } from '../shared.js';
import '../formats.js';

const densityFilter = (token) => token.filePath.includes('src/density/');

export const compact = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource, ...semanticSource, 'src/density/compact.yaml'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/density/',
      prefix: 'felt',
      files: [
        {
          destination: 'compact.css',
          format: 'css/layer',
          filter: densityFilter,
          options: { layerName: 'density.compact' },
        },
      ],
    },
  },
});

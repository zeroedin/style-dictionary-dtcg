import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource } from '../shared.js';
import '../formats.js';

export const primitive = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/',
      prefix: 'felt',
      files: [
        {
          destination: 'primitive/color.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/color.yaml',
          options: { layerName: 'primitive.color' },
        },
        {
          destination: 'primitive/dimension.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/dimension.yaml',
          options: { layerName: 'primitive.dimension' },
        },
        {
          destination: 'primitive/font-family.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/font-family.yaml',
          options: { layerName: 'primitive.font-family' },
        },
      ],
    },
  },
});

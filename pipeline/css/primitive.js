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
          destination: 'primitive/font-family.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/font-family.yaml',
          options: { layerName: 'primitive.font-family' },
        },
        {
          destination: 'primitive/size/spacing.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/size/spacing.yaml',
          options: { layerName: 'primitive.size.spacing' },
        },
        {
          destination: 'primitive/size/radius.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/size/radius.yaml',
          options: { layerName: 'primitive.size.radius' },
        },
        {
          destination: 'primitive/size/border-width.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/size/border-width.yaml',
          options: { layerName: 'primitive.size.border-width' },
        },
        {
          destination: 'primitive/size/font.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'src/primitive/size/font.yaml',
          options: { layerName: 'primitive.size.font' },
        },
      ],
    },
  },
});

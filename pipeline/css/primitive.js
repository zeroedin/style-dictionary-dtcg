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
      buildPath: './css/',
      prefix: 'felt',
      files: [
{
          destination: 'primitive/color/gray.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/color/gray.yaml',
          options: { layerName: 'primitive.color.gray' },
        },
        {
          destination: 'primitive/color/blue.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/color/blue.yaml',
          options: { layerName: 'primitive.color.blue' },
        },
        {
          destination: 'primitive/color/red-orange.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/color/red-orange.yaml',
          options: { layerName: 'primitive.color.red-orange' },
        },
        {
          destination: 'primitive/color/red.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/color/red.yaml',
          options: { layerName: 'primitive.color.red' },
        },
        {
          destination: 'primitive/font-family.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/font-family.yaml',
          options: { layerName: 'primitive.font-family' },
        },
        {
          destination: 'primitive/size/spacing.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/size/spacing.yaml',
          options: { layerName: 'primitive.size.spacing' },
        },
        {
          destination: 'primitive/size/radius.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/size/radius.yaml',
          options: { layerName: 'primitive.size.radius' },
        },
        {
          destination: 'primitive/size/border-width.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/size/border-width.yaml',
          options: { layerName: 'primitive.size.border-width' },
        },
        {
          destination: 'primitive/size/font.css',
          format: 'css/layer',
          filter: (token) => token.filePath === 'tokens/primitive/size/font.yaml',
          options: { layerName: 'primitive.size.font' },
        },
      ],
    },
  },
});

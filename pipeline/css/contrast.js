import StyleDictionary from 'style-dictionary';
import { transformGroups } from 'style-dictionary/enums';
import { parserConfig } from '../parser.js';
import { primitiveSource, semanticSource } from '../shared.js';
import '../formats.js';

const prefersFilter = (token) => token.filePath.includes('src/prefers/');

export const contrast = new StyleDictionary({
  ...parserConfig,
  source: [...primitiveSource, ...semanticSource, 'src/prefers/contrast.yaml'],
  platforms: {
    css: {
      transformGroup: transformGroups.css,
      buildPath: 'build/css/prefers/',
      prefix: 'felt',
      files: [
        {
          destination: 'contrast.css',
          format: 'css/layer-media',
          filter: prefersFilter,
          options: {
            layerName: 'prefers.contrast',
            mediaQuery: '@media (prefers-contrast: more)',
          },
        },
      ],
    },
  },
});

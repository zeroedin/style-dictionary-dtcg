import { transformGroups } from 'style-dictionary/enums';

export const primitiveSource = ['tokens/primitive/**/*.yaml'];
export const semanticSource = ['tokens/semantic/**/*.yaml'];

export const prefix = 'felt';

export const jsOutput = {
  transformGroup: transformGroups.js,
  buildPath: './js/',
  prefix,
};

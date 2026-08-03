import { transformGroups } from 'style-dictionary/enums';

export const primitiveSource = ['src/primitive/**/*.yaml'];
export const semanticSource = ['src/semantic/**/*.yaml'];

export const jsOutput = {
  transformGroup: transformGroups.js,
  buildPath: 'build/js/',
  prefix: 'felt',
};

import StyleDictionary from 'style-dictionary';
import { parse } from 'yaml';

StyleDictionary.registerParser({
  name: 'yaml',
  pattern: /\.ya?ml$/,
  parser: ({ contents }) => parse(contents),
});

export const parserConfig = { parsers: ['yaml'] };

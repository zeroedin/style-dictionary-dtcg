import StyleDictionary from 'style-dictionary';

const header = [
  '/**',
  ' * Do not edit directly, this file was auto-generated.',
  ' */',
].join('\n');

function resolveValue(token, dictionary) {
  const ref = dictionary.unfilteredTokenMap.get(token.original.$value);
  return ref ? `var(--${ref.name})` : token.$value;
}

StyleDictionary.registerFormat({
  name: 'css/layer',
  format: ({ dictionary, options }) => {
    const { layerName } = options;
    const vars = dictionary.allTokens
      .map((token) => `    --${token.name}: ${resolveValue(token, dictionary)};`)
      .join('\n');

    return `${header}\n\n@layer ${layerName} {\n  :root {\n${vars}\n  }\n}\n`;
  },
});

StyleDictionary.registerFormat({
  name: 'css/scheme',
  format: ({ dictionary, options }) => {
    const { layerName } = options;
    const vars = [];
    const combos = new Map();

    for (const token of dictionary.allTokens) {
      vars.push(`    --${token.name}: ${resolveValue(token, dictionary)};`);

      if (token.name.endsWith('-on-light')) {
        const base = token.name.replace(/-on-light$/, '');
        if (!combos.has(base)) combos.set(base, {});
        combos.get(base).light = token.name;
      } else if (token.name.endsWith('-on-dark')) {
        const base = token.name.replace(/-on-dark$/, '');
        if (!combos.has(base)) combos.set(base, {});
        combos.get(base).dark = token.name;
      }
    }

    const comboVars = [...combos.entries()]
      .filter(([, v]) => v.light && v.dark)
      .map(
        ([base, v]) =>
          `    --${base}: light-dark(var(--${v.light}), var(--${v.dark}));`,
      );

    const body = [
      '    color-scheme: light dark;',
      '',
      ...vars,
      '',
      ...comboVars,
    ].join('\n');

    return `${header}\n\n@layer ${layerName} {\n  :root {\n${body}\n  }\n}\n`;
  },
});

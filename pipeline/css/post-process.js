import { readFileSync, writeFileSync } from 'node:fs';

const header = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
const read = (f) => readFileSync(f, 'utf8');
const stripHeader = (s) => s.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');

export function postProcess() {
  const parts = [
    'build/css/primitive/color.css',
    'build/css/primitive/font-family.css',
    'build/css/primitive/size/spacing.css',
    'build/css/primitive/size/radius.css',
    'build/css/primitive/size/border-width.css',
    'build/css/primitive/size/font-size.css',
    'build/css/semantic/container.css',
    'build/css/semantic/typography.css',
    'build/css/prefers/scheme.css',
    'build/css/prefers/contrast.css',
  ].map((f) => stripHeader(read(f)));

  writeFileSync(
    'build/css/global.css',
    `${header}@layer primitive, semantic, prefers;\n\n${parts.join('\n')}`,
  );
}

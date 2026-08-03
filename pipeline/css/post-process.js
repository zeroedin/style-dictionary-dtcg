import { readFileSync, writeFileSync } from 'node:fs';

const header = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
const read = (f) => readFileSync(f, 'utf8');
const stripHeader = (s) => s.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');

export function postProcess() {
  const parts = [
'./css/primitive/color/gray.css',
    './css/primitive/color/blue.css',
    './css/primitive/color/red-orange.css',
    './css/primitive/color/red.css',
    './css/primitive/font-family.css',
    './css/primitive/size/spacing.css',
    './css/primitive/size/radius.css',
    './css/primitive/size/border-width.css',
    './css/primitive/size/font.css',
    './css/semantic/container.css',
    './css/semantic/typography.css',
    './css/scheme/text.css',
    './css/scheme/surface.css',
    './css/scheme/border.css',
    './css/scheme/interactive.css',
  ].map((f) => stripHeader(read(f)));

  writeFileSync(
    './css/global.css',
    `${header}@layer primitive, semantic, scheme;\n\n${parts.join('\n')}`,
  );
}

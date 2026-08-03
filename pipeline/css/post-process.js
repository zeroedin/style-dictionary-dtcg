import { readFileSync, writeFileSync } from 'node:fs';

const header = '/**\n * Do not edit directly, this file was auto-generated.\n */\n\n';
const read = (f) => readFileSync(f, 'utf8');
const stripHeader = (s) => s.replace(/\/\*\*[\s\S]*?\*\/\n\n/, '');

export function postProcess() {
  const parts = [
    'build/css/primitive/color/brand.css',
'build/css/primitive/color/gray.css',
    'build/css/primitive/color/blue.css',
    'build/css/primitive/color/red-orange.css',
    'build/css/primitive/color/red.css',
    'build/css/primitive/font-family.css',
    'build/css/primitive/size/spacing.css',
    'build/css/primitive/size/radius.css',
    'build/css/primitive/size/border-width.css',
    'build/css/primitive/size/font.css',
    'build/css/semantic/container.css',
    'build/css/semantic/typography.css',
    'build/css/scheme/text.css',
    'build/css/scheme/surface.css',
    'build/css/scheme/border.css',
    'build/css/scheme/action.css',
  ].map((f) => stripHeader(read(f)));

  writeFileSync(
    'build/css/global.css',
    `${header}@layer primitive, semantic, scheme;\n\n${parts.join('\n')}`,
  );
}

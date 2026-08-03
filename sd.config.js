import { primitive } from './pipeline/css/primitive.js';
import { semantic } from './pipeline/css/semantic.js';
import { scheme } from './pipeline/css/scheme.js';
import { postProcess } from './pipeline/css/post-process.js';
import { js } from './pipeline/js/tokens.js';

await primitive.buildAllPlatforms();
await semantic.buildAllPlatforms();
await scheme.buildAllPlatforms();
await js.buildAllPlatforms();

postProcess();

---
title: Token Demo
layout: default
---

# Felt Design Tokens

A demo of the token system in action. Toggle your OS between light and dark mode to see `light-dark()` at work.

## Color Palette

### Gray

<div class="swatch-grid">
  <div class="swatch" style="--background: var(--felt-color-gray-10, #f2f2f2);"><span>gray-10</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-20, #e0e0e0);"><span>gray-20</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-30, #c7c7c7);"><span>gray-30</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-40, #a3a3a3);"><span>gray-40</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-45, #8c8c8c);"><span>gray-45</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-50, #707070);"><span>gray-50</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-60, #4d4d4d);"><span>gray-60</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-70, #383838);"><span>gray-70</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-80, #292929);"><span>gray-80</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-90, #1f1f1f);"><span>gray-90</span></div>
  <div class="swatch" style="--background: var(--felt-color-gray-95, #151515);"><span>gray-95</span></div>
</div>

### Red

<div class="swatch-grid">
  <div class="swatch" style="--background: var(--felt-color-red-05, #fef0f0);"><span>red-05</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-10, #fce3e3);"><span>red-10</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-20, #fbc5c5);"><span>red-20</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-30, #f9a8a8);"><span>red-30</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-40, #f56e6e);"><span>red-40</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-50, #ee0000);"><span>red-50</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-60, #a60000);"><span>red-60</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-70, #5f0000);"><span>red-70</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-80, #3f0000);"><span>red-80</span></div>
</div>

### Blue

<div class="swatch-grid">
  <div class="swatch" style="--background: var(--felt-color-blue-10, #e0f0ff);"><span>blue-10</span></div>
  <div class="swatch" style="--background: var(--felt-color-blue-20, #b9dafc);"><span>blue-20</span></div>
  <div class="swatch" style="--background: var(--felt-color-blue-30, #92c5f9);"><span>blue-30</span></div>
  <div class="swatch" style="--background: var(--felt-color-blue-40, #4394e5);"><span>blue-40</span></div>
  <div class="swatch" style="--background: var(--felt-color-blue-50, #0066cc);"><span>blue-50</span></div>
  <div class="swatch" style="--background: var(--felt-color-blue-60, #004d99);"><span>blue-60</span></div>
  <div class="swatch" style="--background: var(--felt-color-blue-70, #003366);"><span>blue-70</span></div>
</div>

### Red Orange

<div class="swatch-grid">
  <div class="swatch" style="--background: var(--felt-color-red-orange-10, #ffe3d9);"><span>red-orange-10</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-orange-20, #fbbea8);"><span>red-orange-20</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-orange-30, #f89b78);"><span>red-orange-30</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-orange-40, #f4784a);"><span>red-orange-40</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-orange-50, #f0561d);"><span>red-orange-50</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-orange-60, #b1380b);"><span>red-orange-60</span></div>
  <div class="swatch" style="--background: var(--felt-color-red-orange-70, #731f00);"><span>red-orange-70</span></div>
</div>

## Typography Scale

<div class="type-scale">
  <div>
    <span class="label">h1 — title</span>
    <h1>The quick brown fox</h1>
  </div>
  <div>
    <span class="label">h2 — subtitle</span>
    <h2>The quick brown fox</h2>
  </div>
  <div>
    <span class="label">h3 — heading</span>
    <h3>The quick brown fox</h3>
  </div>
  <div>
    <span class="label">h4 — subheading</span>
    <h4>The quick brown fox</h4>
  </div>
  <div>
    <span class="label">p — body-text</span>
    <p>The quick brown fox jumps over the lazy dog</p>
  </div>
  <div>
    <span class="label">caption</span>
    <p style="font-size: var(--felt-typography-caption, 14px);">The quick brown fox jumps over the lazy dog</p>
  </div>
  <div>
    <span class="label">code</span>
    <code>const token = 'felt';</code>
  </div>
</div>

## Scheme Colors

<div class="card">
  <h3>Surface & Text</h3>
  <p>This card uses <code>--felt-color-surface-subtle</code> for the background, <code>--felt-color-text-default</code> for heading text, and <code>--felt-color-text-secondary</code> for body text. Switch your OS theme to see them adapt.</p>
</div>

## Container Tokens

<div class="container-demo">
  <div class="container-shape" data-corner="sharp">sharp</div>
  <div class="container-shape" data-corner="subtle">subtle</div>
  <div class="container-shape" data-corner="default">default</div>
  <div class="container-shape" data-corner="round">round</div>
  <div class="container-shape" data-corner="pill">pill</div>
</div>

## Interactive

<felt-cta href="#">Learn more</felt-cta>
<felt-cta variant="primary" href="#">Primary</felt-cta>
<felt-cta variant="secondary" href="#">Secondary</felt-cta>
<felt-cta variant="tertiary" href="#">Tertiary</felt-cta>

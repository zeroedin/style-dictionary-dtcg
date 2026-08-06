import { LitElement, html, css } from 'lit';

class FeltCta extends LitElement {
  static properties = {
    href: { type: String },
    variant: { type: String, reflect: true },
  };

  static styles = css`
    :host {
      display: inline-block;
    }
    #container {
      & a {
        padding: var(--felt-spacing-sm, 8px) var(--felt-spacing-lg, 24px);
        border-radius: var(--felt-container-corner-pill, 9999px);
        font-family: var(--felt-font-family-body, 'Red Hat Text', Helvetica Neue, Helvetica, Arial, sans-serif);
        font-size: var(--felt-typography-body-text, 16px);
        text-decoration: none;
        cursor: pointer;
        border: var(--felt-container-border-default, 3px) solid transparent;
      }

      &.default a {
        background: transparent;
        color: var(--felt-color-interactive-primary-default, light-dark(var(--felt-color-interactive-primary-default-on-light, #0066cc), var(--felt-color-interactive-primary-default-on-dark, #92c5f9)));
        border-color: transparent;
        padding-inline: 0;

        &::after {
          content: ' \\2192';
        }

        &:hover {
          text-decoration: underline;
        }
      }

      &.primary a {
        background: var(--felt-color-text-brand, light-dark(var(--felt-color-text-brand-on-light, #ee0000), var(--felt-color-text-brand-on-dark, #ee0000)));
        color: var(--felt-color-white, #ffffff);

        &:hover {
          background: var(--felt-color-red-60, #a60000);
        }
      }

      &.secondary a {
        background: transparent;
        border-width: var(--felt-container-border-thin, 1px);
        color: var(--felt-color-text-primary, light-dark(var(--felt-color-text-primary-on-light, #151515), var(--felt-color-text-primary-on-dark, #ffffff)));
        border-color: var(--felt-color-text-primary, light-dark(var(--felt-color-text-primary-on-light, #151515), var(--felt-color-text-primary-on-dark, #ffffff)));

        &:hover {
          background: var(--felt-color-surface-subtle, light-dark(#f2f2f2, #292929));
        }
      }

      &.tertiary a {
        background: transparent;
        border-width: var(--felt-container-border-thin, 1px);
        color: var(--felt-color-interactive-primary-default, light-dark(var(--felt-color-interactive-primary-default-on-light, #0066cc), var(--felt-color-interactive-primary-default-on-dark, #92c5f9)));
        border-color: var(--felt-color-border-subtle, light-dark(var(--felt-color-border-subtle-on-light, #e0e0e0), var(--felt-color-border-subtle-on-dark, #292929)));

        &:hover {
          background: var(--felt-color-surface-subtle, light-dark(#f2f2f2, #292929));
        }
      }
    }
  `;

  constructor() {
    super();
    this.href = '#';
    this.variant = 'default';
  }

  render() {
    return html`
      <div id="container" class=${this.variant}>
        <a href=${this.href}><slot></slot></a>
      </div>
    `;
  }
}

customElements.define('felt-cta', FeltCta);

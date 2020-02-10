import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';

/**
 * `privacy-page`
 * Legal stuffs
 *
 * @customElement
 */
export class PrivacyPage extends LitElement {
/** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
        }
      `;

    return [sharedStyles, style];
  }

  /**
 * Defined the elements content
 * @return {TemplateResult} the resulting html template
 */
  render() {
    return html`
      <h1>Privacy Policy</h1>
    `;
  }
}

window.customElements.define('privacy-page', PrivacyPage);

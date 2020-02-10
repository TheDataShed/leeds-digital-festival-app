import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';

/**
 * `terms-page`
 * Legal stuffs
 *
 * @customElement
 */
export class TermsPage extends LitElement {
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
      <h1>Terms and Conditions</h1>
    `;
  }
}

window.customElements.define('terms-page', TermsPage);

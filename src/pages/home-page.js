import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';

/**
 * `home-page`
 * Page as the home of the website
 *
 * @customElement
 */
export class HomePage extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
        }
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
      <h1> HOME </h1>
    `;
  }
}

window.customElements.define('home-page', HomePage);

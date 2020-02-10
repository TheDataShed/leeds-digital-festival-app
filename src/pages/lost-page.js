import { LitElement, html, css } from 'lit-element/lit-element';


/**
 * `lost-page`
 * Show if someone is lost
 *
 * @customElement
 */
export class LostPage extends LitElement {
/** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
          padding: 10px 20px;
        }
      `;

    return [style];
  }

  /**
 * Defined the elements content
 * @return {TemplateResult} the resulting html template
 */
  render() {
    return html`
      <h2>Oops you hit a 404. <a href="/">Head back to home.</a></h2>
    `;
  }
}

window.customElements.define('lost-page', LostPage);

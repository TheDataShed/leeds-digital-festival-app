import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import 'wc-spinners/dist/flower-spinner';
/**
 * `loading-display`
 * Wrapper to display message while loading
 *
 * @customElement
 */
export class LoadingDisplay extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: flex;
        }

        .wrapper {
            display: flex;
            padding: 10px;
            margin: auto;
        }

        flower-spinner {
            --flower-spinner__color: var(--pink-color);
            --flower-spinner__size: 60px;
        }

        p {
            margin: auto auto auto 1em;
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
        <div class="wrapper">
            <flower-spinner></flower-spinner>
            <p class="label">${this.label}</p>
        </div>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The text to display */
      label: { type: String },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.label = 'Loading Data...';
  }
}

window.customElements.define('loading-display', LoadingDisplay);

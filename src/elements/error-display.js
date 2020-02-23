import { LitElement, html, css } from 'lit-element/lit-element';
import '@material/mwc-icon';
import { sharedStyles } from '../shared-styles';
/**
 * `error-display`
 * Wrapper to display message if theres an error
 *
 * @customElement
 */
export class ErrorDisplay extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: flex;
        }

        .wrapper {
          display: flex;
          padding: 10px;
          color: var(--error-color);
          margin: auto;
        }

        p {
            margin: auto auto auto 1em;
            text-align: left;
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
            <mwc-icon>warning</mwc-icon>
            <p class="label">${this.label}, please try again.</p>
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
    this.label = 'Ooops, an error has occurred';
  }
}

window.customElements.define('error-display', ErrorDisplay);

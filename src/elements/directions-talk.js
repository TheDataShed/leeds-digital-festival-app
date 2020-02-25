import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import '@material/mwc-icon-button';

/**
 * `directions-talk`
 * Handle directions to a talk
 *
 * @customElement
 */
export class DirectionsTalk extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
            display: block;
        }

        mwc-icon-button {
            --mdc-icon-size: var(--icon-size, 24px);
            --mdc-icon-button-size: var(--button-size, 48px);
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
      <a href="${this.directionsLink}" target="_blank" rel="noreferrer">
        <mwc-icon-button icon="place"></mwc-icon-button>
      </a>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The talk information */
      talk: { type: Object },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.talk = {};
  }

  /**
     * Construct a link to directions
     * Using apple maps as https://stackoverflow.com/questions/18739436/how-to-create-a-link-for-all-mobile-devices-that-opens-google-maps-with-a-route
     * @return {String} directions link
     */
  get directionsLink() {
    return `http://maps.apple.com/?daddr=${this.talk.address || 'Leeds'}`;
  }
}

window.customElements.define('directions-talk', DirectionsTalk);

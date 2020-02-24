import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import '@material/mwc-icon-button-toggle';

/**
 * `favourite-talk`
 * Handle favouring a talk
 *
 * @customElement
 */
export class FavouriteTalk extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
            display: block;
        }

        mwc-icon-button-toggle {
            --mdc-icon-size: var(--icon-size, 24px)
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
        <mwc-icon-button-toggle
            ?on=${this.isFavourited}
            onIcon="favorite"
            offIcon="favorite_border"
            label="Favourite Talk Button"
            @MDCIconButtonToggle:change="${this.toggle}"></mwc-icon-button-toggle>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The talk information */
      talk: { type: Object },
      /** If the talk is a favourite */
      isFavourited: { type: Boolean },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.talk = {};
    this.isFavourited = false;
  }

  /**
     * When toggle button is clicked fire an event depending on if its
     * @param {CustomEvent} event
     */
  toggle(event) {
    const eventName = (event.detail.isOn ? 'talk-favourited' : 'talk-unfavourited');
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: this.talk.id,
      bubbles: true,
      composed: true,
    }));
  }
}

window.customElements.define('favourite-talk', FavouriteTalk);

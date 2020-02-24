import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import '@material/mwc-icon-button-toggle';

/**
 * `favorite-talk`
 * Handle favouring a talk
 *
 * @customElement
 */
export class FavoriteTalk extends LitElement {
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
            ?on=${this.isFavorited}
            onIcon="favorite"
            offIcon="favorite_border"
            label="Favorite Talk Button"
            @MDCIconButtonToggle:change="${this.toggle}"></mwc-icon-button-toggle>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The talk information */
      talk: { type: Object },
      /** If the talk is a favourite */
      isFavorited: { type: Boolean },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.talk = {};
    this.isFavorited = false;
  }

  /**
     * When toggle button is clicked fire an event depending on if its
     * @param {CustomEvent} event
     */
  toggle(event) {
    const eventName = (event.detail.isOn ? 'talk-favorited' : 'talk-unfavorited');
    this.dispatchEvent(new CustomEvent(eventName, {
      detail: this.talk.id,
      bubbles: true,
      composed: true,
    }));
  }
}

window.customElements.define('favorite-talk', FavoriteTalk);

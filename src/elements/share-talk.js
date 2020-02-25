import { LitElement, html, css } from 'lit-element/lit-element';
import { Plugins } from '@capacitor/core';
import { sharedStyles } from '../shared-styles';
import '@material/mwc-icon-button';
import '@material/mwc-snackbar';


const { Share } = Plugins;

/**
 * `share-talk`
 * Handle sharing a talk
 *
 * @customElement
 */
export class ShareTalk extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
            display: block;
        }

        mwc-icon-button {
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
      <mwc-icon-button
        label="Share Talk"
        icon="share"
        @click=${this.share}></mwc-icon-button>

        <mwc-snackbar id="copied"
              labelText="Copied a link to ${this.talk.title}."
              timeoutMs=4000>
          <mwc-icon-button icon="close" slot="dismiss"></mwc-icon-button>
        </mwc-snackbar>
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
   * Helper to get the snackbar
   * @return {HTMLElement} the snackbar
   */
  get snackbar() {
    return this.shadowRoot.querySelector('mwc-snackbar');
  }

  /**
     * When share is clicked
     */
  async share() {
    try {
      await Share.share({
        title: this.talk.title,
        text: this.talk.description,
        url: `http://localhost:8001/talk/${this.talk.id}`,
        dialogTitle: 'Share a Leeds Digital Festival Talk',
      });
    } catch (e) {
      await navigator.clipboard.writeText(`http://localhost:8001/talk/${this.talk.id}`);
      this.snackbar.open();
    }
  }
}

window.customElements.define('share-talk', ShareTalk);

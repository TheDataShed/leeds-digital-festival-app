import { LitElement, html, css } from 'lit-element/lit-element';
import { Plugins } from '@capacitor/core';
import { sharedStyles } from '../shared-styles';
import '@material/mwc-icon-button';

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
        ?hidden=${!navigator.share}
        ?disabled=${!navigator.share}
        label="Share Talk"
        icon="share"
        @click=${this.share}></mwc-icon-button>
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
     * When share is clicked
     */
  async share() {
    await Share.share({
      title: this.talk.title,
      text: this.talk.description,
      url: `http://localhost:8001/talk/${this.talk.id}`,
      dialogTitle: 'Share a Leeds Digital Festival Talk',
    });
  }
}

window.customElements.define('share-talk', ShareTalk);

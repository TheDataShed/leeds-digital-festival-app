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

        mwc-icon-button.share {
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
      <mwc-icon-button
        class="share"
        label="Share Talk"
        icon="share"
        @click=${this.share}></mwc-icon-button>

        <mwc-snackbar id="copied"
              labelText="Copied a link to the talk '${this.talk.title}'."
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
      /** Analytics class */
      analytics: { type: Object },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.talk = {};
    this.analytics = {};
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
    const talkUrl = `${window.location.origin}/talk/${this.talk.id}`;
    if (this.analytics && this.analytics.trackTalkEvent) {
      this.analytics.trackTalkEvent('share', this.talk);
    }
    try {
      await Share.share({
        title: this.talk.title,
        text: `${this.talk.title} by ${this.talk.speaker}`,
        url: talkUrl,
        dialogTitle: 'Share a Leeds Digital Festival Talk',
      });
    } catch (e) {
      try {
        await navigator.clipboard.writeText(talkUrl);
        this.snackbar.open();
      } catch (err) {
        if (this.analytics && this.analytics.trackException) {
          this.analytics.trackException(err);
        }
      }
    }
  }
}

window.customElements.define('share-talk', ShareTalk);

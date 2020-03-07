import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import '../elements/error-display';
import '../elements/loading-display';
import '../elements/talk-overview';

/**
 * `favourite-talks-page`
 * Page to display favourited talks
 *
 * @customElement
 */
export class FavouriteTalksPage extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
        }

        .header {
          text-align: center;
          padding: 2em;
          background-image:linear-gradient(to bottom left,#1D1D1B,#3E3E3A);
        }

        .header>h1 {
          font-size: 2.25em;
          color: var(--white-color);
        }

        .header>h2.hashtag {
          color: var(--pink-color);
        }

        .list {
          padding: 2em;
        }

        .list[active] {
          background-color: var(--pink-color);
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
      <section class="header">
        <h1>Your Favourite Talks</h1>
        <h2 class="hashtag">#LeedsDigi20</h2>
      </section>
      <loading-display ?hidden=${!this.isLoading}></loading-display>
      <error-display ?hidden=${!this.isError}></error-display>
      <div class="list" ?active=${this.talks.filter(talk => this.favouriteTalks.indexOf(talk.id) > -1).length > 0}>
        ${this.talks
    .filter(talk => this.favouriteTalks.indexOf(talk.id) > -1)
    .map(talk => html`<talk-overview .talk=${talk} isFavourited .analytics=${this.analytics}></talk-overview>`)}
      </div>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The list of talks */
      talks: { type: Array },
      /** The list of favourited talks */
      favouriteTalks: { type: Array },
      /** If the list of talks is loading */
      isLoading: { type: Boolean },
      /** If the list of talks has errored */
      isError: { type: Boolean },
      /** Analytics class */
      analytics: { type: Object },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.isLoading = false;
    this.isError = false;
    this.talks = [];
    this.favouriteTalks = [];
    this.analytics = {};
  }
}

window.customElements.define('favourite-talks-page', FavouriteTalksPage);

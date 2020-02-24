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

        h2 {
          padding-left: 5em;
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
        <h2>Favourite Talks</h2>
        <loading-display ?hidden=${!this.isLoading}></loading-display>
        <error-display ?hidden=${!this.isError}></error-display>
        <div class="list">
          ${this.talks
    .filter(talk => this.favouriteTalks.indexOf(talk.id) > -1)
    .map(talk => html`<talk-overview .talk=${talk} isFavourited></talk-overview>`)}
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
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.isLoading = false;
    this.isError = false;
    this.talks = [];
    this.favouriteTalks = [];
  }
}

window.customElements.define('favourite-talks-page', FavouriteTalksPage);

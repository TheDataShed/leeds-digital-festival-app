import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';

/**
 * `favourite-talks-page`
 * Page to display favorited talks
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
        <h2>Favorite Talks</h2>
        <loading-display ?hidden=${!this.isLoading} label=""></loading-display>
        <error-display ?hidden=${!this.isError} label=""></error-display>
        <div class="list">
          ${this.talks
    .filter(talk => this.favoriteTalks.indexOf(talk.id) > -1)
    .map(talk => html`<talk-overview .talk=${talk} isfavorite></talk-overview>`)}
        </div>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The list of talks */
      talks: { type: Array },
      /** The list of favorited talks */
      favoriteTalks: { type: Array },
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
    this.favoriteTalks = [];
  }
}

window.customElements.define('favourite-talks-page', FavouriteTalksPage);

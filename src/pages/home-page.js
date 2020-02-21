import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import '../elements/talk-overview';

/**
 * `home-page`
 * Page as the home of the website
 *
 * @customElement
 */
export class HomePage extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
        }

        .header {
          text-align: center;
          margin: 5em;
        }

        .header>h1 {
          color: var(--white-color);
        }

        .header>h2 {
          color: var(--grey-color);
        }

        .header>h2.hashtag {
          color: var(--pink-color);
        }

        .talks {
          background-color: var(--grey-color);
        }

        .talks>h3 {
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
      <div class="header">
        <h1>LEEDS: THE DIGITAL<br>
        CAPITAL OF THE NORTH</h1>
        <h2>20th April to 1st May 2020</h2>
        <h2 class="hashtag">#LeedsDigi20</h2>
      </div>
      <div class="talks">
        <h3>Talks</h3>
        <loading-display ?hidden=${!this.isLoading} label=""></loading-display>
        <error-display ?hidden=${!this.isError} label=""></error-display>
        <div class="list">
          ${this.talks.map(talk => html`<talk-overview .talk=${talk} ?isFavorite=${this.isTalkFavorited(talk)}></talk-overview>`)}
        </div>
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

  /**
   * Checks the list of favorited talk ids to see if a talk is favoured
   * @param {Object} talk the talk info
   * @return {Boolean} if the talk is in the favorite list
   */
  isTalkFavorited(talk) {
    return this.favoriteTalks.indexOf(talk.id) > -1;
  }
}

window.customElements.define('home-page', HomePage);

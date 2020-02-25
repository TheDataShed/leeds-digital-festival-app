import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import { formatDate } from '../elements/formatters';
import '../elements/error-display';
import '../elements/loading-display';
import '../elements/favourite-talk';
import '../elements/directions-talk';
import '../elements/share-talk';

/**
 * `talk-page`
 * Page to display full talk information
 *
 * @customElement
 */
export class TalkPage extends LitElement {
/** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
        }

        .header {
          text-align: left;
          padding: 2em;
          background-image:linear-gradient(to bottom left,#1D1D1B,#3E3E3A);
        }

        .header>h1 {
          color: var(--pink-color);
          font-size: 2.25em;
        }

        .header>.date {
          color: var(--white-color);
        }

        .content {
          padding: 1em 2em;
        }

        .footer {
          text-align: center;
          display: flex;
        }

        .footer>favourite-talk,
        .footer>directions-talk,
        .footer>share-talk {
          --icon-size: 50px;
          --button-size: 75px;
        }

        .footer>favourite-talk {
          margin: auto 0 auto auto;
        }

        .footer>share-talk {
          margin: auto auto auto 0;
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
        <loading-display ?hidden=${!this.isLoading}></loading-display>
        <error-display ?hidden=${!this.isError}></error-display>
        <section class="header">
          <h3 class="date">${formatDate(this.talk.date)}</h3>
          <h1>${this.talk.title}</h1>
        </section>
        <section class="content">
          <h2 class="speaker">By: ${this.talk.speaker}</h2>
          <p>${this.talk.description}</p>
        </section>
        <section class="footer">
          <favourite-talk ?isFavourited=${this.isFavourited} .talk=${this.talk}>Favourite Talk</favourite-talk>
          <directions-talk .talk=${this.talk}></directions-talk>
          <share-talk .talk=${this.talk}></share-talk>
        </section>
    `;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The routing data */
      routeData: { type: Object },
      /** The list of talks */
      talks: { type: Array },
      /** The list of favourited talks */
      favouriteTalks: { type: Array },
      /** If the list of talks is loading */
      isLoading: { type: Boolean },
      /** If the list of talks has errored */
      isError: { type: Boolean },
      /** The talk information */
      talk: { type: Object },
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.isLoading = false;
    this.isError = false;
    this.routeData = {};
    this.talks = [];
    this.favouriteTalks = [];
    this.talk = {};
  }


  /**
   * Fired whenever any property changes and the template updates
   * @param {PropertyValues} changedProperties map of changed properties
   */
  updated(changedProperties) {
    if (super.updated) {
      super.updated();
    }
    if (changedProperties.has('routeData') && this.routeData && this.routeData.params && this.routeData.params.id) {
      this.talk = this.getTalk(this.routeData.params.id);
    }
  }

  /**
   * Returns the talk information if in the list of talks
   * @param {String} id the id of the talk
   * @return {Object} the talk
   */
  getTalk(id) {
    const noTalkFound = {
      title: 'No Talk Found',
    };
    return this.talks.find(talk => talk.id === id) || noTalkFound;
  }

  /**
   * Checks the list of favourited talk ids to see if a talk is favoured
   * @return {Boolean} if the talk is in the favourite list
   */
  get isFavourited() {
    return this.favouriteTalks.indexOf(this.talk.id) > -1;
  }
}

window.customElements.define('talk-page', TalkPage);

import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import { formatDate } from './formatters';
import './favourite-talk';
import './directions-talk';
import './share-talk';

/**
 * `talk-overview`
 * Overview of a talk
 *
 * @customElement
 */
export class TalkOverview extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
            display: block;
            color: var(--black-color);
            background-color: var(--white-color);
            box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;
            margin: 1em 0;
            padding: 1.5em 1.5em 0 1.5em;
            border-radius: 1px;
            font-family: "worksans";
        }

        .header>.talk>h2,
        .header>.date {
          margin: 0;
        }

        .content {
          display: flex;
          flex-direction: column;
        }

        .content>p {
          margin-left: auto;
          margin-right: auto;
        }

        .content>.more {
          border-radius: 25px;
          background-color: var(--blue-color);
          color: var(--white-color);
          padding: 6px 17.5px;
          margin: auto;
        }

        .footer {
          margin-top: 15px;
          display: flex;
        }

        .footer>favourite-talk,
        .footer>share-talk,
        .footer>directions-talk {
          margin: auto;
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
                <div class="talk">
                    <h2 class="title">${this.talk.title}</h2>
                </div>
                <p class="date">${formatDate(this.talk.date)}</p>
            </div>
            <div class="content">
              <p>${(this.talk.description.length > 500 ? `${this.talk.description.substr(0, 500)}...` : this.talk.description)}</p>
              <a class="more" href="/talk/${this.talk.id}">View Talk</a>
            </div>
            <div class="footer">
                <favourite-talk ?isFavourited=${this.isFavourited} .talk=${this.talk}></favourite-talk>
                <directions-talk .talk=${this.talk}></directions-talk>
                <share-talk .talk=${this.talk}></share-talk>
            </div>
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
}

window.customElements.define('talk-overview', TalkOverview);

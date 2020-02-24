import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import { formatDate } from './formatters';
import './favourite-talk';

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
            color: var(--white-color);
            background-color: var(--black-color);
            box-shadow: rgba(0, 0, 0, 0.14) 0px 2px 2px 0px, rgba(0, 0, 0, 0.12) 0px 1px 5px 0px, rgba(0, 0, 0, 0.2) 0px 3px 1px -2px;
            margin: 10px;
            padding: 15px;
            border-radius: 1px;
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
                    <p class="speaker">By: ${this.talk.speaker}</p>
                </div>
                <p class="date">${formatDate(this.talk.date)}</p>
            </div>
            <div class="content">${this.talk.description.substr(0, 200)}...</div>
            <div class="footer">
                <favourite-talk ?isFavourited=${this.isFavourited} .talk=${this.talk}></favourite-talk>
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

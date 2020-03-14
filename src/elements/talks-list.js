import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';
import { formatDate } from './formatters';
import './talk-overview'

/**
 * `talks-list`
 * List of a talks
 *
 * @customElement
 */
export class TalksList extends LitElement {
    /** Defines the elements styles */
    static get styles() {
        const style = css`
        :host {
            display: block;
        }

        h3.date {
            color: var(--light-black-color);
            padding: 25px 0 10px 0;
            border-bottom-width: 1px;
            border-bottom-style: solid;
            border-bottom-color: var(--light-black-color);
        }
      `;

        return [sharedStyles, style];
    }

    /**
     * Defined the elements content
     * @return {TemplateResult} the resulting html template
     */
    render() {
        const talks = this.talks.map((talk, i) => {
            let dateBreak = ''
            if (this.isOver1DayApart(this.talks[i - 1], talk)) {
                dateBreak = html`<h3 class="date">${formatDate(talk.date)}</h3>`
            }
            return html`
                ${dateBreak}
                <talk-overview .talk=${talk} ?isFavourited=${this.isTalkFavourited(talk)} .analytics=${this.analytics}></talk-overview>
            `
        })

        return html`${talks}`;
    }

    /** Defines the elements properties */
    static get properties() {
        return {
            /** The list of talks */
            talks: { type: Array },
            /** The list of favourited talks */
            favouriteTalks: { type: Array },
            /** Analytics class */
            analytics: { type: Object },
        };
    }

    /** Initialises values of properties */
    constructor() {
        super();
        this.talks = [];
        this.favouriteTalks = [];
        this.analytics = {};
    }

    /**
     * Checks the list of favourited talk ids to see if a talk is favoured
     * @param {Object} talk the talk info
     * @return {Boolean} if the talk is in the favourite list
     */
    isTalkFavourited(talk) {
        return this.favouriteTalks.indexOf(talk.id) > -1;
    }

    /**
     * Checks if 2 talks are over a day apart
     * @param {Object} lastTalk the previous talk in the list
     * @param {Object} currentTalk the current talk in the list
     * @returns {Boolean} if the talks are over a day apart
     */
    isOver1DayApart(lastTalk, currentTalk) {
        if (lastTalk) {
            return (new Date(currentTalk.date).getDate() - new Date(lastTalk.date).getDate()) > 0;
        }
        return false;
    }
}

window.customElements.define('talks-list', TalksList);

import '@material/mwc-drawer';
import '@material/mwc-icon';
import '@material/mwc-icon-button';
import '@material/mwc-top-app-bar';
import router from 'page/page.mjs';
import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from './shared-styles';
import {
  parseQueryParams, validatePage, importPage, trackPageChanges,
} from './elements/router';

/**
 * `ldf-app`
 * The app shell to do all the routing and what not
 *
 * @customElement
 */
export class LDFApp extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
          color: var(--black-color);
        }

        mwc-top-app-bar {
          --mdc-theme-primary: var(--grey-color);
          --mdc-theme-on-primary: var(--black-color);
        }

        a.logo {
          display: flex;
        }

        a.logo>img.logo {
          height: 60px;
          margin: auto;
        }

        p[slot="actionItems"] {
          margin-right: 4em;
        }

        p[slot="actionItems"].hashtag {
          color: var(--pink-color);
        }

        #drawer>nav {
          flex-direction: column;
          height: 92%;
          border-right: 1px solid #f5f5f5;
        }

        #drawer>nav>a {
          padding: 10px 16px;
          text-decoration: none;
          color: var(--black-color);
          line-height: 40px;
          border-left: 5px solid var(--white-color);
        }

        #drawer>nav>a[data-selected] {
          border-left: 5px solid var(--pink-color);
          font-weight: bold;
        }

        .mobile-menu {
          display: none;
        }

        @media (max-width: 769px) {
          .mobile-menu {
            display: flex;
            position: fixed;
            bottom: 0;
            width: 100%;
            background: var(--white-color);
            border-top: 1px solid #f5f5f5;
          }

          .mobile-menu>a {
            display: flex;
            flex-direction: column;
            margin: auto;
            flex: 1;
            border-bottom: 5px solid var(--white-color);
          }

          .mobile-menu>a>mwc-icon {
            --mwc-icon-size: 30px;
            margin: 0.5em auto 0;
          }

          .mobile-menu>a>p {
            text-align: center;
            margin: 0 auto 0.5em;
            font-size: 12px;
          }

          .mobile-menu>a[data-selected] {
            border-bottom: 5px solid var(--pink-color);
            font-weight: bold;
          }

          iron-pages {
            margin-bottom: 100px;
          }

          p[slot="actionItems"] {
            display: none;
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
    <mwc-drawer hasheader type="modal">
      <span slot="title">Menu</span>
      <div id="drawer" class="drawer-content">
        <nav role="navigation">
          <a href="/home" ?data-selected=${this.page === 'home'}>HOME</a>
          <a href="/favorites" ?data-selected=${this.page === 'favorites'}>
            <mwc-icon>favorite</mwc-icon>
            <p>FAVORITE TALKS</p>
          </a>
        </nav>
      </div>
      <div slot="appContent">
        <mwc-top-app-bar @MDCTopAppBar:nav=${this.toggleDrawer} ?centerTitle=${this.isMobile}>
          <mwc-icon-button class="menu" slot="navigationIcon" icon="menu" label="Menu Button"></mwc-icon-button>
          <div slot="title">
            <a class="logo" href="/home">
              <img class="logo" src="/images/ldf_2020_logo.png" alt="Leeds Digital Festival Logo">
            </a>
          </div>
          <p class="dates" slot="actionItems">20th April to 1st May</p>
          <p class="hashtag" slot="actionItems">#LeedsDigi20</p>
        </mwc-top-app-bar>
        <div class="main-content">
          <div class="pages" role="main">
            <home-page name="home" ?hidden=${this.page !== 'home'} .talks=${this.talks} .favoriteTalks=${this.favoriteTalks} ?isLoading=${this.isLoading} ?isError=${this.isError}></home-page>
            <favourite-talks-page name="favorites" ?hidden=${this.page !== 'favorites'} .talks=${this.talks} .favoriteTalks=${this.favoriteTalks} ?isLoading=${this.isLoading} ?isError=${this.isError}></favourite-talks-page>
            <privacy-page name="privacy" ?hidden=${this.page !== 'privacy'}></privacy-page>
            <terms-page name="terms" ?hidden=${this.page !== 'terms'}></terms-page>
            <lost-page name="lost" ?hidden=${this.page !== 'lost'}></lost-page>
          </div>
          <nav class="mobile-menu">
            <a href="/home" ?data-selected=${this.page === 'home'}>
              <mwc-icon>home</mwc-icon>
              <p>HOME</p>
            </a>
            <a href="/favorites" ?data-selected=${this.page === 'favorites'}>
              <mwc-icon>favorite</mwc-icon>
              <p>FAVORITE TALKS</p>
            </a>
          </nav>
        </div>
      </div>
    </mwc-drawer>`;
  }

  /** Defines the elements properties */
  static get properties() {
    return {
      /** The current page */
      page: { type: String, reflect: true },
      /** The routing information */
      routeData: { type: Object },
      /** Any query params in the url */
      queryParams: { type: Object },
      /** If its a mobile size device */
      isMobile: { type: Boolean },
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
    this.routeData = {
      params: {},
    };
    this.queryParams = {};
    this.isMobile = false;
    this.routing();

    this.isLoading = false;
    this.isError = false;
    this.talks = [];
    this.favoriteTalks = [];
  }

  /** Add any event listeners */
  async connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
    if (!window.fetch) {
      await import('whatwg-fetch');
    }
    this.loadTalks();
    const isMobileQuery = window.matchMedia('(max-width: 769px)');
    isMobileQuery.addListener(({ matches }) => { this.isMobile = matches; });
  }

  /** Remove any event listeners */
  disconnectedCallback() {
    if (super.disconnectedCallback) {
      super.disconnectedCallback();
    }
  }

  /**
   * Fired whenever any property changes and the template updates
   * @param {PropertyValues} changedProperties map of changed properties
   */
  updated(changedProperties) {
    if (super.updated) {
      super.updated();
    }

    if (changedProperties.has('routeData') && this.routeData) {
      if (this.routeData && this.routeData.params) {
        this.routePageChanged(this.routeData.params.page);
      }
      trackPageChanges(this.routeData.path);
    }
    if (changedProperties.has('page')) {
      importPage(this.page);
    }
  }

  /** Client side routing */
  routing() {
    // Parses off any query strings from the url and sets a query string object
    // url ?hi=everyone
    // queryParams {hi: 'everyone'}
    router('*', (context, next) => {
      this.queryParams = parseQueryParams(context);
      next();
    });
    // Browsing to / takes you to home
    router('/', (context) => {
      const { ...routeData } = context;
      routeData.params.page = 'home';
      this.routeData = routeData;
    });
    // Browsing to /home tries to take you to that page
    router('/:page', (context) => {
      this.routeData = context;
    });
    router();
  }

  /**
 * Show the corresponding page based on route info
 * @param {String} page the current page
 */
  routePageChanged(page) {
    // If no page was found in the route data, page will be an empty string.
    // Show 'home' in that case. And if the page doesn't exist, show 'view404'.
    this.page = validatePage(page);
    // Close a non-persistent drawer when the page & route are changed.
    if (this.drawer) {
      this.drawer.open = false;
    }
  }

  /** Helper to get the drawer element */
  get drawer() {
    return this.shadowRoot.querySelector('mwc-drawer');
  }

  /**
   * Toggle the drawer open/closed
   */
  toggleDrawer() {
    this.drawer.open = !this.drawer.open;
  }

  /**
   * Load the talks list from blob
   */
  async loadTalks() {
    try {
      this.isLoading = true;
      const response = await fetch('./talks.json');
      if (response.ok) {
        this.talks = await response.json();
      } else {
        this.isError = true;
      }
    } catch (e) {
      this.isError = true;
      // send error to app insights
    }
    this.isLoading = false;
  }
}

window.customElements.define('ldf-app', LDFApp);

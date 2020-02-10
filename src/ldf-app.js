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
          border-left: 5px solid var(--yellow-color);
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
            border-bottom: 5px solid var(--yellow-color);
            font-weight: bold;
          }

          iron-pages {
            margin-bottom: 100px;
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
    <mwc-drawer hasheader type="dismissible">
      <span slot="title">Drawer Title</span>
      <div id="drawer" class="drawer-content">
        <p>Drawer content</p>
        <nav role="navigation">
          <a href="/home" ?data-selected=${this.page === 'home'}>HOME</a>
        </nav>
      </div>
      <div slot="appContent">
        <mwc-top-app-bar @MDCTopAppBar:nav=${this.toggleDrawer}>
          <mwc-icon-button class="menu" slot="navigationIcon" icon="menu"></mwc-icon-button>
          <div slot="title">Title</div>
        </mwc-top-app-bar>
        <div class="main-content">
          <div class="pages" role="main">
            <home-page name="home" ?hidden=${this.page !== 'home'}></home-page>
            <privacy-page name="privacy" ?hidden=${this.page !== 'privacy'}></privacy-page>
            <terms-page name="terms" ?hidden=${this.page !== 'terms'}></terms-page>
            <lost-page name="lost" ?hidden=${this.page !== 'lost'}></lost-page>
          </div>
          <nav class="mobile-menu">
            <a href="/home" ?data-selected=${this.page === 'home'}>
              <mwc-icon icon=""></mwc-icon>
              <p>HOME</p>
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
    };
  }

  /** Initialises values of properties */
  constructor() {
    super();
    this.routeData = {
      params: {},
    };
    this.queryParams = {};

    this.routing();
  }

  /** Add any event listeners */
  connectedCallback() {
    if (super.connectedCallback) {
      super.connectedCallback();
    }
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
}

window.customElements.define('ldf-app', LDFApp);

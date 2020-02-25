import { LitElement, html, css } from 'lit-element/lit-element';
import { sharedStyles } from '../shared-styles';

/**
 * `sponsors-page`
 * Page as the list of sponsors of the website
 *
 * @customElement
 */
export class SponsorsPage extends LitElement {
  /** Defines the elements styles */
  static get styles() {
    const style = css`
        :host {
          display: block;
          text-align: center;
          color: var(--blue-color);
        }

        h1 {
          font-size: 2.25em;
        }

        .premier {
          background-color: var(--white-color);
          padding: 2em 1em 5em 1em;
        }

        .executive {
          background-color: var(--light-grey-color);
          padding: 5em 1em;
        }

        .associate {
          background-color: var(--grey-color);
          padding: 5em 1em;
        }

        .partner {
          background-color: var(--dark-grey-color);
          padding: 5em 1em;
        }

        ul.sponsors {
          list-style-type: none;
          display: flex;
          flex-wrap: wrap;
        }

        li.sponsor {
          margin: 25px auto;
        }

        li.sponsor>a {
          background-color: var(--white-color);
          border: 1px solid var(--light-grey-color);
          width: 150px;
          height: 150px;
          border-radius: 50%;
          display: flex;
        }

        li.sponsor>a>img {
          margin: auto;
          width: 70%;
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
      <section class="premier">
        <h1>CONFIRMED 2020 SPONSORS</h1>
        <h2>PREMIER SPONSORS</h2>
        <ul class="sponsors">
          <li class="sponsor" title="Crisp">
            <a href="https://leedsdigitalfestival.org/about/crisp-thinking/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Crisp.jpg" alt="Crisp" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="University of Leeds" >
            <a href="https://leedsdigitalfestival.org/about/university-of-leeds/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/University of Leeds.png" alt="University of Leeds" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Leeds City Council">
            <a href="https://leedsdigitalfestival.org/about/leeds-city-council/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Leeds City Council.png" alt="Leeds City Council" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="TPP">
            <a href="https://leedsdigitalfestival.org/about/tpp/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/TPP.jpg" alt="TPP" loading="lazy">
            </a>
          </li>
        </ul>
      </section>
      <section class="executive">
        <h2>EXECUTIVE SPONSORS</h2>
        <ul class="sponsors">
          <li class="sponsor" title="BJSS">
            <a href="https://leedsdigitalfestival.org/about/bjss/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/BJSS.png" alt="BJSS" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Leeds City Region Enterprise Partnership">
            <a href="https://leedsdigitalfestival.org/about/leeds-city-region-enterprise-partnership/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Leeds City Region Enterprise Partnership.jpg" alt="Leeds City Region Enterprise Partnership" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="DMW Group">
            <a href="https://leedsdigitalfestival.org/about/dmw/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/DMW Group.png" alt="DMW Group" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="AND Digital">
            <a href="https://leedsdigitalfestival.org/about/and-digital/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/AND Digital.png" alt="AND Digital" loading="lazy">
            </a>
          </li>
        </ul>
      </section>
      <section class="associate">
        <h2>ASSOCIATE SPONSORS</h2>
        <ul class="sponsors">
          <li class="sponsor" title="The Data Shed">
            <a href="https://www.thedatashed.co.uk/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/The Data Shed.png" alt="The Data Shed" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Avenue HQ">
            <a href="https://www.avenue-hq.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Avenue HQ.png" alt="Avenue HQ" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Aberfield">
            <a href="http://www.aberfield.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Aberfield.png" alt="Aberfield" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="North Coders">
            <a href="https://northcoders.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/North Coders.png" alt="North Coders" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Asda">
            <a href="https://www.asda.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Asda.jpg" alt="Asda" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="First Direct">
            <a href="https://www1.firstdirect.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/First Direct.png" alt="First Direct" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="CityFibre">
            <a href="https://www.cityfibre.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/CityFibre.png" alt="CityFibre" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="CSP">
            <a href="https://www.csp.partners/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/CSP.jpg" alt="CSP" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Bolser">
            <a href="https://bolser.co.uk/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Bolser.png" alt="Bolser" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="CDS">
            <a href="https://www.cds.co.uk/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/CDS.png" alt="CDS" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Creative Space Management">
            <a href="http://www.creativespaceman.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Creative Space Management.png" alt="Creative Space Management" loading="lazy">
            </a>
          </li>
        </ul>
      </section>
      <section class="partner">
        <h2>PARTNER SPONSORS</h2>
        <ul class="sponsors">
          <li class="sponsor" title="Engage Interactive">
            <a href="https://engageinteractive.co.uk/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Engage Interactive.png" alt="Engage Interactive" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Berwins Digital">
            <a href="https://www.berwinsdigital.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Berwins Digital.png" alt="Berwins Digital" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Leeds Community Foundation">
            <a href="https://www.leedscf.org.uk/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Leeds Community Foundation.png" alt="Leeds Community Foundation" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Leeds.Tech">
            <a href="https://leeds.tech/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Leeds.Tech.png" alt="Leeds.Tech" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Tech Nation">
            <a href="https://technation.io/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Tech Nation.png" alt="Tech Nation" loading="lazy">
            </a>
          </li>
          <li class="sponsor" title="Sheffield Digital Festival">
            <a href="https://sheffielddigitalfestival.com/" target="_blank" rel="noreferrer">
              <img src="/images/sponsors/Sheffield Digital Festival.jpg" alt="Sheffield Digital Festival" loading="lazy">
            </a>
          </li>
        </ul>
      </section>

    `;
  }
}

window.customElements.define('sponsors-page', SponsorsPage);

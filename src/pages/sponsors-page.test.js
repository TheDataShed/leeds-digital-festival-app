import { expect } from 'chai';
import './sponsors-page';

describe('sponsors-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('sponsors-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the sponsors sections', () => {
    const titles = node.shadowRoot.querySelectorAll('h2');
    expect(Array.from(titles).map((title) => title.textContent.trim())).to.deep.equal(['PREMIER SPONSORS', 'EXECUTIVE SPONSORS', 'ASSOCIATE SPONSORS', 'PARTNER SPONSORS']);
  });

  it('should render links to all sponsors', () => {
    const links = node.shadowRoot.querySelectorAll('a');
    expect(Array.from(links).map((link) => link.href)).to.deep.equal(
      [
        'https://leedsdigitalfestival.org/about/crisp-thinking/',
        'https://leedsdigitalfestival.org/about/university-of-leeds/',
        'https://leedsdigitalfestival.org/about/leeds-city-council/',
        'https://leedsdigitalfestival.org/about/tpp/',
        'https://leedsdigitalfestival.org/about/bjss/',
        'https://leedsdigitalfestival.org/about/leeds-city-region-enterprise-partnership/',
        'https://leedsdigitalfestival.org/about/dmw/',
        'https://leedsdigitalfestival.org/about/and-digital/',
        'https://www.thedatashed.co.uk/',
        'https://www.avenue-hq.com/',
        'http://www.aberfield.com/',
        'https://northcoders.com/',
        'https://www.asda.com/',
        'https://www1.firstdirect.com/',
        'https://www.cityfibre.com/',
        'https://www.csp.partners/',
        'https://bolser.co.uk/',
        'https://www.cds.co.uk/',
        'http://www.creativespaceman.com/',
        'https://engageinteractive.co.uk/',
        'https://www.berwinsdigital.com/',
        'https://www.leedscf.org.uk/',
        'https://leeds.tech/',
        'https://technation.io/',
        'https://sheffielddigitalfestival.com/',
      ],
    );
  });
});

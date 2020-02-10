import { expect } from 'chai';
import './home-page';

describe('home-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('home-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the home page', () => {
    const titles = node.shadowRoot.querySelectorAll('h1');
    expect(Array.from(titles).map(title => title.textContent.trim())).to.deep.equal(['HOME']);
  });
});

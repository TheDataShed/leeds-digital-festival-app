import { expect } from 'chai';
import './privacy-page';

describe('privacy-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('privacy-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the privacy page', () => {
    const title = node.shadowRoot.querySelector('h1');
    expect(title.textContent).to.equal('Privacy Policy');
  });
});

import { expect } from 'chai';
import './terms-page';

describe('terms-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('terms-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the terms page', () => {
    const title = node.shadowRoot.querySelector('h1');
    expect(title.textContent).to.equal('Terms and Conditions');
  });
});

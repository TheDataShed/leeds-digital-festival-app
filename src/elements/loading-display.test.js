import { expect } from 'chai';
import './loading-display';

describe('loading-display tests', () => {
  let node;

  beforeEach(async () => {
    node = document.createElement('loading-display');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the loading display with set label', async () => {
    node.label = 'Loading stuff';
    await node.updateComplete;
    const spinner = node.shadowRoot.querySelector('flower-spinner');
    expect(spinner).to.not.be.null;
    const paragraph = node.shadowRoot.querySelector('p');
    expect(paragraph.innerText).to.equal('Loading stuff');
  });
});

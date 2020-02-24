import { expect } from 'chai';
import './error-display';

describe('error-display tests', () => {
  let node;

  beforeEach(async () => {
    node = document.createElement('error-display');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the error display with set label', async () => {
    node.label = 'BOOM';
    await node.updateComplete;
    const icon = node.shadowRoot.querySelector('mwc-icon');
    expect(icon.textContent).to.equal('warning');
    const paragraph = node.shadowRoot.querySelector('p');
    expect(paragraph.innerText).to.equal('BOOM, please try again.');
  });
});

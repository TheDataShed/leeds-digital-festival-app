import { expect } from 'chai';
import './lost-page';

describe('lost-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('lost-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the lost page', () => {
    const title = node.shadowRoot.querySelector('h2');
    expect(title.textContent).to.equal('Oops you hit a 404. Head back to home.');
  });
});

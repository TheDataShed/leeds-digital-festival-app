import { expect } from 'chai';
import './directions-talk';

describe('directions-talk tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('directions-talk');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the button', () => {
    const button = node.shadowRoot.querySelector('mwc-icon-button');
    expect(button.icon).to.equal('place');
  });

  it('should render the link', () => {
    const link = node.shadowRoot.querySelector('a');
    expect(link.href).to.equal('http://maps.apple.com/?daddr=Leeds');
    expect(link.target).to.equal('_blank');
    expect(link.rel).to.equal('noreferrer');
  });

  it('should generate a link to the address', async () => {
    node.talk = {
      id: '1234567890',
      address: 'This place here',
    };
    await node.updateComplete;

    expect(node.directionsLink).to.equal('http://maps.apple.com/?daddr=This place here');
  });

  it('should generate a link to Leeds if no address available', () => {
    expect(node.directionsLink).to.equal('http://maps.apple.com/?daddr=Leeds');
  });
});

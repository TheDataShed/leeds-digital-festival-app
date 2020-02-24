import sinon from 'sinon';
import { expect } from 'chai';
import './favourite-talk';

describe('favourite-talk tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('favourite-talk');
    node.talk = {
      id: '1234567890',
    };
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the button', () => {
    const button = node.shadowRoot.querySelector('mwc-icon-button-toggle');
    expect(button.onIcon).to.equal('favorite');
    expect(button.offIcon).to.equal('favorite_border');
    expect(button.label).to.equal('Favourite Talk Button');
  });

  it('should be off by default', () => {
    const button = node.shadowRoot.querySelector('mwc-icon-button-toggle');
    expect(button.on).to.be.false;
  });

  it('should be on if favourited', async () => {
    node.isFavourited = true;
    await node.updateComplete;
    const button = node.shadowRoot.querySelector('mwc-icon-button-toggle');
    expect(button.on).to.be.true;
  });

  it('should fire an favourited event when clicked', async () => {
    const spy = sinon.spy();
    node.addEventListener('talk-favourited', spy);

    const toggle = node.shadowRoot.querySelector('mwc-icon-button-toggle');
    const button = toggle.shadowRoot.querySelector('button');
    expect(toggle.on).to.be.false;
    button.click();
    await node.updateComplete;

    expect(spy.callCount).to.equal(1);
    expect(spy.firstCall.args[0].detail).to.equal('1234567890');
    expect(toggle.on).to.be.true;
  });

  it('should fire an unfavourited event when clicked and already favourited', async () => {
    node.isFavourited = true;
    await node.updateComplete;

    const spy = sinon.spy();
    node.addEventListener('talk-unfavourited', spy);

    const toggle = node.shadowRoot.querySelector('mwc-icon-button-toggle');
    const button = toggle.shadowRoot.querySelector('button');
    expect(toggle.on).to.be.true;
    button.click();
    await node.updateComplete;

    expect(spy.callCount).to.equal(1);
    expect(spy.firstCall.args[0].detail).to.equal('1234567890');
    expect(toggle.on).to.be.false;
  });
});

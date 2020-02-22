import sinon from 'sinon';
import { expect } from 'chai';
import './share-talk';
import * as capacitor from '@capacitor/core';

describe('share-talk tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('share-talk');
    node.talk = {
      id: '1234567890',
      title: 'TITLE',
      description: 'this is a description',
    };
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the button', () => {
    const button = node.shadowRoot.querySelector('mwc-icon-button');
    expect(button.icon).to.equal('share');
    expect(button.label).to.equal('Share Talk');
  });

  it('should share talk when clicked', async () => {
    const spy = sinon.spy(capacitor.Plugins.Share, 'share');

    const button = node.shadowRoot.querySelector('mwc-icon-button');
    button.click();
    expect(spy.callCount).to.equal(1);
    expect(spy.firstCall.args[0]).to.deep.equal({
      title: 'TITLE',
      text: 'this is a description',
      url: 'http://localhost:8001/talk/1234567890',
      dialogTitle: 'Share a Leeds Digital Festival Talk',
    });
  });

  it('should be disabled and hidden if not available on the web', async () => {
    const button = node.shadowRoot.querySelector('mwc-icon-button');
    expect(button.hidden).to.be.true;
    expect(button.disabled).to.be.true;
  });

  it('should be enabled and unhidden if available', async () => {
    window.navigator.share = sinon.fake();
    const element = document.createElement('share-talk');
    document.body.appendChild(element);
    await element.updateComplete;

    const button = element.shadowRoot.querySelector('mwc-icon-button');
    expect(button.hidden).to.be.false;
    expect(button.disabled).to.be.false;
    sinon.restore();
    element.remove();
  });
});

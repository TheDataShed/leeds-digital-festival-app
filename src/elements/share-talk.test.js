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
    sinon.restore();
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

  it('should copy a link to talk if not available on the web', async () => {
    const stub = sinon.stub(capacitor.Plugins.Share, 'share');
    stub.throws();

    const { snackbar } = node;
    const snackbarSpy = sinon.spy(node.snackbar, 'open');

    const clipboardSpy = sinon.stub(window.navigator.clipboard, 'writeText');
    clipboardSpy.resolves();

    await node.share();

    expect(clipboardSpy.callCount).to.equal(1);
    expect(clipboardSpy.firstCall.args[0]).to.include('/talk/1234567890');
    expect(snackbar.labelText).to.equal('Copied a link to the talk \'TITLE\'.');
    expect(snackbarSpy.callCount).to.equal(1);
  });
});

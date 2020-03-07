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
      speaker: 'talker',
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

    const shareCall = spy.firstCall.args[0];
    expect(shareCall.title).to.equal('TITLE');
    expect(shareCall.text).to.equal('TITLE by talker');
    expect(shareCall.dialogTitle).to.equal('Share a Leeds Digital Festival Talk');
    expect(shareCall.url).to.include('/talk/1234567890');
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

  it('should track the share', async () => {
    const trackSpy = sinon.spy();
    node.analytics = {
      trackTalkEvent: trackSpy,
    };
    await node.updateComplete;

    const button = node.shadowRoot.querySelector('mwc-icon-button');
    button.click();
    await node.updateComplete;

    expect(trackSpy.callCount).to.equal(1);
    expect(trackSpy.firstCall.args).to.deep.equal([
      'share',
      {
        id: '1234567890',
        title: 'TITLE',
        description: 'this is a description',
        speaker: 'talker',
      },
    ]);
  });

  it('should track exceptions when sharing', async () => {
    const trackSpy = sinon.spy();
    node.analytics = {
      trackException: trackSpy,
    };
    await node.updateComplete;

    const stub = sinon.stub(capacitor.Plugins.Share, 'share');
    stub.throws();

    const clipboardSpy = sinon.stub(window.navigator.clipboard, 'writeText');
    clipboardSpy.rejects('BOOM');

    await node.share();

    expect(trackSpy.callCount).to.equal(1);
  });
});

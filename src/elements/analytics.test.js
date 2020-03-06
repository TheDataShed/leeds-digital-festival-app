import { expect } from 'chai';
import sinon from 'sinon';
import { Analytics } from './analytics';

describe('analytics tests', () => {
  let analytics;
  beforeEach(async () => {
    analytics = new Analytics('TEST_KEY');
  });

  it('should set the correct instrument key', () => {
    expect(analytics.config.instrumentationKey).to.equal('TEST_KEY');
  });

  it('should not use cookies', () => {
    expect(analytics.config.isCookieUseDisabled).to.be.true;
  });

  it('should have a track page view method defined', () => {
    expect(analytics.trackPageView).to.exist;
  });

  it('should have a track exception method defined', () => {
    expect(analytics.trackException).to.exist;
  });

  it('should track talk events', () => {
    const spy = sinon.stub(analytics, 'trackEvent');
    analytics.trackTalkEvent('test event', {
      id: 10,
    });
    expect(spy.callCount).to.equal(1);
    expect(spy.firstCall.args[0]).to.deep.equal({
      name: 'test event',
      properties: {
        id: 10,
      },
    });
  });
});

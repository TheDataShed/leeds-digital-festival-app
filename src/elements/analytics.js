import { ApplicationInsights } from '@microsoft/applicationinsights-web';

/**
 * Extends the Microsoft Application Insights
 */
export class Analytics extends ApplicationInsights {
  /**
   * Extends the Microsoft Application Insights, adding our methods
   * @param {String} insightsKey
   */
  constructor(insightsKey) {
    super({
      config: {
        instrumentationKey: insightsKey,
        isCookieUseDisabled: true,
      },
    });
  }

  /**
   * Track talk events in app insights
   * @param {String} eventName the name of the event to track
   * @param {Object} talk the talk object, must have talk id
   */
  trackTalkEvent(eventName, talk) {
    this.trackEvent({
      name: eventName,
      properties: {
        id: talk.id,
      },
    });
  }
}

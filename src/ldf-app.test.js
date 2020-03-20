/* eslint-disable no-new */
import { expect } from 'chai';
import sinon from 'sinon';
import * as capacitor from '@capacitor/core';
import { LDFApp } from './ldf-app';
import * as storage from './elements/storage';

describe('ldf-app constructor tests', () => {
  afterEach(async () => {
    sinon.restore();
  });

  it('should call the routing service', async () => {
    const routingStub = sinon.stub(LDFApp.prototype, 'routing');
    new LDFApp();
    expect(routingStub.callCount).to.equal(1);
  });

  it('should call the load data', async () => {
    const loadDataStub = sinon.stub(LDFApp.prototype, 'loadData');
    new LDFApp();
    expect(loadDataStub.callCount).to.equal(1);
  });

  it('should create the analytics service', async () => {
    const app = new LDFApp();
    expect(app.analytics.config.instrumentationKey).to.equal('');
  });

  it('should call to hide the splash screen', async () => {
    const spy = sinon.stub(capacitor.Plugins.SplashScreen, 'hide');
    new LDFApp();
    expect(spy.callCount).to.equal(1);
  });
});

describe('ldf-app tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('ldf-app');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(async () => {
    node.remove();
    sinon.restore();
    await storage.clearFavouriteTalks();
  });

  it('should set the page by default to home', () => {
    node.routePageChanged();
    expect(node.page).to.equal('home');
  });

  it('should close the drawer on page change', () => {
    const drawer = node.shadowRoot.querySelector('mwc-drawer');
    drawer.open = true;
    node.routePageChanged();
    expect(node.page).to.equal('home');
    expect(drawer.open).to.be.false;
  });

  it('should toggle the drawer when clicking the menu button', async () => {
    const drawer = node.shadowRoot.querySelector('mwc-drawer');
    const menuButton = node.shadowRoot.querySelector('.menu');
    expect(drawer.open).to.be.false;
    menuButton.click();
    await node.updateComplete;
    expect(drawer.open).to.be.true;
    menuButton.click();
    await node.updateComplete;
    expect(drawer.open).to.be.false;
  });

  it('should highlight the home links when selected', async () => {
    node.page = 'home';
    await node.updateComplete;
    const homeLinks = node.shadowRoot.querySelectorAll('nav>a[href="/home"]');
    const favouriteLinks = node.shadowRoot.querySelectorAll('nav>a[href="/favourites"]');
    const sponsorLinks = node.shadowRoot.querySelectorAll('nav>a[href="/sponsors"]');
    expect(homeLinks.length).to.equal(2);
    expect(Array.from(homeLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([true, true]);
    expect(Array.from(favouriteLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([false, false]);
    expect(Array.from(sponsorLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([false]);
  });

  it('should highlight the favourites links when selected', async () => {
    node.page = 'favourites';
    await node.updateComplete;
    const homeLinks = node.shadowRoot.querySelectorAll('nav>a[href="/home"]');
    const favouriteLinks = node.shadowRoot.querySelectorAll('nav>a[href="/favourites"]');
    const sponsorLinks = node.shadowRoot.querySelectorAll('nav>a[href="/sponsors"]');
    expect(favouriteLinks.length).to.equal(2);
    expect(Array.from(homeLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([false, false]);
    expect(Array.from(favouriteLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([true, true]);
    expect(Array.from(sponsorLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([false]);
  });

  it('should highlight the sponsors links when selected', async () => {
    node.page = 'sponsors';
    await node.updateComplete;
    const homeLinks = node.shadowRoot.querySelectorAll('nav>a[href="/home"]');
    const favouriteLinks = node.shadowRoot.querySelectorAll('nav>a[href="/favourites"]');
    const sponsorLinks = node.shadowRoot.querySelectorAll('nav>a[href="/sponsors"]');
    // Only one link as not in mobile menu
    expect(sponsorLinks.length).to.equal(1);
    expect(Array.from(homeLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([false, false]);
    expect(Array.from(favouriteLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([false, false]);
    expect(Array.from(sponsorLinks).map((link) => link.hasAttribute('data-selected'))).to.deep.equal([true]);
  });

  it('should load the talk and favourites data', async () => {
    const expectedTalks = [
      {
        title: 'Talk',
        date: '2020-02-11T20:18:20.026Z',
        speaker: 'Roger',
        description: 'blblbllblblblbl',
      },
    ];
    const fetchStub = sinon.stub(window, 'fetch');
    const jsonStub = sinon.stub();
    jsonStub.resolves(expectedTalks);

    fetchStub.resolves({
      ok: true,
      json: jsonStub,
    });
    const expectedFavouritedTalks = ['1', '4'];
    await storage.saveFavouriteTalks(expectedFavouritedTalks);

    await node.loadData();
    const request = fetchStub.firstCall.args[0];
    expect(fetchStub.callCount).to.equal(1);
    expect(jsonStub.callCount).to.equal(1);
    expect(node.talks).to.deep.equal(expectedTalks);
    expect(node.isError).to.be.false;
    expect(node.isLoading).to.be.false;

    expect(request.url).to.equal('https://ldf.azureedge.net/talks.json');
    expect(request.mode).to.equal('cors');
    expect(node.favouriteTalks).to.deep.equal(expectedFavouritedTalks);
  });

  it('should not explode if failing to load the talks and set isError state', async () => {
    node.analytics = {
      trackException: () => {},
    };
    await node.updateComplete;
    const fetchStub = sinon.stub(window, 'fetch');
    fetchStub.rejects();

    await node.loadData();
    expect(fetchStub.callCount).to.equal(1);
    expect(node.isError).to.be.true;
    expect(node.isLoading).to.be.false;
  });

  it('should track exceptions when loading talks', async () => {
    const trackSpy = sinon.stub();
    node.analytics = {
      trackException: trackSpy,
    };
    await node.updateComplete;

    const fetchStub = sinon.stub(window, 'fetch');
    fetchStub.rejects();

    await node.loadData();
    expect(trackSpy.callCount).to.equal(1);
  });

  it('should not load the talks and favourites if load talks response isn\'t ok (200-299)', async () => {
    node.analytics = {
      trackException: () => {},
    };
    await node.updateComplete;
    const fetchStub = sinon.stub(window, 'fetch');
    const jsonStub = sinon.stub();
    jsonStub.resolves([
      {
        notA: 'Talk',
      },
    ]);

    fetchStub.resolves({
      ok: false,
      json: jsonStub,
    });

    await node.loadData();
    expect(fetchStub.callCount).to.equal(1);
    expect(jsonStub.callCount).to.equal(0);
    expect(node.talks).to.deep.equal([]);
    expect(node.isError).to.be.true;
    expect(node.isLoading).to.be.false;
  });

  it('should set the loading property when loading the talks and favourites', () => {
    node.loadData();
    expect(node.isLoading).to.be.true;
  });

  it('should add a talk to the favourites list when receiving a talk-favourited event', async () => {
    expect(node.favouriteTalks).to.deep.equal([]);

    node.dispatchEvent(new CustomEvent('talk-favourited', {
      detail: '1',
      bubbles: true,
      composed: true,
    }));

    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1']);
  });

  it('should add a talk to the favourites list when receiving a talk-favourited event and save the change', async () => {
    expect(node.favouriteTalks).to.deep.equal([]);

    node.dispatchEvent(new CustomEvent('talk-favourited', {
      detail: '1',
      bubbles: true,
      composed: true,
    }));

    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1']);

    const savedTalks = await storage.loadFavouriteTalks();
    expect(savedTalks).to.deep.equal(['1']);
  });

  it('should not add an already favourited talk to the favourites list when receiving a talk-favourited event', async () => {
    node.favouriteTalks = ['1'];
    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1']);

    node.dispatchEvent(new CustomEvent('talk-favourited', {
      detail: '1',
      bubbles: true,
      composed: true,
    }));

    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1']);
  });

  it('should remove an already favourited talk from the favourites list when receiving a talk-unfavourited event', async () => {
    node.favouriteTalks = ['1', '2', '3'];
    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1', '2', '3']);

    node.dispatchEvent(new CustomEvent('talk-unfavourited', {
      detail: '2',
      bubbles: true,
      composed: true,
    }));

    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1', '3']);
  });

  it('should remove an already favourited talk from the favourites list and save the change', async () => {
    node.favouriteTalks = ['1', '2', '3'];
    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1', '2', '3']);

    node.dispatchEvent(new CustomEvent('talk-unfavourited', {
      detail: '2',
      bubbles: true,
      composed: true,
    }));

    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal(['1', '3']);

    const savedTalks = await storage.loadFavouriteTalks();
    expect(savedTalks).to.deep.equal(['1', '3']);
  });

  it('should not remove an unknown talk from the favourites list when receiving a talk-unfavourited event', async () => {
    expect(node.favouriteTalks).to.deep.equal([]);

    node.dispatchEvent(new CustomEvent('talk-unfavourited', {
      detail: '1',
      bubbles: true,
      composed: true,
    }));

    await node.updateComplete;
    expect(node.favouriteTalks).to.deep.equal([]);
  });

  it('should call to save the favourite talks when talk-favourited', async () => {
    const existingTalks = await storage.loadFavouriteTalks();
    expect(existingTalks).to.deep.equal([]);

    node.dispatchEvent(new CustomEvent('talk-favourited', {
      detail: '20',
      bubbles: true,
      composed: true,
    }));
    await node.updateComplete;

    const savedTalks = await storage.loadFavouriteTalks();
    expect(savedTalks).to.deep.equal(['20']);
  });

  it('should call to save the favourite talks when talk-unfavourited', async () => {
    node.favouriteTalks = ['1', '20', '3'];
    await node.updateComplete;

    node.dispatchEvent(new CustomEvent('talk-unfavourited', {
      detail: '20',
      bubbles: true,
      composed: true,
    }));
    await node.updateComplete;

    const savedTalks = await storage.loadFavouriteTalks();
    expect(savedTalks).to.deep.equal(['1', '3']);
  });

  it('should pass the analytics down to home, favourite and talk pages', async () => {
    node.analytics = {
      a: 'test',
    };
    await node.updateComplete;
    const home = node.shadowRoot.querySelector('home-page');
    const talk = node.shadowRoot.querySelector('talk-page');
    const favourites = node.shadowRoot.querySelector('favourite-talks-page');

    expect(home.analytics).to.deep.equal({
      a: 'test',
    });
    expect(talk.analytics).to.deep.equal({
      a: 'test',
    });
    expect(favourites.analytics).to.deep.equal({
      a: 'test',
    });
  });

  it('should track page views', async () => {
    const trackSpy = sinon.stub();
    node.analytics = {
      trackPageView: trackSpy,
    };
    await node.updateComplete;

    node.routeData = {
      params: {
        page: 'blah',
      },
    };
    await node.updateComplete;

    expect(trackSpy.callCount).to.equal(1);
    expect(trackSpy.firstCall.args[0]).to.deep.equal({ name: 'blah' });
  });
});

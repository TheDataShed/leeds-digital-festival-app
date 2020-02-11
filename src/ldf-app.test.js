/* eslint-disable no-new */
import { expect } from 'chai';
import sinon from 'sinon';
import { LDFApp } from './ldf-app';

describe('ldf-app constructor tests', () => {
  let fetchStub;
  beforeEach(async () => {
    const expectedTalks = [
      {
        title: 'Talk',
        date: '2020-02-11T20:18:20.026Z',
        speaker: 'Roger',
        description: 'blblbllblblblbl',
      },
    ];
    fetchStub = sinon.stub(window, 'fetch');
    const jsonStub = sinon.stub();
    jsonStub.resolves(expectedTalks);

    fetchStub.resolves({
      ok: true,
      json: jsonStub,
    });
  });

  afterEach(() => {
    sinon.restore();
  });

  it('should call the routing service', async () => {
    const routingStub = sinon.stub(LDFApp.prototype, 'routing');
    new LDFApp();
    expect(routingStub.callCount).to.equal(1);
  });

  it('should call to load the talks', async () => {
    const app = document.createElement('ldf-app');
    document.body.appendChild(app);
    await app.updateComplete;
    expect(fetchStub.callCount).to.equal(1);
    expect(fetchStub.firstCall.args[0]).to.equal('./talks.json');
    await app.updateComplete;
    expect(app.talks).to.deep.equal([
      {
        title: 'Talk',
        date: '2020-02-11T20:18:20.026Z',
        speaker: 'Roger',
        description: 'blblbllblblblbl',
      },
    ]);
    app.remove();
  });
});

describe('ldf-app tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('ldf-app');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
    sinon.restore();
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
    const links = node.shadowRoot.querySelectorAll('a[href="/home"]');
    expect(links.length).to.equal(2);
    expect(Array.from(links).map(link => link.hasAttribute('data-selected'))).to.deep.equal([true, true]);
  });

  it('should load the talks', async () => {
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

    await node.loadTalks();
    expect(fetchStub.callCount).to.equal(1);
    expect(jsonStub.callCount).to.equal(1);
    expect(node.talks).to.deep.equal(expectedTalks);
    expect(node.isError).to.be.false;
    expect(node.isLoading).to.be.false;
    expect(fetchStub.firstCall.args[0]).to.equal('./talks.json');
  });

  it('should not explode if failing to load the talks and set isError state', async () => {
    const fetchStub = sinon.stub(window, 'fetch');
    fetchStub.rejects();

    await node.loadTalks();
    expect(fetchStub.callCount).to.equal(1);
    expect(node.isError).to.be.true;
    expect(node.isLoading).to.be.false;
  });

  it('should not load the talks if response isn\'t ok (200-299)', async () => {
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

    await node.loadTalks();
    expect(fetchStub.callCount).to.equal(1);
    expect(jsonStub.callCount).to.equal(0);
    expect(node.talks).to.deep.equal([]);
    expect(node.isError).to.be.true;
    expect(node.isLoading).to.be.false;
  });

  it('should set the loading property when loading the talks', () => {
    node.loadTalks();
    expect(node.isLoading).to.be.true;
  });
});

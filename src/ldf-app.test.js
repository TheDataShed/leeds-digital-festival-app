/* eslint-disable no-new */
import { expect } from 'chai';
import sinon from 'sinon';
import { LDFApp } from './ldf-app';

describe('ldf-app constructor tests', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should call the routing service', async () => {
    const routingStub = sinon.stub(LDFApp.prototype, 'routing');
    new LDFApp();
    expect(routingStub.callCount).to.equal(1);
  });
});

describe('ldf-app tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('ldf-app');
    window.appInsights = null;
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
});

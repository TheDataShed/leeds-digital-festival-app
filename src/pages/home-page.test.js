import { expect } from 'chai';
import './home-page';

describe('home-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('home-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render the header and titles', () => {
    const title = node.shadowRoot.querySelector('h1');
    expect(title.textContent).to.equal('LEEDS: THE DIGITAL\n        CAPITAL OF THE NORTH');
    const subTitles = node.shadowRoot.querySelectorAll('h2');
    expect(Array.from(subTitles).map((subTitle) => subTitle.textContent.trim())).to.deep.equal(['20th April to 1st May 2020', '#LeedsDigi20']);
  });

  it('should render the list of talks', async () => {
    node.talks = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
    ];
    await node.updateComplete;

    const talks = node.shadowRoot.querySelectorAll('talk-overview');
    expect(talks.length).to.equal(4);
  });

  it('should set active property on list if talks to render', async () => {
    node.talks = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
    ];
    await node.updateComplete;

    const list = node.shadowRoot.querySelector('.list');
    expect(list.getAttribute('active')).to.not.be.null;
  });

  it('should render the loading display when isLoading', async () => {
    const loading = node.shadowRoot.querySelector('loading-display');
    expect(node.isLoading).to.be.false;
    expect(loading.hidden).to.be.true;

    node.isLoading = true;
    await node.updateComplete;

    expect(node.isLoading).to.be.true;
    expect(loading.hidden).to.be.false;
  });

  it('should render the error display when isError', async () => {
    const error = node.shadowRoot.querySelector('error-display');
    expect(node.isError).to.be.false;
    expect(error.hidden).to.be.true;

    node.isError = true;
    await node.updateComplete;

    expect(node.isError).to.be.true;
    expect(error.hidden).to.be.false;
  });

  it('should check if a talk is favourited', async () => {
    node.favouriteTalks = ['1'];
    await node.updateComplete;

    const expectedTrue = node.isTalkFavourited({ id: '1' });
    expect(expectedTrue).to.be.true;

    const expectedFalse = node.isTalkFavourited({ id: '2' });
    expect(expectedFalse).to.be.false;
  });

  it('should pass the analytics down to talk overview', async () => {
    node.analytics = {
      a: 'test',
    };
    node.talks = [
      { id: '1' },
    ];
    await node.updateComplete;
    const talk = node.shadowRoot.querySelector('talk-overview');

    expect(talk.analytics).to.deep.equal({
      a: 'test',
    });
  });
});

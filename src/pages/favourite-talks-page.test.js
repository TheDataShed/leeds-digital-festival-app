import { expect } from 'chai';
import './favourite-talks-page';

describe('favourite-talks-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('favourite-talks-page');
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render only the list of favourited talks', async () => {
    node.talks = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
    ];
    node.favouriteTalks = ['1', '3'];
    await node.updateComplete;

    const talks = node.shadowRoot.querySelectorAll('talk-overview');
    expect(talks.length).to.equal(2);
  });

  it('should render only the list of favourited talks', async () => {
    node.talks = [
      { id: '1' },
      { id: '2' },
      { id: '3' },
      { id: '4' },
    ];
    node.favouriteTalks = ['1', '3'];
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

  it('should pass the analytics down to talk overview', async () => {
    node.analytics = {
      a: 'test',
    };
    node.talks = [
      { id: '1' },
    ];
    node.favouriteTalks = ['1'];
    await node.updateComplete;
    const talk = node.shadowRoot.querySelector('talk-overview');

    expect(talk.analytics).to.deep.equal({
      a: 'test',
    });
  });
});

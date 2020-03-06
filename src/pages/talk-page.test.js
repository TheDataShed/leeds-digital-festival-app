import { expect } from 'chai';
import './talk-page';

describe('talk-page tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('talk-page');
    node.talks = [{
      id: '1234567890',
      title: 'A talk',
      date: new Date(2019, 0, 1),
      speaker: 'bob',
      description: 'LOTS A WORDS',
    }, {
      id: '2',
      title: 'A second talk',
      date: new Date(2019, 0, 12),
      speaker: 'steve',
      description: 'LESS WORDS',
    }];
    node.routeData = {
      params: {
        id: '1234567890',
      },
    };
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should find the talk from the talks list', async () => {
    expect(node.talk).to.deep.equal({
      id: '1234567890',
      title: 'A talk',
      date: new Date(2019, 0, 1),
      speaker: 'bob',
      description: 'LOTS A WORDS',
    });
  });

  it('should render title', () => {
    const title = node.shadowRoot.querySelector('h1');
    expect(title.textContent).to.equal('A talk');
  });

  it('should render the formatted talk date', () => {
    const date = node.shadowRoot.querySelector('.date');
    const expected = new Intl.DateTimeFormat('default', {
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      weekday: 'long',
      hour12: true,
    }).format(new Date(2019, 0, 1));
    expect(date.textContent).to.equal(expected);
  });

  it('should render the speaker', () => {
    const speaker = node.shadowRoot.querySelector('h2.speaker');
    expect(speaker.textContent).to.equal('By: bob');
  });


  it('should render the full description', async () => {
    node.talk = {
      id: '1234567890',
      title: 'A talk',
      date: new Date(2019, 0, 1),
      speaker: 'bob',
      description: 'Spicy jalapeno bacon ipsum dolor amet spare ribs venison cow short ribs t-bone ground round boudin alcatra. Shankle fatback chicken salami, pancetta corned beef meatloaf. Tongue fatback chuck jerky shank bresaola filet mignon pork chop ball tip jowl. Picanha meatball tail, short ribs capicola sirloin beef ribs hamburger tongue. Burgdoggen buffalo andouille, strip steak drumstick swine alcatra. Brisket pork belly alcatra, tri-tip chuck doner jerky flank ham andouille tenderloin bacon cupim jerky flank ham andouille tenderloin bacon cupimjerky flank ham andouille tenderloin bacon cupim.',
    };
    await node.updateComplete;
    const content = node.shadowRoot.querySelector('.content>p');
    expect(content.textContent.length).to.be.equal(591);
    expect(content.textContent).to.equal('Spicy jalapeno bacon ipsum dolor amet spare ribs venison cow short ribs t-bone ground round boudin alcatra. Shankle fatback chicken salami, pancetta corned beef meatloaf. Tongue fatback chuck jerky shank bresaola filet mignon pork chop ball tip jowl. Picanha meatball tail, short ribs capicola sirloin beef ribs hamburger tongue. Burgdoggen buffalo andouille, strip steak drumstick swine alcatra. Brisket pork belly alcatra, tri-tip chuck doner jerky flank ham andouille tenderloin bacon cupim jerky flank ham andouille tenderloin bacon cupimjerky flank ham andouille tenderloin bacon cupim.');
  });

  it('should pass talk and favourited information into the favourite-talk element', async () => {
    node.favouriteTalks = ['1234567890'];
    await node.updateComplete;
    const favourite = node.shadowRoot.querySelector('favourite-talk');
    expect(favourite.isFavourited).to.be.true;
    expect(favourite.talk).to.deep.equal(node.talk);
  });

  it('should pass talk information into the share-talk element', async () => {
    const share = node.shadowRoot.querySelector('share-talk');
    expect(share.talk).to.deep.equal(node.talk);
  });

  it('should pass talk information into the directions-talk element', async () => {
    const directions = node.shadowRoot.querySelector('directions-talk');
    expect(directions.talk).to.deep.equal(node.talk);
  });

  it('should return an no talk found state if no talk is found in talk list', async () => {
    node.routeData = {
      params: {
        id: '3',
      },
    };
    await node.updateComplete;
    expect(node.talk).to.deep.equal({
      title: 'No Talk Found',
    });
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

  it('should pass the analytics down to favourite, directions and share', async () => {
    node.analytics = {
      a: 'test',
    };
    await node.updateComplete;
    const favourite = node.shadowRoot.querySelector('favourite-talk');
    const directions = node.shadowRoot.querySelector('directions-talk');
    const share = node.shadowRoot.querySelector('share-talk');

    expect(favourite.analytics).to.deep.equal({
      a: 'test',
    });
    expect(directions.analytics).to.deep.equal({
      a: 'test',
    });
    expect(share.analytics).to.deep.equal({
      a: 'test',
    });
  });
});

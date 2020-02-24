import { expect } from 'chai';
import './talk-overview';

describe('talk-overview tests', () => {
  let node;
  beforeEach(async () => {
    node = document.createElement('talk-overview');
    node.talk = {
      id: '1234567890',
      title: 'A talk',
      date: new Date(2019, 0, 1),
      speaker: 'bob',
      description: 'LOTS A WORDS',
    };
    document.body.appendChild(node);
    await node.updateComplete;
  });

  afterEach(() => {
    node.remove();
  });

  it('should render title and speaker', () => {
    const title = node.shadowRoot.querySelector('h2');
    expect(title.textContent).to.equal('A talk');
    const speaker = node.shadowRoot.querySelector('.speaker');
    expect(speaker.textContent).to.equal('By: bob');
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

  it('should render the first 200 characters of the description', async () => {
    node.talk = {
      id: '1234567890',
      title: 'A talk',
      date: new Date(2019, 0, 1),
      speaker: 'bob',
      description: 'Spicy jalapeno bacon ipsum dolor amet spare ribs venison cow short ribs t-bone ground round boudin alcatra. Shankle fatback chicken salami, pancetta corned beef meatloaf. Tongue fatback chuck jerky shank bresaola filet mignon pork chop ball tip jowl. Picanha meatball tail, short ribs capicola sirloin beef ribs hamburger tongue. Burgdoggen buffalo andouille, strip steak drumstick swine alcatra. Brisket pork belly alcatra, tri-tip chuck doner jerky flank ham andouille tenderloin bacon cupim.',
    };
    await node.updateComplete;
    const content = node.shadowRoot.querySelector('.content');
    expect(content.textContent.length).to.be.equal(203);
    expect(content.textContent).to.equal('Spicy jalapeno bacon ipsum dolor amet spare ribs venison cow short ribs t-bone ground round boudin alcatra. Shankle fatback chicken salami, pancetta corned beef meatloaf. Tongue fatback chuck jerky sh...');
  });

  it('should pass talk and favourited information into the favourite-talk element', async () => {
    node.isFavourited = true;
    await node.updateComplete;
    const favourite = node.shadowRoot.querySelector('favourite-talk');
    expect(favourite.isFavourited).to.be.true;
    expect(favourite.talk).to.deep.equal(node.talk);
  });
});

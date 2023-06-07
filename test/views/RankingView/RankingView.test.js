import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../../../src/views/RankingView/RankingView.js';

const playerArrayMock = [
  { name: 'Player1', maxScore: 30, score: 2 },
  { name: 'Player2', maxScore: 50, score: 8 },
  { name: 'Player3', maxScore: 12, score: 1 },
];

describe('RankingView component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<ranking-view></ranking-view>`);
  });

  it('should pass the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render the component', async () => {
    expect(element).to.exist;
  });

  it('should redirect to homeView when clicking Back button', async () => {
    const backBtn = element.shadowRoot.querySelector('.back-btn');

    expect(backBtn.href).to.equal('http://localhost:8000/home');
  });

  it('should sort players by max score with sortPlayersByMaxScore() function', async () => {
    element.playerArray = playerArrayMock;

    element.sortPlayersByMaxScore();

    expect(element.playerArray).to.deep.equal([
      { name: 'Player2', maxScore: 50, score: 8 },
      { name: 'Player1', maxScore: 30, score: 2 },
      { name: 'Player3', maxScore: 12, score: 1 },
    ]);
  });

  it('should get players from localStorage with getPlayersFromLocalStorage() function', async () => {
    localStorage.setItem('playerData', JSON.stringify(playerArrayMock));

    element.getPlayersFromLocalStorage();

    expect(element.playerArray).to.deep.equal(playerArrayMock);
  });

  it('should render all playerArray in a list', async () => {
    element.playerArray = playerArrayMock;
    element.requestUpdate();
    await element.updateComplete;

    const ul = element.shadowRoot.querySelector('.ranking-list');
    const liArray = element.shadowRoot.querySelectorAll('.ranking-item');

    expect(ul).to.exist;
    expect(liArray).to.have.lengthOf(3);
  });

  it('should add background-color property to players array with addColorsToPlayers() function', async () => {
    element.playerArray = playerArrayMock;
    element.requestUpdate();
    await element.updateComplete;

    const colorsMock = [
      { position: 1, backgroundColor: 'red' },
      { position: 2, backgroundColor: 'green' },
    ];

    element.addColorsToPlayers(element.playerArray, colorsMock);

    expect(element.playerArray).to.deep.equal([
      { name: 'Player2', maxScore: 50, score: 8, backgroundColor: 'red' },
      { name: 'Player1', maxScore: 30, score: 2, backgroundColor: 'green' },
      { name: 'Player3', maxScore: 12, score: 1, backgroundColor: '#000' },
    ]);
  });
});

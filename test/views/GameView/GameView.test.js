import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../src/views/GameView/GameView.js';

const playerArray = [
  { name: 'Player1', maxScore: 30, score: 2 },
  { name: 'Player2', maxScore: 50, score: 8 },
  { name: 'Player3', maxScore: 12, score: 1 },
];

describe('GameView component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<game-view></game-view>`);
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

  it('should call stopPlaying function and set isPlaying property to false when clicking Back button', async () => {
    const backBtn = element.shadowRoot.querySelector('.back-btn');
    const stopPlayingSpy = sinon.spy(element, 'stopPlaying');

    backBtn.addEventListener('click', event => {
      event.preventDefault();
    });

    element.requestUpdate();
    await element.updateComplete;

    backBtn.click();
    expect(stopPlayingSpy).to.have.been.called;
    expect(element.isPlaying).to.be.false;
  });

  it('should render traffic-light red/green image when isLightRed property is true/false', async () => {
    element.isLightRed = true;
    await element.updateComplete;
    const redLightIcon = element.shadowRoot.querySelector('.red-light-icon');
    expect(redLightIcon).to.exist;

    element.isLightRed = false;
    await element.updateComplete;
    const greenLightIcon =
      element.shadowRoot.querySelector('.green-light-icon');
    expect(greenLightIcon).to.exist;
  });

  it('should call play function when clicking walking buttons', async () => {
    const leftBtn = element.shadowRoot.querySelector('#left-btn');
    const rightBtn = element.shadowRoot.querySelector('#right-btn');
    const playSpy = sinon.spy(element, 'play');

    element.requestUpdate();
    await element.updateComplete;

    leftBtn.click();
    rightBtn.click();
    expect(playSpy).to.have.been.calledTwice;
  });

  it('should add one point to current score when walking buttons are alternately clicked and traffic-light is green', async () => {
    const leftBtn = element.shadowRoot.querySelector('#left-btn');
    const rightBtn = element.shadowRoot.querySelector('#right-btn');

    element.currentScore = 0;
    element.isLightRed = false;

    leftBtn.click();
    expect(element.currentScore).to.equal(1);
    rightBtn.click();
    expect(element.currentScore).to.equal(2);
    leftBtn.click();
    expect(element.currentScore).to.equal(3);
  });

  it('should substract one point to current score when when a walk button is clicked consecutively and traffic-light is green', async () => {
    const leftBtn = element.shadowRoot.querySelector('#left-btn');
    const rightBtn = element.shadowRoot.querySelector('#right-btn');

    element.currentScore = 10;
    element.isLightRed = false;

    leftBtn.click();
    expect(element.currentScore).to.equal(11);
    leftBtn.click();
    expect(element.currentScore).to.equal(10);
    leftBtn.click();
    expect(element.currentScore).to.equal(9);

    rightBtn.click();
    expect(element.currentScore).to.equal(10);
    rightBtn.click();
    expect(element.currentScore).to.equal(9);
    rightBtn.click();
    expect(element.currentScore).to.equal(8);
  });

  it('should set the current score to 0 when clicking any button with the traffic-light in red, but the maximum score remains', async () => {
    const leftBtn = element.shadowRoot.querySelector('#left-btn');
    const rightBtn = element.shadowRoot.querySelector('#right-btn');

    element.currentScore = 10;
    element.highScore = 10;
    element.isLightRed = true;

    leftBtn.click();
    expect(element.currentScore).to.equal(0);
    expect(element.highScore).to.equal(10);

    element.currentScore = 10;

    rightBtn.click();
    expect(element.currentScore).to.equal(0);
    expect(element.highScore).to.equal(10);
  });

  it('should save players to localStorage with savePlayersToLocalStorage() function', async () => {
    element.playerData = playerArray;
    element.savePlayersToLocalStorage();

    const recoveredValue = JSON.parse(localStorage.getItem('playerData'));

    expect(recoveredValue).to.deep.equal(playerArray);
  });

  it('should get players from localStorage with getPlayersFromLocalStorage() function', async () => {
    localStorage.setItem('playerData', JSON.stringify(playerArray));

    element.getPlayersFromLocalStorage();

    expect(element.playerData).to.deep.equal(playerArray);
  });

  it('should vibrate when a point is lost', async () => {
    const leftButton = element.shadowRoot.querySelector('#left-btn');
    const vibrateSpy = sinon.spy(navigator, 'vibrate');

    element.isLightRed = false;
    element.currentScore = 2;
    element.requestUpdate();
    await element.updateComplete;

    leftButton.click();
    leftButton.click();

    expect(vibrateSpy.calledWith(200)).to.be.true;
    vibrateSpy.restore();
  });

  it('should vibrate when all points are lost', async () => {
    const leftButton = element.shadowRoot.querySelector('#left-btn');
    const vibrateSpy = sinon.spy(navigator, 'vibrate');

    element.isLightRed = true;
    element.currentScore = 2;
    await element.updateComplete;

    leftButton.click();

    expect(vibrateSpy.calledWith(800)).to.be.true;
  });
});

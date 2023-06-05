import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../../src/views/HomeView/HomeView.js';

describe('HomeView component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<home-view></home-view>>`);
  });

  it('should pass the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render the component', async () => {
    expect(element).to.exist;
  });

  it('should render the component with default values', async () => {
    expect(element).to.exist;
    expect(element.homeViewTitle).to.equal('Create new player');
    expect(element.joinBtnText).to.equal('JOIN');
    expect(element.inputValue).to.be.equal('');
  });

  it('should render the Input component', async () => {
    const inputEl = element.shadowRoot.querySelector('input-component');
    expect(inputEl).to.exist;
  });

  it('should update inputValue on @input-value event', async () => {
    const inputEl = element.shadowRoot.querySelector('input-component');
    inputEl.dispatchEvent(new CustomEvent('input-value', { detail: 'Player' }));
    expect(element.inputValue).to.equal('Player');
  });

  it('should call sendPlayerName function when join-btn is clicked', async () => {
    const joinBtn = element.shadowRoot.querySelector('.join-btn');
    const sendPlayerNameSpy = sinon.spy(element, 'sendPlayerName');

    element.requestUpdate();
    await element.updateComplete;

    joinBtn.click();
    expect(sendPlayerNameSpy).to.have.been.called;
  });
});

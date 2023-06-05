import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../../../src/views/GameView/GameView.js';

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
});

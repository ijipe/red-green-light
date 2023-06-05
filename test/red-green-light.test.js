import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';

import '../src/red-green-light.js';

describe('RedGreenLight', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<red-green-light></red-green-light>`);
  });

  it('should pass the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render the component', async () => {
    expect(element).to.exist;
  });

  it('should render the homeView component', () => {
    const homeViewEl = element.shadowRoot.querySelector('home-view');
    expect(homeViewEl).to.exist;
  });
});

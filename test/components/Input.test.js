import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import sinon from 'sinon';

import '../../src/components/Input.js';

describe('Input component', () => {
  let element;
  beforeEach(async () => {
    element = await fixture(html`<input-component></input-component>`);
  });

  it('should pass the a11y audit', async () => {
    await expect(element).shadowDom.to.be.accessible();
  });

  it('should render the component', async () => {
    expect(element).to.exist;
  });

  it('should render the component with default values', async () => {
    const input = element.shadowRoot.querySelector('input');
    const label = element.shadowRoot.querySelector('label');
    expect(input).to.exist;
    expect(input.getAttribute('placeholder')).to.equal(' ');
    expect(input.getAttribute('type')).to.equal('text');
    expect(label).to.exist;
    expect(label.textContent).to.equal('');
  });

  it('should call dispatchValue function when input is changed', async () => {
    const input = element.shadowRoot.querySelector('input');
    const dispatchValueSpy = sinon.spy(element, 'dispatchValue');
    const changeEvent = new Event('change');

    element.requestUpdate();
    await element.updateComplete;

    input.dispatchEvent(changeEvent);
    expect(dispatchValueSpy).to.have.been.called;
  });
});

import { LitElement, html, css } from 'lit';

class RedGreenLight extends LitElement {
  static styles = css``;

  static properties = {};

  constructor() {
    super();
  }

  render() {
    return html` <main>Red-green-light game</main> `;
  }
}

customElements.define('red-green-light', RedGreenLight);

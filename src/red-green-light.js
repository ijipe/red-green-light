import { LitElement, html, css } from 'lit';
import './views/HomeView.js';

class RedGreenLight extends LitElement {
  static styles = css``;

  static properties = {};

  constructor() {
    super();
  }

  render() {
    return html` <main><home-view></home-view></main> `;
  }
}

customElements.define('red-green-light', RedGreenLight);

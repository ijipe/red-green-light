import { LitElement, html, css } from 'lit';

class HomeView extends LitElement {
  static styles = css``;

  static properties = {
    homeViewTitle: { type: String },
  };

  constructor() {
    super();
    this.homeViewTitle = 'Create new player';
  }

  render() {
    return html` <main>${this.homeViewTitle}</main> `;
  }
}

customElements.define('home-view', HomeView);

import { LitElement, html, css } from 'lit';

class GameView extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
  `;

  static properties = {
    gameViewTitle: { type: String },
  };

  constructor() {
    super();
    this.gameViewTitle = 'Game view';
  }

  render() {
    return html`
      <section>
        <a href="/home">Back</a>
        <div class="view-title">${this.gameViewTitle}</div>
      </section>
    `;
  }
}

customElements.define('game-view', GameView);

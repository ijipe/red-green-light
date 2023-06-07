import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import '../../components/Input.js';

class RankingView extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    header {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      padding: 20px 20px;
      background-color: #222;
      font-size: 25px;
      color: white;
    }

    .back-icon {
      width: 30px;
      height: 30px;
      margin-right: 10px;
      cursor: pointer;
    }

    .main-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 10px;
      font-size: 30px;
      margin-top: 80px;
    }
  `;

  static properties = {
    rankingViewTitle: { type: String },
  };

  constructor() {
    super();
    this.rankingViewTitle = 'Ranking';
  }

  render() {
    return html`
      <section>
        <header>
          <a class="back-btn" href="/home">
            <img
              class="back-icon"
              src="./assets/arrow-right.svg"
              alt="back icon"
            />
          </a>
        </header>
        <div class="main-container">${this.rankingViewTitle}</div>
      </section>
    `;
  }
}

customElements.define('ranking-view', RankingView);

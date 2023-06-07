import { LitElement, html, css } from 'lit';
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
      font-size: 30px;
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

    .ranking-list {
      list-style: none;
      width: 60%;
      margin: 30px 0;
    }

    .ranking-item {
      display: flex;
      justify-content: space-between;
      font-size: 25px;
      align-items: center;
      margin-bottom: 25px;
      padding: 2px 10px;
    }

    .ranking-item:hover {
      background-color: #5f6468;
      padding: 2px 10px;
      cursor: pointer;
      border-radius: 0.8rem;
    }

    .first-col {
      display: flex;
      align-items: center;
    }

    .star-icon {
      width: 40px;
      height: 40px;
      padding: 8px;
      background-color: #c888d4;
      border-radius: 50%;
      margin-right: 20px;
    }
  `;

  static properties = {
    rankingViewTitle: { type: String },
    playerArray: { type: Array },
    colorsArray: { type: Array },
  };

  constructor() {
    super();
    this.rankingViewTitle = 'Ranking';
    this.playerArray = [];
    this.colorsArray = [
      {
        position: 1,
        backgroundColor: '#efb810',
      },
      {
        position: 2,
        backgroundColor: '#BEBEBE',
      },
      {
        position: 3,
        backgroundColor: '#CD7F32',
      },
      {
        position: 4,
        backgroundColor: '#800015',
      },
      {
        position: 5,
        backgroundColor: '#800080',
      },
    ];
  }

  firstUpdated() {
    this.getPlayersFromLocalStorage();
    this.sortPlayersByMaxScore();
    this.addColorsToPlayers(this.playerArray, this.colorsArray);
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
        <div class="main-container">
          <span class="ranking-title">${this.rankingViewTitle}</span>
          <ul class="ranking-list">
            ${this.playerArray.map(
              item => html`
                <li class="ranking-item">
                  <div class="first-col">
                    <img
                      class="star-icon"
                      src="./assets/star-solid.svg"
                      alt="star icon"
                      style="background-color: ${item.backgroundColor};"
                    />
                    <span>${item.name}</span>
                  </div>
                  <div class="second-col">
                    <span>${item.maxScore}</span>
                  </div>
                </li>
              `
            )}
          </ul>
        </div>
      </section>
    `;
  }

  getPlayersFromLocalStorage() {
    if (localStorage.getItem('playerData')) {
      this.playerArray = JSON.parse(localStorage.getItem('playerData'));
    }
  }

  sortPlayersByMaxScore() {
    this.playerArray.sort((a, b) => b.maxScore - a.maxScore);
  }

  addColorsToPlayers(players, colors) {
    players.forEach((player, index) => {
      const color = colors.find(color => color.position === index + 1) || {
        backgroundColor: '#000',
      };
      player.backgroundColor = color.backgroundColor;
    });
  } 
}

customElements.define('ranking-view', RankingView);

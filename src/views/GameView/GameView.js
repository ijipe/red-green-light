import { LitElement, html, css } from 'lit';

class GameView extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 20px 20px;
      background-color: #222;
      font-size: 25px;
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

    .red-light-icon,
    .green-light-icon {
      width: 100px;
      height: 100px;
      margin: 40px 0 15px 0;
    }

    .walking-buttons {
      display: flex;
      justify-content: center;
      width: 100vw;
      margin-top: 40px;
    }

    #left-btn,
    #right-btn {
      display: flex;
      flex-direction: row;
      width: 44%;
      height: 60px;
      font-size: 20px;
      align-items: center;
      justify-content: center;
      background-color: #85c1f8;
      border-style: none;
      outline: none;
    }

    #left-btn {
      border-radius: 0.5rem 0 0 0.5rem;
      border-right: 0.5px solid #3f8ed8;
    }

    #right-btn {
      border-radius: 0 0.5rem 0.5rem 0;
      border-left: 0.5px solid #3f8ed8;
    }

    .shoe-prints-icon {
      transform: rotate(270deg);
      width: 40px;
      height: 40px;
      margin-right: 10px;
    }
  `;

  static properties = {
    gameViewTitle: { type: String },
    playerName: { type: String },
    highScore: { type: Number },
    score: { type: Number },
    isLightRed: { type: Boolean },
  };

  constructor() {
    super();
    this.gameViewTitle = 'Game view';
    this.playerName = 'Player';
    this.highScore = 0;
    this.score = 0;
    this.isLightRed = true;
  }

  render() {
    return html`
      <section>
        <header>
          <div>Hi ${this.playerName}</div>
          <a class="back-btn" href="/home">
            <img
              class="back-icon"
              src="./assets/arrow-right.svg"
              alt="back icon"
            />
          </a>
        </header>
        <div class="main-container">
          <div class="high-score">High Score: ${this.highScore}</div>
          <div class="traffic-light-icon">
            ${this.isLightRed
              ? html`<img
                  class="red-light-icon"
                  src="./assets/traffic-light-solid-red.svg"
                  alt="red-light icon"
                />`
              : html`<img
                  class="green-light-icon"
                  src="./assets/traffic-light-solid-green.svg"
                  alt="green-light icon"
                />`}
          </div>
          <div class="score">Score: ${this.score}</div>
          <div class="walking-buttons">
            <button id="left-btn">
              <img
                class="shoe-prints-icon"
                src="./assets/shoe-prints-solid.svg"
                alt="shoe-prints icon"
              />
              <span>LEFT</span>
            </button>
            <button id="right-btn">
              <img
                class="shoe-prints-icon"
                src="./assets/shoe-prints-solid.svg"
                alt="shoe-prints icon"
              />
              <span>RIGHT</span>
            </button>
          </div>
        </div>
      </section>
    `;
  }
}

customElements.define('game-view', GameView);

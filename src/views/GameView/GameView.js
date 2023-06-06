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
    playerName: { type: String },
    highScore: { type: Number },
    currentScore: { type: Number },
    isLightRed: { type: Boolean },
    previousBtnSelected: { type: String },
    isPlaying: { type: Boolean },
  };

  constructor() {
    super();
    this.playerName = 'Player';
    this.highScore = 0;
    this.currentScore = 0;
    this.isLightRed = true;
    this.previousBtnSelected = '';
    this.isPlaying = true;
  }

  firstUpdated() {
    setTimeout(() => {
      this.isLightRed = false;
    }, 3000);
  }

  updated(changedProperties) {
    const greenLightTime =
      Math.max(10000 - this.currentScore * 100, 2000) +
      Math.random(-1500, 1500);
    if (changedProperties.has('isLightRed') && this.isPlaying) {
      if (!this.isLightRed) {
        setTimeout(() => {
          this.isLightRed = true;
        }, greenLightTime);
      } else {
        setTimeout(() => {
          this.isLightRed = false;
        }, 3000);
      }
    }
  }

  render() {
    return html`
      <section>
        <header>
          <div>Hi ${this.playerName}</div>
          <a class="back-btn" href="/home" @click=${this.stopPlaying}>
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
          <div class="score">Score: ${this.currentScore}</div>
          <div class="walking-buttons">
            <button id="left-btn" @click=${this.play}>
              <img
                class="shoe-prints-icon"
                src="./assets/shoe-prints-solid.svg"
                alt="shoe-prints icon"
              />
              <span>LEFT</span>
            </button>
            <button id="right-btn" @click=${this.play}>
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

  play(e) {
    const currentBtnSelected = e.currentTarget.id;

    if (!this.isLightRed) {
      if (
        currentBtnSelected === this.previousBtnSelected &&
        this.currentScore > 0
      ) {
        this.currentScore--;
      }

      if (currentBtnSelected !== this.previousBtnSelected) {
        this.currentScore++;
      }

      this.previousBtnSelected = currentBtnSelected;

      if (this.currentScore > this.highScore) {
        this.highScore = this.currentScore;
      }
    } else {
      this.currentScore = 0;
    }
  }

  stopPlaying() {
    this.isPlaying = false;
  }
}

customElements.define('game-view', GameView);

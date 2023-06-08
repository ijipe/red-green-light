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
    playerData: { type: Array },
    song: { type: Object },
    errorSound: { type: Object },
    timeoutReference: { type: Object },
  };

  constructor() {
    super();
    this.playerName = '';
    this.highScore = 0;
    this.currentScore = 0;
    this.isLightRed = true;
    this.previousBtnSelected = '';
    this.isPlaying = true;
    this.playerData = [];
    this.song = new Audio('./assets/audio/song.mp3');
    this.errorSound = new Audio('./assets/audio/errorSound.mp3');
    this.timeoutReference = {};
  }

  firstUpdated() {
    this.getPlayersFromLocalStorage();
    this.initializeCurrentPlayer();

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
          this.pauseAudio(this.song);
        }, greenLightTime);
      } else {
        this.timeoutReference = setTimeout(() => {
          // speed is increased 1% each point, starting at 0.8
          const songSpeed = 0.8 * (1 + this.currentScore / 100);

          this.isLightRed = false;
          this.playAudio(this.song, 0.2, songSpeed);
        }, 3000);
      }
    }
  }

  render() {
    return html`
      <section>
        <header>
          <div class="player-name">Hi ${this.playerName}</div>
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
        navigator.vibrate(200);
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
      this.playAudio(this.errorSound, 0.8, 1.5);
      navigator.vibrate(800);
    }

    this.updateCurrentPlayer();
    this.savePlayersToLocalStorage();
  }

  stopPlaying() {
    this.isPlaying = false;
    this.pauseAudio(this.song);
    clearTimeout(this.timeoutReference);
  }

  initializeCurrentPlayer() {
    this.playerName = localStorage.getItem('currentPlayer');

    const currentPlayer = this.playerData.find(
      player => player.name === this.playerName
    );

    if (currentPlayer) {
      this.highScore = currentPlayer.maxScore;
      this.currentScore = currentPlayer.score;
    }
  }

  updateCurrentPlayer() {
    const currentPlayer = this.playerData.find(
      player => player.name === this.playerName
    );

    if (currentPlayer) {
      currentPlayer.maxScore = this.highScore;
      currentPlayer.score = this.currentScore;
    } else {
      const newPlayer = {
        name: this.playerName,
        maxScore: this.highScore,
        score: this.currentScore,
      };
      this.playerData.push(newPlayer);
    }
  }

  savePlayersToLocalStorage() {
    localStorage.setItem('playerData', JSON.stringify(this.playerData));
  }

  getPlayersFromLocalStorage() {
    if (localStorage.getItem('playerData')) {
      this.playerData = JSON.parse(localStorage.getItem('playerData'));
    }
  }

  playAudio(audio, volume, speed) {
    audio.volume = volume;
    audio.playbackRate = speed;
    audio.play();
  }

  pauseAudio(audio) {
    audio.pause();
  }
}

customElements.define('game-view', GameView);

import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';
import '../../components/Input.js';

class HomeView extends LitElement {
  static styles = css`
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }

    section {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-top: 140px;
      gap: 25px;
    }

    .computer-mouse-icon {
      width: 50px;
      height: 50px;
      padding: 10px;
      background-color: #c888d4;
      border-radius: 50%;
    }

    .view-title {
      font-size: 38px;
    }

    .join-btn {
      border-radius: 0.5rem;
      background-color: #85c2f8;
      height: 55px;
      width: 85%;
      margin-top: 15px;
      font-size: 20px;
      outline: none;
      border-style: none;
      cursor: pointer;
    }

    .join-btn:hover {
      background-color: #c888d4;
    }

    input-component {
      display: flex;
      width: 85%;
      margin-top: 10px;
    }
  `;

  static properties = {
    homeViewTitle: { type: String },
    joinBtnText: { type: String },
    labelTitle: { type: String },
    inputValue: { type: String },
  };

  constructor() {
    super();
    this.homeViewTitle = 'Create new player';
    this.joinBtnText = 'JOIN';
    this.labelTitle = 'Name* ';
    this.inputValue = '';
  }

  render() {
    return html`
      <section>
        <img
          class="computer-mouse-icon"
          src="../assets/computer-mouse-solid.svg"
          alt="computer-mouse icon"
        />
        <div class="view-title">${this.homeViewTitle}</div>
        <input-component
          .labelText=${this.labelTitle}
          @input-value=${this.getInputValue}
        ></input-component>
        <button class="join-btn" @click=${this.sendPlayerName}>
          ${this.joinBtnText}
        </button>
      </section>
    `;
  }
  getInputValue(e) {
    this.inputValue = e.detail;
  }

  sendPlayerName() {
    if (this.inputValue) {
      localStorage.setItem('currentPlayer', this.inputValue);

      Router.go({
        pathname: '/game',
      });
    }
  }
}

customElements.define('home-view', HomeView);

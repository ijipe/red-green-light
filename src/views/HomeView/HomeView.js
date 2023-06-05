import { LitElement, html, css } from 'lit';

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
      gap: 20px;
    }

    img {
      padding: 13px;
      background-color: #c888d4;
      weight: 60px;
      height: 60px;
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
      font-size: 20px;
      outline: none;
      border-style: none;
      cursor: pointer;
    }

    .join-btn:hover {
      background-color: #c888d4;
    }
  `;

  static properties = {
    homeViewTitle: { type: String },
    joinBtnText: { type: String },
  };

  constructor() {
    super();
    this.homeViewTitle = 'Create new player';
    this.joinBtnText = 'JOIN';
  }

  render() {
    return html`
      <section>
        <img
          src="../assets/computer-mouse-solid.svg"
          alt="computer-mouse icon"
        />
        <div class="view-title">${this.homeViewTitle}</div>

        <button class="join-btn">${this.joinBtnText}</button>
      </section>
    `;
  }
}

customElements.define('home-view', HomeView);

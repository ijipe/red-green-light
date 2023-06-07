import { LitElement, html, css } from 'lit';
import { Router } from '@vaadin/router';

class RedGreenLight extends LitElement {
  static styles = css``;

  static properties = {};

  constructor() {
    super();
  }

  firstUpdated() {
    const outlet = this.renderRoot.querySelector('#outlet');
    const router = new Router(outlet);
    router.setRoutes([
      {
        name: 'home',
        path: '/',
        component: 'home-view',
        action: async () => {
          await import('./views/HomeView/HomeView.js');
        },
      },
      {
        name: 'home',
        path: '/home',
        component: 'home-view',
        action: async () => {
          await import('./views/HomeView/HomeView.js');
        },
      },
      {
        name: 'game',
        path: '/game',
        component: 'game-view',
        action: async () => {
          await import('./views/GameView/GameView.js');
        },
      },
      {
        name: 'ranking',
        path: '/ranking',
        component: 'ranking-view',
        action: async () => {
          await import('./views/RankingView/RankingView.js');
        },
      },
      {
        path: '(.*)',
        redirect: '/home',
      },
    ]);
  }

  render() {
    return html`
      <main>
        <div id="outlet"></div>
      </main>
    `;
  }
}

customElements.define('red-green-light', RedGreenLight);

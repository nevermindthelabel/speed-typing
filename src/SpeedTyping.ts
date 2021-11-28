import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';
import allCharacters, { escaped } from './assets';

export class SpeedTyping extends LitElement {
  @property({ type: String }) character = '';

  @property({ type: Boolean }) error = false;

  @property({ type: Number }) numCorrect = 0;

  @property({ type: Number }) numIncorrect = 0;

  static styles = css`
    :host {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      font-size: calc(10px + 2vmin);
      color: #1a2b42;
      max-width: 960px;
      margin: 0 auto;
      text-align: center;
    }

    @keyframes shake {
      0% {
        transform: translate(1px, 1px) rotate(0deg);
      }
      10% {
        transform: translate(-1px, -2px) rotate(-1deg);
      }
      20% {
        transform: translate(-3px, 0px) rotate(1deg);
      }
      30% {
        transform: translate(3px, 2px) rotate(0deg);
      }
      40% {
        transform: translate(1px, -1px) rotate(1deg);
      }
      50% {
        transform: translate(-1px, 2px) rotate(-1deg);
      }
      60% {
        transform: translate(-3px, 1px) rotate(0deg);
      }
      70% {
        transform: translate(3px, 1px) rotate(-1deg);
      }
      80% {
        transform: translate(-1px, -1px) rotate(1deg);
      }
      90% {
        transform: translate(1px, 2px) rotate(0deg);
      }
      100% {
        transform: translate(1px, -2px) rotate(-1deg);
      }
    }

    main {
      flex-grow: 1;
    }

    main.error {
      width: 100%;
      height: 100%;
      background-color: #ff0000;
      animation: shake 0.5s;
    }

    h1 {
      color: var(--light-text-color);
    }

    .character {
      font-weight: 900;
      font-size: 4rem;
      color: var(--light-text-color);
    }

    .scoreboard {
      margin: 6rem;
    }

    .app-footer {
      font-size: calc(12px + 0.5vmin);
      align-items: center;
    }
  `;

  getRandomChar() {
    return allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  connectedCallback() {
    super.connectedCallback();
    this.character = this.getRandomChar();
    document.addEventListener('keydown', e => this.handleKey(e.key));
  }

  handleKey(key: any) {
    console.log(key);
    if (escaped.includes(key)) {
      return;
    }
    if (key === this.character) {
      this.numCorrect += 1;
      this.character = this.getRandomChar();
    } else {
      const getStyle = getComputedStyle(
        document.documentElement
      ).getPropertyValue('--background-color');
      setTimeout(() => {
        this.error = false;
        document.documentElement.style.setProperty(
          '--background-color',
          `${getStyle}`
        );
      }, 1000);
      this.error = true;
      document.documentElement.style.setProperty(
        '--background-color',
        '#ff0000'
      );
      this.numIncorrect += 1;
    }
  }

  firstUpdated() {}

  updated() {}

  render() {
    return html`
      <main class=${this.error ? 'error' : ''}>
        <h1>Type the character</h1>
        <p class="character">${this.character}</p>
        <div class="scoreboard">
          <p class="score">Your Score</p>
          <p class="correct">correct: ${this.numCorrect}</p>
          <p class="incorrect">incorrect: ${this.numIncorrect}</p>
        </div>
      </main>
      <p class="app-footer"></p>
    `;
  }
}

import { LitElement, html, css } from 'lit';

class Input extends LitElement {
  static styles = css`
    .div-form {
      display: flex;
      width: 100%;
      position: relative;
    }

    #input {
      position: relative;
      width: 100%;
      padding: 18px 10px;
      border: 2px solid #85c1f8;
      border-radius: 0.3rem;
      padding-left: 20px;
      cursor: text;
      background: none;
      font-size: 22px;
      color: white;
      outline: none;
      transition: border-color 0.3s ease;
    }

    #input:focus {
      border-color: #c888d4;
    }

    label {
      position: absolute;
      top: 20px;
      left: 15px;
      font-size: 22px;
      color: #85c1f8;
      padding: 0 0.5rem 0 0.3rem;
      background-color: black;
      transform-origin: top left;
      transition: transform 0.3s ease-out, color 0.3s ease-out;
    }

    #input:focus + label,
    #input:not(:placeholder-shown) + label {
      transform: translateY(-125%) scale(0.8);
      color: #c888d4;
    }

    #label:not(:focus) {
      top: 30px;
    }
  `;

  static properties = {
    labelText: { type: String },
  };

  constructor() {
    super();
    this.labelText = '';
  }

  render() {
    return html`
      <div class="div-form">
        <input
          type="text"
          id="input"
          placeholder=" "
          @change=${this.dispatchValue}
        />
        <label for="input" aria-label="Player name">${this.labelText}</label>
      </div>
    `;
  }

  dispatchValue() {
    const inputValue = this.renderRoot.querySelector('input').value.trim();
    if (inputValue) {
      const event = new CustomEvent('input-value', {
        detail: inputValue,
        bubbles: true,
        composed: true,
      });
      this.dispatchEvent(event);
    }
  }
}

customElements.define('input-component', Input);

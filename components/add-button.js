import {LitElement, html, css} from 'lit';

export class AddButton extends LitElement {
  static styles = [
    css`
      button {
        border: none;
        border-radius: 4px;
        background-color: #2a2b2c;
        color: #fff;
        padding: 10px;
        cursor: pointer;
        transition: opacity 0.3s ease-in-out;
      }

      button:hover {
        opacity: 0.85;
      }

      button:active {
        opacity: 1;
      }
    `,
  ];

  static properties = {
    pid: {type: Number},
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        <slot></slot>
      </button>
    `;
  }

  _onClick() {
    this.count++;
    window.MicroBus.emit('cart-change', {id: this.pid, type: 'add'});
  }
}
customElements.define('add-button', AddButton);

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
    count: {type: Number},
  };

  constructor() {
    super();
    this.count = 0;
    window.MicroBus.on('cart-change', (e) => {
      this.count = e.detail.count;
      console.log(e);
    });
  }

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        <slot></slot> : ${this.count}
      </button>
    `;
  }

  _onClick() {
    this.count++;
    //this.dispatchEvent(new CustomEvent('count-changed'));
    window.MicroBus.emit('cart-change', {count: this.count, id: this.pid});
    console.log('product id: ', this.pid);
  }
}
customElements.define('add-button', AddButton);

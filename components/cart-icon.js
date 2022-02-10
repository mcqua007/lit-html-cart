import {LitElement, html, css} from 'lit';

export class CartIcon extends LitElement {
  static styles = [
    css`
      :host {
      }
      button {
        border: none;
        line-height: 1;
        cursor: pointer;
        background-color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 24px;
        height: 24px;
        border-radius: 50%;
        font-weight: 600;
        color: #2a2b2c;
      }
    `,
  ];

  static properties = {
    count: {type: Number},
  };

  constructor() {
    super();
    this.count = 0;

    window.MicroBus.on('cart-change', (e) => {
      console.log('Cart Icon - Cart changed', e);
      this.count = e.detail.count;
    });

    window.MicroBus.on('cart-count-changed', (e) => {
      this.count = e.detail.count;
    });
  }

  render() {
    return html`<button @click=${this._onClick}>${this.count}</button>`;
  }

  _onClick(e) {
    console.log('Click: ', e);
    window.MicroBus.emit('cart-sidebar-toggle', {});
  }
}

customElements.define('cart-icon', CartIcon);

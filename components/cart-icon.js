import {LitElement, html, css} from 'lit';

export class CartIcon extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
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
    return html` <span>Count: ${this.count}</span> `;
  }
}

customElements.define('cart-icon', CartIcon);

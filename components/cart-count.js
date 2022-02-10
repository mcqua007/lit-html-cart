import {LitElement, html, css} from 'lit';

export class CartCount extends LitElement {
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

    window.MicroBus.on('count-change', (e) => {
      this.count = e.detail.count;
    });
  }

  render() {
    return html`${this.count}`;
  }
}

customElements.define('cart-count', CartCount);

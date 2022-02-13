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
    el: {type: String},
  };

  constructor() {
    super();
  }

  render() {
    return html`
      <button @click=${this._onClick}>
        <cart-count></cart-count>
      </button>
    `;
  }

  _onClick() {
    window.MicroBus.emit('side-drawer-toggle', {el: this.el, pos: 'right'});
  }
}

customElements.define('cart-icon', CartIcon);

import {LitElement, html, css} from 'lit';

export class CartRemoveBtn extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
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
  }

  render() {
    return html`<button @click=${this._onClick}>Remove</button>`;
  }

  _onClick() {
    console.log('Removed in own comp', this.pid);
  }
}
customElements.define('cart-remove-btn', CartRemoveBtn);

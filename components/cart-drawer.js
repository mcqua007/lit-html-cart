/* eslint-disable no-undef */
import {LitElement, html, css} from 'lit';
//TODO: Make cart count event listenr happen on one event across any cart change
export class CartDrawer extends LitElement {
  static get styles() {
    return css`
      :host {
        display: block;
        border: solid 1px gray;
        padding: 16px;
        max-width: 500px;
      }

      .flex {
        display: flex;
      }
      .cart-item {
        display: flex;
        width: 100%;
      }
      .cart-item > .right {
        margin-left: 10px;
        flex: 1;
        display: flex;
        flex-direction: column;
        justify-content: center;
      }

      .cart-item img {
        width: 100%;
        height: auto;
        max-width: 80px;
        min-height: 80px;
      }

      .cart-item .cart-item_variant {
        margin-bottom: 10px;
        font-style: italic;
        color: #ccc;
        font-size: 0.8em;
        text-transform: capitalize;
      }

      .flex._jc-space-between {
        justify-content: space-between;
      }

      .margin-b-xs {
        margin-bottom: 6px;
      }
    `;
  }

  static properties = {
    pid: {type: Number},
    count: {type: Number},
    product: {type: Object},
    cartItems: {type: Array},
  };

  constructor() {
    super();
    this.count = 0;
    this.cartItems = [];

    window.MicroBus.on('cart-change', async (e) => {
      console.log('event: ', e);
      if (e.detail.id) {
        this.getProductData(e.detail.id).then((data) => {
          this.cartItems.push(data);
          this.count = e.detail.count;
          console.log('Cart Items: ', this.cartItems);
        });
      }
    });
  }

  //mock api call to get product data
  getProductData(id) {
    return new Promise((resolve) => {
      fetch('mock-api/products.json')
        .then((response) => response.json())
        .then((data) => {
          console.log('All Products: ', data);
          resolve(data.find((el) => el.id == id));
        });
    });
  }
  //build cart html
  buildCartItems() {
    if (this.count > 0 && this.cartItems) {
      return html`
        ${this.cartItems.map((item) => {
          return html`
            <div class="cart-item">
              <div class="left"><img src="${item.image}" /></div>
              <div class="right">
                <div class="margin-b-xs flex _jc-space-between">
                  <div>${item.title}</div>
                  <div>$${item.price}</div>
                </div>
                <div class="margin-b-xs flex _jc-space-between">
                  <div class="cart-item_variant">${item.color}</div>
                  <button @click=${() => this._removeItem(item.id)}>
                    remove
                  </button>
                  <!-- <cart-remove-btn .pid=${item.id}></cart-remove-btn> -->
                </div>
              </div>
            </div>
          `;
        })}
      `;
    } else {
      return html` <p>Your cart is currently empty!</p> `;
    }
  }
  render() {
    return html` <div>
      <h4>Cart (${this.count} Items)</h4>
      <div class="cart-container">${this.buildCartItems()}</div>
    </div>`;
  }

  _removeItem(id) {
    let index = this.cartItems.findIndex((el) => el.id == id);
    let arr = [...this.cartItems];
    arr.splice(index, 1);
    this.cartItems = arr;
    this.count--;
    window.MicroBus.emit('cart-change', {count: this.count});
  }
}

customElements.define('cart-drawer', CartDrawer);

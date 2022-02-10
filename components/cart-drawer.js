/* eslint-disable no-undef */
import {LitElement, html, css} from 'lit';
//TODO: Make cart count event listenr happen on one event across any cart change
export class CartDrawer extends LitElement {
  static get styles() {
    return css`
      :host {
      }

      .cart-slider {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 430px;
        width: 100%;
        position: fixed;
        right: 0;
        top: 0;
        background: #fff;
        z-index: 2;
        box-shadow: 1px 0px 20px -5px #bfbfbf;
        height: 100%;
        padding: 16px 0;
        transform: translateX(105%);
        transition: transform 0.35s ease-in-out;
      }

      .cart-slider[aria-hidden='false'] {
        transform: none;
      }

      button {
        cursor: pointer;
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

      .cart-slider .cart-slider_top {
        border-bottom: 1px solid #eee;
        padding-bottom: 16px;
      }

      .cart-slider header {
        display: flex;
        border-bottom: 1px solid #eee;
        padding: 0 16px 16px 16px;
        align-items: center;
      }

      .cart-slider header h4 {
        margin: 0 auto;
        text-align: center;
      }

      .cart-slider .cart-slider_products {
        height: 100%;
        margin-top: 10px;
        overflow-y: auto;
        padding: 0 10px 10px 10px;
      }

      .cart-slider_bottom {
        height: 100%;
        max-height: 80px;
        display: flex;
        padding: 0 10px;
        border-top: 1px solid rgb(238, 238, 238);
      }

      .checkout-btn {
        display: flex;
        background: #2a2b2c;
        border: none;
        width: 100%;
        color: #fff;
        justify-content: center;
        align-items: center;
        padding: 10px;
        margin: 10px 0;
        font-size: 18px;
        font-weight: 500;
        cursor: pointer;
        height: 45px;
        border-radius: 5px;
      }

      .close-cart-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }

      .empty-cart-text {
        margin: auto 0;
        display: flex;
        justify-content: center;
        height: 100%;
        align-items: center;
      }

      .remove-btn {
        background: none;
        border: 1px solid #aaa;
        color: #aaa;
        line-height: 1;
      }
    `;
  }

  static properties = {
    pid: {type: Number},
    count: {type: Number},
    product: {type: Object},
    cartItems: {type: Array},
    hide: {type: Boolean},
  };

  constructor() {
    super();
    this.count = 0;
    this.hide = true;
    this.cartItems = [];

    window.MicroBus.on('cart-change', async (e) => {
      console.log('event: ', e);
      if (e.detail.id) {
        this.getProductData(e.detail.id).then((data) => {
          this.cartItems.push(data);
          this.count = this.count + 1;
          window.MicroBus.emit('count-change', {count: this.count});
          window.MicroBus.emit('cart-sidebar-toggle');
        });
      }
    });

    window.MicroBus.on('cart-sidebar-toggle', () => {
      this.hide = !this.hide;
      window.MicroBus.emit('body-overlay-toggle');
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
                  <button
                    class="remove-btn"
                    @click=${() => this._removeItem(item.id)}
                  >
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
      return html`
        <p class="empty-cart-text">Your cart is currently empty!</p>
      `;
    }
  }
  render() {
    return html`
      <div class="cart-slider" aria-hidden=${this.hide}>
        <header>
          <h4>My Bag (<cart-count></cart-count> items)</h4>
          <button class="close-cart-btn" @click=${this._closeCart}>
            <img src="icons/times.svg" width="28" height="28" />
          </button>
        </header>
        <div class="cart-slider_products">${this.buildCartItems()}</div>
        <div class="cart-slider_bottom">
          <button class="checkout-btn">Checkout</button>
        </div>
      </div>
    `;
  }

  _removeItem(id) {
    let index = this.cartItems.findIndex((el) => el.id == id);
    let arr = [...this.cartItems];
    arr.splice(index, 1);
    this.cartItems = arr;
    this.count = this.count - 1;
    window.MicroBus.emit('count-change', {count: this.count});
  }

  _closeCart() {
    window.MicroBus.emit('cart-sidebar-toggle');
  }
}

customElements.define('cart-drawer', CartDrawer);

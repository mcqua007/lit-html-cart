import {LitElement, html, css} from 'lit';

export class MenuDrawer extends LitElement {
  static styles = [
    css`
      :host {
      }

      h4 {
        margin: 0 auto;
      }

      header {
        padding: 10px 16px 16px 16px;
        display: flex;
        justify-content: space-between;
        align-items: center;
      }

      nav > ul {
        list-style: none;
        margin-block: 0;
        padding-inline: 0;
      }

      li {
        border-top: 1px solid #ccc;
        padding: 10px;
      }

      li:last-child {
        border-bottom: 1px solid #ccc;
      }

      button.close-btn {
        background: none;
        border: none;
        padding: 0;
        cursor: pointer;
      }
    `,
  ];

  static properties = {
    open: {type: Boolean},
  };

  constructor() {
    super();
    this.open = false;
  }

  connectedCallback() {
    super.connectedCallback();
    window.MicroBus.on('menu-toggle', () => {
      this._toggle();
    });
  }

  _toggle() {
    this.open = !this.open;
  }

  render() {
    return html`
      <side-drawer id="cart-drawer" position="left" .open=${this.open}>
        <div class="menu-drawer">
          <header>
            <h4>Menu</h4>
            <button class="close-btn" @click=${this._toggle}>
              <img src="icons/times.svg" width="28" height="28" />
            </button>
          </header>
          <nav>
            <ul>
              <li>Home</li>
              <li>Collection</li>
              <li>About</li>
              <li>Cart</li>
              <li>Contact Us</li>
            </ul>
          </nav>
        </div>
      </side-drawer>
    `;
  }
}
customElements.define('menu-drawer', MenuDrawer);

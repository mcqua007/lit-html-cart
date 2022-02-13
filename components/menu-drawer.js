import {LitElement, html, css} from 'lit';

export class MenuDrawer extends LitElement {
  static styles = [
    css`
      :host {
      }

      h4 {
        text-align: center;
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
      this.open = true;
      console.log('1.MD open', this.open);
    });
  }

  _hide() {
    window.MicroBus.emit('menu-toggle');
  }

  render() {
    return html`
      <side-drawer id="cart-drawer" position="left" .open=${this.open}>
        <h4>Menu</h4>
        <button class="close-btn" @click=${this._hide}>
          <img src="icons/times.svg" width="28" height="28" />
        </button>
        <nav>
          <ul>
            <li>Home</li>
            <li>Collection</li>
            <li>About</li>
            <li>Cart</li>
            <li>Contact Us</li>
          </ul>
        </nav>
      </side-drawer>
    `;
  }
}
customElements.define('menu-drawer', MenuDrawer);

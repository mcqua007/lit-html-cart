import {LitElement, html, css} from 'lit';

export class SideDrawer extends LitElement {
  static styles = [
    css`
      .sidebar {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        max-width: 430px;
        width: 100%;
        position: fixed;
        top: 0;
        background: #fff;
        z-index: 2;
        box-shadow: 1px 0px 20px -5px #bfbfbf;
        height: 100%;
        padding: 16px 0;
        transition: transform 0.35s ease-in-out;
      }

      .sidebar.right {
        right: 0;
        transform: translateX(105%);
      }

      .sidebar.left {
        left: 0;
        transform: translateX(-105%);
      }

      .sidebar[aria-hidden='false'] {
        transform: none;
      }
      button.close-btn {
        background: none;
        border: none;
        cursor: pointer;
        position: absolute;
        font-size: 25px;
        right: 0;
        top: 0;
        padding: 10px;
      }
    `,
  ];

  static properties = {
    hide: {type: Boolean},
    position: {type: String},
    open: {type: Boolean},
  };

  constructor() {
    super();
    this.hide = true;
    this.child = null;
    this.position = this.position ? this.position : 'left';
    // window.MicroBus.on('side-drawer-toggle', (e) => {
    //   this.child = e.detail.el;
    //   this._toggleHide(e);
    // });
  }

  render() {
    return html`
      <div class="sidebar ${this.position}" aria-hidden=${!this.open}>
        <button class="close-btn" @click=${this._toggleHide}>
          <img src="icons/times.svg" width="28" height="28" />
        </button>
        ${this._renderChild()}
      </div>
    `;
  }

  _renderChild() {
    switch (this.child) {
      case 'menu':
        return html`<menu-drawer></menu-drawer>`;
      case 'cart':
        return html`<cart-drawer></cart-drawer>`;
      default:
        return html`<slot></slot>`;
    }
  }

  _toggleHide(e) {
    console.log('Sidebar Toggle: ', e);
    this.hide = !this.hide;
    window.MicroBus.emit('body-overlay-toggle');
  }
}
customElements.define('side-drawer', SideDrawer);

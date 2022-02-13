import {LitElement, html, css} from 'lit';

export class MenuBtn extends LitElement {
  static styles = [
    css`
      button {
        background: none;
        border: none;
        cursor: pointer;
      }
    `,
  ];

  static properties = {
    el: {type: String},
  };

  _onClick(e) {
    console.log(e, this.el);
    window.MicroBus.emit('side-drawer-toggle', {el: this.el, pos: 'left'});
  }
  render() {
    return html`<button @click=${this._onClick}><slot></slot></button>`;
  }
}
customElements.define('menu-btn', MenuBtn);

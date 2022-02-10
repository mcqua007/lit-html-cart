import {LitElement, html, css} from 'lit';

export class BodyOverlay extends LitElement {
  static styles = [
    css`
      :host {
        display: block;
      }
      .overlay {
        background: #00000087;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 2;
        height: 100%;
        width: 100%;
      }
      .overlay[aria-hidden='true'] {
        display: none;
      }
    `,
  ];

  static properties = {
    hide: {type: Boolean},
  };

  constructor() {
    super();
    this.hide = true;

    window.MicroBus.on('body-overlay-toggle', () => {
      this.hide = !this.hide;
    });
  }

  render() {
    return html`
      <div
        class="overlay"
        aria-hidden=${this.hide}
        @click=${this._onclick}
      ></div>
    `;
  }

  _onclick() {
    window.MicroBus.emit('cart-sidebar-toggle');
  }
}
customElements.define('body-overlay', BodyOverlay);

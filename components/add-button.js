import {LitElement, html} from 'lit';

export class AddButton extends LitElement {
  static properties = {
    pid: {type: Number},
    count: {type: Number},
  };

  constructor() {
    super();
    this.count = 0;
    window.MicroBus.on('cart-change', (e) => {
      this.count = e.detail.count;
      console.log(e);
    });
  }

  render() {
    return html`
      <button @click=${this._onClick} part="button">
        <slot></slot> : ${this.count}
      </button>
    `;
  }

  _onClick() {
    this.count++;
    //this.dispatchEvent(new CustomEvent('count-changed'));
    window.MicroBus.emit('cart-change', {count: this.count, id: this.pid});
    console.log('product id: ', this.pid);
  }
}
customElements.define('add-button', AddButton);

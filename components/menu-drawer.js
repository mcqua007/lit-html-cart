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

  render() {
    return html`
      <side-drawer>
        <div class="menu">
          <h4>Menu</h4>
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

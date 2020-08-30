const attributes = ['width', 'height', 'x', 'y', 'color', 'origin']

export class Tween extends HTMLElement {
  static get observedAttributes() {
    return attributes
  }

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    const div = document.createElement('div')

    shadow.appendChild(div)
  }

  connectedCallback() {
    if (!this.isConnected) {
      return
    }

    console.log('a-tween added to page')
  }

  disconnectedCallback() {
    console.log('a-tween removed to page')
  }

  adoptedCallback() {
    console.log('a-tween moved to new page')
  }

  attributeChangedCallback(name, oldValue, value) {
    console.log('a-tween attributes changed')
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('tween', {
        detail: { name, value },
        bubbles: true,
        cancelable: true,
        composed: true,
      }))
      console.log('Custom event dispatched')
    }, 0)
  }
}

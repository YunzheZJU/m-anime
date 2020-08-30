class Tween extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    const div = document.createElement('div')

    shadow.appendChild(div)
  }

  connectedCallback() {
    console.log('a-tween added to page')
  }

  disconnectedCallback() {
    console.log('a-tween removed to page')
  }

  adoptedCallback() {
    console.log('a-tween moved to new page')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('a-tween attributes changed')
    setTimeout(() => {
      this.dispatchEvent(new CustomEvent('tween', {
        detail: { [name]: newValue },
        bubbles: true,
        cancelable: true,
        composed: true,
      }))
      console.log('Custom event dispatched')
    }, 0)
  }
}

customElements.define('a-tween', Tween)

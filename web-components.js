class Frame extends HTMLElement {
  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    const div = document.createElement('div')
    div.setAttribute('class', 'div')

    const width = this.getAttribute('width')
    const height = this.getAttribute('height')

    const style = document.createElement('style')
    style.textContent = `.div { width: ${width}px; height: ${height}px; background: lightgreen; }`

    shadow.appendChild(style)
    shadow.appendChild(div)
  }
}

customElements.define('a-frame', Frame)

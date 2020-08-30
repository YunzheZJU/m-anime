// noinspection CssUnresolvedCustomProperty
class Entity extends HTMLElement {
  static get observedAttributes() {
    return ['width', 'height', 'x', 'y', 'color']
  }

  sheet = new CSSStyleSheet()

  commonSheet = new CSSStyleSheet()

  props = {
    width: {
      init: '100',
      keyframes: {
        100: {
          to: '200',
          duration: undefined,
          easing: 'ease',
        },
      },
    },
  }

  getProp = name => {
    return this.props[name]
  }

  getPropInit = name => this.getProp(name).init

  constructor() {
    super()

    const shadow = this.attachShadow({ mode: 'closed' })

    const div = document.createElement('div')
    const slot = document.createElement('slot')

    div.appendChild(slot)
    shadow.appendChild(div)

    this.commonSheet.replaceSync(`
      :host > div {
        position: absolute;
        width: var(--width);
        height: var(--height);
        left: calc(var(--x) + var(--x-offset));
        top: calc(var(--y) + var(--y-offset));
        color: var(--color);
        background-color: var(--background-color, var(--color));
        /* anchor/transform origin */
        transform: translate(calc(0px - var(--origin-x)), calc(0px - var(--origin-y)));
        transform-origin: var(--origin-y) var(--origin-x);
      }
    `)

    shadow.adoptedStyleSheets = [this.commonSheet, this.sheet]

    this.addEventListener('tween', event => {
      event.stopPropagation()
      console.log(event)
    })
  }

  connectedCallback() {
    console.log('a-entity added to page')
    this.updateSheet()
  }

  disconnectedCallback() {
    console.log('a-entity removed to page')
  }

  adoptedCallback() {
    console.log('a-entity moved to new page')
  }

  attributeChangedCallback(name, oldValue, newValue) {
    console.log('a-entity attributes changed', name, oldValue, newValue)
    this.updateSheet()
  }

  updateSheet = () => {
    const [
      originX = mAnime.defaults.origin.x,
      originY = mAnime.defaults.origin.y,
    ] = this.getAttribute('origin')?.split(' ')?.reverse() ?? []
    // Define variables and resolve the default values
    this.sheet.replaceSync(`
      :host > div {
        --width: ${this.getAttribute('width') ?? '100'}${mAnime.defaults.units.length};
        --height: ${this.getAttribute('height') ?? '100'}${mAnime.defaults.units.length};
        --x: ${this.getAttribute('x') ?? '0'};
        --x-offset: 0px;
        --y: ${this.getAttribute('y') ?? '0'};
        --y-offset: 0px;
        --color: ${this.getAttribute('color') ?? 'black'};
        --background-color: ${this.getAttribute('background-color') ?? 'var(--color)'};
        --origin-x: ${mAnime.keywords.origin.x[originX]};
        --origin-y: ${mAnime.keywords.origin.y[originY]};
      }
    `)
  }
}

customElements.define('a-entity', Entity)

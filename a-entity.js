import { format, uniqId } from './utils.js'

const attributes = ['width', 'height', 'x', 'y', 'color', 'origin', 'duration']

export class Entity extends HTMLElement {
  static get observedAttributes() {
    return attributes
  }

  commonSheet = new CSSStyleSheet()

  sheet = new CSSStyleSheet()

  animationSheet = new CSSStyleSheet()

  data = new Proxy({}, {
    get(target, p, receiver) {
      if (target.hasOwnProperty(p)) {
        return target[p]
      }

      return {}
    },
    set: (target, p, value) => {
      target[p] = ['duration'].includes(p) ? value : format(value)
      console.log(p, value)
      this.updateSheet()
      return target
    },
  })

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

    shadow.adoptedStyleSheets = [this.commonSheet, this.sheet, this.animationSheet]

    this.addEventListener('tween', event => {
      event.stopPropagation()
      const { detail: { name, value } } = event
      this.data[name] = value
    })
  }

  connectedCallback() {
    if (!this.isConnected) {
      return
    }

    console.log('a-entity added to page')
  }

  disconnectedCallback() {
    console.log('a-entity removed to page')
  }

  adoptedCallback() {
    console.log('a-entity moved to new page')
  }

  attributeChangedCallback(name, oldValue, value) {
    console.log('a-entity attributes changed', name, oldValue, value)
    this.data[name] = value
  }

  updateSheet = () => {
    const [
      originX = mAnime.defaults.origin.x,
      originY = mAnime.defaults.origin.y,
    ] = this.data.origin.from?.split(' ')?.reverse() ?? []

    // Define variables and resolve keywords and default values
    this.sheet.replaceSync(`
      :host > div {
        --width: ${this.data.width.from ?? '100'}${mAnime.defaults.units.length};
        --height: ${this.data.height.from ?? '100'}${mAnime.defaults.units.length};
        --x: ${this.data.x.from ?? '0'};
        --x-offset: 0px;
        --y: ${this.data.y.from ?? '0'};
        --y-offset: 0px;
        --color: ${this.data.color.from ?? 'black'};
        --background-color: ${this.data['background-color'].from ?? 'var(--color)'};
        --origin-x: ${mAnime.keywords.origin.x[originX]};
        --origin-y: ${mAnime.keywords.origin.y[originY]};
      }
    `)

    const keyframes = Object.entries(this.data).filter(([key, value]) => {
      return !['duration'].includes(key) && !!value.to
    }).map(([key, value]) => {
      const name = `kf-${uniqId()}`
      return [name, `
        @keyframes ${name} {
          from { ${key}: ${value.from}${value.from.endsWith('%') ? '' : mAnime.defaults.units.length}; }
          to   { ${key}: ${value.to}${value.to.endsWith('%') ? '' : mAnime.defaults.units.length}; }
        }
      `]
    })

    this.animationSheet.replaceSync(`
      ${keyframes.map(([, value]) => value).join('')}
    
      :host > div {
        animation: ${keyframes.map(([name]) => `
          ${this.data.duration ?? mAnime.defaults.duration}${mAnime.defaults.units.time} ${mAnime.defaults.easing} ${mAnime.defaults.delay}${mAnime.defaults.units.time} both infinite ${name}
        `).join(', ')};
      }
    `)
  }
}

import { Entity } from './a-entity.js'
import { Tween } from './a-tween.js'

const defaults = {
  units: {
    length: 'px', // width, height...
    time: 's',    // duration, delay...
  },
  origin: {
    x: 'center',
    y: 'center',
  },
  duration: '5',
  easing: 'ease',
  delay: '0',
}

const consts = {}

const keywords = {
  origin: {
    x: {
      left: '0%',
      center: '50%',
      right: '100%',
    },
    y: {
      top: '0%',
      center: '50%',
      bottom: '100%',
    },
  },
}

window.mAnime = {
  defaults,
  consts,
  keywords,
}

customElements.define('a-tween', Tween)
customElements.define('a-entity', Entity)

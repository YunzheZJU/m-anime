const defaults = {
  units: {
    length: 'px', // width, height...
    time: 's',    // duration, delay...
  },
  origin: {
    x: 'center',
    y: 'center',
  },
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

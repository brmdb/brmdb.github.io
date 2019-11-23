export default ({ route, store }) => {
  // Take the last value (latest route child).
  const color = route.meta.reduce(
    (color, meta) => (meta.navbar ? meta.navbar.color : color),
    'is-white'
  )
  store.commit('navbar/SET_COLOR', color)

  const spaced = route.meta.reduce(
    (spaced, meta) => (meta.navbar ? meta.navbar.spaced : spaced),
    false
  )
  store.commit('navbar/SET_SPACED', spaced)

  const fixed = route.meta.reduce(
    (fixed, meta) => (meta.navbar ? meta.navbar.fixed : fixed),
    true
  )
  store.commit('navbar/SET_FIXED', fixed)

  const transparent = route.meta.reduce(
    (transparent, meta) =>
      meta.navbar ? meta.navbar.transparent : transparent,
    true
  )
  store.commit('navbar/SET_TRANSPARENT', transparent)
}

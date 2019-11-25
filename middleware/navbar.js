export default ({ route, store }) => {
  // Take the last value (latest route child).
  const color = route.meta.reduce(
    (color, meta) =>
      meta.navbar
        ? meta.navbar.color !== undefined
          ? meta.navbar.color
          : color
        : color,
    'is-white'
  )
  store.commit('navbar/SET_COLOR', color)

  const spaced = route.meta.reduce(
    (spaced, meta) =>
      meta.navbar
        ? meta.navbar.spaced !== undefined
          ? meta.navbar.spaced
          : spaced
        : spaced,
    false
  )
  store.commit('navbar/SET_SPACED', spaced)

  const transparent = route.meta.reduce(
    (transparent, meta) =>
      meta.navbar
        ? meta.navbar.transparent !== undefined
          ? meta.navbar.transparent
          : transparent
        : transparent,
    true
  )
  store.commit('navbar/SET_TRANSPARENT', transparent)
}

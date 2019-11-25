export const state = () => ({
  color: 'is-white',
  transparent: true,
  spaced: false,
  fixed: true,
  showing: true
})

export const mutations = {
  SET_COLOR(state, color) {
    state.color = color
  },
  SET_SPACED(state, spaced) {
    state.spaced = spaced
  },
  SET_FIXED(state, fixed) {
    state.fixed = fixed
    if (!fixed) state.showing = true
  },
  SET_TRANSPARENT(state, transparent) {
    state.transparent = transparent
  },
  SET_SHOWING(state, showing) {
    state.showing = showing
  }
}

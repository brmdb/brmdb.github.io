export const state = () => ({
  color: 'is-white',
  transparent: true,
  spaced: false,
  fixed: true
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
  },
  SET_TRANSPARENT(state, transparent) {
    state.transparent = transparent
  }
}

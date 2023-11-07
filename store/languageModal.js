export const state = () => ({
  show: false,
  languages: [],
  page: '',
  tabs: [],
})

export const mutations = {
  setData(state, data) {
    state.show = data.show
    state.languages = data.languages
    state.page = data.page
  },
  setTabs(state, data) {
    state.tabs = data
  },
}

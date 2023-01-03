export default {
  incrementPage(state) {
    state.page++
  },
  setLoadingStatus(state, status) {
    state.loading = status
  },
  setAllDataFetched(state, value) {
    state.allDataFetched = value
  },
  setRepos(state, value) {
    state.repos = state.repos.concat(value)
  },
  addMoreRepos(state, value) {
    state.repos = state.repos.concat(value)
  },
  setErrorMessage(state, message) {
    state.errorMessage = message
  },
}

export default {
  async fetchData({ commit, state }) {
    commit('setLoadingStatus', true);
    commit('setErrorMessage', '');

    try {
      const response = await this.$axios.get(`https://api.github.com/search/repositories?q=language:vue&sort=stars&page=${state.page}`);
      commit('incrementPage');

      if (response.data.items.length === 0) {
        commit('setAllDataFetched', true)
      }
      commit('setRepos', response.data.items)
    } catch(error) {
      commit('setErrorMessage', 'API rate limit exceeded, please try again later.')
    } finally {
      commit('setLoadingStatus', false)
    }
  },
}

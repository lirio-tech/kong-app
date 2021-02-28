// initial state
const state = {
  company: {}
}

// getters
const getters = {
  company: state => {
    return state.company
  }
}

// mutations
const mutations = {
  setCompany(state, company) {
    state.company = company
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}

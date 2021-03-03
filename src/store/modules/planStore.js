// initial state
const state = {
  plan: {}
}

// getters
const getters = {
  plan: state => {
    return state.plan
  }
}

// mutations
const mutations = {
  setplan(state, plan) {
    state.plan = plan
  }
}

export default {
  namespaced: true,
  state,
  getters,
  mutations,
}

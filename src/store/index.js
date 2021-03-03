import Vue from 'vue';
import Vuex from 'vuex';
import companyStore from './modules/companyStore';
import planStore from './modules/planStore';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {

  },
  actions: {

  },
  modules: {
    companyStore,
    planStore
  },
  getters: {
  },
})

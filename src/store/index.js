import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    isLoading: false
  },
  getters: {
    getIsLoading: state => state.isLoading
  },
  mutations: {
    updateLoadingStatus (state, data) {
      state.isLoading = data.isLoading
    }
  },
  actions: {

  },
  modules: {
    user
  }
})

export default store

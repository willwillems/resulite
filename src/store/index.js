import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import appState from './modules/appState'

export default new Vuex.Store({
  strict: true, // turn off in prod.
  modules: {
    appState
  }
})

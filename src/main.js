// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueFire from 'vuefire'
import App from './App'
import router from './router'
import store from './store'

import fb from '@/script/firebase'

// explicit installation required in module environments
Vue.use(VueFire)
Vue.config.productionTip = false
Vue.config.devtools = true

// Firebase
const db = fb.database()
const auth = fb.auth()

// get user from subdomain
const hostname = window.location.hostname
const subDomain = (function () {
  var regexParse = new RegExp('[a-z-0-9]{2,63}.[a-z.]{2,5}$')
  var urlParts = regexParse.exec(hostname)
  return hostname
    .replace(urlParts[0], '')
    .replace('www.', '') // filters out www as subdomain
    .slice(0, -1)
})()

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  firebase: {
    // simple syntax, bind as an array by default
    // anArray: db.ref('/'),
    // can also bind to a query
    // anArray: db.ref('url/to/my/collection').limitToLast(25)
    // full syntax
    user: {
      source: db.ref(`${subDomain}/pageData`),
      // optionally bind as an object
      asObject: true,
      // optionally provide the cancelCallback
      cancelCallback: function () {},
      // this is called once the data has been retrieved from firebase
      readyCallback: function () {}
    }
  },
  template: '<App/>',
  components: { App },
  created () {
    // Set user for current page
    this.$store.commit('setUserPath', {
      path: subDomain
    })
    // Check if user is logged in
    var that = this
    auth.onAuthStateChanged(function (user) {
      if (user) {
        that.$store.commit('setLoginStatus', {
          status: true
        })
        that.$store.commit('setUID', {
          uid: user.uid
        })
      }
    })
  }
})

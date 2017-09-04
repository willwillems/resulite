// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueFire from 'vuefire'

import fb from '@/script/firebase'

// explicit installation required in module environments
Vue.use(VueFire)
Vue.config.productionTip = false

// Firebase
const db = fb.database()
const auth = fb.auth()

auth.signInWithEmailAndPassword('test@t.com', 'Test123')
  .catch(function (e) {
    console.log(e)
  })

// get first url argument
// const firstPath = window.location.pathname.split('/')[1]
const subDomain = window.location.hostname.split('.')[0]

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
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
  components: { App }
})

import Vue from 'vue'
import App from './App.vue'
import VuePackeryPlugin from './plugins/packeryPlugin'

import '../styles/App.scss'

Vue.use(VuePackeryPlugin)

var app = new Vue({
  el: '#hensomerce',
  render: h => h(App)
})

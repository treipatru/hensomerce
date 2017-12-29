import Vue from 'Vue'
import App from './App.vue'
import VuePackeryPlugin from './plugins/packeryPlugin'

import '../styles/app.scss'

Vue.use(VuePackeryPlugin)

var app = new Vue({
  el: '#hensomerce',
  render: h => h(App)
})

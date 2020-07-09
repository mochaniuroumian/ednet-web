import Vue from 'vue'
import FastClick from 'fastclick'
// import VueAwesomeSwiper from 'vue-awesome-swiper/dist/ssr'
// If used in nuxt.js/ssr, you should keep it only in browser build environment
if (process.browser) {
  FastClick.attach(document.body)
  const VueAwesomeSwiper = require('vue-awesome-swiper/dist/ssr')
  Vue.use(VueAwesomeSwiper)
}

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify';
import VueMask from 'v-mask'
import './plugins/axiosRequestIntercept'
import { VueMaskDirective } from 'v-mask'
import { VueMaskFilter } from 'v-mask'
import store from './store/'
import './registerServiceWorker'


Vue.config.productionTip = false
Vue.use(VueMask);
Vue.directive('mask', VueMaskDirective);
Vue.filter('VMask', VueMaskFilter);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

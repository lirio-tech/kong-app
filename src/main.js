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
import VueClipboard from 'vue-clipboard2'
import VueGoogleCharts from 'vue-google-charts'
import numkeyboard from 'vue-numkeyboard';
import 'vue-numkeyboard/style.css';

Vue.use(numkeyboard);


Vue.config.productionTip = false
Vue.use(VueClipboard)
Vue.use(VueMask);
Vue.use(VueGoogleCharts)
Vue.directive('mask', VueMaskDirective);
Vue.filter('VMask', VueMaskFilter);

new Vue({
  router,
  vuetify,
  store,
  render: h => h(App)
}).$mount('#app')

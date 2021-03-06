import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';

import VueCurrencyFilter from 'vue-currency-filter'

Vue.use(Vuetify);
Vue.use(VueCurrencyFilter,
    {
      symbol : 'R$',
      thousandsSeparator: '.',
      fractionCount: 2,
      fractionSeparator: ',',
      symbolPosition: 'front',
      symbolSpacing: true,
      avoidEmptyDecimals: undefined,
    })

export default new Vuetify({
    theme: { 
      dark: true,
      themes: {
        light: {
          // primary: '#FF4081',
          // secondary: '#b0bec5',
          // accent: '#8c9eff',
          // error: '#b71c1c',
        },
      },
    },
});

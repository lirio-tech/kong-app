import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

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
      dark: process.env.VUE_APP_THEME !== 'LIGHT',
      themes: {
        light: {
          fontTitle: colors.pink.lighten1,
          primary: colors.pink.lighten2,
          // secondary: '#b0bec5',
          // accent: '#8c9eff',
          // error: '#b71c1c',
          background: colors.deepPurple.base, 

        },
        dark: {
          fontTitle: colors.grey.lighten2,
          primary: '#00B8D4'
        }
      },
    },
});

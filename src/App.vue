<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}">         
    <router-view />  
  </v-app>
</template>

<script>
import companyGateway from './api/companyGateway';
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
      isSiteCustom() {
          console.log('window.location', window.location);
          return !(
            String(window.location.hostname).includes('localhost:8080') || 
            String(window.location.hostname).includes('app.kongbarber.com') || 
            String(window.location.hostname).includes('app.ladyapp.com.br') || 
            String(window.location.hostname).includes('kong-app-develop.netlify.app') 
          )
      }
  },
  beforeMount() {
      if(this.isSiteCustom()) {
          // Find Company Site Custom
          companyGateway.getCompanySiteDiscoveryByWindowLocation(String(window.location.hostname), 
            res => {
              this.$router.push(`/@/${res.arroba}`);
            },
            () => {
                alert('Site não Sincronizado, entre em contato com o Aplicativo!');
            })
      }
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }  
};
</script>

<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}">         
    <router-view v-if="!loadingSite" />  
    <v-progress-circular
      v-else
      :size="100"
      :width="7"
      color="primary"
      indeterminate
      class="centered"
    ></v-progress-circular>    
  </v-app>
</template>

<script>
import companyGateway from './api/companyGateway';
export default {
  name: 'App',
  data: () => ({
    //
    loadingSite: false,
  }),
  methods: {
      isSiteCustom() {
          console.log('window.location', window.location);
          return !(
            String(window.location.hostname).includes('localhost') || 
            String(window.location.hostname).includes('app.kongapp.com.br') ||
            String(window.location.hostname).includes('app.kongbarber.com') || 
            String(window.location.hostname).includes('app.ladyapp.com.br') || 
            String(window.location.hostname).includes('devkongapp.netlify.app') 
          )
      }
  },
  beforeMount() {

      if(this.isSiteCustom()) {
          // Find Company Site Custom
          this.loadingSite = true;
          companyGateway.getCompanySiteDiscoveryByWindowLocation(String(window.location.hostname), 
            res => {
              this.loadingSite = false;
              this.$router.push(`/@/${res.arroba}${window.location.search}`);
            },
            () => {
                this.loadingSite = false;
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
<style scoped>
  .centered {
    position: fixed; /* or absolute */
    top: 30%;
    left: 40%;
  }
</style>

<template>
  <v-app id="inspire" :style="{background: $vuetify.theme.themes[theme].background}">         
    <router-view />  
  </v-app>
</template>

<script>
export default {
  name: 'App',
  data: () => ({
    //
  }),
  methods: {
      isSiteCustom() {
          return !(
            String(window.location).includes('localhost:8080') || 
            String(window.location).includes('app.kongbarber.com') || 
            String(window.location).includes('ladyapp.com.br') || 
            String(window.location).includes('kong-app-develop.netlify.app') 
          )
      }
  },
  beforeMount() {
      if(this.isSiteCustom()) {
          this.$router.push('/site/1233445');
      }
  },
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }  
};
</script>

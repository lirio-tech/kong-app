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
  computed:{
    theme(){
      return (this.$vuetify.theme.dark) ? 'dark' : 'light'
    }
  }  
};
</script>

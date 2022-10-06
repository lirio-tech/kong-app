<template>
  <v-container fluid>
    <AppBar />       
    <v-main>
      <h1 class="text-center display-1">Avalie-nos</h1>      
      <RateUs />
    </v-main>
  </v-container>
</template>

<script>
import AppBar from '@/components/appbar/AppBar'
import RateUs from '../components/RateUs'
export default {
  name: "Denounce",
  components: {AppBar,RateUs},
};
</script>
<style>
</style>
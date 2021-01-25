<template>
  <v-app>

    <AppBar />

    <v-main>
      <Home/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import AppBar from './components/AppBar';

export default {
  name: 'App',

  components: {
    Home,
    AppBar
  },

  data: () => ({
    //
  }),
};
</script>

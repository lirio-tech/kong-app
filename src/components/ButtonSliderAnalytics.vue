<template>

  <v-slide-item
    v-slot="{ active, toggle }"
  >
    <v-btn
      style="margin-top: 7px;"
      class="mx-2"
      :input-value="active"
      active-class="primary white--text"
      depressed
      @click="toggle"
      :to="{ path: '/analytics' }" 
    >
        <v-icon>mdi-chart-pie</v-icon>
        <span class="grey--text" style="margin-left: 5px;">Analises</span>          
    </v-btn>
  </v-slide-item>                     
                          
</template>

<script>
export default {
    name: 'ButtonSliderAnalytics',
    data: () => ({
       
    }),
    beforeMount() {
        
    }
  }
</script>

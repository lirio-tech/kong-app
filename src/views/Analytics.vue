<template>
    <v-container style="">
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="8" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                    Graficos
                  </span>
              </v-col>
              <v-col cols="2" align="center" style="margin-top: 12px;">   
                  <v-btn icon small style="display: inline;">
                      <v-icon large color="blue-grey">mdi-menu</v-icon>
                  </v-btn>
              </v-col>

          </v-row>          
          <v-row>
              <v-col cols="12">
                <GChart
                  :settings="{packages: ['bar']}"    
                  :data="chartData"
                  :options="chartOptions"
                  :createChart="(el, google) => new google.charts.Bar(el)"
                  @ready="onChartReady"
                />
              </v-col>
          </v-row>
          
        </v-main>
    </v-container>
</template>

<script>
import storage from '../storage';
import UserTypes from '../utils/UserTypes'
import { GChart } from 'vue-google-charts'
export default {
    // https://codesandbox.io/s/z699l6oq4p?file=/src/App.vue:989-1008

    // https://codesandbox.io/s/rr9zl088n4
    name: 'Analytics',
    components: {
      GChart
    },
    data: () => ({
      chartsLib: null, 
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Dias das Semana', 'Seg' ,'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
        ['Lucro', 650, 410, 1450, 1230, 1650, 2300, 800],
      ]         
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      onChartReady (chart, google) {
        this.chartsLib = google
        console.lof(chart);
      }       
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
    },
    computed: {
      chartOptions () {
        if (!this.chartsLib) return null
        return this.chartsLib.charts.Bar.convertOptions({
          chart: {
            title: 'Total Lucro por Dias da Semana',
            subtitle: ''
          },
          backgroundColor: {
              fill: '#F4F4F4',
              opacity: 100
          },          
          language: 'pt',
          bars: 'horizontal', // Required for Material Bar Charts.
          hAxis: { format: 'decimal' },
          prefix: 'R$ ',
          height: 400,
          colors: ['#C62828', '#1565C0', '#00695C', '#4527A0', '#FF8F00', '#424242', '#AB47BC']
        })
      }    
    },
  }
</script>

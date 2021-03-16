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
              <v-col cols="2" align="right" style="margin-top: 12px;">   
                  <v-btn icon small style="display: inline;">
                      <v-icon large color="blue-grey">mdi-menu</v-icon>
                  </v-btn>
              </v-col>

          </v-row>     
          <!-- <v-row>
            <v-col
              cols="12"
              sm="6"
            >
              <v-date-picker
                v-model="dates"
                range
              ></v-date-picker>
            </v-col>
          </v-row>                -->
          <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="dates"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="dates"
                    range
                  >
                    <v-spacer></v-spacer>
                    <v-btn
                      text
                      color="primary"
                      @click="modal = false"
                    >
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="primary"
                      @click="$refs.dialog.save(date)"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
              </v-col>          
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
        ['R$', 650.99, 410.50, 1450.55, 1230.32, 1650.85, 2300.14, 800.30],
      ],
      dates: ['2021-03-10', '2021-03-11'],
      //date: new Date().toISOString().substr(0, 10),
      menu: false,
      modal: false,
      menu2: false,      
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
            title: 'Total de Receita por Dias da Semana',
            subtitle: ''
          },
          // backgroundColor: {
          //     fill: '#F4F4F4',
          //     opacity: 100
          // },          
          language: 'pt',
          bars: 'horizontal', // Required for Material Bar Charts.
          //hAxis: { format: 'decimal' },
          //hAxis: { format:'##.###,##', title: 'Ano: <?php echo date("Y"); ?>',  titleTextStyle: {color: '#333'}},
          //hAxis: { format: '#,###.##' },
          format: 'currency',
          height: 400,
          colors: ['#C62828', '#1565C0', '#00695C', '#4527A0', '#FF8F00', '#424242', '#AB47BC']
        })
      }    
    },
  }
</script>

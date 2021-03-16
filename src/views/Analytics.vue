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
                  <span style="font-size: 1.2rem !important;">  
                    {{ title }}
                  </span>
              </v-col>
              <v-col cols="2" align="right" style="margin-top: 12px;">   

                  <v-menu
                    bottom
                    offset-y
                  >
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn 
                        icon 
                        small 
                        style="display: inline;"
                        v-bind="attrs"
                        v-on="on"                        
                      >
                          <v-icon large color="blue-grey">mdi-menu</v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        @click="() => setDataView(BY_DAYS)"
                      >
                        <v-list-item-title>Grafico por dias</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        @click="() => setDataView(BY_MONTH)"
                      >
                        <v-list-item-title>Grafico por Meses</v-list-item-title>
                      </v-list-item>                      
                      <v-list-item
                        @click="() => setDataView(BY_DAYS_OF_THE_WEEK)"
                      >
                        <v-list-item-title>Grafico por dias da semana</v-list-item-title>
                      </v-list-item>    
                      <v-list-item
                        @click="() => setDataView(BY_USERS)"
                      >
                        <v-list-item-title>Grafico por usuario</v-list-item-title>
                      </v-list-item>                                                            
                    </v-list>
                  </v-menu>

              </v-col>

          </v-row>     
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
                      v-model="datesDisplay"
                      label="Escolha o Periodo"
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
                      @click="$refs.dialog.save(date); getDaysOfTheWeek(dates);"
                    >
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
          </v-col>          
          <div v-if="dataView === 'DAYS_OF_THE_WEEK'">
            <v-row>
                <v-col cols="12">
                  <GChart
                    :settings="{packages: ['bar']}"    
                    :data="chartDataDaysOfTheWeek"
                    :options="chartOptionsDaysOfTheWeek"
                    :createChart="(el, google) => new google.charts.Bar(el)"
                    @ready="onChartReady"
                  />
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                  <div class="green--text">
                    <span>Melhor dia da Semana: </span> <br/>
                    <span>{{ betterDayOfTheWeek.dayOfTheWeek }} </span><br/>
                    <span>{{ betterDayOfTheWeek.value | currency }} </span>
                  </div>
                  <br/>
                  <div class="red--text">
                    <span>Pior dia da Semana: </span> <br/>
                    <span>{{ worstDayOfTheWeek.dayOfTheWeek }} </span><br/>
                    <span>{{ worstDayOfTheWeek.value | currency }} </span>
                  </div>                  
              </v-col>
            </v-row>
          </div>
        </v-main>
    </v-container>
</template>

<script>
import storage from '../storage';
import UserTypes from '../utils/UserTypes'
import { GChart } from 'vue-google-charts'
import gateway from '../api/gateway';
import date from '../utils/date'
export default {
    // https://codesandbox.io/s/z699l6oq4p?file=/src/App.vue:989-1008

    // https://codesandbox.io/s/rr9zl088n4
    name: 'Analytics',
    components: {
      GChart
    },
    data: () => ({
      dataView: null,
      dates: [date.getNewDateAddDay(-7), date.dateToStringEnUS(new Date())],
      BY_DAYS: 'DAYS',
      BY_MONTH: 'MONTH',
      BY_DAYS_OF_THE_WEEK: 'DAYS_OF_THE_WEEK',
      BY_USERS: 'USERS',
      betterDayOfTheWeek: {
        dayOfTheWeek: '',
        value: 0
      },
      worstDayOfTheWeek: {
        dayOfTheWeek: '',
        value: 0
      },      
      chartsLibDaysOfTheWeek: null, 
      // Array will be automatically processed with visualization.arrayToDataTable function
      daysOfTheWeek: {},
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
        this.chartsLibDaysOfTheWeek = google
        console.log(chart);
      },
      getDaysOfTheWeek(dates) {
        if(this.dataView === this.BY_DAYS_OF_THE_WEEK) {
          gateway.getDaysOfTheWeek(dates,
            res => {
              this.daysOfTheWeek = res;
            }, () => {
              alert('Erro ao buscar dias da semana');
            });
          return;
        }
        alert('Outros');
      },
      setDataView(dv) {
        this.dataView = dv;
        this.getDaysOfTheWeek(this.dates);
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.setDataView(this.BY_DAYS_OF_THE_WEEK);
    },
    computed: {
      title() {
        switch(this.dataView) {
          case this.BY_DAYS: return 'Dados por Dias';
          case this.BY_MONTH: return 'Dados por Meses';
          case this.BY_DAYS_OF_THE_WEEK: return 'Dados por Dia da Semana';
          case this.BY_USERS: return 'Dados por Profissinais';
        }
        return 'Dados por Dias';
      },
      datesDisplay() {
        console.log(this.dates);
        if(this.dates[0] && this.dates[1]) {
          let ini = this.dates[0].split('-');
          let end = this.dates[1].split('-');
          return `${ini[2]}/${ini[1]}/${ini[0]} - ${end[2]}/${end[1]}/${end[0]}`; 
        } 
        let ini = this.dates[0].split('-');
        return `${ini[2]}/${ini[1]}/${ini[0]}`;
      },
      chartDataDaysOfTheWeek() {
        return [
          ['Dias da semana', 'Seg' ,'Ter', 'Qua', 'Qui', 'Sex', 'Sab', 'Dom'],
          ['R$', 
            this.daysOfTheWeek.monday, 
            this.daysOfTheWeek.tuesday, 
            this.daysOfTheWeek.wednesday, 
            this.daysOfTheWeek.thursday, 
            this.daysOfTheWeek.friday, 
            this.daysOfTheWeek.saturday, 
            this.daysOfTheWeek.sunday],
        ];
      },      
      chartOptionsDaysOfTheWeek() {
        if (!this.chartsLibDaysOfTheWeek) return null
        return this.chartsLibDaysOfTheWeek.charts.Bar.convertOptions({
          chart: {
            title: '',
            subtitle: ''
          },
          // backgroundColor: {
          //     fill: '#F4F4F4',
          //     opacity: 100
          // },          
          language: 'pt',
          //bars: 'horizontal', // Required for Material Bar Charts.
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

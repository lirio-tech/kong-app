<template>
    <v-container style="">
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 5px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="white darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="8" align="center">   
                  <span style="font-size: 1.2rem !important;" >  
                    {{ title }}
                  </span>
              </v-col>
              <v-col cols="2" align="right" style="margin-top: 5px;">   

                  <v-menu
                    bottom
                    offset-y
                  > 
                    <template v-slot:activator="{ on, attrs }">
                      <v-btn 
                        style="display: inline;"
                        v-bind="attrs"
                        v-on="on"                        
                      >
                          <v-icon color="green lighten-2">
                            mdi-chart-bar
                          </v-icon>
                      </v-btn>
                    </template>
                    <v-list>
                      <v-list-item
                        v-if="false"
                        @click="() => setDataView(BY_DAYS)"
                      >
                        <v-list-item-title>Dia a Dia</v-list-item-title>
                      </v-list-item>
                      <v-list-item
                        @click="() => setDataView(BY_MONTH)"
                      >
                        <v-list-item-subtitle>Mes a Mes</v-list-item-subtitle>
                      </v-list-item>                      
                      <v-list-item
                        @click="() => setDataView(BY_DAYS_OF_THE_WEEK)"
                      >
                        <v-list-item-subtitle>
                          Dia da semana
                        </v-list-item-subtitle>
                      </v-list-item>   
                      <v-list-item
                        v-if="isAdmin(userLogged.type)"
                        @click="() => setDataView(BY_USERS)"
                      >
                        <v-list-item-subtitle>
                          Profissionais 
                        </v-list-item-subtitle>
                      </v-list-item>      
                      <v-list-item
                        v-if="isAdmin(userLogged.type)"
                        @click="() => setDataView(BY_PAYMENT_TYPE)"
                      >
                        <v-list-item-subtitle>
                          Tipo de Pagamento 
                        </v-list-item-subtitle>
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
                      :disabled="BY_MONTH === dataView"
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
          <v-col 
            style="margin-top:-30px;"
            cols="12"
            sm="12"
            md="12"
            v-if="dataReturnOK && total"
          >
            <span class="grey--text caption">Total no periodo</span><br/>  
            <span style="font-size: 1.6rem">R$ {{ total | currency }}</span>
          </v-col>               

          <v-alert
                dense
                border="bottom"
                type="error"
                outlined
                v-if="!dataReturnOK && !loading"
              >
                Dados não Encontrados para este período
          </v-alert>

          <dialog-loading :loading="loading" />  

          <div v-if="dataView === BY_DAYS_OF_THE_WEEK && dataReturnOK">
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
              <v-col cols="12" style="font-size: 1.2rem">
                  <div class="green--text">
                    <span>Melhor dia da Semana: </span> <br/>
                    <span>{{ betterDayOfTheWeek.dayOfTheWeek }} </span><br/>
                    <span>Média de R$ {{ betterDayOfTheWeek.value | currency }} </span> <br/>
                    <span class="caption">{{ betterDayOfTheWeek.amount }} </span> 
                  </div>
                  <br/>
                  <div class="red--text">
                    <span>Pior dia da Semana: </span> <br/>
                    <span>{{ worstDayOfTheWeek.dayOfTheWeek }} </span><br/>
                    <span>Média de R$ {{ worstDayOfTheWeek.value | currency }} </span> <br/>
                    <span class="caption">{{ worstDayOfTheWeek.amount }} </span> 
                  </div>                  
              </v-col>
            </v-row>
            <br/><br/><br/><br/>
          </div>

          <div v-if="dataView === BY_USERS && dataReturnOK">
              <GChart
                style="width: 100%"
                type="PieChart"
                :data="chartDataUsers"
                :options="{height: 380,width: '100%',legend:{ position: 'top', maxLines: 3 }}"
              />  
          </div>
        
          <div v-if="dataView === BY_PAYMENT_TYPE && dataReturnOK">
              <GChart
                style="width: 100%"
                type="PieChart"
                :data="chartDataPaymentTypes"
                :options="{height: 380,width: '100%',legend:{ position: 'top', maxLines: 3 }}"
              />  
          </div>   
   
          <div v-if="dataView === BY_MONTH && dataReturnOK">
            <v-row>
                <v-col cols="12">
                  <GChart 
                    :settings="{packages: ['bar']}"    
                    :data="chartDataMonths"
                    :options="{ bars: 'horizontal' }"
                    :createChart="(el, google) => new google.charts.Bar(el)"
                    @ready="onChartReady"
                  />
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" style="font-size: 1.2rem">
                  <div class="green--text">
                    <span>Melhor mês do ano: </span> <br/>
                    <span>{{ bestMonthOfTheYear.month }} </span><br/>
                    <span>Média de R$ {{ bestMonthOfTheYear.value | currency }} </span> <br/>
                    <span class="caption">{{ bestMonthOfTheYear.amount }} mês contabilizado(s)</span> 
                  </div>
                  <br/>
                  <div class="red--text">
                    <span>Pior mês do ano: </span> <br/>
                    <span>{{ worstMonthOfTheYear.month }} </span><br/>
                    <span>Média de R$ {{ worstMonthOfTheYear.value | currency }} </span> <br/>
                    <span class="caption">{{ worstMonthOfTheYear.amount }} mês contabilizado(s)</span> 
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
import analyticsGateway from '../api/analyticsGateway';
import date from '../utils/date'
import DialogLoading from '../components/loading/DialogLoading.vue';
//import DaysOfTheWeek from '../components/analytics/DaysOfTheWeek'
export default {
    name: 'Analytics',
    components: {
        GChart,
        DialogLoading,
        //DaysOfTheWeek
    },
    data: () => ({
      menu: false,
      modal: false,
      menu2: false,         
      dataReturnOK: false,
      total: 0,
      loading: false,
      dataView: null,
      dates: [date.getNewDateAddDay(-6), date.dateToStringEnUS(new Date())],
      datesAux: [date.getNewDateAddDay(-6), date.dateToStringEnUS(new Date())],
      BY_DAYS: 'DAYS',
      BY_MONTH: 'MONTH',
      BY_DAYS_OF_THE_WEEK: 'DAYS_OF_THE_WEEK',
      BY_USERS: 'USERS',
      BY_PAYMENT_TYPE: 'PAYMENT_TYPE',
      betterDayOfTheWeek: {
        dayOfTheWeek: '',
        value: 0,
        amount: 0
      },
      worstDayOfTheWeek: {
        dayOfTheWeek: '',
        value: 0,
        amount: 0
      },
      bestMonthOfTheYear: {
        month: '',
        value: 0,
        amount: 0
      },
      worstMonthOfTheYear: {
        month: '',
        value: 0,
        amount: 0
      },      
      chartsLibDaysOfTheWeek: null, 
      daysOfTheWeek: {},
      chartDataDaysOfTheWeekResult: null,
      date: new Date().toISOString().substr(0, 10),
      chartDataUsers: [],
      chartDataPaymentTypes: [],
      chartDataMonths: []
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      onChartReady (chart, google) {
        this.chartsLibDaysOfTheWeek = google
        console.log(chart);
      },
      setBetterAndWorstDayOfTheWeek(daysOfTheWeek) {
        let betterValue = Number.MIN_VALUE;
        let betterDay = '';
        let betterAmount = 0;
        if(daysOfTheWeek.monday.average > betterValue) { 
          betterValue = daysOfTheWeek.monday.average; 
          betterDay = 'Segunda-Feira'; 
          betterAmount = daysOfTheWeek.monday.amount + ' segunda(s) contabilizado';
        }
        if(daysOfTheWeek.tuesday.average > betterValue) { 
          betterValue = daysOfTheWeek.tuesday.average; 
          betterDay = 'Terça-Feira'; 
          betterAmount = daysOfTheWeek.tuesday.amount + ' terça(s) contabilizado';
        }
        if(daysOfTheWeek.wednesday.average > betterValue) { 
          betterValue = daysOfTheWeek.wednesday.average; 
          betterDay = 'Quarta-Feira'; 
          betterAmount = daysOfTheWeek.wednesday.amount + ' quarta(s) contabilizado';
        }
        if(daysOfTheWeek.thursday.average > betterValue) { 
          betterValue = daysOfTheWeek.thursday.average; 
          betterDay = 'Quinta-Feira'; 
          betterAmount = daysOfTheWeek.thursday.amount + ' quinta(s) contabilizado';
        }
        if(daysOfTheWeek.friday.average > betterValue) { 
          betterValue = daysOfTheWeek.friday.average; 
          betterDay = 'Sexta-Feira'; 
          betterAmount = daysOfTheWeek.friday.amount + ' sexta(s) contabilizado';
        }
        if(daysOfTheWeek.saturday.average > betterValue) { 
          betterValue = daysOfTheWeek.saturday.average; 
          betterDay = 'Sábado'; 
          betterAmount = daysOfTheWeek.saturday.amount + ' sábado(s) contabilizado';
        }
        if(daysOfTheWeek.sunday.average > betterValue) { 
          betterValue = daysOfTheWeek.sunday.average; 
          betterDay = 'Domingo'; 
          betterAmount = daysOfTheWeek.sunday.amount + ' domingo(s) contabilizado';
        }

        let worstValue = Number.MAX_VALUE;
        let worstDay = '';
        let worstAmount = 0;
        if(daysOfTheWeek.monday.average > 0 && daysOfTheWeek.monday.average < worstValue) { 
          worstValue = daysOfTheWeek.monday.average; 
          worstDay = 'Segunda-Feira'; 
          worstAmount = daysOfTheWeek.monday.amount + ' segunda(s) contabilizado';
        }
        if(daysOfTheWeek.tuesday.average > 0 && daysOfTheWeek.tuesday.average < worstValue) { 
          worstValue = daysOfTheWeek.tuesday.average; 
          worstDay = 'Terça-Feira'; 
          worstAmount = daysOfTheWeek.tuesday.amount + ' terça(s) contabilizado';
        }
        if(daysOfTheWeek.wednesday.average > 0 && daysOfTheWeek.wednesday.average < worstValue) { 
          worstValue = daysOfTheWeek.wednesday.average; 
          worstDay = 'Quarta-Feira'; 
          worstAmount = daysOfTheWeek.wednesday.amount + ' quarta(s) contabilizado';
        }
        if(daysOfTheWeek.thursday.average > 0 && daysOfTheWeek.thursday.average < worstValue) { 
          worstValue = daysOfTheWeek.thursday.average; 
          worstDay = 'Quinta-Feira'; 
          worstAmount = daysOfTheWeek.thursday.amount + ' quinta(s) contabilizado';
        }
        if(daysOfTheWeek.friday.average > 0 && daysOfTheWeek.friday.average < worstValue) { 
          worstValue = daysOfTheWeek.friday.average; 
          worstDay = 'Sexta-Feira'; 
          worstAmount = daysOfTheWeek.friday.amount + ' sexta(s) contabilizado';
        }
        if(daysOfTheWeek.saturday.average > 0 && daysOfTheWeek.saturday.average < worstValue) { 
          worstValue = daysOfTheWeek.saturday.average; 
          worstDay = 'Sábado'; 
          worstAmount = daysOfTheWeek.saturday.amount + ' sábado(s) contabilizado';
        }
        if(daysOfTheWeek.sunday.average > 0 && daysOfTheWeek.sunday.average < worstValue) { 
          worstValue = daysOfTheWeek.sunday.average; 
          worstDay = 'Domingo'; 
          worstAmount = daysOfTheWeek.sunday.amount + ' domingo(s) contabilizado';
        }

        this.betterDayOfTheWeek.dayOfTheWeek = betterDay;
        this.betterDayOfTheWeek.value = betterValue;
        this.betterDayOfTheWeek.amount = betterAmount;
        this.worstDayOfTheWeek.dayOfTheWeek = worstDay;
        this.worstDayOfTheWeek.value = worstValue;
        this.worstDayOfTheWeek.amount = worstAmount;

      },
      isDataReturnOK(daysOfTheWeek) {
        return daysOfTheWeek.monday.amount > 0 ||
          daysOfTheWeek.tuesday.amount > 0 ||
          daysOfTheWeek.wednesday.amount > 0 ||
          daysOfTheWeek.thursday.amount > 0 ||
          daysOfTheWeek.friday.amount > 0 ||
          daysOfTheWeek.saturday.amount > 0 ||
          daysOfTheWeek.sunday.amount > 0;
      },
      getDaysOfTheWeek(dates) {
        if(this.dataView === this.BY_DAYS_OF_THE_WEEK) {
          this.loading = true;
          this.total = 0;
          gateway.getDaysOfTheWeek(dates,
            res => {
              console.log(res);
              this.daysOfTheWeek = res.data;
              if(this.isDataReturnOK(this.daysOfTheWeek)) {
                this.dataReturnOK = true;
                this.chartDataDaysOfTheWeekResult = res.chartData;
                this.setBetterAndWorstDayOfTheWeek(this.daysOfTheWeek);
              } else {
                this.dataReturnOK = false;
                this.total = 0;
              }
              this.loading = false;
            }, () => {
              this.dataReturnOK = false;
              this.loading = false;
              this.total = 0;
              alert('Erro ao buscar dias da semana');
          });
          return;
        }
        if(this.dataView === this.BY_USERS) {
          this.loading = true;
          gateway.getAnalyticsDataUsers(dates,
            res => {
              console.log(res);
              this.chartDataUsers = res.chartData;
              this.dataReturnOK = true;
              this.loading = false;
              this.total = 0;
              res.data.forEach(d => {
                this.total += d.totalValue;
              });
            }, () => {
              this.dataReturnOK = false;
              this.loading = false;
              this.total = 0;
              alert('Erro ao buscar dias da semana');
          });                                
        }
        if(this.dataView === this.BY_PAYMENT_TYPE) {
          this.loading = true;
          analyticsGateway.getPaymentsTypeByDateBetween(dates,
            res => {
              console.log(res);
              this.dataReturnOK = true;
              this.chartDataPaymentTypes = [['Pagamento', 'Valor']];
              res.forEach(i => {
                this.chartDataPaymentTypes.push(
                  [
                    this.getPaymentPtBR(i.paymentType), 
                    i.total
                  ]
                );
              })
              this.loading = false;
            }, () => {
              this.dataReturnOK = false;
              this.loading = false;
              this.total = 0;
              alert('Erro ao buscar tipos de pagamento');
          });                                
        }
        if(this.dataView === this.BY_MONTH) {
          this.loading = true;
          this.total = 0;
          analyticsGateway.getPaymentsByMonth(dates,
            res => {
              console.log(res);
              this.dataReturnOK = true;
              this.chartDataMonths = this.convertMonthSumData(res);
              this.loading = false;
            }, () => {
              this.dataReturnOK = false;
              this.loading = false;
              this.total = 0;
              alert('Tivemos uma falha no processamento ao gerar o relatório :/. Por favor, tente mais tarde.');
          });                                
        } 
      },
      setDataView(dv) {
        if(this.BY_MONTH === dv) {
          this.datesAux = this.dates;
          this.dates = [date.getNewDateAddDay(-365), date.dateToStringEnUS(new Date())];
        } 
        else if(this.dataView !== dv && this.dataView === this.BY_MONTH) {
          this.dates = this.datesAux;
        }
        this.dataView = dv;
        this.getDaysOfTheWeek(this.dates);
      },
      getPaymentPtBR(paymentType) {
        if(paymentType === 'card') {
          return 'Cartão'
        }
        if(paymentType === 'cash') {
          return 'Dinheiro'
        }        
        if(paymentType === 'pix') {
          return 'Pix'
        }        
        return paymentType;        
      },
      convertMonthSumData(monthSumAnalytics) {
        
        this.bestMonthOfTheYear.month = this.monthOrderToString(monthSumAnalytics.bestMonth);
        this.bestMonthOfTheYear.value = monthSumAnalytics.bestMonthAverage;

        this.worstMonthOfTheYear.month = this.monthOrderToString(monthSumAnalytics.worstMonth);
        this.worstMonthOfTheYear.value = monthSumAnalytics.worstMonthAverage;
        
        let monthsData = monthSumAnalytics.monthsData;
        let months = ["Meses do Ano", "Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        let data = ["R$", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        monthsData.forEach( month => {
          data[month.monthOrder] = month.total;
          if (month.monthOrder == monthSumAnalytics.bestMonth) {
            this.bestMonthOfTheYear.amount = month.amount;
          }
          if (month.monthOrder == monthSumAnalytics.worstMonth) {
            this.worstMonthOfTheYear.amount = month.amount;
          }
        });

        return [months, data];
      },
      monthOrderToString(order) {
        switch(order) {
          case '1': return 'Janeiro';
          case '2': return 'Fevereiro';
          case '3': return 'Março';
          case '4': return 'Abril';
          case '5': return 'Março';
          case '6': return 'Junho';
          case '7': return 'Julho';
          case '8': return 'Agosto';
          case '9': return 'Setembro';
          case '10': return 'Outubro';
          case '11': return 'Novembro';
          case '12': return 'Dezembro';
        }
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.setDataView(this.BY_DAYS_OF_THE_WEEK); 
    },
    computed: {
      title() {
        switch(this.dataView) {
          case this.BY_DAYS: return 'Por Dias';
          case this.BY_MONTH: return 'Por Meses';
          case this.BY_DAYS_OF_THE_WEEK: return 'Por Dia da Semana';
          case this.BY_USERS: return 'Por Profissinais';
          case this.BY_PAYMENT_TYPE: return 'Por Tipo de Pagamento';
        }
        return 'Grafico';
      },
      datesDisplay() {
        console.log(this.dates);
        if(this.dates[0] && this.dates[1]) {
          let ini = this.dates[0].split('-');
          let end = this.dates[1].split('-');
          return `${ini[2]}/${ini[1]}/${ini[0]} à ${end[2]}/${end[1]}/${end[0]}`; 
        } 
        let ini = this.dates[0].split('-');
        return `${ini[2]}/${ini[1]}/${ini[0]}`;
      },
      chartDataDaysOfTheWeek() {
        return this.chartDataDaysOfTheWeekResult;
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
          colors: ['#C62828', '#FBC02D', '#2E7D32', '#512DA8', '#FF8F00', '#1565C0', '#F06292']
        })
      }    
    },
  }
</script>

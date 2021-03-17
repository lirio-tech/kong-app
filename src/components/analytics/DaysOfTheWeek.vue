<template>
    <v-container style="">
        <v-main class="">     

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
              <v-col cols="12" style="font-size: 1.4rem">
                  <div class="green--text">
                    <span>Melhor dia da Semana: </span> <br/>
                    <span>{{ statistics.betterDayOfTheWeek.dayOfTheWeek }} </span><br/>
                    <span>Média de {{ statistics.betterDayOfTheWeek.value | currency }} </span> <br/>
                    <small>{{ statistics.betterDayOfTheWeek.amount }} </small> 
                  </div>
                  <br/>
                  <div class="red--text">
                    <span>Pior dia da Semana: </span> <br/>
                    <span>{{ statistics.worstDayOfTheWeek.dayOfTheWeek }} </span><br/>
                    <span>Média de {{ statistics.worstDayOfTheWeek.value | currency }} </span> <br/>
                    <small>{{ statistics.worstDayOfTheWeek.amount }} </small> 
                  </div>                  
              </v-col>
            </v-row>

        </v-main>
    </v-container>
</template>

<script>
import { GChart } from 'vue-google-charts'
export default {
    // https://codesandbox.io/s/z699l6oq4p?file=/src/App.vue:989-1008
    // https://codesandbox.io/s/rr9zl088n4
    name: 'DaysOfTheWeek',
    components: {
      GChart
    },
    props:['dataReturnOK', 'chartDataDaysOfTheWeek', 'daysOfTheWeek'],
    data: () => ({
    }),
    methods: {
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

        this.statistics.betterDayOfTheWeek.dayOfTheWeek = betterDay;
        this.statistics.betterDayOfTheWeek.value = betterValue;
        this.statistics.betterDayOfTheWeek.amount = betterAmount;
        this.statistics.worstDayOfTheWeek.dayOfTheWeek = worstDay;
        this.statistics.worstDayOfTheWeek.value = worstValue;
        this.statistics.worstDayOfTheWeek.amount = worstAmount;

      },
    },
    computed: {
      statistics() {
        this.setBetterAndWorstDayOfTheWeek(this.daysOfTheWeek);
        return {
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
        };
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


// https://www.npmjs.com/package/vue-google-charts#usage

      // chartData: [
      //   ['Gün', 'Harcama', 'Expenses', 'Profit'],
      //   ['2014', 1000, 400, 200],
      //   ['2015', 1170, 460, 250],
      //   ['2016', 660, 1120, 300],
      //   ['2017', 1030, 540, 350]
      // ],
      // chartOptions: {
      //   chart: {
      //     title: 'Company Performance',
      //     subtitle: 'Sales, Expenses, and Profit: 2014-2017',
      //   }
      // }

</script>


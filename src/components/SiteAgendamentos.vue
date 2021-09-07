<template>
    <v-container>      
        <v-main class="">
            <v-row 

                >
                    <v-col cols="4" md="4" >
                        <v-btn 
                            type="button" 
                            depressed  
                            large
                            style="width: 100%"
                            @click="setTypePeriod('day')"
                            :color="typePeriod === 'day' ? 'primary' : ''"              
                        >Dia</v-btn>     
                    </v-col>
                    <v-col cols="4" md="4" >    
                        &nbsp; 
                        <v-btn 
                            type="button" 
                            depressed  
                            large
                            style="width: 100%"
                            @click="setTypePeriod('week')"
                            :color="typePeriod === 'week' ? 'primary' : ''"
                        > 
                            Semana
                        </v-btn>    
                      </v-col>
                      <v-col cols="4" md="4" >    
                        <v-btn 
                            type="button" 
                            depressed  
                            large 
                            style="width: 100%"
                            @click="setTypePeriod('month')"
                            :color="typePeriod === 'month' ? 'primary' : ''"
                        >Mês</v-btn>                               
                    </v-col>                                                  
            </v-row>           

            <v-row class="fill-height">
              <v-col>
                <v-sheet height="64">
                  <v-toolbar
                    flat
                  >
                    <v-btn
                      outlined
                      class="mr-4"
                      color="grey darken-2"
                      @click="setToday"
                    >
                      Hoje 
                    </v-btn>
                    <v-btn
                      fab
                      text
                      small
                      color="grey darken-2"
                      @click="prev"
                    >
                      <v-icon small>
                        mdi-chevron-left
                      </v-icon>
                    </v-btn>
                    <v-btn
                      fab
                      text
                      small
                      color="grey darken-2"
                      @click="next"
                    >
                      <v-icon small>
                        mdi-chevron-right
                      </v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                      {{ $refs.calendar.title }}
                    </v-toolbar-title>
                  </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                  <v-calendar
                    locale="pt-br"
                    ref="calendar"
                    v-model="value"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="typePeriod"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                  >
                  </v-calendar>
                </v-sheet>
              </v-col>
            </v-row>
     
        </v-main>
        <br/><br/>
        
    </v-container>
</template>

<script>
import storage from '../storage'
// import dateUtil from '../utils/date'
// import agendamentoGateway from '../api/agendamentoGateway';
export default {
    name: 'SiteAgendamentos',
    components: { 
    },
    data: () => ({
        userLogged: {},
        value: '',
        agendamentos: [],
        agendamento: {},
        typePeriod: 'week',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],

    }), 
    beforeMount() {
        this.userLogged = storage.getUserLogged();
        this.agendamento = this.initAgendamento();
        if(this.$route.query.date) {
          this.value = this.$route.query.date.substring(0,10);
        }
        this.findAgendamento();
    },
    mounted () {
      window.scrollTo(0,0);
      this.$refs.calendar.checkChange(); // 60f1bca6b0529e00088c8750 -> feeh :: 60f1c34cb0529e00088c8752 -> grazi
    },
    methods: {
        findAgendamento() {
           //let _date = this.value ? this.value : dateUtil.dateToStringEnUS(new Date());
          //  agendamentoGateway.getSiteAgendamentos(
          //      res => {
          //          this.agendamentos = res;
          //          console.log('before');
          //          this.updateCalendar(_date, _date);
          //          if(this.$route.query._id) {
          //             this.alterarAgendamentoShowDialog(this.$route.query._id);
          //             this.$route.query._id = null;
          //          }
          //      }, () => {
          //        alert('Erro ao Buscar agendamentos');
          //      })    
        },  
        setTypePeriod(tp) {
          this.typePeriod = tp;
        },
        viewDay ({ date }) {
          this.value = date
          this.typePeriod = 'day'
        },
        getEventColor (event) {
          return event.color
        },
        setToday () {
          this.value = ''
        },
        prev () {
          this.$refs.calendar.prev()
        },
        next () {
          this.$refs.calendar.next()
        },
        updateCalendar(start, end) {
           console.log(start, end);
           const events = []
           for(var i in this.agendamentos) {
             const _start = new Date(`${this.agendamentos[i].dateTimeStartAt.substring(0, 16)}-03:00`);
             const _end = new Date(`${this.agendamentos[i].dateTimeEndAt.substring(0, 16)}-03:00`);
              events.push({
                  _id: this.agendamentos[i]._id,
                  name: 'RESERVADO',  //this.agendamentos[i].customer.name,
                  detail: this.getDescriptionServices(this.agendamentos[i].services),
                  status: this.agendamentos[i].status,
                  start: _start,
                  end: _end,
                  total: this.agendamentos[i].total,
                  color: 'blue',
                  orderId: this.agendamentos[i].orderId,
                  timed: true,
              });      
           }
           this.events = events;
        },
        updateRange ({ start, end }) {
          console.log(JSON.stringify(start) + ' ' + JSON.stringify(end));
          console.log('updateRange');
          this.updateCalendar(start, end);
        },
        getDescriptionServices(services) {
            let description = ''
            for(var i in services) {
              description += `${services[i].type}, `
            }
            return description;
        },
        initAgendamento() {
          return { 
              customer: {
                name: '',
                phoneNumber: ''
              },
              user: {
                _id: '',
                name: '',
                username: ''
              },
              dateAt: '',
              date: new Date().toISOString().substr(0, 10),
              timeStartAt: '12:30:00',
              timeEndAt: '13:30:00',
              services: [],
            };
        }
    },        

  }
</script>

<style scoped>
.my-event {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  border-radius: 2px;
  background-color: #1867c0;
  color: #ffffff;
  border: 1px solid #1867c0;
  font-size: 12px;
  padding: 3px;
  cursor: pointer;
  margin-bottom: 1px;
  left: 4px;
  margin-right: 8px;
  position: relative;
}

.my-event.with-time {
  position: absolute;
  right: 4px;
  margin-right: 0px;
}
</style>

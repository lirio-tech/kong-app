<template>
    <v-container>      
        <v-main class="">
            <v-row 

                >
                    <v-col cols="3" md="3" >
                        <v-btn 
                            type="button" 
                            depressed  
                            large
                            style="width: 100%"
                            @click="setTypePeriod('day')"
                            :color="typePeriod === 'day' ? 'primary' : ''"              
                        >Dia</v-btn>     
                    </v-col>
                    <v-col cols="3" md="3" >    
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
                      <v-col cols="3" md="3" >    
                        <v-btn 
                            type="button" 
                            depressed  
                            large 
                            style="width: 100%"
                            @click="setTypePeriod('month')"
                            :color="typePeriod === 'month' ? 'primary' : ''"
                        >Mês</v-btn>                               
                    </v-col>        
                    <v-col cols="3" md="3" >    
                        <v-btn 
                            type="button" 
                            depressed  
                            large 
                            style="width: 100%"
                            @click="showDialogAgendamento(true)"
                        >
                          <v-icon >mdi-plus</v-icon>
                        </v-btn>                          
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
                    :first-interval="6"
                    :interval-minutes="60"
                    :interval-count="19"
                    :type="typePeriod"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                  >
                  </v-calendar>
                  <v-menu
                    v-model="selectedOpen"
                    :close-on-content-click="false"
                    :activator="selectedElement"
                    offset-x
                  >
                    <v-card
                      color="grey lighten-4"
                      min-width="350px"
                      flat
                    >
                      <v-toolbar
                        :color="selectedEvent.color"
                        dark
                      >
                        <v-btn icon @click="selectedOpen = false">
                          <v-icon>mdi-close</v-icon>
                        </v-btn>
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        
                      </v-toolbar>
                      <v-card-text class="indigo--text">
                        Data: {{ new Date(selectedEvent.start).toLocaleString('pt-BR').substring(0,10) }} <br/>
                        Horario: {{ new Date(selectedEvent.start).toLocaleString('pt-BR').substring(11,16) }} às 
                        {{ new Date(selectedEvent.end).toLocaleString('pt-BR').substring(11,16) }} <br/>
                      </v-card-text>
                    </v-card>
                  </v-menu>                  
                </v-sheet>
              </v-col>
            </v-row>
     
        </v-main>
        <br/><br/>
        <dialog-agendamento-site 
          :dialog="dialogAgendamento" 
          :myCompany="company"
          v-on:show-dialog-agendamento="showDialogAgendamento"
        />        
    </v-container>
</template>

<script>
import storage from '../storage'
import DialogAgendamentoSite from '../components/DialogAgendamentoSite.vue'
// import dateUtil from '../utils/date'
import agendamentoGateway from '../api/agendamentoGateway';
export default {
    name: 'SiteAgendamentos',
    props: ['company'],
    components: { 
      DialogAgendamentoSite,
    },
    data: () => ({
        dialogAgendamento: false,
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
        if(this.$route.query.realizarAgendamento) { this.dialogAgendamento = this.$route.query.realizarAgendamento === 'true' }
    },
    mounted () {
      window.scrollTo(0,0);
      this.$refs.calendar.checkChange(); // 60f1bca6b0529e00088c8750 -> feeh :: 60f1c34cb0529e00088c8752 -> grazi
    },
    methods: {
        findAgendamento() {
            if(this.company && this.company._id) {
                  this.getSiteAgendamentos(this.company._id)
            } else { 
                setTimeout(
                  () => {
                    if(this.company && this.company._id) {
                      this.getSiteAgendamentos(this.company._id)
                    } else {
                      this.findAgendamento();
                    }
                  }, 
                  3000
                )
            }
        },  
        getSiteAgendamentos(companyId) {
              let phone_number = "";
              if(storage.getCustomerSiteAgendamento()) {
                  phone_number = storage.getCustomerSiteAgendamento().phone_number;
              }
              agendamentoGateway.getSiteAgendamentos(companyId, phone_number,
                  res => {
                    console.log('res', res);
                      this.agendamentos = res;
                      this.updateCalendar(null, null);
                  }, () => {
                    alert('Erro ao Buscar agendamentos');
                  })   
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
           console.log('this.agendamentos', this.agendamentos)
           for(var i in this.agendamentos) {
             const _start = new Date(`${this.agendamentos[i].dateTimeStartAt.substring(0, 16)}-03:00`);
             const _end = new Date(`${this.agendamentos[i].dateTimeEndAt.substring(0, 16)}-03:00`);
              events.push({
                  _id: this.agendamentos[i]._id,
                  name: this.agendamentos[i].name,
                  //detail: this.getDescriptionServices(this.agendamentos[i].services),
                  status: this.agendamentos[i].status,
                  start: _start,
                  end: _end,
                  //total: this.agendamentos[i].total,
                  color: this.agendamentos[i].name === 'RESERVADO' ? 'green' : 'orange',
                  //orderId: this.agendamentos[i].orderId,
                  timed: true,
              });      
           }
           this.events = events;
        },
        updateRange ({ start, end }) {
          this.updateCalendar(start, end);
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
        },
        showDialogAgendamento(show, agendamento) {
          this.dialogAgendamento = show;
          if(show === false && agendamento) {
              this.getSiteAgendamentos(this.company._id);
              window.scrollTo(0,document.body.scrollHeight);

          }
        },    
        showEvent ({ nativeEvent, event }) {
          const open = () => {
            this.selectedEvent = event
            this.selectedElement = nativeEvent.target
            requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
          }

          if (this.selectedOpen) {
            this.selectedOpen = false
            requestAnimationFrame(() => requestAnimationFrame(() => open()))
          } else {
            open()
          }

          nativeEvent.stopPropagation()
        },            
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

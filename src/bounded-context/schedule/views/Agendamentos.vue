<template>
    <v-container>      
        <v-main class="">

            <v-row>
                <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        :to="{ 'path': '/'}"
                    >
                        <v-icon large color="white darken-2">mdi-chevron-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="9" align="center">   
                    <span style="font-size: 1.6rem !important;" class="white--text">
                      Agendamentos
                    </span>
                </v-col>
                <v-col cols="1" align="center" style="margin-left:-40px;">   
                    <v-btn 
                        @click="showDialog(true)"  
                        class="ma-2"
                        small
                    ><v-icon >mdi-plus</v-icon></v-btn>                        
                </v-col>                     
            </v-row>    
            <v-row 
                    align="center"
                    justify="space-around"
                >
                    <v-col cols="4" md="4" align="center">
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
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @click:time="newSchedule"
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
                        {{ selectedEvent.detail }}<br/>
                        Data: {{ new Date(selectedEvent.start).toLocaleString('pt-BR').substring(0,10) }} <br/>
                        Horario: {{ new Date(selectedEvent.start).toLocaleString('pt-BR').substring(11,16) }} às 
                        {{ new Date(selectedEvent.end).toLocaleString('pt-BR').substring(11,16) }} <br/>
                        
                        <span v-if="selectedEvent.status === 'DONE'">R$ {{ selectedEvent.total | currency }}</span> <br/>
                        <small>Criado em {{ new Date(selectedEvent.createdAt).toLocaleString('pt-BR').substring(0,16) }}</small>   
                        <h3 v-if="selectedEvent.status === 'DONE'" class="success--text">Concluído</h3>
                        <router-link
                          v-if="selectedEvent.status === 'DONE' && selectedEvent.orderId"
                          :to="{ path: `/ordem-servico/${selectedEvent.orderId}` }"
                        >
                          Ordem de Serviço
                        </router-link>
                      </v-card-text>
                      <v-card-actions v-if="selectedEvent.status === 'PENDING'">
                        <v-btn
                          color="white" 
                          @click="alterarAgendamentoShowDialog(selectedEvent._id)" 
                          v-if="selectedEvent.status === 'PENDING'"
                          class="indigo--text"
                          small
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn
                          color="red" 
                          @click="cancel(selectedEvent._id)"
                          class="white--text"
                          :loading="loadingCancel"
                          small
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          @click="showDialogConcluir(true, selectedEvent._id)"
                          :loading="loadingConcluir"
                          small
                        >
                          Concluir
                        </v-btn>                                        
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-sheet>
              </v-col>
            </v-row>

            <DialogAgendamento 
                :dialog="dialog" 
                :agendamento="agendamento"
                :date="agendamento.date"
                :servicesSelected="servicesSelected"
                v-on:show-dialog="showDialog" 
                v-on:scheduled-success="findAgendamento" 
            />      

            <DialogAgendamentoConcluir 
              :dialog="dialogAgendamentoConcluir" 
              :agendamento="agendamentoConcluir"
              v-on:show-dialog="showDialogConcluir" 
            />          
        </v-main>
        <br/><br/>
        
    </v-container>
</template>

<script>
import storage from '../../../storage'
import dateUtil from '../../../utils/date'
import agendamentoGateway from '../../../api/agendamentoGateway';
import DialogAgendamento from '../../../components/DialogAgendamento'
import DialogAgendamentoConcluir from '../../../components/DialogAgendamentoConcluir'
export default {
    name: 'Agendamentos',
    components: { 
        DialogAgendamento,
        DialogAgendamentoConcluir
    },
    data: () => ({
        dialog: false,
        dialogAgendamentoConcluir: false,
        loadingCancel: false,
        loadingConcluir: false,

        agendamentoConcluir: {},

        userLogged: {},
        value: '',
        agendamentos: [],
        agendamento: {},
        servicesSelected: [],
        typePeriod: 'day',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

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
        showDialog(show) {
            this.dialog = show;
            if(show === false) {
                this.agendamento = this.initAgendamento();       
                this.servicesSelected = [];       
            }
        },
        showDialogConcluir(show, agendamentoId) {
          this.dialogAgendamentoConcluir = show;
          if(agendamentoId) this.agendamentoConcluir = this.agendamentos.filter(it => it._id === agendamentoId)[0];
        },
        findAgendamento() {
           let _date = this.value ? this.value : dateUtil.dateToStringEnUS(new Date());
           agendamentoGateway.getAgendamentos(_date, _date,
               res => {
                   this.agendamentos = res;
                   console.log('before');
                   this.updateCalendar(_date, _date);
                   if(this.$route.query._id) {
                      this.alterarAgendamentoShowDialog(this.$route.query._id);
                      this.$route.query._id = null;
                   }
               }, () => {
                 alert('Erro ao Buscar agendamentos');
               })
         },        
        alterarAgendamentoShowDialog(_id) {
          this.agendamento = this.agendamentos.filter(it => it._id === _id)[0];
          this.agendamento.dateAt = String(this.agendamento.dateTimeStartAt).substring(0,10);
          this.agendamento.timeStartAt = String(this.agendamento.dateTimeStartAt).substring(11,16);
          this.agendamento.timeEndAt = String(this.agendamento.dateTimeEndAt).substring(11,16);
          this.agendamento.date = new Date(this.agendamento.dateTimeStartAt).toISOString().substr(0, 10),
          this.servicesSelected = [];
          for(var i in this.agendamento.services) {
            this.servicesSelected.push(this.agendamento.services[i].type);
          }
          this.showDialog(true);
        },
        cancel(_id) {
          if(confirm("Deseja Realmente Cancelar?")) {
              this.agendamento = this.agendamentos.filter(it => it._id === _id)[0];
              this.loadingCancel = true;
              agendamentoGateway.agendamentoCancelar(_id, 
                () => {
                    this.loadingCancel = false;
                    this.selectedOpen = false;
                    this.findAgendamento();
                }, (err) => {
                  this.loadingCancel = false;
                  if(err.response.status === 401) {
                    this.$router.push('/login');
                    return;
                  }
                  if(err.response.status === 412) {
                    alert(err.response.data.message)      
                    return;
                  }
                  if(err.response.status === 422) {
                    alert(err.response.data.message)            
                    return;
                  }                          
                  alert('Erro ao Concluir :(');
                })              
          }
        },
        isPendingPast(agendamento) {
            let start = new Date(`${agendamento.dateTimeStartAt}`);
            start.setHours(start.getHours()+3);
            return agendamento.status === 'PENDING' && start < new Date();
        },
        getColorByStatus(agendamento) {
            if(this.isPendingPast(agendamento))
              return 'red'          
            if(agendamento.status === 'PENDING')
              return 'blue'
            if(agendamento.status === 'DONE')
              return 'blue-grey darken-2'
            return 'indigo'
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
        updateCalendar(start, end) {
           console.log(start, end);
           const events = []
           for(var i in this.agendamentos) {
             const _start = new Date(`${this.agendamentos[i].dateTimeStartAt.substring(0, 16)}-03:00`);
             const _end = new Date(`${this.agendamentos[i].dateTimeEndAt.substring(0, 16)}-03:00`);
              events.push({
                  _id: this.agendamentos[i]._id,
                  name: this.agendamentos[i].customer.name,
                  detail: this.getDescriptionServices(this.agendamentos[i].services),
                  status: this.agendamentos[i].status,
                  start: _start,
                  end: _end,
                  total: this.agendamentos[i].total,
                  color: this.getColorByStatus(this.agendamentos[i]),
                  orderId: this.agendamentos[i].orderId,
                  timed: true,
                  createdAt: this.agendamentos[i].createdAt,
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
        newSchedule(ev) {
           this.agendamento = this.initAgendamento();
           this.agendamento.timeStartAt = `${ev.time.substring(0,2)}:00`;
           this.agendamento.timeEndAt = `${(Number(ev.time.substring(0,2))+1)}:00`;
           this.agendamento.date = new Date(ev.date).toISOString().substr(0, 10);
           if(this.agendamento.timeEndAt.length < 5) {
             this.agendamento.timeEndAt = `0${this.agendamento.timeEndAt}`;
           }  
           this.servicesSelected = [];
           this.showDialog(true);
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

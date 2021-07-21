<template>
    <v-container>      
        <v-main class="">

            <v-row>
                <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        :to="{ 'path': '/'}"
                    >
                        <v-icon large color="white darken-2">mdi-arrow-left</v-icon>
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
                    >+</v-btn>                        
                </v-col>                     
            </v-row>    
            <v-row 
                    align="center"
                    justify="space-around"
                >
                    <v-col cols="12" md="12" align="center">
                        <v-btn 
                            type="button" 
                            depressed  
                            large
                            style="width: 30%"
                            @click="setTypePeriod('day')"
                            :color="typePeriod === 'day' ? 'primary' : ''"              
                        >Dia</v-btn>     
                        &nbsp; 
                        <v-btn 
                            type="button" 
                            depressed  
                            large
                            style="width: 30%"
                            @click="setTypePeriod('week')"
                            :color="typePeriod === 'week' ? 'primary' : ''"
                        > 
                            Semana
                        </v-btn>    
                        &nbsp;  
                        <v-btn 
                            type="button" 
                            depressed  
                            large 
                            style="width: 30%"
                            @click="setTypePeriod('month')"
                            :color="typePeriod === 'month' ? 'primary' : ''"
                        >Mês</v-btn>                               
                    </v-col>                                                  
            </v-row>           
            <v-row 
                    align="center"
                    justify="space-around"
                >
                    <v-col cols="12" md="12" align="center">
                        <v-btn 
                            type="button" 
                            depressed  
                            large 
                            style="width: 100%"
                            @click="showDialogEmployees(true)"
                            :color="typePeriod === 'category' ? 'primary' : ''"
                        >Funcionários</v-btn>                               
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
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :categories="users"
                    category-show-all
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
                        Horario: {{ new Date(selectedEvent.start).toLocaleString('pt-BR').substring(11,16) }} as 
                        {{ new Date(selectedEvent.end).toLocaleString('pt-BR').substring(11,16) }} <br/>
                        Funcionario: {{ selectedEvent.userName }} <br/>
                        <!-- Total: {{ selectedEvent.total | currency }} -->
                        <h3 class="success--text" v-if="selectedEvent.status === 'DONE'">Concluído</h3>
                      </v-card-text>
                      <v-card-actions v-if="selectedEvent.status === 'PENDING'">
                        <v-btn
                          color="white" 
                          @click="alterarAgendamentoShowDialog(selectedEvent._id)"  
                          v-if="selectedEvent.status === 'PENDING'"
                          class="indigo--text"
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn
                          color="red" 
                          @click="cancel(selectedEvent._id)"
                          class="white--text"
                          :loading="loadingCancel"
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          @click="showDialogConcluir(true, selectedEvent._id)"
                          :loading="loadingConcluir"
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
                :servicesSelected="servicesSelected"
                :users="usersAll"
                v-on:show-dialog="showDialog" 
                v-on:scheduled-success="updateRange" 
            />      

            <DialogAgendamentoConcluir 
              :dialog="dialogAgendamentoConcluir" 
              :agendamento="agendamentoConcluir"
              v-on:show-dialog="showDialogConcluir" 
              v-on:done="done"
              
            />   

            <DialogAgendamentoEmployees 
                :dialog="dialogEmployees"
                :users="usersAll"
                v-on:show-dialog="showDialogEmployees"
            />       
        </v-main>
        
    </v-container>
</template>

<script>
import storage from '../storage'
import dateUtil from '../utils/date'
import agendamentoGateway from '../api/agendamentoGateway';
import gateway from '../api/gateway';
import DialogAgendamento from '../components/DialogAgendamento'
import DialogAgendamentoConcluir from '../components/DialogAgendamentoConcluir'
import DialogAgendamentoEmployees from '../components/DialogAgendamentoEmployees'
export default {
    name: 'Agendamentos',
    components: { 
        DialogAgendamento,
        DialogAgendamentoConcluir,
        DialogAgendamentoEmployees
    },
    data: () => ({
        dialog: false,
        dialogAgendamentoConcluir: false,
        dialogEmployees: false,
        loadingCancel: false,
        loadingConcluir: false,

        agendamentoConcluir: {},

        userLogged: {},
        value: '',
        agendamentos: [],
        agendamento: {},
        servicesSelected: [],
        typePeriod: 'category',

        focus: '',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        users: [],
        usersAll: [],

    }), 
    beforeMount() {
        this.userLogged = storage.getUserLogged();
        this.agendamento = this.initAgendamento();
        gateway.getUsers('enabled', res => {
          this.usersAll = res.map(it => it.name);  
          this.users = res.filter(it => it._id === this.userLogged._id).map(it => it.name);  
          console.log(this.users)
        }, err => {
          console.log(err);
        });        
    },
    mounted () {
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
        showDialogEmployees(show, users) {
            if(show === false && users) {
              this.users = users;
              this.setTypePeriod('category')
            } else {
              this.setTypePeriod('day')
            }
            this.dialogEmployees = show;
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
        done(agendamento, paymentType) {
            if(confirm("Deseja Realmente Concluir?")) {
                this.loadingConcluir = true;
                agendamentoGateway.agendamentoDone(agendamento._id, agendamento, paymentType,
                  res => {
                     this.loadingConcluir = false;
                     const order = res;
                     this.$router.push("/ordem-servico/"+order._id); 
                  }, () => {
                    this.loadingConcluir = false;
                    alert('Erro ao Concluir :(');
                  })
            }
        },
        cancel(_id) {
          if(confirm("Deseja Realmente Cancelar?")) {
              this.agendamento = this.agendamentos.filter(it => it._id === _id)[0];
              this.loadingCancel = true;
              agendamentoGateway.agendamentoCancelar(_id, 
                () => {
                    this.loadingCancel = false;
                    this.selectedOpen = false;
                    this.updateRange(new Date(), new Date());
                }, () => {
                  this.loadingCancel = false;
                  alert('Erro ao Concluir :(');
                })              
          }
        },
        getColorByStatus(status) {
            if(status === 'PENDING')
              return 'blue'
            if(status === 'DONE')
              return 'blue-grey darken-2'
            return 'indigo'
        },        
        setTypePeriod(tp) {
          this.typePeriod = tp;
        },
        viewDay ({ date }) {
          this.focus = date
          this.typePeriod = 'day'
        },
        getEventColor (event) {
          return event.color
        },
        setToday () {
          this.focus = ''
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
        updateRange ({ start, end }) {
          console.log(JSON.stringify(start) + ' ' + JSON.stringify(end));
          let _date = this.value ? this.value : dateUtil.dateToStringEnUS(new Date());
          agendamentoGateway.getAgendamentos(_date, _date,
              res => {
                  this.agendamentos = res;
                  console.log(this.agendamentos)
                  const events = []
                  for(var i in this.agendamentos) {
                    const _start = new Date(`${this.agendamentos[i].dateTimeStartAt.substring(0, 16)}-03:00`);
                    const _end = new Date(`${this.agendamentos[i].dateTimeEndAt.substring(0, 16)}-03:00`);
                    events.push({
                        _id: this.agendamentos[i]._id,
                        name: this.agendamentos[i].customer.name,
                        user: this.agendamentos[i].user.username,
                        userName: this.agendamentos[i].user.name,
                        detail: this.getDescriptionServices(this.agendamentos[i].services),
                        status: this.agendamentos[i].status,
                        start: _start,
                        end: _end,
                        total: this.agendamentos[i].total,
                        color: this.getColorByStatus(this.agendamentos[i].status),
                        timed: true,
                        category: this.users.filter(it => it === this.agendamentos[i].user.name)[0],
                    });        
                  }
                  this.events = events   
              }, () => {
                  alert('Erro ao Buscar agendamentos');
              });        

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
           this.agendamento.user = this.typePeriod === 'category' ? this.usersAll.filter(it => it.username === ev.user)[0] : this.userLogged;
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

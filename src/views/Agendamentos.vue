<template>
    <v-container>      
        <v-main class="">

            <v-row>
                <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        :to="{ 'path': '/admin/users'}"
                    >
                        <v-icon large color="white darken-2">mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="9" align="center">   
                    <span style="font-size: 1.8rem !important;" class="white--text">
                      Agenda do Dia
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
                      Hoje {{ focus }}
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
                    locale="br"
                    ref="calendar"
                    v-model="focus"
                    color="primary"
                    :events="events"
                    :event-color="getEventColor"
                    :type="typePeriod"
                    @click:event="showEvent"
                    @click:more="viewDay"
                    @click:date="viewDay"
                    @change="updateRange"
                  ></v-calendar>
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
                        <v-btn icon>
                          <v-icon>mdi-pencil</v-icon>
                        </v-btn>
                        <v-toolbar-title v-html="selectedEvent.name"></v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon>
                          <v-icon>mdi-heart</v-icon>
                        </v-btn>
                        <v-btn icon>
                          <v-icon>mdi-dots-vertical</v-icon>
                        </v-btn>
                      </v-toolbar>
                      <v-card-text>
                        <span v-html="selectedEvent.details"></span>
                      </v-card-text>
                      <v-card-actions>
                        <v-btn
                          text
                          color="secondary"
                          @click="selectedOpen = false"
                        >
                          Cancel
                        </v-btn>
                      </v-card-actions>
                    </v-card>
                  </v-menu>
                </v-sheet>
              </v-col>
            </v-row>

            <DialogAgendamento 
                :dialog="dialog" 
                v-on:show-dialog="showDialog" 
            />                
        </v-main>
        
    </v-container>
</template>

<script>
import storage from '../storage'
import date from '../utils/date'
import agendamentoGateway from '../api/agendamentoGateway';
import DialogAgendamento from '../components/DialogAgendamento'
export default {
    name: 'Agendamentos',
    components: { 
        DialogAgendamento
    },
    data: () => ({
        dialog: false,
        loading: false,
        userLogged: {},
        value: '',
        agendamentos: [],
        typePeriod: 'day',

        focus: '',
        selectedEvent: {},
        selectedElement: null,
        selectedOpen: false,
        events: [],
        names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],

    }), 
    beforeMount() {
        this.userLogged = storage.getUserLogged();
    },
    mounted () {
      this.$refs.calendar.checkChange();
    },
    methods: {
        // findAgendamentos() {
        //     let _date = this.value ? this.value : date.dateToStringEnUS(new Date());
        //     agendamentoGateway.getAgendamentos(_date, _date,
        //         res => {
        //             this.agendamentos = res;
        //         }, () => {
        //             alert('Erro ao Buscar agendamentos');
        //         });               
        // },
        showDialog(show) {
            this.dialog = show;
        },
        setTypePeriod(tp) {
          this.typePeriod = tp;
        },
        // .. 
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
        let _date = this.value ? this.value : date.dateToStringEnUS(new Date());
        agendamentoGateway.getAgendamentos(_date, _date,
            res => {
                this.agendamentos = res;
                console.log(this.agendamentos)
                const events = []
                for(var i in this.agendamentos) {
                  const _start = new Date(`${this.agendamentos[i].dateTimeStartAt.substring(0, 16)}-03:00`);
                  const _end = new Date(`${this.agendamentos[i].dateTimeEndAt.substring(0, 16)}-03:00`);
                  events.push({
                      name: this.agendamentos[i].customer.name,
                      start: _start,
                      end: _end,
                      color: 'indigo',
                      timed: true,
                  });        
                }
                this.events = events   
            }, () => {
                alert('Erro ao Buscar agendamentos');
            });        

          //const events = []
          //const min = new Date(`${start.date}T00:00:00`)
          //const max = new Date(`${end.date}T23:59:59`)
          //const days = (max.getTime() - min.getTime()) / 86400000

          //const eventCount = this.rnd(days, days + 20)
          // for (let i = 0; i < eventCount; i++) {
          //   const allDay = this.rnd(0, 3) === 0
          //   const firstTimestamp = this.rnd(min.getTime(), max.getTime())
          //   const first = new Date(firstTimestamp - (firstTimestamp % 900000))
          //   const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
          //   const second = new Date(first.getTime() + secondTimestamp)

          //   events.push({
          //     name: this.names[this.rnd(0, this.names.length - 1)],
          //     start: first,
          //     end: second,
          //     color: this.colors[this.rnd(0, this.colors.length - 1)],
          //     timed: !allDay,
          //   })
          // }
        },
        rnd (a, b) {
          return Math.floor((b - a + 1) * Math.random()) + a
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
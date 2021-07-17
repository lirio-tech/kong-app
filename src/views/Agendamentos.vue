<template>
    <v-container>      
        <v-main class="">
            <v-row>
                <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        :to="{ 'path': '/admin/users'}"
                    >
                        <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col>
                <v-col cols="9" align="center">   
                        <span style="font-size: 1.8rem !important;">Agenda do Dia</span>
                </v-col>
                <v-col cols="1" align="center" style="margin-left:-40px;">   
                    <v-btn 
                        :to="{ path:'/admin/users/_newUser'}" 
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
                            color="primary"
                        >Dia</v-btn>     
                        &nbsp; 
                        <v-btn 
                            type="button" 
                            depressed  
                            large
                            style="width: 30%"
                        >
                            Semana
                        </v-btn>    
                        &nbsp;  
                        <v-btn 
                            type="button" 
                            depressed  
                            large 
                            style="width: 30%"
                        >Mês</v-btn>                               
                    </v-col>                                                  
            </v-row>           
            <v-row class="fill-height">
                <v-col>
                <v-sheet height="64">
                    <v-toolbar flat :color="$vuetify.theme.dark ? 'dark' : 'white'" >
                    <v-btn class="mr-4" @click="setToday">
                        Hoje
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="prev">
                        <v-icon small>mdi-chevron-left</v-icon>
                    </v-btn>
                    <v-btn fab text small color="grey darken-2" @click="next">
                        <v-icon small>mdi-chevron-right</v-icon>
                    </v-btn>
                    <v-toolbar-title v-if="$refs.calendar">
                        <span class="primary--text"> {{ $refs.calendar.title }} </span>
                    </v-toolbar-title>
                    <v-spacer></v-spacer> 
                    </v-toolbar>
                </v-sheet>
                <v-sheet height="600">
                    <v-calendar
                        locale="br"
                        ref="calendar"
                        v-model="focus"
                        color="primary"
                        type="day"
                        category-show-all
                        @mousedown:time="createNewEvent"
                        :categories="categories"
                        :events="events"
                        :event-color="getEventColor"
                        @change="fetchEvents"
                    ></v-calendar>
                </v-sheet>
                </v-col>
            </v-row>
        </v-main>
        
    </v-container>
</template>

<script>
import storage from '../storage'
export default {
    name: 'Agendamentos',
    components: { 
    },
    data: () => ({
        loading: false,
        userLogged: {},
        focus: '',
        events: [],
        colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
        names: ['Meeting'],
        categories: ['John Smith Joe'],      
        createEvent: null,
        createStart: null,                                   
    }),
    methods: {
        beforeMount() {
            this.userLogged = storage.getUserLogged();               
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
        fetchEvents ({ start, end }) {
            const events = []

            const min = new Date(`${start.date}T00:00:00`)
            const max = new Date(`${end.date}T23:59:59`)
            const days = (max.getTime() - min.getTime()) / 86400000
            const eventCount = 1; //this.rnd(days, days + 20)

            for (let i = 0; i < eventCount; i++) {
                const allDay = this.rnd(0, 3) === 0
                const firstTimestamp = this.rnd(min.getTime(), max.getTime())
                const first = new Date(firstTimestamp - (firstTimestamp % 900000))
                const secondTimestamp = this.rnd(2, allDay ? 288 : 8) * 900000
                const second = new Date(first.getTime() + secondTimestamp)

                events.push({
                    name: this.names[this.rnd(0, this.names.length - 1)],
                    start: first,
                    end: second,
                    color: this.colors[this.rnd(0, this.colors.length - 1)],
                    timed: !allDay,
                    category: this.categories[this.rnd(0, this.categories.length - 1)],
                })
            }

            this.events = events
        },
        rnd (a, b) {
            return Math.floor((b - a + 1) * Math.random()) + a
        },
        roundTime (time, down = true) {
            const roundTo = 60 // minutes
            const roundDownTime = roundTo * 60 * 1000

            return down
            ? time - time % roundDownTime
            : time + (roundDownTime - (time % roundDownTime))
        },        
        createNewEvent(tms) {
          this.createStart = new Date(tms.year, tms.month - 1, tms.day, tms.hour, tms.minute).getTime()
          this.createEvent = {
            name: `Event #${this.events.length}`,
            color: 'primary',
            start: this.createStart,
            end: this.createStart,
            timed: true,
          }

          this.events.push(this.createEvent)            
        }
    },        

  }
</script>

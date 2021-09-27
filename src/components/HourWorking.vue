<template>
  <div>
      <span @click="chevronDown = !chevronDown">
          <div v-if="chevronDown">
              <span :class="status === 'Aberto' ? 'green--text' : 'red--text'">{{ status }} </span><span class="white--text"> :: {{ getMessageAgenda() }} </span>
              <v-icon color="primary">mdi-chevron-down</v-icon>
          </div>
          <div v-else>
              <table>
                  <tbody>
                      <tr :class="this.today.getDay() == 1 ? 'primary--text' : 'white--text'">
                          <td>Segunda-Feira </td>
                          <td style="width: 10px" ></td>
                          <td v-if="openAt.monday.isOpen"> {{ openAt.monday.timeStartAt }}-{{ openAt.monday.timeEndAt }} <v-icon color="secondary">mdi-chevron-up</v-icon></td>
                          <td v-else> Fechado <v-icon color="secondary">mdi-chevron-up</v-icon></td>
                      </tr>
                      <tr :class="this.today.getDay() == 2 ? 'primary--text' : 'white--text'">
                          <td>Terça-Feira</td>
                          <td></td>
                          <td v-if="openAt.tuesday.isOpen"> {{ openAt.tuesday.timeStartAt }}-{{ openAt.tuesday.timeEndAt }} </td>
                          <td v-else> Fechado</td>
                      </tr>                      
                      <tr :class="this.today.getDay() == 3 ? 'primary--text' : 'white--text'">
                          <td>Quarta-Feira</td>
                          <td></td>
                          <td v-if="openAt.wednesday.isOpen"> {{ openAt.wednesday.timeStartAt }}-{{ openAt.wednesday.timeEndAt }} </td>
                          <td v-else> Fechado</td>
                      </tr>                
                      <tr :class="this.today.getDay() == 4 ? 'primary--text' : 'white--text'">
                          <td>Quinta-Feira</td>
                          <td></td>
                          <td v-if="openAt.thursday.isOpen"> {{ openAt.thursday.timeStartAt }}-{{ openAt.thursday.timeEndAt }} </td>
                          <td v-else> Fechado</td>
                      </tr>       
                      <tr :class="this.today.getDay() == 5 ? 'primary--text' : 'white--text'">
                          <td>Sexta-Feira</td>
                          <td></td>
                          <td v-if="openAt.friday.isOpen">{{ openAt.friday.timeStartAt }}-{{ openAt.friday.timeEndAt }} </td>
                          <td v-else> Fechado</td>
                      </tr>    
                      <tr :class="this.today.getDay() == 6 ? 'primary--text' : 'white--text'">
                          <td>Sábado</td>
                          <td></td>
                          <td v-if="openAt.saturday.isOpen"> {{ openAt.saturday.timeStartAt }}-{{ openAt.saturday.timeEndAt }} </td>
                          <td v-else> Fechado</td>
                      </tr>    
                      <tr :class="this.today.getDay() == 0 ? 'primary--text' : 'white--text'">
                          <td>Domingo</td>
                          <td></td>
                          <td v-if="openAt.sunday.isOpen"> {{ openAt.sunday.timeStartAt }}-{{ openAt.sunday.timeEndAt }} </td>
                          <td v-else> Fechado</td>
                      </tr>                                                                                                               
                  </tbody>
              </table>
              
          </div>
      </span>        
  </div>                
</template>

<script> 
const OPEN = 'Aberto';
const CLOSED = 'Fechado';
export default {
    name: 'HourWorking',
    props: [ 'openAt' ],
    data: () => ({
        status: '',
        chevronDown: true,
        today: new Date()
    }),
    beforeMount() {

    },
    methods: {
      getMessageHour(start, end) {
          return `Horário de Hoje das ${start} às ${end}`
      },
      gerMessageClosed() {
          return 'Hoje estamos Fechado!!!'
      },
      isClosed(timeStartAt, timeEndAt) {
            const hourStart = Number(timeStartAt.substring(0,2));
            const hourEnd = Number(timeEndAt.substring(0,2));
            const minuteStart = Number(timeStartAt.substring(3,5));
            const minuteEnd = Number(timeEndAt.substring(3,5));
            return (this.today.getHours() < hourStart && this.today.getHours() >= hourEnd) ||
                   (this.today.getHours() == hourStart && this.today.getMinutes() < minuteStart) ||
                   (this.today.getHours() == hourEnd && this.today.getMinutes() > minuteEnd)
      },
      getMessageAgenda() {
        if(this.today.getDay() == 0) {
            if(this.openAt.sunday.isOpen) {
                this.status = this.isClosed(this.openAt.sunday.timeStartAt, this.openAt.sunday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.sunday.timeStartAt, this.openAt.sunday.timeEndAt);
            } else {
              this.status = CLOSED;
              return this.gerMessageClosed();
            }
        }
        if(this.today.getDay() == 1) {
            if(this.openAt.monday.isOpen) {
                this.status = this.isClosed(this.openAt.monday.timeStartAt, this.openAt.monday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.monday.timeStartAt, this.openAt.monday.timeEndAt);
            } else {
              this.status = CLOSED
              return this.gerMessageClosed();
            }
        }         
        if(this.today.getDay() == 2) {
            if(this.openAt.tuesday.isOpen) {
                this.status = this.isClosed(this.openAt.tuesday.timeStartAt, this.openAt.tuesday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.tuesday.timeStartAt, this.openAt.tuesday.timeEndAt);
            } else {
              this.status =CLOSED
              return this.gerMessageClosed();
            }
        }   
        if(this.today.getDay() == 3) {
            if(this.openAt.wednesday.isOpen) {
                this.status = this.isClosed(this.openAt.wednesday.timeStartAt, this.openAt.wednesday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.wednesday.timeStartAt, this.openAt.wednesday.timeEndAt);
            } else {
              this.status =CLOSED
              return this.gerMessageClosed();
            }
        }  
        if(this.today.getDay() == 4) {
            if(this.openAt.thursday.isOpen) {
                this.status = this.isClosed(this.openAt.thursday.timeStartAt, this.openAt.thursday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.thursday.timeStartAt, this.openAt.thursday.timeEndAt);
            } else {
              this.status =CLOSED
              return this.gerMessageClosed();
            }
        }  
        if(this.today.getDay() == 5) {
            if(this.openAt.friday.isOpen) {
                this.status = this.isClosed(this.openAt.friday.timeStartAt, this.openAt.friday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.friday.timeStartAt, this.openAt.friday.timeEndAt);
            } else {
              this.status = CLOSED
              return this.gerMessageClosed();
            }
        }  
        if(this.today.getDay() == 6) {
            if(this.openAt.saturday.isOpen) {
                this.status = this.isClosed(this.openAt.saturday.timeStartAt, this.openAt.saturday.timeEndAt) ? this.status = CLOSED : this.status = OPEN;
                return this.getMessageHour(this.openAt.saturday.timeStartAt, this.openAt.saturday.timeEndAt);
            } else {
              this.status = CLOSED
              return this.gerMessageClosed();
            }
        }                                
      }      
    },
    // nextDayOpen(dayWeek, openAt) {
    //     if(day)
    // }
  }
</script>

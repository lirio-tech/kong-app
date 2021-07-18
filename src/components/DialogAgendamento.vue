<template>
    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            class="primary"
          >
            <v-btn
              icon
              small
              @click="$emit('show-dialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                Agendar novo Cliente
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <v-form 
                  v-on:submit.prevent="registrarAgendamento"
                  ref="agendamentoForm"
                  id="agendamentoForm"
                >              
                      <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field 
                              v-model="agendamento.customer.name"
                              label="Cliente"
                              filled required
                              ref="customerName"
                              :rules="[v => !!v || 'Nome do Cliente Obrigatório',]"
                          ></v-text-field>  
                      </v-col>              
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          v-model="servicesSelected"
                          :items="services"
                          item-text="type"
                          filled
                          chips
                          label="Serviços"
                          multiple
                          ref="services"
                          :rules="[v => v.length > 0 || 'Servico Obrigatório',]"                          
                        ></v-select>
                      </v-col>             
                      <v-col
                        cols="12"
                        sm="6"
                        md="4"
                      >
                        <v-menu
                          v-model="menu2"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          transition="scale-transition"
                          offset-y
                          min-width="auto"
                    
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-text-field
                              :value="computedDateFormattedMomentjs"
                              label="Data do Agendamento"
                              prepend-icon="mdi-calendar"
                              readonly
                              v-bind="attrs"
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="date"
                            @input="menu2 = false"
                            locale="pt-br"
                          ></v-date-picker>
                        </v-menu>
                      </v-col>                         

                      <v-col cols="5">
                        <v-text-field
                          label="Horário"
                          v-model="agendamento.timeStartAt"
                          type="time"
                        ></v-text-field>
                      </v-col>            
                      <v-col cols="5">
                        <v-text-field
                          label="Fim"
                          v-model="agendamento.timeEndAt"
                          type="time"
                        ></v-text-field>
                      </v-col>                  
                      <v-col 
                          cols="12"
                          align="center"
                          justify="space-around"
                      >
                        <v-btn 
                            style="width: 90%"
                            color="success"
                            x-large
                            type="submit"
                        >
                          Agendar
                        </v-btn>                                                                               
                      </v-col>           
                </v-form>                                          
            </v-container>
          </v-card-text>          
          <div style="flex: 1 1 auto;"></div>
        </v-card>

    </v-dialog>    
</template>

<script>
import agendamentoGateway from '../api/agendamentoGateway';
import UserTypes from '../utils/UserTypes'
import moment from 'moment'
import storage from '../storage'
export default {
    props:['dialog'],
    data () {
      return {
        userLogged: {},
        myCompany: {},
        services: [],
        servicesSelected: [],
        value: [],        

        date: new Date().toISOString().substr(0, 10),
        menu2: false,
        modal: false,        
        agendamento: {
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
          timeStartAt: '12:30:00',
          timeEndAt: '13:30:00',
          services: [
            {
              type: '',
              price: 0,
              time: 60,
            }
          ],
        }

      }
    }, 
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      },
      formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null;
        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },      
      registrarAgendamento() {
        if(this.$refs.agendamentoForm.validate()) {
          this.agendamento.services = this.services.filter(it => this.servicesSelected.includes(it.type));
          this.agendamento.dateAt = this.date;
          console.log(this.agendamento);
          agendamentoGateway.registrarAgendamento(this.agendamento,
            () => {
              this.$emit('scheduled-success',new Date(),new Date())
              this.$emit('show-dialog',false)
            },
            () => alert('Erro ao registrar agendamento')
          )
        }
      },
    },
    computed: {
      computedDateFormattedMomentjs() {
        moment.locale('pt-br');
        return this.date ? moment(this.date).format('dddd, DD/MM/YYYY') : ''
      },      
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.myCompany = storage.getCompany();
      this.services = this.myCompany.services;
      this.agendamento.companyId = this.myCompany._id;
      this.agendamento.user = this.userLogged;
    }
}
</script>
<style scoped>
</style>
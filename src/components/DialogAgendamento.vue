<template>
    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            class="primary white--text"
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
                    <br/>
                      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12" v-if="isAdmin()">        
                          <v-select 
                              v-model="agendamento.user._id" 
                              size="1" 
                              :items="users"
                              label="Funcionário"
                              :rules="[v => !!v || 'Funcionário Obrigatório',]"
                              ref="user"
                              required filled 
                              item-text='name'
                              item-value='_id'      
                               @change="setServices"      
                          ></v-select>                                              
                      </v-col>  
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
                          item-text="display"
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
                        v-if="agendamento._id"
                      >
                          <v-text-field 
                              v-model="total"
                              label="Total"
                              readonly
                              filled required
                              ref="total"
                              @keyup="total = maskCurrency(total)"
                              :rules="[v => !!v || 'Total Obrigatório',]"
                          ></v-text-field>
                      </v-col>                              
                      <v-col
                        cols="12"
                        sm="6"
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
                              readonly
                              filled
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
                      <v-col cols="12" sm="6">           
                          <v-simple-table dense >
                              <template v-slot:default>
                                  <tbody >
                                  <tr>
                                      <th>
                                          <v-text-field
                                            label="Horário"
                                            v-model="agendamento.timeStartAt"
                                            type="time"
                                            @blur="changeTimeStart"
                                            filled
                                          ></v-text-field>                     
                                      </th>
                                      <th>
                                            <v-text-field
                                              label="Fim"
                                              v-model="agendamento.timeEndAt"
                                              type="time"
                                              filled
                                            ></v-text-field>  
                                      </th>
                                  </tr>
                                  </tbody>
                              </template>
                          </v-simple-table>
                      </v-col>
                      <v-col 
                          cols="12"
                          sm="6"
                          align="center"
                          justify="space-around"
                          v-if="agendamento.status !== 'REQUESTED' && agendamento.status !== 'DONE'"
                      >
                        <v-btn 
                            style="width: 90%"
                            color="success"
                            x-large
                            type="submit"
                            :loading="loagindAgendar"
                        >
                          Agendar
                        </v-btn>                                                                               
                      </v-col>                                
                      <v-col 
                          cols="12"
                          sm="6"
                          align="center"
                          justify="space-around"
                          v-if="agendamento.status === 'REQUESTED'"
                      >
                        <v-btn 
                            style="width: 90%"
                            color="info"
                            x-large
                            type="submit"
                            :loading="loagindAgendar"
                        >
                          Confirmar
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
    props:['dialog', 'agendamento', 'date','servicesSelected', 'users'],
    data () {
      return {
        loagindAgendar: false,
        userLogged: {},
        myCompany: {},
        services: [],
        value: [],        

        menu2: false,
        modal: false

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
      numberBrToUS(v) {
        return Number(v.replace('R$ ', '').replace('.', '').replace(',', '.'));
      },           
      maskCurrency(v) {
          v=String(v);
          v=v.replace(/\D/g,"");//Remove tudo o que não é numero
          v=String(Number(v));
          v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
          v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares
          v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
          return v;
      },      
      changeTimeStart() {
          let hour = Number(this.agendamento.timeStartAt.substring(0,2))+1;
          this.agendamento.timeEndAt = `${hour > 10 ? hour : '0'+hour}:${this.agendamento.timeStartAt.substring(3,5)}`
      },
      setServices() {
        if(this.agendamento.user._id) { 
          this.services = this.users.filter(it => it._id === this.agendamento.user._id)[0].services
          //this.services = this.isAdmin(this.userLogged.type) ? this.myCompany.services : this.userLogged.services;
        } else {
          this.services = this.userLogged.services;
        }
        this.services.forEach(element => {
          element.display = element.type
        });
      },      
      registrarAgendamento() {
        if(this.$refs.agendamentoForm.validate()) {
          this.agendamento.date = this.date;
          if( Number(this.agendamento.timeStartAt.substring(0,2)) > Number(this.agendamento.timeEndAt.substring(0,2))) {
            alert('Horario de Inicio deve ser menor que o horario final do agendamento');
            return;
          }

          this.agendamento.services = this.services.filter(it => this.servicesSelected.includes(it.type));
          this.agendamento.dateAt = this.agendamento.date;
          this.agendamento.total = this.numberBrToUS(this.total);
          console.log(this.agendamento);

          if(this.agendamento._id) {
              this.loagindAgendar = true;

              if(this.agendamento.status === 'REQUESTED') {

                  agendamentoGateway.confirmarAgendamento(this.agendamento._id, this.agendamento,
                          () => {
                            this.loagindAgendar = false;
                            this.$emit('scheduled-success', new Date(),new Date())
                            this.$emit('show-dialog',false)
                          },
                          () => {
                            this.loagindAgendar = false;
                            alert('Erro ao registrar agendamento')
                          }
                        )

              } else {

                  agendamentoGateway.alterarAgendamento(this.agendamento._id, this.agendamento,
                          () => {
                            this.loagindAgendar = false;
                            this.$emit('scheduled-success', new Date(),new Date())
                            this.$emit('show-dialog',false)
                          },
                          () => {
                            this.loagindAgendar = false;
                            alert('Erro ao registrar agendamento')
                          }
                        )
              }
          

          } else {
                this.loagindAgendar = true;
                agendamentoGateway.registrarAgendamento(this.agendamento,
                  () => {
                    this.loagindAgendar = false;
                    this.$emit('scheduled-success',new Date(),new Date())
                    this.$emit('show-dialog',false)
                  },
                  () => { 
                    this.loagindAgendar = false; 
                    alert('Erro ao registrar agendamento')
                  }
                )
          }
        }
      },
    },
    computed: {
      computedDateFormattedMomentjs() {
        moment.locale('pt-br');
        return this.date ? moment(this.date).format('dddd, DD/MM') : ''
      },      
      total: function () {
        let svs = this.services.filter(it => this.servicesSelected.includes(it.type));
        console.log(svs)
        let total = 0;
        for(var i in svs) {
            total += svs[i].price;
        }
        console.log(total);
        return this.maskCurrency(total);
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.myCompany = storage.getCompany();
      this.setServices();
    }
}
</script>
<style scoped>
</style>
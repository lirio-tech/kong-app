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
              @click="$emit('show-dialog-agendamento', false)"
              v-if="!isAgendado"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-10px;">
                Agendamento
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <v-form 
                  v-on:submit.prevent="registrarAgendamento"
                  ref="agendamentoForm"
                  id="agendamentoForm"
                  v-if="!isAgendado"
                >              
                    <br/>
                      <v-col
                          cols="12"
                          sm="6"
                        >
                          <v-text-field 
                              v-model="agendamento.customer.name"
                              label="Seu Nome"
                              filled required
                              prepend-icon="mdi-account"
                              ref="customerName"
                              :rules="[v => !!v || 'Nome Obrigatório',]"
                          ></v-text-field>  
                      </v-col>          
                      <v-col 
                        cols="12"
                        sm="6"
                      >
                          <v-text-field 
                              v-model="agendamento.customer.phone_number"
                              label="WhatsApp ou Celular"
                              ref="whats"
                              v-mask="'(##) #####-####'"
                              filled
                              :rules="[v => !!v || 'WhatsApp Obrigatório',]"
                              prepend-icon="mdi-whatsapp"
                          />                                    
                      </v-col>                                                    
                      <v-col
                        cols="12"
                        sm="6"
                      >
                        <v-select
                          v-model="servicesSelected"
                          :items="myCompany.services"
                          item-text="type"
                          filled
                          chips
                          label="Serviços"
                          multiple
                          ref="services"
                          prepend-icon="mdi-content-cut"
                          :rules="[v => v.length > 0 || 'Servico Obrigatório',]"                          
                        ></v-select>
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
                              :rules="[v => v.length > 0 || 'Data Obrigatória',]"      
                              prepend-icon="mdi-calendar"
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
                                            :rules="[v => !!v || 'Horário Obrigatório',]"
                                            prepend-icon="mdi-clock"
                                          ></v-text-field>                     
                                      </th>
                                      <!-- <th >
                                            <v-text-field
                                              disabled
                                              label="Fim"
                                              v-model="agendamento.timeEndAt"
                                              type="time"
                                              filled
                                            ></v-text-field>  
                                      </th> -->
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
                </v-form>                 
                <center v-else>
                    <span style="font-size: 1.4rem;">
                        Seu Agendamento foi enviado, em breve entraremos em contato confirmando, aguarde...
                    </span>
                    <br/><br/>
                    <v-btn
                      large
                      color="success"
                      @click="ok()"
                    >
                        OK
                    </v-btn>
                </center>                          
            </v-container>
          </v-card-text>          
          <div style="flex: 1 1 auto;"></div>
        </v-card>

    </v-dialog>    
</template>

<script>
import agendamentoGateway from '../api/agendamentoGateway';
import moment from 'moment'
import storage from '../storage'
export default {
    name: 'DialogAgendamentoSite',
    props:['dialog',],
    data () {
      return {
        loagindAgendar: false,
        userLogged: {},
        myCompany: {},
        services: [],
        value: [],        

        menu2: false,
        modal: false,
        isAgendado: false,
        agendamento: {
          customer: {},
          timeStartAt: '11:00',
          timeEndAt: '12:00',
          services: []
        },
        date: null,
        servicesSelected: ['Corte de Cabelo', 'Barba'],
      }
    }, 
    methods: {
      formatDate (date) {
        if (!date) return null;
        console.log(date)
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
        // if(this.agendamento.user._id) { 
        //   this.services = this.users.filter(it => it._id === this.agendamento.user._id)[0].services
        //   //this.services = this.isAdmin(this.userLogged.type) ? this.myCompany.services : this.userLogged.services;
        // } else {
        //   this.services = this.userLogged.services;
        // }
        // this.services.forEach(element => {
        //   element.display = element.type
        // });
      },      
      registrarAgendamento() {
        if(this.$refs.agendamentoForm.validate()) {
          this.agendamento.date = this.date;
          if( Number(this.agendamento.timeStartAt.substring(0,2)) > Number(this.agendamento.timeEndAt.substring(0,2))) {
            alert('Horário de Inicio deve ser menor que o horario final do agendamento');
            return;
          }

          this.agendamento.companyId = this.myCompany._id;
          this.agendamento.services = this.myCompany.services.filter(it => this.servicesSelected.includes(it.type));
          console.log(this.agendamento.services)
          this.agendamento.dateAt = this.agendamento.date;
          console.log(this.agendamento);

          this.loagindAgendar = true;

          agendamentoGateway.registrarAgendamentoSite(this.agendamento,
            (res) => {
              this.loagindAgendar = false;
              this.isAgendado = true;
              this.agendamento = res;
            },
            (err) => {  
              this.loagindAgendar = false; 
              if(err.response.status === 422) {
                alert('Você já possui um agendamento solicitado, aguarde entraremos em contato');    
                this.agendamento = err.response.data.schedulesVerify[0];     
                this.ok();   
                return;
              }                     
              alert('Erro ao registrar agendamento')
            }
          )          
        }
      },
      ok() {
        this.isAgendado = false; 
        this.$emit('show-dialog-agendamento', false, this.agendamento  )        
      }
    },
    computed: {
      computedDateFormattedMomentjs() {
        moment.locale('pt-br');
        return this.date ? moment(this.date).format('dddd, DD/MM') : ''
      },      

    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.myCompany = storage.getCompany();
      //this.setServices();
    }
}
</script>
<style scoped>
</style>
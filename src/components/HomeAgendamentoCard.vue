<template>
  <div>
        <v-card
          class="mx-auto"
          max-width="365"
          elevation="10"
          shaped
          :color="agendamento.postItColor"
        >

                    <v-card-text class="black--text">
                      <div> {{ agendamento.title }} <span class="icon-emoji-30" style="float: right;margin-top:-20px">📌</span></div> 
                      <router-link :to="isAdmin() ? `/admin/agendamentos/?date=${agendamento.dateTimeStartAt}` : `/agendamentos/?date=${agendamento.dateTimeStartAt}`" style="color: inherit; text-decoration: none">
                          <p class="text-h6 black--text" style="margin-bottom: -5px">
                            {{ agendamento.customer.name }} 
                          </p>
                          <small class="black--text" v-if="agendamento.customer.phone_number" >
                            {{ agendamento.customer.phone_number }} 
                          </small>
                      </router-link>                   
                      <div v-if="agendamento.status === 'REQUESTED'" class="black--text" >
                          <button-contact-customer-whats-app :customer="agendamento.customer" /> 
                          <button-contact-customer-call-phone-number :customer="agendamento.customer" style="margin-left: 10px;" /> 
                      </div>     
                    </v-card-text>
                    <router-link :to="isAdmin() ? `/admin/agendamentos/?date=${agendamento.dateTimeStartAt}` : `/agendamentos/?date=${agendamento.dateTimeStartAt}`" style="color: inherit; text-decoration: none">
                          <v-card-text class="black--text">
                            <v-icon class="black--text">mdi-account</v-icon> &nbsp; <b>{{ agendamento.user.name }}</b> 
                            <br />
                            <v-icon class="black--text">mdi-clock</v-icon> &nbsp; 
                              <b>
                                  {{ getDayOfWeek(new Date(agendamento.dateTimeStartAt)) }}
                                  {{  ['Ontem','Hoje','Amanhã'].includes(getDayOfWeek(new Date(agendamento.dateTimeStartAt))) ? '' : ', '+new Date(agendamento.dateTimeStartAt).toLocaleString('pt-BR').substring(0,5) }} 
                                  às {{ agendamento.dateTimeStartAt.substring(11,16) }} </b> 
                                  <v-chip 
                                    small 
                                    style="margin-top: -5px" 
                                    color="dark"
                                    v-if="getTimePast(agendamento.dateTimeStartAt).show"
                                  >
                                      {{ getTimePast(agendamento.dateTimeStartAt).description }}
                                  </v-chip>
                                  <br/>
                            <b>{{ getDescriptionServices(agendamento.services) }}</b> 
                            <br/>
                            <small>Criado em {{ new Date(agendamento.createdAt).toLocaleString('pt-BR').substring(0,16) }} por {{ agendamento.createdBy }}</small> <br/>
                          </v-card-text>
                    </router-link>               
                    <v-card-actions> 
                        <v-btn
                         @click="goAgendamentoUpdate(agendamento)"
                         small
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn 
                          color="red" 
                          class="white--text"
                          :loading="loadingCancel"
                          @click="cancel(agendamento)"
                          small
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          @click="showDialogConcluir(true, agendamento._id)"
                          :loading="loadingConcluir"        
                          v-if="agendamento.status === 'PENDING'"                  
                          small
                        >
                          Concluir
                        </v-btn>   
                        <v-btn
                          color="info"
                          @click="goAgendamentoUpdate(agendamento)"
                          :loading="loadingConcluir"        
                          v-if="agendamento.status === 'REQUESTED'"                  
                          small
                        >
                          Confirmar
                        </v-btn>                           
                    </v-card-actions>

        </v-card>      
        
        <dialog-agendamento-concluir 
            :dialog="dialogAgendamentoConcluir" 
            :agendamento="agendamento"
            v-on:show-dialog="showDialogConcluir" 
        />       
  </div>      
</template>
 
<script>
import UserTypes from '../utils/UserTypes'
import agendamentoGateway from '../api/agendamentoGateway';
import DialogAgendamentoConcluir from './DialogAgendamentoConcluir.vue';
import dateUtil from '../utils/date';
import ButtonContactCustomerWhatsApp from './ButtonContactCustomerWhatsApp.vue';
import ButtonContactCustomerCallPhoneNumber from './ButtonContactCustomerCallPhoneNumber.vue';
export default {
  components: { DialogAgendamentoConcluir, ButtonContactCustomerWhatsApp, ButtonContactCustomerCallPhoneNumber },
    name: 'HomeAgendamentoCard',
    props: [ 'agendamento', 'userLogged' ],
    data() {
      return {
          loadingCancel: false,
          loadingConcluir: false,
          dialogAgendamentoConcluir: false,
      }
    },
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },      
      getDescriptionServices(services) {
          let description = ''
          for(var i in services) {
            description += `${services[i].type}, `
          }
          return description.substring(0, description.length-2);
      },      
      goAgendamentoUpdate(agendamento) {

        if(agendamento.status === 'REQUESTED' && !this.isAdmin()) {
          alert('Há um novo agendamento, avise ao administrador :)')
          return;
        }

        if(this.isAdmin()) {
          this.$router.push(`/admin/agendamentos/?_id=${agendamento._id}&date=${agendamento.dateTimeStartAt}`);
        } else {
          this.$router.push(`/agendamentos/?_id=${agendamento._id}&date=${agendamento.dateTimeStartAt}`);
        }
      },
      cancel(agendamento) {

        if(agendamento.status === 'REQUESTED' && !this.isAdmin()) {
          alert('Há um novo agendamento, avise o seu administrador :)')
          return;
        }

        if(confirm("Deseja Realmente Cancelar?")) {
            this.loadingCancel = true;
            agendamentoGateway.agendamentoCancelar(agendamento._id, 
              () => {
                  this.loadingCancel = false;
                  this.selectedOpen = false;
                  window.location.reload();
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
      showDialogConcluir(show) {
        this.dialogAgendamentoConcluir = show;
      },      
      getDayOfWeek(date) {
        return dateUtil.getDayOfWeekToday(date)
      },
      getTimePast(dateTimeStartAt) {
        
          let dtStart = new Date(dateTimeStartAt)
          dtStart.setHours(dtStart.getHours()+3);

          if(dtStart.getTime() > new Date()) {
            return {
                description: ``,
                show: false
            }                      
          }

          
          console.log();
          const diff = Math.abs(new Date().getTime() - dtStart.getTime());
          const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
          if(days > 30) {
              let vl = Math.trunc(days/30)
              return {
                  description: `${vl} ${vl > 1 ? "meses" : "mês" } atrás`,
                  show: true
              }            
          }

          console.log('diff',diff);

          const horas = Math.ceil(diff / (1000 * 60 * 60));
          if(horas > 24) {
              let vl = Math.trunc(horas/24)
              return {
                  description: `${vl} dia${vl > 1 ? 's' : ''} atrás`,
                  show: true
              }            
          }
          if(horas > 2) {
              let vl = Math.trunc(horas)
              return {
                  description: `${vl}h atrás`,
                  show: true
              }            
          }                    
          return {
              description: ``,
              show: false
          }                      

      }    
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fuggles&display=swap');
</style>
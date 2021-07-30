<template>
  <div>
        <v-card
          class="mx-auto"
          max-width="365"
          elevation="10"
          shaped
          :color="getColorSituation(agendamento.status)"
        >
                    <router-link :to="isAdmin() ? `/admin/agendamentos/?date=${agendamento.dateTimeStartAt}` : `/agendamentos/?date=${agendamento.dateTimeStartAt}`" style="color: inherit; text-decoration: none">
                          <v-card-text class="black--text">
                            <div>{{ getTitle(agendamento.status) }} <span style="margin-left: 70px; font-size: 30px; font-family: fuggles, Liu Jian Mao Cao;" class="indigo--text">Post it</span></div> 
                            <p class="text-h6 black--text">
                              {{ agendamento.customer.name }} 
                            </p>
                            <v-icon class="black--text">mdi-account</v-icon> &nbsp; <b>{{ agendamento.user.name }}</b> <br />
                            <v-icon class="black--text">mdi-clock</v-icon> &nbsp; <b>{{ getDayOfWeek(new Date(agendamento.dateTimeStartAt)) }}, {{ new Date(agendamento.dateTimeStartAt).toLocaleString('pt-BR').substring(0,5) }} às {{ agendamento.dateTimeStartAt.substring(11,16) }} </b> <br/>
                            <b>{{ getDescriptionServices(agendamento.services) }}</b> <br/>
                              
                          </v-card-text>
                    </router-link>
                    <v-card-actions>
                        <v-btn
                         @click="goAgendamentoUpdate(agendamento)"
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn 
                          color="red" 
                          class="white--text"
                          :loading="loadingCancel"
                          @click="cancel(agendamento._id)"
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          @click="showDialogConcluir(true, agendamento._id)"
                          :loading="loadingConcluir"                          
                        >
                          Concluir
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
export default {
  components: { DialogAgendamentoConcluir },
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
      getColorSituation(situation) {
        if(situation === 'PRIOR') return 'red lighten-3';
        if(situation === 'PENDING') return 'info lighten-1';
        return ''
      },
      getTitle(status){
        if(status === 'PRIOR') return 'Conclua esse agendamento :)';
        if(status === 'PENDING') return 'Próximo Agendamento';
        return ''        
      },
      getDescriptionServices(services) {
          let description = ''
          for(var i in services) {
            description += `${services[i].type}, `
          }
          return description.substring(0, description.length-2);
      },      
      goAgendamentoUpdate(agendamento) {
        if(this.isAdmin()) {
          this.$router.push(`/admin/agendamentos/?_id=${agendamento._id}&date=${agendamento.dateTimeStartAt}`);
        } else {
          this.$router.push(`/agendamentos/?_id=${agendamento._id}&date=${agendamento.dateTimeStartAt}`);
        }
      },
      cancel(_id) {
        if(confirm("Deseja Realmente Cancelar?")) {
            this.loadingCancel = true;
            agendamentoGateway.agendamentoCancelar(_id, 
              () => {
                  this.loadingCancel = false;
                  this.selectedOpen = false;
                  window.location.reload();
              }, () => {
                this.loadingCancel = false;
                alert('Erro ao Concluir :(');
              })              
        }
      },  
      showDialogConcluir(show) {
        this.dialogAgendamentoConcluir = show;
      },      
      getDayOfWeek(date) {
        return dateUtil.getDayOfWeekToday(date)
      }    
    }
  }
</script>
<style>
@import url('https://fonts.googleapis.com/css2?family=Fuggles&display=swap');
</style>
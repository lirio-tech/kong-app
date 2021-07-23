<template>
  <div v-if="agendamentos.length > 0">
    <div >
        <router-link :to="isAdmin() ? '/admin/agendamentos/' : '/agendamentos/'" style="color: inherit; text-decoration: none">
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <v-list-item style="margin-bottom: -35px">
                    <v-list-item-content>                                  
                            <v-col cols="12" style="margin-top: -20px;margin-left: -10px;">
                              <div class="overline mb-4 grey--text">
                                  Agendamentos
                              </div>                           
                            </v-col>  
                    </v-list-item-content>
                  </v-list-item>            
                  <div v-for="ag in agendamentos" :key="ag._id" style="margin-top: -15px">
                      <home-agendamento-card :agendamento="agendamento" :userLogged="userLogged" />
                      <br/>
                  </div>
            </v-card>      
            
        </router-link>        
    </div>   
  </div>      
</template>
 
<script>
import UserTypes from '../utils/UserTypes'
import HomeAgendamentoCard from './HomeAgendamentoCard.vue';
import agendamentoGateway from '../api/agendamentoGateway';
export default {
  components: { HomeAgendamentoCard },
    name: 'HomeAgendamentos',
    props: [ 'userLogged' ],
    data() {
      return {
          agendamentos: []
      }
    },
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },      
    },
    beforeMount() {
        agendamentoGateway.getPriorAndNext(res => {
            this.agendamentos = res;
          }, () => {
            this.agendamentos = [];
          }
        )
    }
  }
</script>

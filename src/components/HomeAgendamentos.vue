<template>
  <div>
    <div >
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <router-link :to="isAdmin() ? '/admin/agendamentos/' : '/agendamentos/'" style="color: inherit; text-decoration: none">
                      <v-list-item style="margin-bottom: -35px" >
                        <v-list-item-content>                                  
                            <v-col cols="11" style="margin-top: -20px;margin-left: -10px;">
                              <div class="overline mb-4 grey--text">
                                  Agendamentos
                              </div>                           
                            </v-col>  
                            <v-col cols="1">
                                <v-icon style="margin-top: -40px;">mdi-chevron-right</v-icon>
                            </v-col>                                
                        </v-list-item-content>
                      </v-list-item>            
                  </router-link>     
                  <div v-for="ag in agendamentos" :key="ag._id" style="margin-top: -15px">
                      <home-agendamento-card :agendamento="ag" :userLogged="userLogged" />
                      <br/>
                  </div>
                  <div v-if="agendamentos.length == 0" style="margin-top: -15px">
                      <router-link :to="isAdmin() ? '/admin/agendamentos/' : '/agendamentos/'" style="color: inherit; text-decoration: none">
                          <v-col cols="12">
                              <span class="grey--text">
                                Você não possui cliente agendado :)
                              </span>
                              <br/>
                              <br/>
                            <v-btn>
                              <v-icon color="primary">mdi-clock</v-icon> &nbsp; Agendar
                            </v-btn>                             
                          </v-col>
                      </router-link>
                  </div>
                  
            </v-card>      
            
           
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
      goAgendamentos(){

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

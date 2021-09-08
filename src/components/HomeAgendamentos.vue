<template>
  <div>
    <div >
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <router-link :to="isAdmin() ? '/admin/agendamentos/' : '/agendamentos/'" style="color: inherit; text-decoration: none">
                      <v-list-item style="margin-bottom: 0px" >
                        <v-list-item-content>        
                            <v-col cols="12">
                                <span class="icon-emoji">🕑</span> <span class="grey--text" style="margin-left: 15px">Agendamentos</span>
                                <v-icon class="chevron-right">mdi-chevron-right</v-icon>
                            </v-col>                                                       
                        </v-list-item-content>
                      </v-list-item>            
                  </router-link>     
                  
                  <div v-for="ag in agendamentos" :key="ag._id" style="margin-top: -15px">
                      <home-agendamento-card :agendamento="ag" :userLogged="userLogged" />
                      <br/>
                  </div> 

                  <div v-if="agendamentos.length == 0" style="margin-top: -20px">
                      <router-link :to="isAdmin() ? '/admin/agendamentos/' : '/agendamentos/'" style="color: inherit; text-decoration: none">
                          <v-col cols="12">
                              <span class="grey--text" v-if="!loadingAgendamentos">
                                Você não possui cliente agendado :(
                              </span>
                              <div v-else > 
                                    <v-skeleton-loader tile type="heading" />
                              </div>                                                                                           

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
          agendamentos: [],
          loadingAgendamentos: false,
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
        this.loadingAgendamentos = true;
        this.agendamentos = [];
        agendamentoGateway.getPriorAndNext(res => {
            this.loadingAgendamentos = false;
            this.agendamentos = res;
            console.log('agendamentos',this.agendamentos)
          }, () => {
            this.loadingAgendamentos = false;
            this.agendamentos = [];
          }
        )
    }
  }
</script>

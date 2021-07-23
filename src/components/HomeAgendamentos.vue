<template>
  <div>
    <div v-if="!isAdmin()">
        <router-link to="/agendamentos" style="color: inherit; text-decoration: none">
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <v-list-item three-line>
                    <v-list-item-content>                                  
                          <v-col cols="12">
                              <span 
                                style="font-size: 1.0rem !important;"
                              >
                                Agendamentos
                              </span>                            
                              <br/><br/>
                              <span 
                                style="font-size: 1.0rem !important;"
                                class="caption grey--text"
                              >
                                Ultimo
                              </span>
                          </v-col>            
                          <v-col cols="12">
                              > ultimo
                          </v-col>           
                          <br/>
                          <v-col cols="12">
                              <span 
                                style="font-size: 1.0rem !important;"
                                class="caption grey--text"
                              >
                                Proximo
                              </span>
                          </v-col>            
                          <v-col cols="12">
                              > proximo
                          </v-col>                                       
                    </v-list-item-content>
                  </v-list-item>
            </v-card>      
        </router-link>        
    </div>         
    <div v-if="isAdmin()">
        <router-link to="/admin/agendamentos/" style="color: inherit; text-decoration: none">
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
export default {
  components: { HomeAgendamentoCard },
    name: 'HomeAgendamentos',
    props: [ 'userLogged' ],
    data() {
      return {
          agendamentos: [{_id:1}, {_id:2}]
      }
    },
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },      
    }
  }
</script>

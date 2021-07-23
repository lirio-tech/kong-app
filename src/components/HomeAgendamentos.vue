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
                    <v-card-text>
                      <div>Agendamentos</div>
                    </v-card-text>            
                  <v-card
                    class="mx-auto"
                    max-width="344"
                    color="red lighten-3"
                  >
                    <v-card-text>
                      <div>Conclua esse agendamento :)</div>
                      <p class="text-h6 text--primary">
                        Soraya
                      </p>
                      <div class="text--primary">
                        Unha <br/>
                        23/07/2021 12:00 as 13:00
                      </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                          color="white" 
                          
                          
                          class="indigo--text"
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn
                          color="red" 
                          
                          class="white--text"
                          
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          
                          
                        >
                          Concluir
                        </v-btn>   
                    </v-card-actions>
                
                    <v-expand-transition>
                      <v-card
                        v-if="reveal"
                        class="transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%;"
                      >
                        <v-card-text class="pb-0">
                          <p class="text-h4 text--primary">
                            Origin
                          </p>
                          <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                        </v-card-text>
                        <v-card-actions class="pt-0">
                          <v-btn
                            text
                            color="teal accent-4"
                            @click="reveal = false"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-expand-transition>
                  </v-card>
                  <br/>
                  <v-card
                    class="mx-auto"
                    max-width="344"
                    color="blue lighten-2"
                  >
                    <v-card-text>
                      <div>Próximo</div>
                      <p class="text-h6 text--primary">
                        Soraya
                      </p>
                      <div class="text--primary">
                        Unha <br/>
                        23/07/2021 12:00 as 13:00
                      </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                          color="white" 
                          
                          
                          class="indigo--text"
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn
                          color="red" 
                          
                          class="white--text"
                          
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          
                          
                        >
                          Concluir
                        </v-btn>   
                    </v-card-actions>
                
                    <v-expand-transition>
                      <v-card
                        v-if="reveal"
                        class="transition-fast-in-fast-out v-card--reveal"
                        style="height: 100%;"
                      >
                        <v-card-text class="pb-0">
                          <p class="text-h4 text--primary">
                            Origin
                          </p>
                          <p>late 16th century (as a noun denoting a place where alms were distributed): from medieval Latin eleemosynarius, from late Latin eleemosyna ‘alms’, from Greek eleēmosunē ‘compassion’ </p>
                        </v-card-text>
                        <v-card-actions class="pt-0">
                          <v-btn
                            text
                            color="teal accent-4"
                            @click="reveal = false"
                          >
                            Close
                          </v-btn>
                        </v-card-actions>
                      </v-card>
                    </v-expand-transition>
                  </v-card>         
                   <br/>         
            </v-card>      
            
        </router-link>        
    </div>   
  </div>      
</template>
 
<script>
import UserTypes from '../utils/UserTypes'
export default {
    name: 'HomeAgendamentos',
    props: [ 'userLogged' ],
    data() {
      return {
        
      }
    },
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },      
    }
  }
</script>

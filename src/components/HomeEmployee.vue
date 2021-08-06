<template>

    <div>
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <router-link :to="{ path:'/analytics'}" style="color: inherit; text-decoration: none">
                    <v-list-item three-line>
                          <v-list-item-content>       
                                <v-col cols="11" style="margin-top: -20px;margin-left: -10px;">
                                  <div class="overline mb-4 grey--text">
                                      Periodo: 
                                      <span class="">{{ ordersGroup.periodDescription }}</span>
                                  </div>                           
                                </v-col>      
                                <v-col cols="1">
                                    <v-icon style="margin-top: -40px; margin-left: -5px">mdi-chevron-right</v-icon>
                                </v-col>                          
                                <v-col cols="7">
                                  <v-list-item-title class="headline mb-1" style="margin-top: -35px;">
                                      <span class="caption grey--text">Seu Valor</span><br/>
                                      <div style="font-size: 1.5rem" >
                                        <span class="">R$ {{ ordersByUsers ? ordersByUsers.commission : 0 | currency }} </span>
                                      </div>
                                  </v-list-item-title>
                                </v-col>
                                <v-col cols="4">
                                  <v-list-item-title class="headline mb-1 text-center" style="margin-top: -35px;">
                                      <span class="caption grey--text">Qtde.</span><br/>
                                      <div style="font-size: 1.5rem">
                                        <span class="">{{ ordersGroup.amount }} </span>
                                        <br/>
                                      </div>
                                  </v-list-item-title> 
                                </v-col>                
                                <hr-line />            
                                <v-col cols="4" style="margin-top:5px" class="text-center">
                                    <v-icon color="green" style="margin-top: -5px">
                                      mdi-cash
                                    </v-icon> 
                                    <br/>
                                    <span class="grey--text" style="font-size: 1.1rem">
                                      R$ {{ ordersGroup.cash | currency }}
                                    </span>
                                </v-col>
                                <v-col cols="4" style="margin-top:5px" class="text-center">
                                    <v-icon color="purple" style="margin-top: -5px">
                                      mdi-credit-card
                                    </v-icon>                                    
                                    <br/>
                                    <span class="grey--text" style="font-size: 1.1rem">
                                      R$ {{ ordersGroup.card | currency }}
                                    </span>                     
                                </v-col> 
                                <v-col cols="4" style="margin-top:5px" class="text-center" small>
                                    <v-icon color="teal lighten-2" style="margin-top: -2px">
                                      mdi-rhombus-split
                                    </v-icon>               
                                    <br/>                     
                                    <span class="grey--text" style="font-size: 1.1rem">
                                      R$ {{ ordersGroup.pix | currency }}
                                    </span>                                
                                </v-col> 
                                <hr-line v-if="ordersGroup.amount" style="margin-top: 15px;"/>
                          </v-list-item-content>
                      
                      </v-list-item>
                    </router-link>
                    <v-card-actions > 
                        <v-col cols="12" class="text-center" style="margin-top: -15px;">
                          <v-btn 
                              :to="{ path:'/ordem-servico'}" 
                              class="ma-2"
                              x-large
                              style="width: 80%"
                          >
                            <v-icon style="margin-right: 10px;">
                              mdi-content-cut
                            </v-icon>
                            Novo
                          </v-btn>                                                                     
                        </v-col>
                    </v-card-actions>
                    <v-col cols="12" class="text-center" style="margin-top: -30px;margin-bottom: -15px;">
                      <router-link to="/orders" style="color: inherit; text-decoration: none">
                        <v-btn text class="overline grey--text">
                          Ver Detalhes                                    
                        </v-btn>
                      </router-link>
                    </v-col>                          

            </v-card>                          
    </div>            
</template>
 
<script>
import HrLine from './HrLine.vue'
export default {
  components: { HrLine },
    name: 'HomeEmployee',
    props: [ 'ordersGroup', 'ordersByUsers', 'userLogged', 'company' ],
    data() {
      return {
        
      }
    }
  }
</script>

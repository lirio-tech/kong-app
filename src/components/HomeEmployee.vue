<template>

    <div>
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                    <v-list-item three-line>
                      <v-list-item-content>       
                            <v-col cols="11" style="margin-top: -20px;margin-left: -10px;">
                              <div class="overline mb-4 grey--text">
                                  Periodo: 
                                  <span class="">{{ consolidado.periodoDescricao }}</span>
                              </div>                           
                            </v-col>                              
                            <v-col cols="7">
                              <v-list-item-title class="headline mb-1" style="margin-top: -35px;">
                                  <span class="caption grey--text">Valor de {{ userLogged.percentCommission }}%</span><br/>
                                  <div style="font-size: 1.5rem" >
                                    <span class="green--text">{{ consolidado.total * company.percentCommission / 100 | currency }} </span>
                                  </div>
                              </v-list-item-title>
                            </v-col>
                            <v-col cols="4">
                              <v-list-item-title class="headline mb-1 text-center" style="margin-top: -35px;">
                                  <span class="caption grey--text">Qtde.</span><br/>
                                  <div style="font-size: 1.5rem">
                                    <span class="green--text">{{ orders.length }} </span>
                                    <br/>
                                  </div>
                              </v-list-item-title>
                            </v-col>                            
                            <hr style="border: 1px dotted #424242;border-radius: 5px;" />
                            <v-col cols="6" style="margin-top:5px" class="text-center">
                                <v-icon color="green" style="margin-top: -5px">
                                  mdi-cash
                                </v-icon> 
                                <span class="grey--text" style="font-size: 1.1rem">
                                  {{ sumPaymentType.cash | currency }}
                                </span>
                            </v-col>
                            <v-col cols="6" style="margin-top:5px" class="text-center">
                                <v-icon color="purple" style="margin-top: -5px">
                                  mdi-credit-card
                                </v-icon>                                    
                                <span class="grey--text" style="font-size: 1.1rem">
                                  {{ sumPaymentType.card | currency }}
                                </span>                                
                            </v-col> 
                            <hr v-if="orders.length" style="margin-top: 15px; border: 1px dotted #424242;border-radius: 5px;" />
                      </v-list-item-content>
                    </v-list-item>
                    <v-card-actions > 
                        <v-col cols="12" class="text-center" style="margin-top: -15px;">
                          <v-btn 
                              :to="{ path:'/ordem-servico'}" 
                              class="ma-2"
                              large
                              style="width: 70%"
                              outlined
                              color="cyan"
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
            <br/>
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <v-list-item three-line>
                    <v-list-item-content>                                  
                          <v-col cols="10">
                              <span 
                                style="font-size: 1.0rem !important;"
                              >
                                Olá {{ userLogged.name }}
                              </span>                            
                              <br/><br/>
                              <span 
                                style="font-size: 1.0rem !important;"
                                class="caption grey--text"
                              >
                                Voce tem a Receber
                              </span>
                          </v-col>          
                          <v-col cols="2">
                            <span style="margin-left: -50px;">
                                <router-link 
                                  :to="{ path: '/users-balance-detail/'+userLogged._id }" 
                                  style="color: inherit; text-decoration: none"
                                >
                                    <v-btn large dark>
                                        <v-icon color="green lighten-4">
                                            mdi-account-cash
                                        </v-icon>    
                                    </v-btn>
                                </router-link>                          
                            </span>     
                          </v-col>    
                          <v-col cols="12">
                            <v-list-item-title class="mb-1" style="margin-top: -25px;">
                                <div style="font-size: 2.3rem">
                                  <span :class="userBalance.balance < 0 ? 'red--text' : 'green--text'">{{ userBalance.balance | currency }} </span>
                                </div>
                            </v-list-item-title>
                          </v-col>                     
                    </v-list-item-content>
                  </v-list-item>
            </v-card>              
    </div>            
</template>

<script>
export default {
    name: 'HomeEmployee',
    props: [ 'orders', 'consolidado', 'userLogged', 'sumPaymentType', 'company', 'userBalance' ],
    data() {
      return {
        userBalance: {}
      }
    }
  }
</script>

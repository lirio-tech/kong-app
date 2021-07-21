<template>

  <div>

    <v-card
      class="mx-auto"
      max-width="800"
      outlined
    >
            <v-list-item three-line>
              <v-list-item-content>       
                    <v-col cols="12" style="margin-top: -20px;margin-left: -10px;">
                      <div class="overline mb-4 grey--text">
                          Periodo: 
                          <span class="">{{ ordersGroup.periodDescription }}</span>
                      </div>                           
                    </v-col>                      
                    <v-col cols="7">
                      <v-list-item-title class="headline mb-1" style="margin-top: -40px;">
                          <span class="caption grey--text">Total</span><br/>
                          <div style="font-size: 1.5rem">
                            <span class="">{{ ordersGroup.total | currency }} </span>
                          </div>
                      </v-list-item-title>
                    </v-col>
                    <v-col cols="4">
                      <v-list-item-title class="headline mb-1 text-center" style="margin-top: -40px;">
                          <span class="caption grey--text">Qtde.</span><br/>
                          <div style="font-size: 1.5rem">
                            <span class="">{{ ordersGroup.amount }} </span>
                            <br/>
                          </div>
                      </v-list-item-title>
                    </v-col>                            
                    <hr style="border: 1px dotted #424242;border-radius: 5px;" />
                    <v-col cols="4" style="margin-top:5px" class="text-center">
                        <v-icon color="green" style="margin-top: -4px">
                          mdi-cash
                        </v-icon> 
                        <br/>
                        <span class="grey--text" style="font-size: 1.1rem">
                          {{ ordersGroup.cash | currency }}
                        </span>
                    </v-col>
                    <v-col cols="4" style="margin-top:5px" class="text-center" small>
                        <v-icon color="purple" style="margin-top: -2px">
                          mdi-credit-card
                        </v-icon>                                    
                        <br/>
                        <span class="grey--text" style="font-size: 1.1rem">
                          {{ ordersGroup.card | currency }}
                        </span>                                
                    </v-col> 
                    <v-col cols="4" style="margin-top:5px" class="text-center" small>
                        <v-icon color="teal lighten-2" style="margin-top: -2px">
                          mdi-rhombus-split
                        </v-icon>                                    
                        <br/>
                        <span class="grey--text" style="font-size: 1.1rem">
                          {{ ordersGroup.pix | currency }}
                        </span>                                
                    </v-col> 

                    <hr style="border: 1px dotted #424242;border-radius: 5px;" />
                    <br/>
                    <div class="caption grey--text">
                        <span class="">Comissão</span>
                    </div>                              
                    <v-row 
                      v-for="usr in ordersByUsers" 
                      :key="usr._id" 
                      style="margin-top:-5px"
                    >
                        <v-col cols="2" class="text-center">
                            <v-icon color="grey">mdi-account</v-icon>
                        </v-col>
                        <v-col cols="5" class="grey--text" style="font-size: 1.1rem">
                              {{ usr._id }}
                        </v-col> 
                        <v-col cols="4" class="grey--text" :style="'font-size: 1.1rem;'">
                              {{ usr.commission | currency }}
                        </v-col>
                    </v-row>
                    <v-row 
                      style="margin-top:-5px"
                    >
                        <v-col cols="2" class="text-center">
                            <v-icon color="grey">mdi-home</v-icon>
                        </v-col>
                        <v-col cols="5" class="grey--text" style="font-size: 1.1rem">
                              {{ company.shortName }}
                        </v-col> 
                        <v-col 
                          cols="4" 
                          class="grey--text" 
                          :style="'font-size: 1.1rem;'"
                        >
                            {{ ordersGroup.totalCompany | currency }}
                        </v-col>
                    </v-row>                            
                    <hr v-if="ordersGroup.amount" style="margin-top: 15px; border: 1px dotted #424242;border-radius: 5px;" />
              </v-list-item-content>
            </v-list-item>
            <v-card-actions > 
                <v-col cols="12" class="text-center" style="margin-top: -15px;">
                  <v-btn 
                      :to="{ path:'/ordem-servico'}" 
                      class="ma-2"
                      x-large
                      style="width: 60%"
                  >
                    <v-icon style="margin-right: 10px;">
                      mdi-content-cut
                    </v-icon>
                    Novo
                  </v-btn>  
                  <v-btn 
                      :to="{ path:'/analytics'}" 
                      class="ma-2"
                      x-large
                  >
                      <v-icon color="green lighten-2">
                          mdi-chart-bar
                      </v-icon>    
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
export default {
    name: 'HomeAdmin',
    props: [ 'ordersGroup', 'ordersByUsers', 'company']
  }
</script>
<style scoped>
  .green--text--lighten-3 {
    color: #C5E1A5
  }
</style>
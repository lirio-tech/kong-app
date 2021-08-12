<template>

    <div>
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
              <router-link 
                :to="{ path: '/users-balance-detail/'+userLogged._id }"   
                style="color: inherit; text-decoration: none"
              >
                  <v-list-item three-line>
                        <v-list-item-content>                 
                              <v-col cols="11" style="margin-top: -10px">
                                  <v-icon>mdi-account-cash</v-icon> <span class="grey--text" style="margin-left: 15px">Comissão a Receber</span>
                              </v-col>   
                              <v-col cols="1">
                                  <v-icon style="margin-top: -20px; margin-left: -5px">mdi-chevron-right</v-icon>
                              </v-col>         
                              <v-col cols="12" class="grey--text" style="margin-top: -15px">
                                  Saldo
                              </v-col>                                                               
                              <v-col cols="12" style="margin-bottom: -18px">
                                <v-list-item-title class="mb-1" style="margin-top: -25px;">
                                    <div style="font-size: 2.0rem" v-if="!loading">
                                      <animated-number
                                        :value="userBalance.balance"
                                        :formatValue="formatToPrice"
                                        :duration="500"
                                         :class="userBalance.balance < 0 ? 'red--text' : 'green--text'"
                                      />                                                
                                    </div>
                                    <div v-else> 
                                          <v-skeleton-loader tile type="heading" />
                                    </div>                                    
                                </v-list-item-title>
                              </v-col>                     
                        </v-list-item-content>
                  </v-list-item>
              </router-link>
            </v-card>              
    </div>            
</template>
 
<script>
import AnimatedNumber from "animated-number-vue";
export default {
  components: { AnimatedNumber },
    name: 'HomeBalanceEmployeeToReceiver',
    props: [ 'userLogged', 'userBalance', 'loading' ],
    data() {
      return {
        
      }
    },
    methods: {
      formatToPrice(value) {
        return value.toLocaleString('pt-br',{style: 'currency', currency: 'BRL'});
      }
    }       
  }
</script>

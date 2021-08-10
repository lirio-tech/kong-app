<template>

  <div>
    <v-card
      class="mx-auto"
      max-width="800"
      outlined
    >
    <router-link :to="{ path: '/users-balance' }"  style="color: inherit; text-decoration: none">
            <v-list-item three-line>
            
                <v-list-item-content>           
                      <v-col cols="11">
                          <v-icon>mdi-account-cash</v-icon> <span class="grey--text" style="margin-left: 15px">Pagamentos</span>
                      </v-col>   
                      <v-col cols="1">
                          <v-icon style="margin-top: -20px; margin-left: -5px">mdi-chevron-right</v-icon>
                      </v-col>                                
                      <v-col cols="12" style="margin-top: -10px">
                        <span 
                            style="font-size: 0.8rem !important;"
                            class="grey--text"
                          >
                            Comissão a Pagar
                          </span>
                      </v-col>
                      <v-col cols="12" style="margin-bottom: -15px">
                        <v-list-item-title class="mb-1" style="margin-top: -25px;">
                            <div style="font-size: 1.8rem" v-if="!loading">
                              <span :class="balanceFull < 0 ? 'red--text' : 'green--text'">R$ {{ balanceFull | currency }} </span>
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
export default {
    name: 'HomeBalanceAdminToPay',
    props: [ 'userLogged', 'balanceFull', 'loading' ],
  }
</script>

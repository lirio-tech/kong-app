<template>

  <div>
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
                        Comissão a Pagar
                      </span>
                  </v-col>          
                  <v-col cols="2">
                    <span style="margin-left: -50px;">
                        <router-link 
                          :to="{ path: '/users-balance' }" 
                          style="color: inherit; text-decoration: none"
                        >
                            <v-btn x-large dark>
                                <v-icon color="green lighten-4">
                                    mdi-account-cash
                                </v-icon> 
                            </v-btn>
                        </router-link>                          
                    </span>     
                  </v-col>    
                  <v-col cols="12">
                    <v-list-item-title class="mb-1" style="margin-top: -25px;">
                        <div style="font-size: 2.0rem">
                          <span :class="balanceFull < 0 ? 'red--text' : 'green--text'">{{ balanceFull | currency }} </span>
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
    name: 'HomeBalanceAdminToPay',
    props: [ 'userLogged', 'balanceFull' ]
  }
</script>

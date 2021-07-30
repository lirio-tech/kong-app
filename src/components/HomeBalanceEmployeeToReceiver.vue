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
                              <v-col cols="11">
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
                              <v-col cols="1">
                                  <v-icon style="margin-top: -40px; margin-left: -5px">mdi-chevron-right</v-icon>
                              </v-col>                                     
                              <v-col cols="12">
                                <v-list-item-title class="mb-1" style="margin-top: -25px;">
                                    <div style="font-size: 2.1rem">
                                      <span :class="userBalance.balance < 0 ? 'red--text' : 'green--text'">{{ userBalance.balance | currency }} </span>
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
    name: 'HomeBalanceEmployeeToReceiver',
    props: [ 'userLogged', 'userBalance' ],
    data() {
      return {
        
      }
    }
  }
</script>

<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      @click="$router.go(-1)"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.6rem !important;">  
                    Vales e Pagamentos
                  </span>
              </v-col>           
          </v-row>          
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                      class="mx-auto"
                      max-width="800"
                      outlined
                    >
                            <v-list-item three-line>
                              <v-list-item-content>                                  
                                    <br/>
                                    <br/>
                                    <div>
                                        <span 
                                          style="font-size: 1.3rem !important;"
                                          v-if="userBalance.user.name"
                                        >
                                          {{userBalance.user.name}} tem a Receber
                                        </span>
                                    </div>          
                                    <br/>         
                                    <v-row >
                                        <v-col cols="12">
                                          <v-list-item-title class="headline mb-1">
                                              <span class="caption grey--text">Total</span><br/>
                                              <div style="font-size: 1.5rem">
                                                <span class="green--text">{{ userBalance.balance | currency }} </span>
                                              </div>
                                          </v-list-item-title>
                                        </v-col>
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" class="text-center">
                                          <v-btn 
                                              style="width: 45%"
                                              class="ma-2"
                                              
                                              color="primary"
                                          >
                                            Vale
                                          </v-btn>         
                                          <v-btn 
                                              style="width: 45%"
                                              class="ma-2"
                                              
                                              color="green"
                                          >
                                            Pagamento
                                          </v-btn>                                                                               
                                        </v-col>                    
                                    </v-row>                       
                              </v-list-item-content>
                            </v-list-item>
                    </v-card>   
                </v-col>
            </v-row>              
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../api/gateway';
import AppBar from '../components/AppBar'
import storage from '../storage';
import UserTypes from '../utils/UserTypes';
  export default {
    name: 'UserBalanceDetail',
    components: { AppBar },
    data: () => ({
      userBalance: {user:{}}
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      gateway.getUserBalanceById(this.$route.params._id,
        res => {
          this.userBalance = res;
        }, () => {
          alert('Erro ao Buscar saldo dos usuarios');
        })
    }
  }
</script>

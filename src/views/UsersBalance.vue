<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      @click="$router.go(-1)"
                  >
                      <v-icon large color="white darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.8rem !important;" class="white--text">  
                    Comissão a Pagar
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
                                    
                                    <v-list-item-content>  
                                      <v-row >
                                          <v-col cols="12" align="center">
                                            <v-list-item-title class="headline mb-1">
                                                <span class="caption grey--text">Total</span><br/>
                                                <div style="font-size: 1.6rem">
                                                  <span :class="total < 0 ? 'red--text' : 'green--text'">{{ total | currency }} </span>
                                                </div>
                                            </v-list-item-title>
                                          </v-col>
                                      </v-row>                      
                                    </v-list-item-content>
                                    <hr style="border: 1px dotted #424242;border-radius: 5px;" />   
                                    <br/>
                                    <br/>        
                                    <v-row 
                                      v-for="userBalance in usersBalance" 
                                      :key="userBalance._id" 
                                      style="margin-top:-5px"
                                    >
                                        <v-col cols="7" style="font-size: 1.4rem" align="center">
                                              {{ userBalance.user.name }}
                                        </v-col> 
                                        <v-col cols="5" :style="'font-size: 1.4rem;'" align="">
                                              {{ userBalance.balance | currency }}
                                        </v-col>
                                        <v-col cols="12" class="text-center">
                                          <v-btn 
                                              :to="{ path:'/users-balance-detail/'+userBalance.user._id}" 
                                              style="width: 90%"
                                              class="ma-2"
                                          >
                                            <v-icon>
                                              mdi-chevron-right
                                            </v-icon>
                                            Vales e Pagamentos
                                          </v-btn>                                            
                                        </v-col>                    
                                        <br/>        
                                        <v-col cols="12" class="text-center" style="margin-top: -15px;">              
                                          <hr style="border: 1px dotted #424242;border-radius: 5px;" />   
                                        </v-col>
                                        <br/>                      
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
    name: 'PaymentsUsers',
    components: { AppBar },
    data: () => ({
      headers: [
        { text: "Funcionario", value: "name" },
        { text: "Username", value: "valueReceive" }
      ],                
      usersBalance: [],
      total: 0
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      gateway.getUsersBalance(res => {
            this.usersBalance = res;
            this.total = res.reduce((a, r) => a + r.balance, 0);
        }, () => {
            alert('Erro ao Buscar Saldo do Usuario');
        })
    }
  }
</script>

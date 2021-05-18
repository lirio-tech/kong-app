<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                    Pagamentos
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
                                    <div class="grey--text">
                                        <span class="">Comissão a Receber</span>
                                    </div>          
                                    <br/>
                                    <hr style="border: 1px dotted #424242;border-radius: 5px;" />   
                                    <br/>                    
                                    <v-row 
                                      v-for="userBalance in usersBalance" 
                                      :key="userBalance._id" 
                                      style="margin-top:-5px"
                                    >
                                        <v-col cols="7" style="font-size: 1.1rem">
                                              {{ userBalance.user.name }}
                                        </v-col> 
                                        <v-col cols="5" :style="'font-size: 1.1rem;'">
                                              {{ userBalance.balance | currency }}
                                        </v-col>
                                        <v-col cols="12" class="text-center">
                                          <v-btn 
                                              :to="{ path:'/payments-users'}" 
                                              large
                                              style="width: 90%"
                                              class="ma-2"
                                              outlined
                                              color="cyan"
                                          >
                                            Ver Vale e Pagamento
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
                            <!-- <v-card-actions > 
                                <v-col cols="12" class="text-center" style="margin-top: -15px;">
                                  <v-btn 
                                      :to="{ path:'/ordem-servico'}" 
                                      large
                                      style="width: 70%"
                                      class="ma-2"
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
                            -->
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
      usersBalance: [{ user: { name: 'Guilherme' }, balance: 150.50},{name: 'Guilherme', balance: 150.50}]
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      getTypePtBR(type) {
        return UserTypes.getDescriptionPtBR(type);
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      gateway.getUsersBalance(res => {
        this.usersBalance = res;
      }, () => {
        alert('Erro ao Buscar saldo dos usuarios');
      })
    }
  }
</script>

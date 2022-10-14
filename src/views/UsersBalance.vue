<template>
    <v-container>
        <AppBar v-if="!isMobile()"/>             
        <v-main class="">
          <header-back-title title="Comissão a Pagar" :emoji="emoji" />        
            <v-row>
                <v-col cols="12" sm="12">
                    <v-card
                      class="mx-auto"
                      max-width="1200"
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
                                                  <span :class="total < 0 ? 'red--text' : 'green--text'">R$ {{ total | currency }} </span>
                                                </div>
                                            </v-list-item-title>
                                          </v-col>
                                      </v-row>                      
                                    </v-list-item-content>
                                    <hr-line />

                                    <br/>
                                    <br/>        
                                    <v-row 
                                      v-for="userBalance in usersBalance" 
                                      :key="userBalance._id" 
                                      style="margin-top:-5px"
                                    >
                                        <v-col cols="7" style="font-size: 1.4rem" align="center" :class="userBalance.balance < 0 ? 'red--text' : 'green--text'">
                                              {{ userBalance.user.name }}
                                        </v-col> 
                                        <v-col cols="5" :style="'font-size: 1.4rem;'" align="" :class="userBalance.balance < 0 ? 'red--text' : 'green--text'">
                                              R$ {{ userBalance.balance | currency }}
                                        </v-col>
                                        <v-col cols="12" class="text-center">
                                          <v-btn 
                                              :to="{ path:'/users-balance-detail/'+userBalance.user._id}" 
                                              style="width: 90%"
                                              large
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
                                          <hr-line />
                                        </v-col>
                                        <br/>                      
                                    </v-row>                       
                              </v-list-item-content>
                            </v-list-item>
                    </v-card>   
                </v-col>
            </v-row>              
        </v-main>
        <dialog-loading :loading="loading" />          
    </v-container>
</template>

<script>
import gateway from '../api/gateway';
import AppBar from '@/bounded-context/shared/components/appbar/AppBar' 
import HeaderBackTitle from '../components/HeaderBackTitle.vue';
import storage from '../storage';
import UserTypes from '../utils/UserTypes';
import device from '../utils/device'
import HrLine from '../components/HrLine.vue';
import DialogLoading from '../components/loading/DialogLoading.vue';
  export default {
    name: 'PaymentsUsers',
    components: { AppBar, HeaderBackTitle, HrLine, DialogLoading, },
    data: () => ({
      loading: false,
      headers: [
        { text: "Funcionario", value: "name" },
        { text: "Username", value: "valueReceive" }
      ],                
      emoji: '💰',
      usersBalance: [],
      total: 0
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      isMobile() {
          return device.isMobile();
      }      
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.loading = true;
      gateway.getUsersBalance(res => {
            this.usersBalance = res;
            this.total = res.reduce((a, r) => a + r.balance, 0);
            this.loading = false;
        }, () => {
            this.loading = false;
            alert('Erro ao Buscar Saldo do Usuário');
        })
    }
  }
</script>

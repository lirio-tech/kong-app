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
                                              <div style="font-size: 3.0rem">
                                                <span :class="userBalance.balance < 0 ? 'red--text' : 'green--text'">{{ userBalance.balance | currency }} </span>
                                              </div>
                                          </v-list-item-title>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="isAdmin(userLogged.type)">
                                        <v-col cols="12" class="text-center">
                                          <v-btn 
                                              style="width: 45%"
                                              class="ma-2"
                                              @click="payUser('MONEY_VOUCHER')"                
                                              color="primary"
                                          >
                                            Vale
                                          </v-btn>         
                                          <v-btn 
                                              style="width: 45%"
                                              class="ma-2"
                                              @click="payUser('PAYMENT')"                
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
          <v-row>
              <v-col cols="12" align="center">   
                  <span >  
                    Movimentações
                  </span>
              </v-col>              
              <v-col cols="12" sm="12" class="mt-0 pt-0">
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead >
                        <tr>
                          <th class="text-center">
                            Tipo
                          </th>
                          <th class="text-center">
                            Data
                          </th>                                    
                          <th class="text-center">
                            Valor
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="det in userBalanceDetail" :key="det._id">
                          <td class="text-center">
                            <v-icon v-if="det.type === 'SERVICE_PERFORMED'">
                              mdi-content-cut
                            </v-icon>
                            <v-icon color="green" v-if="det.type === 'PAYMENT'">
                              mdi-account-cash
                            </v-icon>              
                            <v-icon color="primary" v-if="det.type === 'MONEY_VOUCHER'">
                              mdi-cash-plus
                            </v-icon>                                               
                          </td>
                          <td 
                            class="text-center" 
                            :class="det.type === 'PAYMENT' ? 'green--text' : (det.type === 'MONEY_VOUCHER' ? 'primary--text' : '')"
                          >
                            {{ det.date }}
                          </td>
                          <td 
                            class="text-center" 
                            :class="det.type === 'PAYMENT' ? 'green--text' : (det.type === 'MONEY_VOUCHER' ? 'primary--text' : '')"
                          >
                          {{ det.value | currency }}</td>
                        </tr>
                        <tr v-if="userBalanceDetail.length === 0">
                            <td align="center" class="error--text" colspan="3"><h3>Não há Movimentações</h3></td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
              </v-col>
          </v-row>    
          <DialogMoneyVoucherOrPaymentEmployee 
            :dialog="dialog" 
            :userBalance="userBalance" 
            :balanceValueTotal="balanceValueTotal"
            :userBalanceType="userBalanceType" 
            v-on:show-dialog="showDialog" 
          />
        </v-main> 
    </v-container>
</template>

<script>
import gateway from '../api/gateway';
import AppBar from '../components/AppBar'
import DialogMoneyVoucherOrPaymentEmployee from '../components/DialogMoneyVoucherOrPaymentEmployee'
import storage from '../storage';
import UserTypes from '../utils/UserTypes';
  export default {
    name: 'UserBalanceDetail',
    components: { AppBar, DialogMoneyVoucherOrPaymentEmployee },
    data: () => ({
      dialog: false,
      balanceValueTotal: 0,
      userBalance: {user:{}},
      userBalanceDetail: [],
      userBalanceType: 'PAYMENT'
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      getUserBalanceByUserId(_userId) {
        gateway.getUserBalanceByUserId(_userId,
          res => {
            this.userBalance = res;
          }, () => {
            alert('Erro ao Buscar saldo dos usuarios');
          })
      },      
      getUserBalanceDetailExtractByUserId(_userId) {
        gateway.getUserBalanceDetailExtractByUserId(_userId,
          res => {
            this.userBalanceDetail = res;
          }, () => {
            alert('Erro ao Buscar movimentacoes usuarios');
          })
      },            
      showDialog(show) {
        this.dialog = show;
        if(show === false) {
          this.getUserBalanceByUserId(this.$route.params.userId);
          this.getUserBalanceDetailExtractByUserId(this.$route.params.userId);          
        }
      },
      payUser(userBalanceType2) {
        this.userBalanceType = userBalanceType2;
        this.balanceValueTotal = this.userBalance.balance < 0 ? 0 : Math.trunc(this.userBalance.balance);
        this.showDialog(true);
        this.$refs.valuePayment.$el.focus();
      }                
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getUserBalanceByUserId(this.$route.params.userId);
      this.getUserBalanceDetailExtractByUserId(this.$route.params.userId);
    }
  }
</script>

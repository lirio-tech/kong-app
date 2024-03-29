<template>
    <v-container>
        <AppBar v-if="!isMobile()" />             
        <v-main class="">      
          <header-back-title title="Vales e Pagamentos" :emoji="emoji"/>        
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
                                          {{ isAdmin(userLogged.type) ? userBalance.user.name + ' tem a Receber ' : ' Seu valor a Receber :)'  }} 
                                        </span>
                                    </div>          
                                    <br/>         
                                    <v-row >
                                        <v-col cols="12">
                                          <v-list-item-title class="headline mb-1">
                                              <span class="caption grey--text">Total</span><br/>
                                              <div style="font-size: 3.0rem">
                                                <span v-if="!userLogged.hiddenCommission" :class="userBalance.balance < 0 ? 'red--text' : 'green--text'">R$ {{ userBalance.balance | currency }} </span>
                                                <span v-else>R$ * * * * * </span>
                                              </div>
                                          </v-list-item-title>
                                        </v-col>
                                    </v-row>
                                    <v-row v-if="isAdmin(userLogged.type)">
                                        <v-col cols="6" class="text-center">
                                          <v-btn 
                                              style="width: 100%"
                                              class="ma-2"
                                              @click="payUser('MONEY_VOUCHER')"                
                                              color="primary"
                                          >
                                            Vale
                                          </v-btn>      
                                        </v-col>
                                        <v-col cols="6" class="text-center">   
                                          <v-btn 
                                              style="width: 100%"
                                              class="ma-2"
                                              @click="payUser('PAYMENT')"                
                                              color="success"
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
                    Extrato de {{ userBalance.user.name }}
                  </span>
              </v-col>              
              <v-col cols="12" sm="12" class="mt-0 pt-0">
                  <v-simple-table dense>
                    <template v-slot:default>
                      <thead >
                        <tr>
                          <th class="text-center"></th>
                          <th class="text-center"></th>
                          <th class="text-center">
                            Data
                          </th>                                    
                          <th class="text-center">
                            Valor
                          </th>
                          <th class="text-center" v-if="isAdmin(userLogged.type)"></th>
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
                            :class="det.type === 'PAYMENT' ? 'green--text' : (det.type === 'MONEY_VOUCHER' ? 'primary--text' : '')"
                          >
                            {{ det.description }}
                          </td>
                          <td 
                            class="text-center" 
                            :class="det.type === 'PAYMENT' ? 'green--text' : (det.type === 'MONEY_VOUCHER' ? 'primary--text' : '')"
                          >
                            {{ getDateFormated(det.date).substring(0,5) }}
                          </td>
                          <td 
                            class="text-center" 
                            :class="det.type === 'PAYMENT' ? 'green--text' : (det.type === 'MONEY_VOUCHER' ? 'primary--text' : '')"
                          >
                            R$ {{ det.value | currency }} 
                          </td>
                          <td class="text-center" v-if="isAdmin(userLogged.type)">
                              <v-icon 
                                color="red" 
                                v-if="det.type === 'MONEY_VOUCHER' || det.type === 'PAYMENT'"
                                @click="deleteDebit(det)"
                              >
                                mdi-delete
                              </v-icon>                             
                          </td>
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
          <dialog-loading :loading="loading" />
        </v-main> 
    </v-container>
</template>

<script>
import gateway from '../api/gateway';
import AppBar from '@/bounded-context/shared/components/appbar/AppBar' 
import DialogMoneyVoucherOrPaymentEmployee from '../components/DialogMoneyVoucherOrPaymentEmployee'
import HeaderBackTitle from '../components/HeaderBackTitle.vue';
import storage from '../storage';
import UserTypes from '../utils/UserTypes';
import device from '../utils/device'
import DialogLoading from '../components/loading/DialogLoading.vue';
  export default {
    name: 'UserBalanceDetail',
    components: { AppBar, DialogMoneyVoucherOrPaymentEmployee, HeaderBackTitle, DialogLoading, },
    data: () => ({
      emoji: '💰',
      loading: true,
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
      isMobile() {
          return device.isMobile();
      } ,      
      getUserBalanceByUserId(_userId) {
        this.loading = true;
        gateway.getUserBalanceByUserId(_userId,
          res => {
            this.userBalance = res;
            this.loading = false;
          }, () => {
            alert('Erro ao Buscar Saldo');
            this.loading = false;
          })
      },      
      getUserBalanceDetailExtractByUserId(_userId) {
        this.loading = true;
        gateway.getUserBalanceDetailExtractByUserId(_userId,
          res => {
            this.userBalanceDetail = res;
            this.loading = false;
          }, () => {
            this.loading = false;
            alert('Erro ao Buscar Extrato');
          })
      },            
      showDialog(show) {
        this.dialog = show;
        if(show === false) {
          this.loading = true;
          setTimeout(
            () => {
                this.getUserBalanceByUserId(this.$route.params.userId);
                this.getUserBalanceDetailExtractByUserId(this.$route.params.userId);          
            },
            1000
          )

        }
      },
      payUser(userBalanceType2) {
        this.userBalanceType = userBalanceType2;
        this.balanceValueTotal = this.userBalance.balance < 0 ? 0 : Math.trunc(this.userBalance.balance);
        this.showDialog(true);
        this.$refs.valuePayment.$el.focus();
      },
      getDateFormated(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },        
      deleteDebit(balanceDetail) {
        if(confirm(`Deseja realmente Excluir a movimentação ${balanceDetail.description}?`))
        gateway.deleteBalanceDebit(this.userBalance._id, balanceDetail._id,
          () => {
            this.getUserBalanceByUserId(this.$route.params.userId);
            this.getUserBalanceDetailExtractByUserId(this.$route.params.userId);
          }, (err) => {
            if(err.response.status >= 400 && err.response.status <= 499) {
              alert(err.response.data.message)              
              return;
            }      
            alert('Erro ao Excluir ' + balanceDetail.description);
          }) 
      }  
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getUserBalanceByUserId(this.$route.params.userId);
      this.getUserBalanceDetailExtractByUserId(this.$route.params.userId);
    }
  }
</script>

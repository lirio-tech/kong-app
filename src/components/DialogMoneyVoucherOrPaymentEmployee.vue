<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            :class="userBalanceType === 'MONEY_VOUCHER' ? 'primary' : 'green'"
          >
            <v-btn
              icon
              small
              @click="$emit('show-dialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                {{ userBalanceType === 'MONEY_VOUCHER' ? 'Liberar Vale' : 'Pagamento ' }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <v-col cols="12">
                  <h2>{{ (userBalanceType === 'MONEY_VOUCHER' ? 'Liberar Vale p/ ' : 'Realizar Pagamento de ') + userBalance.user.name }} </h2>
                </v-col>
                <br/>
                <v-col cols="12">
                  <v-text-field
                    :label="userBalanceType === 'MONEY_VOUCHER' ? 'Valor do Vale' : 'Valor do Pagamento'"
                    outlined
                    height="90"
                    prefix="R$"
                    style="font-size: 45px"
                    type="number"
                    solo
                    v-model="userBalance.balance"
                    ref="valuePayment"
                  ></v-text-field>
                </v-col>
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                  >
                    <v-text-field 
                        v-model="dateFormatted"
                        @blur="date = parseDate(dateFormatted)"
                        label="Data"
                        outlined
                        ref="date"
                        v-mask="'##/##/####'"
                    ></v-text-field>  
                </v-col>  
                <v-col cols="12">
                  <v-btn 
                      style="width: 90%"
                      class="ma-2"
                      @click="performPay()"                
                      :color="userBalanceType === 'MONEY_VOUCHER' ? 'primary' : 'green'"
                      x-large
                  >
                    {{ userBalanceType === 'MONEY_VOUCHER' ? 'Liberar Vale' : 'Realizar Pagamento' }}
                  </v-btn>                                                                               
                </v-col>                                                     
            </v-container>
          </v-card-text>          
          <div style="flex: 1 1 auto;"></div>
        </v-card>

    </v-dialog>    
</template>

<script>
import gateway from '../api/gateway'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'

export default {
    props:['dialog', 'userBalanceType', 'userBalance'],
    components: {
    },
    data () {
      return {
        company: {
          plan: { name: 'Free' }
        },
        date: new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10),
        dateFormatted: this.formatDate(new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10)),     
      }
    },
    beforeMount() {
      this.company = storage.getCompany();
    },    
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      },
      formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      parseDate (date) {
        if (!date) return null;
        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },      
      performPay() {
        let userBalanceDetail = {
          userId: this.userBalance.user._id,
          value: this.userBalance.balance, 
          date: this.date,
          type: this.userBalanceType
        };
        gateway.saveUserBalanceAndDetail(userBalanceDetail,
          () => {
            alert('Sucessp')
          }, () => {
            alert('Erro, tente novamente daqui a pouco ')
          });
        //alert(JSON.stringify(userBalanceDetail));
      }
    }
}
</script>
<style scoped>
</style>
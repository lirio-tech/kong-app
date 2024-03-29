<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            :class="getColor(userBalanceType)"
          >
            <v-btn
              icon
              small
              @click="$emit('show-dialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                {{ getDescription(userBalanceType) }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <v-col cols="12">
                  <h2> {{ getTitle(userBalanceType) }} </h2>
                </v-col>
                <br/>
                <v-col cols="12">
                    <input v-model="balanceValueTotal"
                          v-money="money"
                          class="form-input input-lg"
                          style="border: 2px solid #689F38; width: 100%; height: 90px; font-size: 40px; color: #689F38;" 
                          />                    
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
                        clearable
                    ></v-text-field>  
                </v-col>  
                <v-col
                    cols="12"
                    sm="12"
                    md="12"
                    style="margin-top: -25px"
                  >
                    <v-text-field 
                        v-model="description"
                        label="Descricao"
                        outlined
                        ref="descr"
                        clearable
                    ></v-text-field>  
                </v-col>                  
                <v-col cols="12">
                  <v-btn 
                      style="width: 90%"
                      class="ma-2"
                      @click="performPay()"                
                      :color="getColor(userBalanceType)"
                      x-large
                  >
                    {{ getButtonTitle(userBalanceType) }}
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
    props:['dialog', 'balanceValueTotal', 'userBalanceType', 'userBalance'],
    components: {
    },
    data () {
      return {
        company: {
          plan: { name: 'Free' }
        },
        date: new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10),
        dateFormatted: this.formatDate(new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10)),     
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 0,
          masked: false /* doesn't work with directive */
        }        
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
      getColor(userBalanceType) {
        if(userBalanceType === 'MONEY_VOUCHER') {
          return 'primary';
        } 
        if(userBalanceType === 'PAYMENT') {
          return 'success';
        }         
        if(userBalanceType === 'OTHERS') {
          return 'red';
        }            
        return 'success';     
      },
      getDescription(userBalanceType) {
        if(userBalanceType === 'MONEY_VOUCHER') {
          return 'Vale';
        } 
        if(userBalanceType === 'PAYMENT') {
          return 'Pagamento';
        }         
        if(userBalanceType === 'OTHERS') {
          return 'Refrigerante';
        }            
        return 'Pagamento'; 
      },
      getTitle(userBalanceType) {
        if(userBalanceType === 'MONEY_VOUCHER') {
          return `Liberar Vale p/ ${this.userBalance.user.name}`;
        } 
        if(userBalanceType === 'PAYMENT') {
          return `Realizar Pagamento de ${this.userBalance.user.name}`;
        }         
        if(userBalanceType === 'OTHERS') {
          return `Lancar Algum Debito p/ ${this.userBalance.user.name}`;
        }            
        return `Realizar Pagamento de ${this.userBalance.user.name}`;
      },      
      getButtonTitle(userBalanceType) {
        if(userBalanceType === 'MONEY_VOUCHER') {
          return `Liberar Vale`;
        } 
        if(userBalanceType === 'PAYMENT') {
          return `Realizar Pagamento`;
        }         
        if(userBalanceType === 'OTHERS') {
          return `Lancar Debito`;
        }            
        return `Realizar Pagamento`;
      },       
      performPay() {
        if(this.balanceValueTotal.replace(/\D/g,"") <= 0) {
          alert('Valor deve ser maior que ZERO');
          return;
        }
        let userBalanceDetail = {
          userId: this.userBalance.user._id,
          value: this.balanceValueTotal.replace(/\D/g,""), 
          date: this.date,
          type: this.userBalanceType,
          description: this.description
        };
        gateway.saveUserBalanceAndDetail(userBalanceDetail,
          () => {
            this.$emit('show-dialog', false);
          }, () => {
            alert('Erro, tente novamente daqui a pouco ')
          });
      }
    },
    computed: {
      description() {
        return this.getDescription(this.userBalanceType)
      }
    }
}
</script>
<style scoped>
</style>
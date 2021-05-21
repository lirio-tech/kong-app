<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            class="primary"
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
                <h2>{{ (userBalanceType === 'MONEY_VOUCHER' ? 'Liberar Vale p/ ' : 'Realizar Pagamento de ') + userBalance.user.name }} </h2>

                <br/>

                <numkeyboard 
                  v-model="userBalanceDetail.value" 
                  ok-text="OK" 
                  text-align="left"
                ></numkeyboard>


            </v-container>
          </v-card-text>          
          <div style="flex: 1 1 auto;"></div>
        </v-card>

    </v-dialog>    
</template>

<script>
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
        userBalanceDetail: { value: 0 }
      }
    },
    beforeMount() {
      this.company = storage.getCompany();
    },    
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      },
    }
}
</script>
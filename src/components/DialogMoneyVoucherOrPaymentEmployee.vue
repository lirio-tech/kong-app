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
                {{ userBalanceType }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <h1>{{  }}</h1>
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
    props:['dialog', 'userBalanceType', 'user'],
    components: {
    },
    data () {
      return {
        company: {
          plan: { name: 'Free' }
        },
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
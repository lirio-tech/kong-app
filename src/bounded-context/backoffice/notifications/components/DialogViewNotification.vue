<template>
  <v-dialog
    :value="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
      <v-card>
        <v-toolbar
          class="primary darken-4 white--text"
        >
          <v-btn
            icon
            small
            @click="$emit('show-notification-dialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>      
          <v-toolbar-title style="margin-left:-10px;">
              Notificação de {{ company.name }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>    
        <v-card-text>
  
            <h1>Hear</h1>  

        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '@/storage'
import UserTypes from '@/utils/UserTypes' 

export default {
    name: "DialogViewNotification",
    props: ["dialog", "notification", "company"],
    components: {  },
    data() {
        return {
            userLogged: {},
        };
    },
    methods: {
        isAdmin() {
            return this.userLogged && UserTypes.isAdmin(this.userLogged.type);
        },
    },
    computed: {},
    beforeMount() {
        this.userLogged = storage.getUserLogged();
    },
    mounted() {
    }
}
</script>
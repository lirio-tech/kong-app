<template>
  <v-dialog
    :value="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
      <v-card>
        <v-toolbar
          class="primary white--text"
        >
          <v-btn
            icon
            small
            @click="$emit('show-notifications-dialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>      
          <v-toolbar-title style="margin-left:-10px;">
              Notificações
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>    
        <v-card-text>
          <v-container >
              <h1>Notificações</h1>
          </v-container>
        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '../storage'
export default {
  name: 'DialogNotifications',
  props:['dialog'],
  data () {
    return {
      userLogged: {},
      notifications: [],
    }
  }, 
  methods: {

  },
  computed: {

  },
  beforeMount() {
    this.userLogged = storage.getUserLogged();
  }
}
</script>
<style scoped>
</style>
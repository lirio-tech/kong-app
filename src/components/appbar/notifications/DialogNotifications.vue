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
          
            <v-simple-table fluid v-if="notifications.list.length !== 0 && !loading">
              <template v-slot:default>
                  <tbody>
                    <tr
                      v-for="n in notifications.list"
                      :key="n._id"
                      @click="clickRow(n)"
                    >
                      <td>
                        <v-btn v-if="n.mdi" fab>
                              <v-icon>{{ n.mdi }}</v-icon>
                        </v-btn>
                        <v-btn v-else fab>
                              <span  class="icon-emoji-30">
                              {{ n.emojiIcon }}
                              </span>
                        </v-btn>
                      </td>
                      <td style="padding: 30px 0px 20px 0px;">
                        <p>
                          {{ n.title }}
                          <span style="padding-left: 10px;" class="red--text">
                            <v-icon v-if="n.isNotRead" size="15" color="red">mdi-brightness-1</v-icon>
                          </span>
                        </p> 
                        <span class="grey--text">
                          {{ n.description }}
                        </span>
                        <p><small class="grey--text">{{n.createdAt}}</small></p>
                      </td>
                    </tr>
                  </tbody>
              </template>
            </v-simple-table>                        
              
        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '@/storage'
export default {
  name: 'DialogNotifications',
  props:['dialog', 'notifications'],
  data () {
    return {
      userLogged: {},
    }
  }, 
  methods: {
    clickRow(notification) {
        // TODO Request to Backend -> update notification to read - isNotRead = false
        if(notification.path) {
          alert(notification.path);
        }
    }
  },
  computed: {

  },
  beforeMount() {
    this.userLogged = storage.getUserLogged();
  },
  mounted() {

  }
}
</script>
<style scoped>
  .notification {
    padding: 25px 0px 75px 0px;
  }
</style>
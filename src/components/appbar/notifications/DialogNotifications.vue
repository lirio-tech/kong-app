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
            @click="$emit('show-notifications-dialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>      
          <v-toolbar-title style="margin-left:-10px;">
              Notificações 
              <IconNumericNotification 
                :number="notifications.amountNotRead" 
                v-if="notifications.amountNotRead > 0"
              />
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>    
        <v-card-text>
          
            <v-simple-table fluid>
              <template v-slot:default>
                  <tbody v-if="notifications.list.length !== 0 && !loading">
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
                          <br/><small class="grey--text">{{n.createdAt}}</small>
                        </p> 
                        <span class="grey--text">
                          {{ n.description }}
                        </span>
                      </td>
                    </tr>
                  </tbody>  
                  <tfoot>
                    <tr
                      v-if="notifications.list.length === 0"
                    >                    
                        <td style="padding-top: 50px;">
                            <v-btn fab>
                                  <span  class="icon-emoji-30">
                                    😓
                                  </span>
                            </v-btn>
                          </td>
                          <td style="padding: 70px 0px 20px 0px;">
                            <span class="grey--text">
                              Não há Notificações para Você no Momento!
                            </span>
                          </td>
                    </tr>
                  </tfoot>
              </template>
            </v-simple-table>                        
              
        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '@/storage'
import UserTypes from '@/utils/UserTypes' 
import notificationGateway from '../../../api/notificationGateway'
import IconNumericNotification from '../../shared/icons/IconNumericNotification.vue';

export default {
    name: "DialogNotifications",
    props: ["dialog", "notifications"],
    components: { IconNumericNotification },
    data() {
        return {
            userLogged: {},
        };
    },
    methods: {
        clickRow(notification) {

          if (notification.onlyAdmin && this.isAdmin()) {

                if(notification.isNotRead) {
                    notificationGateway.updateNotificationRead(
                      notification._id, 
                      () => { }, 
                      err => { console.error(err); }
                    );
                }
                
                if (notification.path) {
                    this.$router.push(notification.path);
                }
                else if (notification.hyperLink) {
                    alert(notification.hyperLink);
                }
          }
        },
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
<style scoped>
  .notification {
    padding: 25px 0px 75px 0px;
  }
  .bullet li a:before {
    content: "\e5cc";
}  
</style>
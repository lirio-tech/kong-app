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
  
            <ListViewNotifications 
              :list="notifications.list" 
              v-on:click-item="clickItem"
            />

        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '@/storage'
import UserTypes from '@/utils/UserTypes' 
import notificationGateway from '@/api/notificationGateway'
import IconNumericNotification from '@/components/shared/icons/IconNumericNotification.vue';
import ListViewNotifications from './ListViewNotifications.vue';

export default {
    name: "DialogNotifications",
    props: ["dialog", "notifications"],
    components: { IconNumericNotification, ListViewNotifications },
    data() {
        return {
            userLogged: {},
        };
    },
    methods: {
        clickItem(notification) {

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
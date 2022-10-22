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
              Notificação
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>    
        <v-card-text>
              <v-row>
                  <h3 
                    style="padding-top: 50px; padding-bottom: 30px"
                  >
                    Estabelecimento: 
                    <span class="primary--text">
                        {{ company.name }}
                    </span>
                  </h3>
              </v-row>
              <v-row>
                <ListViewNotifications 
                  :list="[notification]" 
                />
              </v-row>
              <v-row style="padding-top: 50px">
                <v-btn 
                    color="red"
                    @click="del()"
                    :loading="loading"
                >
                  Excluir
                </v-btn>
              </v-row>

        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '@/storage'
import UserTypes from '@/utils/UserTypes'
import notificationGateway from '../../../../api/notificationGateway';
import ListViewNotifications from '../../../notifications/components/ListViewNotifications.vue'; 

export default {
    name: "DialogViewNotification",
    props: ["dialog", "notification", "company"],
    components: { ListViewNotifications },
    data() {
        return {
            userLogged: {},
            loading: false
        };
    },
    methods: {
        isAdmin() {
            return this.userLogged && UserTypes.isAdmin(this.userLogged.type);
        },
        del() {
          if(confirm('Deseja realmente excluir notification?')) {
            this.loading = true  
            notificationGateway.delete(
                this.notification._id,
                () => {
                  this.loading = false
                  //this.$router.go(0);
                  window.location.reload();
                }, 
                err => {
                    this.loading = false
                    alert('Erro ao Excluir Notificação');
                    console.log(err);
                });     
          }
        }
    },
    computed: {}, 
    beforeMount() {
        this.userLogged = storage.getUserLogged();        
    },
    mounted() {}
}
</script>
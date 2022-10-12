<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>        
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        @click="$router.go(-1)"
                    >
                        <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                    </v-btn>
              </v-col>                 
              <v-col cols="10">   
                <p class="mr-2 text-center grey--text" 
                  style="font-size: 1.6rem;">
                    Notificações
                </p>  
              </v-col>
          </v-row>       
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/backoffice/notifications/s"
                    style="color: inherit; text-decoration: none">                
                        <v-btn 
                            type="button" 
                            depressed  
                            x-large 
                            color="red"
                            style="width: 96%"
                        >
                            Ver todas as Notificações
                        </v-btn>                    
                  </router-link>
              </v-col>
          </v-row>                
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <v-btn 
                      type="button" 
                      depressed  
                      x-large 
                      color="primary"
                      style="width: 96%"
                      @click="verifyAndSaveSignatureExpiration"
                  >
                    Envia Expiração de Assinatura
                  </v-btn>                    
              </v-col>
          </v-row>         

        </v-main>
    </v-container>
</template>

<script>
import AppBar from '@/components/appbar/AppBar'
import storage from '@/storage';
import notificationGateway from '@/api/notificationGateway';
  export default {
    name: 'BackofficeNotificationList',
    components: { 
      AppBar,
    },
    data: () => ({
      loading: false,
      userLogged: {
        type: 'none'
      }
    }),
    methods: {
      verifyAndSaveSignatureExpiration() {
        notificationGateway.verifyAndSaveSignatureExpiration(
            res => {
                console.log(res)
                alert(res.message);
            },
            err => {
              console.log(err)
              alert('Error');
            }
        )
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

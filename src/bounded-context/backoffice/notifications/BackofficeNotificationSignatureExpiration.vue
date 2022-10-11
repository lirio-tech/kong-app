<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>        
              <v-col cols="12">   
                <p class="mr-2 text-center grey--text" 
                   style="font-size: 2.0rem;">
                    Notificações
                </p>  
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
    name: 'BackofficeNotificationSignatureExpiration',
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

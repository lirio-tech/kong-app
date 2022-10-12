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
                    Lista de Notificações
                </p>  
              </v-col>
          </v-row>          
          <v-row>
                <h1>Hahhah </h1>
          </v-row>         

        </v-main>
    </v-container>
</template>

<script>
import AppBar from '@/components/appbar/AppBar'
import storage from '@/storage';
//import notificationGateway from '@/api/notificationGateway';
  export default {
    name: 'BackofficeNotificationOptions',
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

    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

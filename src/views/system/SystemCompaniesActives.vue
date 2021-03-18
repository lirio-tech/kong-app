<template>
    <v-container>
        <v-main class="">
          <v-row> 
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        @click="$router.go(-1)"
                    >
                        <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                    </v-btn>
              </v-col>                 
              <v-col cols="10">   
                <p class="mr-2 text-center grey--text" 
                   style="font-family: cursive; font-size: 2.0rem;">
                    Estabelecimentos Ativos
                </p>  
              </v-col>
          </v-row>     
            
        </v-main>
    </v-container>
</template>

<script>
//import gateway from '../../api/gateway';
import storage from '../../storage';
export default {
    name: 'SystemCompaniesActives',
    components: { 
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

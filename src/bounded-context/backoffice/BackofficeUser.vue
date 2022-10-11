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
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                      Acessos
                  </span>
              </v-col>            
          </v-row>          
          <v-row>
              <v-col cols="12" sm="12" align="center" class="grey--text">
                <span style="font-size: 1.8rem !important;" >  
                  {{ user.name }}
                </span>
              </v-col>
          </v-row>     
          <v-row>
              <v-col cols="12" sm="12" align="center" >
                <v-btn 
                  color="green darken-4"
                  x-large
                  style="width:100%"
                  @click="recoveryPass"
                >
                    Recuperar Senha 
                </v-btn>
              </v-col>
          </v-row>      
          <v-row v-if="messageCode">
              <v-col cols="12" sm="12" align="center" >
                Copie o Link e envie para pessoa Refazer a Senha
                <v-btn 
                  color="accent "
                  x-large
                  style="width:100%"
                  v-clipboard:copy="messageCode.link"
                  v-clipboard:success="onCopy"
                  v-clipboard:error="onError"                  
                >
                  <span >
                    Copiar 
                    <v-icon >
                        mdi-content-copy
                    </v-icon>
                  </span> 
                </v-btn>
              </v-col>
          </v-row>                            
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../../api/gateway';
import AppBar from '@/components/appbar/AppBar'
import storage from '../../storage';
export default {
    name: 'BackofficeUser',
    components: { AppBar },
    data: () => ({
      user: {},
      messageCode: null
    }),
    methods: {
      getUser() {
        gateway.getUserById(this.$route.params._id,
        res => {
          this.user = res;
        }, err => {
          console.log(err);
        })
      },    
      recoveryPass() {
        console.log('AAA');
        gateway.newRecoveryCode(this.user._id,
          res => {
            this.messageCode = res;
          },
          () => {
              alert('ERROR');
          })
      },
      onCopy() {
        alert('Codigo copiado')
      },
      onError(){
        alert('Erro ao Copiar')
      },
      login() {
        storage.setUserLogged(JSON.stringify(this.user));
        this.$router.push('/');  
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getUser();
    }
}
</script>

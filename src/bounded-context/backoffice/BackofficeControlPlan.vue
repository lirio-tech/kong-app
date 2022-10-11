<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />

          <br/>
          <v-row>        
              <v-col cols="12">   
                <p class="mr-2 text-center grey--text" 
                   style="font-size: 2.0rem;">
                    Painel de Controle
                </p>  
              </v-col>
          </v-row>       
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link :to="{path: `/system/companies`}"
                    style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="primary"
                        style="width: 96%"
                    >Estabelecimentos</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>         
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/system/companies/actives"
                   style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="purple darken-3"
                        style="width: 96%"
                    >Estabelecimentos Ativos</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>                        
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/system/payments"
                   style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="green darken-3"
                        style="width: 96%"
                    >Pagamentos</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>                                            
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/system/rated-us"
                   style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="yellow darken-2 darken-3"
                        style="width: 96%"
                    >Avaliacoes</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>          
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/backoffice/notifications"
                   style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="red darken-2 darken-3"
                        style="width: 96%"
                    >Notificações</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>                                                             
        </v-main>
    </v-container>
</template>

<script>
  import AppBar from '@/components/appbar/AppBar'
  import DialogPlan from '../../components/DialogPlan'
  import storage from '../../storage';
  export default {
    name: 'BackofficeControlPlan',
    components: { 
      AppBar,
      DialogPlan
    },
    data: () => ({
      loading: false,
      dialogPlan: false,              
      company: [],      
      userLogged: {
        type: 'none'
      }
    }),
    methods: {
      showPlanDialog(show) {
        this.dialogPlan = show
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
          
          <v-col cols="12"  v-if="loading" style="margin-top: -23px; width: 100%">
            <v-progress-linear
              indeterminate
              rounded
              :active="loading"
              background-opacity="0.42"
              buffer-value="100"
              height="7"
              value="0"
              color="light-blue"
            ></v-progress-linear>
          </v-col>   
          <br/>
          <v-row> 
               <v-col cols="12">   
                <p class="mr-2 text-center grey--text" 
                   style="font-family: 'Frijole', cursive; font-size: 1.8rem;">
                    Administrador do Sistema
                </p>  
               </v-col>
          </v-row>          
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/system/companies"
                    style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="primary"
                        style="width: 96%"
                    >Aplicar Planos</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>                   
          <v-row>
              <v-col cols="12" sm="12" align="center">
                  <router-link to="/system/users"
                   style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="secondary"
                        style="width: 96%"
                    >Usuarios</v-btn>                    
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
                  <router-link to="/system"
                   style="color: inherit; text-decoration: none">
                    <v-btn 
                        type="button" 
                        depressed  
                        x-large 
                        color="accent"
                        style="width: 96%"
                    >Dashboards</v-btn>                    
                  </router-link>
              </v-col>
          </v-row>                          
        </v-main>
    </v-container>
</template>

<script>
  import gateway from '../../api/gateway';
  import AppBar from '../../components/AppBar'
  import DialogPlan from '../../components/DialogPlan'
  import storage from '../../storage';
  export default {
    name: 'Home',
    components: { 
      AppBar,
      DialogPlan
    },
    data: () => ({
      loading: false,
      dialogPlan: false,
      headers: [
          { text: "Nome", value: "name" },
          { sortable: false, text: "Nome Abreviado", value: "shortName" },
          { sortable: false, text: "Plano", value: "plan.name" }
      ],                
      companies: [],      
      userLogged: {
        type: 'none'
      }
    }),
    methods: {
      clickRow(row) {
          this.companies.map((item) => {
              let selected = item === row;
              if(selected) {
                  this.$router.push('/system/companies/'+item._id);
              }
          })
      },
      findCompanies() {
        this.companies = [];
        this.loading = true;
        gateway.getCompanies(
          res => {
              this.loading = false;
              this.companies = res;
          }, err => {
              console.log(err);
              this.loading = false;
          });
      },
      showPlanDialog(show) {
        this.dialogPlan = show
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.findCompanies();
    }
  }
</script>

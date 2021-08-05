<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />

          <br/>
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 5px;">   
                  <v-btn icon small style="display: inline;"
                      @click="$router.go(-1)"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="9" align="center">   
                      <span style="font-size: 1.8rem !important;">{{ company.shortName }}</span>
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
                        :to="{path: `/system/companies/${company._id}`}"
                    >Aplicar Planos</v-btn>                    
              </v-col>
          </v-row>                                         
          <v-row>
              <v-col cols="12" sm="12" align="center"> 
                  <v-btn 
                      type="button" 
                      depressed  
                      x-large 
                      color="red"
                      style="width: 96%"
                      to="/system/users"
                  >Usuarios</v-btn>                    
              </v-col>
          </v-row>                                 
        </v-main>
    </v-container>
</template>

<script>
  import companyGateway from '../../api/companyGateway';
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
      company: [],      
      userLogged: {
        type: 'none'
      }
    }),
    methods: {
      findCompany() {
        this.loading = true;
        companyGateway.getCompanyById(this.$route.params._id,
          res => {
              this.loading = false;
              this.company = res;
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
      this.findCompany();
    }
  }
</script>

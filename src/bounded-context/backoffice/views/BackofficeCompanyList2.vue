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
                    Estabelecimentos ({{companies.length}})
                </p>  
              </v-col>
          </v-row>     
          <v-row>
              <v-col cols="12">   
                  <v-text-field
                      v-model="textSearch"
                      label="Pesquisa"
                      filled
                      :append-icon="'mdi-search'"                   
                  ></v-text-field>
              </v-col>
          </v-row>             
          <v-row v-if="companies.length !== 0 && !loading">
              <v-col cols="12" sm="12">
                  <v-sheet min-height="70vh" rounded="lg">
                      <v-data-table 
                          :headers="headers" 
                          :items="filteredCompanies" 
                          item-key="code"
                          class="elevation-1"
                          :items-per-page="companies.length"
                          hide-default-footer
                          loading-text="Carregando... Por favor aguarde"
                          @click:row="clickRow"
                      >
                      </v-data-table>               
                  </v-sheet>
              </v-col>
          </v-row>              
        </v-main>
    </v-container>
</template>

<script>
  import companyGateway from '../../../api/companyGateway';
  import AppBar from '@/bounded-context/shared/components/appbar/AppBar' 
  import DialogPlan from '../../../components/DialogPlan'
  import storage from '../../../storage';
  export default {
    name: 'BackofficeCompanyList2',
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
      },
      textSearch: ''
    }),
    methods: {
      clickRow(row) {
          this.companies.map((item) => {
              let selected = item === row;
              if(selected) {
                  this.$router.push(`/system/companies/${item._id}/options`);
              }
          })
      },
      findCompanies() {
        this.companies = [];
        this.loading = true;
        companyGateway.getCompanies(
          res => {
              this.loading = false;
              this.companies = res;
          }, () => {
              alert('Erro ao Listar Estabelecimentos')
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
    },
    computed: {
        filteredCompanies() {
          return this.companies.filter(item => {
            return (
              item.name.toLowerCase().includes(this.textSearch.toLowerCase()) ||
              item.shortName.toLowerCase().includes(this.textSearch.toLowerCase())
            )
          })
        }      
    }
  }
</script>

<template>

  <div>

        <HomeBalanceEmployeeToReceiver
            :userLogged="userLogged"
            :userBalance="userBalance"
            v-if="!isAdmin() && !loading"
        />  

      <v-row justify="start">
        
          <v-expansion-panels 
            class="px-3" 
            hover 
            focusable 
          >
            <v-expansion-panel> 
              <v-expansion-panel-header> Filtro </v-expansion-panel-header>
              <v-expansion-panel-content>

                <v-row>
                    
                    <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
                      
                      <v-row>
                        <v-col
                          class="d-flex"
                          cols="12"
                          sm="6"
                        >
                          <v-select
                            :items="itemsPeriodo"
                            v-model="selectPeriodo"
                            label="Periodo"
                            v-on:change="selectedPeriodo"
                          ></v-select>
                        </v-col>                     
                      </v-row>
                    </v-col>
                    <v-col
                          cols="12"
                          sm="6"
                          md="4"
                          v-if="selectPeriodo === 'Personalizado'"
                        >
                          <v-dialog
                            ref="dialog"
                            v-model="modal"
                            :return-value.sync="date" 
                            persistent
                            width="290px"
                          >
                            <template v-slot:activator="{ on, attrs }">
                              <v-text-field
                                v-model="datesDisplay"
                                label="Escolha o Periodo"
                                prepend-icon="mdi-calendar"
                                readonly
                                v-bind="attrs"
                                v-on="on"
                              ></v-text-field>
                            </template>
                            <v-date-picker
                              v-model="dates"
                              range
                            >
                              <v-spacer></v-spacer>
                              <v-btn
                                text
                                color="primary"
                                @click="modal = false"
                              >
                                Cancel
                              </v-btn>
                              <v-btn
                                text
                                color="primary"
                                @click="$refs.dialog.save(date); buscarPorPeriodo(dates); modal = false; "
                              >
                                OK
                              </v-btn>
                            </v-date-picker>
                          </v-dialog>
                    </v-col>                           
                    <v-col cols="12" >
                      <v-btn 
                          v-on:click="filterOrders"
                          class="ma-2" 
                          large
                          outlined 
                          style="width: 50%"
                          :loading="loading"
                      >Atualizar</v-btn>    
                    </v-col>
                </v-row>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        
      </v-row>


      <HomeOrderServiceEmployee 
        v-if="!isAdmin() && !loading"
        :ordersGroup="ordersGroup" 
        :ordersByUsers="ordersByUsers[0]"              
        :userLogged="userLogged"
        :company="company"
      />       

      <HomeAgendamentos
        style="margin-top: 12px;"
        :userLogged="userLogged"
        v-if="!loading"
      />



  </div>                
                          
</template>

<script>
export default {
  name: 'HomeFullEmployee',
  //props: [ 'ordersGroup', 'ordersByUsers', 'company'],
  data() {
    return {
      //btnNew: ''
    }
  },
  mounted() {

  }      
}
</script>
<style scoped>
  .green--text--lighten-3 {
    color: #C5E1A5
  }
</style>
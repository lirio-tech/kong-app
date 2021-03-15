<template>
    <v-container>
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/system'}" 
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                      Pagamentos
                  </span>
              </v-col>            
          </v-row>          
          <v-row>
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
              style="border-radius: 15px;"
            >
              <v-list-item three-line>
                    <v-list-item >
                      <v-list-item-content>       
                            <v-col cols="11" style="margin-top: -20px;margin-left: -10px;">
                              <div class="overline mb-4 grey--text">
                                  Pagamento Total
                              </div>                           
                            </v-col>
                              
                            <div class="display-1" style="margin-top: -30px">
                              <span>{{ total | currency }} </span>
                              <br/>
                            </div>
                        
                          
                      </v-list-item-content>
                    </v-list-item>
              </v-list-item>
            </v-card>   
          </v-row>
          <!-- <v-row justify="start" style="margin-top: 20px">

            <v-expansion-panels class="px-3" hover focusable>
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

          </v-row>     -->
               
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../../api/gateway';
import storage from '../../storage';
export default {
    name: 'SystemPayments',
    components: {  },
    data: () => ({
      paymentsHistoric: []
    }),
    methods: {
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      gateway.getPaymentsHist(res => {
        this.paymentsHistoric = res;
      }, () => {
        alert('Erro ao buscar pagamentos');
      });
    },
    computed: {
      total() {
        let ttl = 0;
        this.paymentsHistoric.forEach(p => ttl+=p.plan.payment.price);
        return ttl;
      }    
    }
  }
</script>

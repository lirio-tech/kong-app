<template>
    <v-container>
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/system'}" 
                  >
                      <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
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
                              <span>R$ {{ total | currency }} </span>
                              <br/>
                            </div>
                        
                          
                      </v-list-item-content>
                    </v-list-item>
              </v-list-item>
            </v-card>   
          </v-row>
          <v-row>
            <v-col cols="12">
              <v-sheet min-height="70vh" rounded="lg">
                  <v-data-table 
                      :headers="headers" 
                      :items="paymentsHistoric" 
                      item-key="code"
                      class="elevation-1"
                      hide-default-footer
                      loading-text="Carregando... Por favor aguarde"
                  >                        
                  </v-data-table>               
              </v-sheet>              
            </v-col>
          </v-row>
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
      paymentsHistoric: [],
      headers: [
        { text: "Estabelecimento", value: "company.shortName" },
        { text: "Plano", value: "plan.name" },
        { text: "Valor Pago", value: "plan.payment.price" },
        { text: "Inicio", value: "plan.dateStarted" },
        { text: "Fim", value: "plan.dateEnd" },
      ],         
    }),
    methods: {
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      gateway.getAllPaymentsHist(res => {
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

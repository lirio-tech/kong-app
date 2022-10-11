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

            <v-col cols="12" xl="6" lg="6" md="6" sm="12" xs="12">
              <v-row>
                <v-col
                  class="d-flex"
                  cols="12"
                  sm="6"
                >
                  <v-select
                    :items="months"
                    v-model="selectMonth"
                    label="Mes"
                    v-on:change="changeMonth"
                  ></v-select>
                </v-col>                     
              </v-row>
            </v-col>

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
                                  Ticket Médio Ultimo Mês
                              </div>                           
                            </v-col>
                              
                            <div class="display-1" style="margin-top: -30px">
                              <span>R$ {{ totalLastMonth | currency }} </span>
                              <br/>
                            </div>  
                      </v-list-item-content> 
                    </v-list-item>                    
              </v-list-item>
            </v-card>   
            <br/>
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
                                  qtde premium ultimo Mes
                              </div>                           
                            </v-col>
                              
                            <div class="display-1" style="margin-top: -30px">
                              <span> {{ amountLastMonth | currency}} </span>
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
                      :items-per-page="5000"
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
    name: 'BackofficePayments',
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
      dt: new Date(),
      totalLastMonth: 0,
      amountLastMonth: 0,
      selectMonth: '', 
      months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro' ]
    }),
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.selectMonth = this.months[this.dt.getMonth()];

      gateway.getAllPaymentsHist(res => {
          this.paymentsHistoric = res;
          this.totalLastMonth = this.getTotalLastMonth();
          this.amountLastMonth = this.getAmountLastMonth();        
      }, () => {
        alert('Erro ao buscar pagamentos'); 
      });
    },
    computed: {
      total() {
        let ttl = 0;
        this.paymentsHistoric.forEach(p => ttl+=p.plan.payment.price);
        return ttl;
      },    
        
    }, 
    methods: {
      changeMonth() {
          let month = this.months.indexOf(this.selectMonth);
          this.dt.setMonth(month);

          this.totalLastMonth = this.getTotalLastMonth();
          this.amountLastMonth = this.getAmountLastMonth();
      },
      getTotalLastMonth() {
        let ttl = 0;
        this.paymentsHistoric.forEach(p => { 
          if(this.dt.getMonth() == new Date(p.createdAt).getMonth() && this.dt.getFullYear() == new Date(p.createdAt).getFullYear()) {
            ttl+=p.plan.payment.price
          }
        });
        return ttl;
      },
      getAmountLastMonth() {
        let amount = 0;
        this.paymentsHistoric.forEach(p => { 
          if(this.dt.getMonth() == new Date(p.createdAt).getMonth() && this.dt.getFullYear() == new Date(p.createdAt).getFullYear() && p.plan.payment.price > 0) {
            amount++
          }
        });
        return amount;
      }   
    }
  }
</script>

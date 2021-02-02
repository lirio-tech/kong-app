<template>
    <v-container>
        <AppBar />             
        <v-main class="">

            <br/>  
            <v-row justify="start">

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
                        <v-col cols="12">
                          <v-btn 
                              v-on:click="filterOrders"
                              class="ma-2" small
                              outlined :loading="loading"
                          >Atualizar</v-btn>    
                        </v-col>
                    </v-row>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>

            </v-row>

            <br/>
            <v-card
                      class="mx-auto"
                      max-width="800"
                      outlined
                  >
                      <v-list-item three-line>
                      <v-list-item-content>                
                              <div class="overline mb-4">
                                  Periodo: 
                                  <!-- {{ periodo.inicio.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }} a 
                                  {{ periodo.fim.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }} -->
                                  {{ consolidado.periodoDescricao }}
                              </div>
                              
                              <v-list-item-title class="headline mb-1" v-if="userLogged.type === 'administrator'">
                                  Total: <span class="cyan--text">{{ consolidado.total | currency }} </span>
                              </v-list-item-title>
                              <br/>
                              <v-list-item-subtitle v-for="cab in consolidado.cabelereiros" :key="cab[0]">
                                  <br/>
                                  <h3 v-if="userLogged.name === cab[0] || userLogged.type ==='administrator'">
                                    {{ cab[0] }}: <span class="success--text">{{ cab[1] | currency }}</span>
                                  </h3>
                              </v-list-item-subtitle>                
                      </v-list-item-content>
                      </v-list-item>
                      <v-card-actions class="text-right"> 
                          <v-btn 
                              :to="{ path:'/ordem-servico'}" 
                              class="ma-2"
                              outlined
                              color="cyan"
                              :loading="loading"
                          >Novo</v-btn>                
                      </v-card-actions>
            </v-card>   
            <br/>
            <v-row>
                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg">
                        <v-data-table 
                            :headers="headers" 
                            :items="orders" 
                            item-key="code"
                            class="elevation-1"
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
  import gateway from '../api/gateway';
  import AppBar from '../components/AppBar'
  export default {
    name: 'Home',
    components: { AppBar },
    data: () => ({
      loading: false,
      itemsPeriodo: ['Ontem', 'Hoje', 'Mes Atual', 'Mes Anterior', 'Customizado'],
      periodo: {
        inicio: new Date(),
        fim: new Date()
      },
      headers: [
          { text: "Data", value: "date" },
          { text: "Cabelereiro", value: "user.name" },
          { text: "Servicos", value: "servicess" },
          { text: "Valor", value: "total" },
          { text: "Cliente", value: "customer.name" },
      ],                
      orders: [],      
      selectPeriodo: 'Hoje',
      consolidado: {
        periodoDescricao: "",
        total: 0,
        cabelereiros: new Map()
      },
      userLogged: {
        type: 'none'
      }
    }),
    methods: {
      selectedPeriodo() {
        if(this.selectPeriodo === 'Ontem') {
           let ontem = new Date();
           ontem.setDate(ontem.getDate()-1);
           this.periodo.inicio = ontem;
           this.periodo.fim = ontem;
           this.filterOrders();
           this.consolidado.periodoDescricao = 'Ontem (' + ontem.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
        }        
        if(this.selectPeriodo === 'Hoje') {
           let hoje = new Date();
           this.periodo.inicio = hoje;
           this.periodo.fim = hoje;
           this.filterOrders();
           this.consolidado.periodoDescricao = 'Hoje (' + hoje.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
        }
        if(this.selectPeriodo === 'Mes Anterior') {
           let m = new Date();
           m.setMonth(m.getMonth()-1);
           let ini = new Date();
           ini.setFullYear(m.getFullYear(), m.getMonth(), 1);
           let end = new Date();
           end.setFullYear(m.getFullYear(), m.getMonth()+1, 0);           
           this.periodo.inicio = ini;
           this.periodo.fim = end;
           this.filterOrders();
           console.log(this.getMesPtBr(m.getMonth()));
           this.consolidado.periodoDescricao = this.getMesPtBr(m.getMonth());
        }
        if(this.selectPeriodo === 'Mes Atual') {
           let m = new Date();
           let ini = new Date();
           ini.setFullYear(m.getFullYear(), m.getMonth(), 1);
           let end = new Date();
           end.setFullYear(m.getFullYear(), m.getMonth()+1, 0);           
           this.periodo.inicio = ini;
           this.periodo.fim = end;
           this.filterOrders();
           console.log(this.getMesPtBr(m.getMonth()));
           this.consolidado.periodoDescricao = this.getMesPtBr(m.getMonth());
        }                
        if(this.selectPeriodo === 'customizado') {
          alert(this.selectPeriodo);
        }                        
      },
      getMesPtBr(mes) {
          if(mes === 0) return 'Janeiro';
          if(mes === 1) return 'Fevereiro';
          if(mes === 2) return 'Marco';
          if(mes === 3) return 'Abril';
          if(mes === 4) return 'Maio';
          if(mes === 5) return 'Junho';
          if(mes === 6) return 'Julho';
          if(mes === 7) return 'Agosto';
          if(mes === 8) return 'Setembro';
          if(mes === 9) return 'Outubro';
          if(mes === 10) return 'Novembro';
          if(mes === 11) return 'Dezembro';
      },
      clickRow(row) {
          this.orders.map((item) => {
              let selected = item === row;
              if(selected) {
                  this.$router.push('/ordem-servico/'+item._id);
              }
          })
      },
      filterOrders() {
        this.orders = [];
        this.loading = true;
        gateway.getOrdersByDataBetween(this.periodo.inicio, this.periodo.fim,
          res => {
              this.loading = false;
              this.orders = res;

              this.consolidado.total = 0;
              this.consolidado.cabelereiros = new Map();
              this.orders.forEach(o => {
                o.servicess = [];
                let key = this.consolidado.cabelereiros.get(o.user.name) ? this.consolidado.cabelereiros.get(o.user.name) : 0;
                this.consolidado.cabelereiros.set(o.user.name, key + o.total);
                this.consolidado.total += o.total;
                o.services.forEach(e => {
                  o.servicess.push(e.type);
                });
              });              

          }, err => {
              console.log(err);
              this.loading = false;
          });

      },
        
    },
    beforeMount() {
      this.filterOrders();
      this.userLogged = JSON.parse(localStorage.getItem('user'));
    }
  }
</script>

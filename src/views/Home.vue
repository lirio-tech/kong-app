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
                      :to="{ 'path': '/view-pedido/' }"
                  >
                      <v-list-item three-line>
                      <v-list-item-content>                
                              <div class="overline mb-4">
                                  Periodo: 
                                  {{ periodo.inicio.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }} a 
                                  {{ periodo.fim.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}
                              </div>
                              Total:
                              <v-list-item-title class="success--text headline mb-1" >
                                  1500,00
                              </v-list-item-title>
                              <br/>
                              <v-list-item-subtitle>
                                  <br/>
                                  <h3>Guilherme: R$ 1.000,00</h3>                    
                              </v-list-item-subtitle>                
                              <v-list-item-subtitle>
                                  <br/>
                                  <h3>Dimas: R$ 1.000,00</h3>                    
                              </v-list-item-subtitle>                                          
                      </v-list-item-content>
                      </v-list-item>
                      <v-card-actions class="text-right"> 
                          <v-btn 
                              :to="{ path:'/ordem-servico'}" 
                              class="ma-2"
                              outlined
                              color="cyan"
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
                            <!-- <template v-slot:item.createdAt="{ item }">
                                {{ new Date(item.createdAt).toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) }}                            
                            </template>                                -->
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
      itemsPeriodo: ['Ontem', 'Hoje', 'Mes Atual', 'Mes Anterior', 'Customizado'],
      periodo: {
        inicio: new Date(),
        fim: new Date()
      },
      headers: [
          { text: "Data", value: "createdAt" },
          { text: "Cabelereiro", value: "usuario.nome" },
          { text: "Tipo de Servico", value: "tipoServico" },
          { text: "Valor", value: "valor" },
          { text: "Cliente", value: "cliente.nome" },
      ],                
      orders: [],      
      selectPeriodo: 'Hoje'
    }),
    methods: {
      selectedPeriodo() {
        if(this.selectPeriodo === 'Hoje') {
           let hoje = new Date();
           this.periodo.inicio = hoje;
           this.periodo.fim = hoje;
        }
        if(this.selectPeriodo === 'Mes Anterior') {
          alert(this.selectPeriodo);
        }
        if(this.selectPeriodo === 'Mes Atual') {
          alert(this.selectPeriodo);
        }                
        if(this.selectPeriodo === 'customizado') {
          alert(this.selectPeriodo);
        }                        
      }
    },
    beforeMount() {
      gateway.getOrdersByDataBetween(this.periodo.inicio, this.periodo.fim,
        res => {
            this.orders = res;
        }, err => {
            console.log(err);
        });
    }
  }
</script>

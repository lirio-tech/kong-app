<template>
  <v-container>
    
      <VuePullRefresh 
        :on-refresh="onRefresh"
        :config="config"
      >
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.8rem !important;">Servicos</span>
              </v-col>
          </v-row>    
          
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

          <br/>

          <v-alert
              outlined
              type="error"
              v-if="orders.length === 0 && !loading"
            >
              Dados não Encontrados para este período
          </v-alert>

          <v-row v-if="orders.length !== 0 && !loading">
              <v-col cols="12" sm="12">
                  <v-sheet min-height="70vh" rounded="lg" >
                      <v-data-table 
                          v-if="!userLogged.configuration || !userLogged.configuration.table || userLogged.configuration.table === 'mobile'"
                          :headers="headers" 
                          :items="orders" 
                          item-key="code"
                          class="elevation-1"
                          :items-per-page="orders.length"
                          hide-default-footer
                          loading-text="Carregando... Por favor aguarde"
                          @click:row="clickRow"
                      >
                          <template v-slot:item.date="{ item }">
                              {{ getDateFormated(item.date) }}                            
                          </template>           
                          <template v-slot:item.total="{ item }">
                              <v-icon color="green" v-if="item.paymentType === 'cash'">
                                mdi-cash
                              </v-icon> 
                              <v-icon color="purple" v-if="item.paymentType === 'card'">
                                mdi-credit-card
                              </v-icon>                                 
                              {{ item.total | currency }}
                          </template>                                                         
                      </v-data-table>               
                      <v-simple-table 
                        v-if="userLogged.configuration && userLogged.configuration.table === 'simple'"
                      >
                        <template v-slot:default>
                          <thead>
                            <tr>
                              <th class="text-center caption">
                                Data
                              </th>
                              <th class="text-left">
                                Profissional
                              </th>              
                              <th>
                                Cliente
                              </th>                                                                
                              <th class="text-center">
                                Total
                              </th>                                                                
                            </tr>
                          </thead>
                          <tbody>
                            <tr
                              v-for="ord in orders"
                              :key="ord._id"
                              @click="clickRow(ord)"
                            >
                              <td class="text-center caption">{{ getDateFormated(ord.date).substring(0,5) }}</td>
                              <td class="caption">{{ ord.user.name }}</td>
                              <td class="caption">{{ ord.customer.name }}</td>
                              <td class="text-right">
                                <v-icon color="green" v-if="ord.paymentType === 'cash'">
                                  mdi-cash
                                </v-icon>
                                <v-icon color="purple" v-if="ord.paymentType === 'card'">
                                  mdi-credit-card
                                </v-icon>                                                                   
                                {{ ord.total | currency }}
                              </td>
                            </tr>
                          </tbody>
                        </template>
                      </v-simple-table>                        
                  </v-sheet>
              </v-col>
          </v-row>               
          
        </v-main>
      </VuePullRefresh>
  </v-container>
  
</template>

<script>
import gateway from '../api/gateway'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'
import VuePullRefresh from 'vue-pull-refresh'
import dateUtils from '../utils/date'
export default {
    name: 'Home',
    components: { 
      VuePullRefresh,
    },
    data: () => ({
      config: {
        errorLabel: "Erro ao buscar Servicos realizados",
        startLabel: "Iniciando Pesquisa...",
        readyLabel: "Atualizar",
        loadingLabel: "Carregando..."
      },
      loading: false,
      itemsPeriodo: ['Ontem', 'Hoje', 'Mes Atual', 'Mes Anterior', 'Personalizado'],
      periodo: {
        inicio: new Date(),
        fim: new Date()
      },
      headers: [
          { text: "Data", value: "date" },
          { text: "Profissional", value: "user.name" },
          { sortable: false, text: "Servicos", value: "servicess" },
          { text: "Valor", value: "total" },
          { text: "Cliente", value: "customer.name" },
      ],                
      orders: [],      
      selectPeriodo: 'Hoje',
      userLogged: {
        type: 'none'
      },
      company: {},
      date: new Date().toISOString().substr(0, 10),
      dates: [dateUtils.getNewDateAddDay(-6), dateUtils.dateToStringEnUS(new Date())],
    }),
    methods: {
      onRefresh() {
        this.filterOrders();
      },
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },
      selectedPeriodo() {
        if(this.selectPeriodo === 'Ontem') {
           let ontem = new Date();
           ontem.setDate(ontem.getDate()-1);
           this.periodo = this.formatarPeriodo(ontem, ontem);
           this.filterOrders();
           this.consolidado.periodoDescricao = 'Ontem (' + ontem.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
        }        
        if(this.selectPeriodo === 'Hoje') {
           let hoje = new Date();
           this.periodo = this.formatarPeriodo(hoje, hoje);
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
           this.periodo = this.formatarPeriodo(ini, end);           
           this.filterOrders();
           this.consolidado.periodoDescricao = this.getMesPtBr(m.getMonth());
        }
        if(this.selectPeriodo === 'Mes Atual') {
           let m = new Date();
           let ini = new Date();
           ini.setFullYear(m.getFullYear(), m.getMonth(), 1);
           let end = new Date();
           end.setFullYear(m.getFullYear(), m.getMonth()+1, 0);           
           this.periodo = this.formatarPeriodo(ini, end);           
           this.filterOrders();
           this.consolidado.periodoDescricao = this.getMesPtBr(m.getMonth());
        }                
        if(this.selectPeriodo === 'Personalizado') {
          this.consolidado.periodoDescricao = this.datesDisplay;
          this.modal = true;
        }                        
      },
      formatarPeriodo(dateStart, dateEnd) {
        let monthStart = String(dateStart.getMonth()+1).padStart(2, "0");
        let dayStart = String(dateStart.getDate()).padStart(2, "0");

        let monthEnd = String(dateEnd.getMonth()+1).padStart(2, "0");
        let dayEnd = String(dateEnd.getDate()).padStart(2, "0");

        return {
          inicio: dateStart.getFullYear() + '-' + monthStart + '-' +dayStart,
          fim: dateEnd.getFullYear() + '-' + monthEnd + '-' +dayEnd
        }
      },
      getDateFormated(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },      
      getMesPtBr(mes) {
          if(mes === 0) return 'Janeiro';
          if(mes === 1) return 'Fevereiro';
          if(mes === 2) return 'Março';
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
        console.log(row);
          this.orders.map((item) => {
              let selected = item === row;
              if(selected) {
                  this.$router.push('/ordem-servico/'+item._id);
              }
          })
      },
      filterOrders() {
        this.config.readyLabel = `Atualizado as ${new Date().toLocaleString('pt-BR')}`;
        this.orders = [];
        this.loading = true;
        gateway.getOrdersByDataBetween(this.periodo.inicio, this.periodo.fim, this.userLogged,
          res => {
              this.loading = false;
              this.orders = res;

              this.orders.forEach(o => {
                o.services.forEach(e => {
                  o.servicess.push(e.type);
                });
              });  
          }, err => {
              console.log(err);
              this.loading = false;
          });
      },
      buscarPorPeriodo(dates) {
        if(dates && dates.length > 0) {
          if(dates.length > 1) {
            this.periodo.inicio = dates[0];
            this.periodo.fim = dates[1];
          } else {
            this.periodo.inicio = dates[0];
            this.periodo.fim = dates[0];
          }
          this.consolidado.periodoDescricao = this.datesDisplay;
          this.filterOrders();
        }
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
      this.periodo = this.formatarPeriodo(new Date(), new Date())
      this.filterOrders()
    },
    computed: {
      datesDisplay() {
        console.log(this.dates);
        if(this.dates[0] && this.dates[1]) {
          let ini = this.dates[0].split('-');
          let end = this.dates[1].split('-');
          return `${ini[2]}/${ini[1]} à ${end[2]}/${end[1]}`; 
        } 
        let ini = this.dates[0].split('-');
        return `${ini[2]}/${ini[1]}/${ini[0]}`;
      },      
    }
  }
</script>

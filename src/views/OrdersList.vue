<template>
  <v-container>
    
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="white-grey darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="8" align="center">   
                      <span style="font-size: 1.8rem !important;" class="white--text">{{ 'Serviços' }} </span>
              </v-col>
              <v-col cols="2" style="margin-left: -30px;">   
                  <v-btn 
                      :to="{ path:'/ordem-servico'}" 
                      class="ma-2"
                      color="primary"
                  >Novo</v-btn>                         
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

          <v-col cols="12" sm="12">
              Periodo: {{ periodDescription }}<br/>
              Quantidade: {{ orders.length }}<br/>
          </v-col>
          <v-col cols="12">
            <v-row v-if="orders.length !== 0 && !loading">
                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg" >           
                        <v-simple-table >
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
                                <td class="text-center">
                                  <v-icon color="green" v-if="ord.paymentType === 'cash'">
                                    mdi-cash
                                  </v-icon>
                                  <v-icon color="purple" v-if="ord.paymentType === 'card'">
                                    mdi-credit-card
                                  </v-icon>
                                  <v-icon color="teal lighten-2" v-if="ord.paymentType === 'pix'">
                                    mdi-rhombus-split
                                  </v-icon>                      
                                  <br/>                                                                               
                                  {{ ord.total | currency }}
                                </td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>                        
                    </v-sheet>
                </v-col>                
            </v-row>              
            <v-card 
              v-intersect="infiniteScrolling"
            ></v-card>     
          </v-col>         
        </v-main>
  </v-container>
  
</template>

<script>
import gateway from '../api/gateway'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'
import dateUtils from '../utils/date'
export default {
    name: 'Home',
    components: { 
    },
    data: () => ({
      loading: false,
      itemsPeriodo: ['Ontem', 'Hoje', 'Mes Atual', 'Mes Anterior', 'Personalizado'],
      periodo: {
        inicio: new Date(),
        fim: new Date()
      },
      headers: [
          { text: "Data", value: "date" },
          { text: "Profissional", value: "user.name" },
          { text: "Valor", value: "total" },
          { text: "Cliente", value: "customer.name" },
      ],                
      orders: [],      
      selectPeriodo: 'Hoje',
      periodDescription: 'Hoje',
      userLogged: {
        type: 'none'
      },
      company: {},
      date: new Date().toISOString().substr(0, 10),
      dates: [dateUtils.getNewDateAddDay(-6), dateUtils.dateToStringEnUS(new Date())],
      finishPagination: false,
      pageSize: 500,
      pageNumber: 1,
      loadingCarregandoMaisDados: false      
    }),
    methods: {
      onRefresh() {
        this.filterOrders();
      },
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },
      selectedPeriodo() {
        this.pageNumber = 1;
        if(this.selectPeriodo === 'Ontem') {
           let ontem = new Date();
           ontem.setDate(ontem.getDate()-1);
           this.periodo = this.formatarPeriodo(ontem, ontem);
           this.filterOrders();
           this.periodDescription = 'Ontem (' + ontem.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
        }        
        if(this.selectPeriodo === 'Hoje') {
           let hoje = new Date();
           this.periodo = this.formatarPeriodo(hoje, hoje);
           this.filterOrders();
           this.periodDescription = 'Hoje (' + hoje.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
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
           this.periodDescription = this.getMesPtBr(m.getMonth());
        }
        if(this.selectPeriodo === 'Mes Atual') {
           let m = new Date();
           let ini = new Date();
           ini.setFullYear(m.getFullYear(), m.getMonth(), 1);
           let end = new Date();
           end.setFullYear(m.getFullYear(), m.getMonth()+1, 0);           
           this.periodo = this.formatarPeriodo(ini, end);           
           this.filterOrders();
           this.periodDescription = this.getMesPtBr(m.getMonth());
        }                
        if(this.selectPeriodo === 'Personalizado') {
          this.periodDescription = this.datesDisplay;
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
        this.orders = [];
        this.loading = true;
        this.finishPagination = false;
        gateway.getOrdersByDataBetween(
          this.periodo.inicio, 
          this.periodo.fim, 
          this.userLogged,
          this.pageNumber,
          this.pageSize,
          res => {
              this.loading = false;
              this.orders = res;
              if(res.length < this.pageSize) {
                this.finishPagination = true;
              }                               
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
          this.periodDescription = this.datesDisplay;
          this.filterOrders();
        }
      },
      infiniteScrolling(entries, observer, isIntersecting) {
        console.log('params', entries);
        console.log('params', observer);
        console.log('params', isIntersecting);
        setTimeout(() => {
          if(this.finishPagination === false) {
            this.pageNumber++;
            this.loading = true;
            gateway.getOrdersByDataBetween(
              this.periodo.inicio, 
              this.periodo.fim, 
              this.userLogged,
              this.pageNumber,
              this.pageSize,
              res => {
                  if(res.length < this.pageSize) {
                    this.finishPagination = true;
                  }                 
                  this.loading = false;
                  this.orders.push(...res);
              }, err => {
                  console.log(err);
                  this.loading = false;
              });            
          }
        }, 500);
      },      
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

<template>
  <v-container>
      <VuePullRefresh 
        :on-refresh="onRefresh"
        :config="config"
      >

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

            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                      <v-list-item three-line>
                      <v-list-item-content>       
                            <v-col cols="11" style="margin-top: -20px;margin-left: -10px;">
                              <div class="overline mb-4 grey--text">
                                  Periodo: 
                                  <span class="">{{ consolidado.periodoDescricao }}</span>
                              </div>                           
                            </v-col>
                            <v-col cols="1" v-if="isAdmin">
                              <span style="margin-left: -15px;">
                                  <router-link to="/analytics" style="color: inherit; text-decoration: none">
                                      <v-btn fab x-small outlined color="cyan">
                                          <v-icon>
                                              mdi-chart-bar
                                          </v-icon>    
                                      </v-btn>
                                  </router-link>                          
                              </span>     
                            </v-col>                            
                              
                            <v-list-item-title class="headline mb-1" v-if="isAdmin()">
                                <div v-if="!loading" class="display-1">
                                  Total: <span class="primary--text">{{ consolidado.total | currency }} </span>
                                  <br/>
                                </div>
                            </v-list-item-title>

                            <v-list-item-subtitle>
                                <div v-if="!loading">
                                  <br/>
                                  <span class="headline">
                                    Quantidade: <span class="primary--text">{{ orders.length }}</span>
                                  </span>
                                </div>                                
                            </v-list-item-subtitle>                                              
                            <v-list-item-subtitle v-for="cab in consolidado.cabelereiros" :key="cab[0]">
                                <br/>
                                <div v-if="!loading">
                                  <span class="headline" v-if="userLogged.name === cab[0] || isAdmin()">
                                    {{ cab[0] }}: <span class="success--text">{{ cab[1] | currency }}</span>
                                  </span>
                                </div>                           
                            </v-list-item-subtitle>    

                          <div v-if="loading">
                            <v-skeleton-loader
                              type="article, actions"
                            ></v-skeleton-loader>
                          </div>                               

                      </v-list-item-content>
                      </v-list-item>
                      <v-card-actions > 
                        <v-col cols="12" class="justify-end">
                          <v-btn 
                              v-if="!loading"
                              :to="{ path:'/ordem-servico'}" 
                              class="ma-2"
                              large
                              style="width: 50%"
                              outlined
                              color="cyan"
                          >Novo</v-btn>                                            
                        </v-col>  
                      </v-card-actions>
            </v-card>   
            <br/>

            <v-alert
                dense
                border="bottom"
                type="error"
                v-if="orders.length === 0 && !loading"
              >
                Dados nao Encontrados para este periodo
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
                                  Date
                                </th>
                                <th class="text-left">
                                  Profissional
                                </th>              
                                <th class="text-center">
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
                                <td class="text-right">{{ ord.total | currency }}</td>
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
import AppBar from '../components/AppBar'
import DialogPlan from '../components/DialogPlan'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'
import VuePullRefresh from 'vue-pull-refresh'
export default {
    name: 'Home',
    components: { 
      AppBar,
      DialogPlan,
      VuePullRefresh
    },
    data: () => ({
      config: {
        errorLabel: "Erro ao buscar Servicos realizados",
        startLabel: "Iniciando Pesquisa...",
        readyLabel: "Atualizar",
        loadingLabel: "Carregando..."
      },
      loading: false,
      dialogPlan: false,
      itemsPeriodo: ['Ontem', 'Hoje', 'Mes Atual', 'Mes Anterior'], //, 'Customizado'],
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
        if(this.selectPeriodo === 'customizado') {
          alert(this.selectPeriodo);
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
      showPlanDialog(show) {
        this.dialogPlan = show
      },
      verifyAccontPremium() {
        let cpny = storage.getCompany();
        let i = Number(localStorage.getItem('dialogPlan') ? localStorage.getItem('dialogPlan') : '0')+1;
        localStorage.setItem('dialogPlan', i)
        if(i % 8 === 0
            && cpny 
            && cpny.plan.name === 'Free' 
            && this.isAdmin()) {
          this.dialogPlan = true
        }
      }        
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.periodo = this.formatarPeriodo(new Date(), new Date())
      this.consolidado.periodoDescricao = 'Hoje (' + new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
      this.filterOrders()
      this.verifyAccontPremium();
    }
  }
</script>

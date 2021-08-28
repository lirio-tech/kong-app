<template>
  <v-container>
      <VuePullRefresh 
        :on-refresh="onRefresh"
        :config="config"
      >
        <AppBar />             

        <v-main class="">
          
            <v-col cols="12"  v-if="loading" style="margin-top: -23px; width: 100%">
              <v-progress-linear
                indeterminate
                rounded
                :active="loading"
                background-opacity="0.42"
                buffer-value="100"
                height="7"
                value="0"
                color="success"
              ></v-progress-linear>
            </v-col>   
            <v-col cols="12"  v-if="notifications && notifications.length > 0" >
                <v-card
                  class="mx-auto"
                  max-width="800"
                  v-for="notify in notifications"
                  :key="notify.text"                  
                >              
                <v-alert 
                      :type="notify.type"
                      :icon="notify.icon"
                      border="left"
                      :dismissible="notify.closeable"
                      prominent
                    >
                      <v-row align="center">
                        <v-col class="grow">
                          {{ notify.text }}
                        </v-col>
                        <v-col class="shrink" v-if="notify.link">
                          <v-btn @click="goToLinkNotify(notify.link)">{{ notify.linkTitle }}</v-btn>
                        </v-col>
                      </v-row>
                </v-alert>
                </v-card>
            </v-col>
            <v-row v-if="userLogged.type === 'sys_admin'">
                <v-col cols="12">
                      <home-site 
                        :company="company" 
                        style="margin-bottom: -10px"
                      />
                </v-col>
            </v-row>
            <v-row>
              
              <v-col cols="12">
                <HomeBalanceEmployeeToReceiver
                    :userLogged="userLogged"
                    :userBalance="userBalance"
                    :loading="loadingBalance"
                    v-if="!isAdmin()"
                />  

                <HomeBalanceAdminToPay
                  :userLogged="userLogged"
                  :balanceFull="balanceFull"
                  :loading="loadingBalance"
                  v-if="isAdmin()"
                />                
 
              </v-col>
            </v-row>
            <v-row justify="center">
      
                      <v-expansion-panels 
                        class="px-3" 
                        hover 
                        style="maxWidth: 827px"
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

            <br/>
            
            <HomeOrderServiceAdmin 
              v-if="isAdmin()"
              :ordersGroup="ordersGroup" 
              :ordersByUsers="ordersByUsers"
              :userLogged="userLogged"
              :company="company"
              :balanceFull="balanceFull"
              :loading="loading"
            />

            <HomeOrderServiceEmployee 
              v-if="!isAdmin()"
              :ordersGroup="ordersGroup" 
              :ordersByUsers="ordersByUsers[0]"              
              :userLogged="userLogged"
              :company="company"
              :loading="loading"
            />       
            
            <HomeAgendamentos
              style="margin-top: 12px;"
              :userLogged="userLogged"
            />
            
        </v-main>
      </VuePullRefresh>
      <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
      <DialogRateUs :dialog="dialogRateUs" />      
      <br/><br/><br/><br/><br/>
  </v-container>
  
</template>

<script>
import gateway from '../api/gateway'
import orderGateway from '../api/orderGateway'
import AppBar from '../components/AppBar'
import DialogPlan from '../components/DialogPlan'
import DialogRateUs from '../components/DialogRateUs'
import HomeOrderServiceEmployee from '../components/HomeOrderServiceEmployee'
import HomeOrderServiceAdmin from '../components/HomeOrderServiceAdmin'
import HomeBalanceAdminToPay from '../components/HomeBalanceAdminToPay'
import HomeBalanceEmployeeToReceiver from '../components/HomeBalanceEmployeeToReceiver'
import HomeAgendamentos from '../components/HomeAgendamentos'
import HomeSite from '../components/HomeSite'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'
import VuePullRefresh from 'vue-pull-refresh'
import dateUtils from '../utils/date'
export default {
    name: 'Home',
    components: { 
      AppBar,
      DialogPlan,
      DialogRateUs, 
      VuePullRefresh,
      HomeOrderServiceEmployee,
      HomeOrderServiceAdmin,
      HomeBalanceAdminToPay,
      HomeBalanceEmployeeToReceiver,
      HomeAgendamentos,
      HomeSite,
    },
    data: () => ({
      config: {
        errorLabel: "Erro ao buscar Serviços realizados",
        startLabel: "Iniciando Pesquisa...",
        readyLabel: "Atualizar",
        loadingLabel: "Carregando..."
      },
      loading: false,
      loadingBalance: false,
      dialogPlan: false,
      dialogRateUs: false,
      itemsPeriodo: ['Ontem', 'Hoje', 'Mes Atual', 'Mes Anterior', 'Personalizado'],
      periodo: {
        inicio: new Date(),
        fim: new Date()
      },
      selectPeriodo: 'Hoje',
      ordersGroup: {
        total: 0.0,
        totalCompany: 0.0,
        amount: 0,
        card: 0.0,
        cash: 0.0,
        pix: 0.0,
        periodDescription: 'Hoje'
      },
      ordersByUsers: [],
      userLogged: {
        type: 'none'
      },
      company: {},
      modal: false,
      date: new Date().toISOString().substr(0, 10),
      dates: [dateUtils.getNewDateAddDay(-6), dateUtils.dateToStringEnUS(new Date())],
      userBalance: {},
      balanceFull: 0,
      notifications: [],
    }),
    methods: {
      onRefresh() {
        this.filterOrders()
        this.findBalance();        
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
           this.ordersGroup.periodDescription = 'Ontem (' + ontem.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
        }        
        if(this.selectPeriodo === 'Hoje') {
           let hoje = new Date();
           this.periodo = this.formatarPeriodo(hoje, hoje);
           this.filterOrders();
           this.ordersGroup.periodDescription = 'Hoje (' + hoje.toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
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
           this.ordersGroup.periodDescription = this.getMesPtBr(m.getMonth());
        }
        if(this.selectPeriodo === 'Mes Atual') {
           let m = new Date();
           let ini = new Date();
           ini.setFullYear(m.getFullYear(), m.getMonth(), 1);
           let end = new Date();
           end.setFullYear(m.getFullYear(), m.getMonth()+1, 0);           
           this.periodo = this.formatarPeriodo(ini, end);           
           this.filterOrders();
           this.ordersGroup.periodDescription = this.getMesPtBr(m.getMonth());
        }                
        if(this.selectPeriodo === 'Personalizado') {
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
      findBalance() {
        if(!this.isAdmin()) {
          this.loadingBalance = true;
          gateway.getUserBalanceByUserId(this.userLogged._id,
            res => {
              this.loadingBalance = false;
              this.userBalance = res;
            }, 
            () => { this.loadingBalance = false; }
          )
        } else {
          this.balanceFull = 0;
          this.loadingBalance = true;
          gateway.getUsersBalance(
            res => {
              this.loadingBalance = false;
              res.forEach(b => {
                this.balanceFull += b.balance;
              })
              console.log(res);
            }, 
            () => { this.loadingBalance = false; }
          )        
        }
      },
      filterOrders() {
        this.config.readyLabel = `Atualizado as ${new Date().toLocaleString('pt-BR')}`;
        this.orders = [];
        this.loading = true;
        
        this.ordersGroup.total = 0.0;
        this.ordersGroup.totalCompany = 0.0;
        this.ordersGroup.amount = 0;
        this.ordersGroup.card = 0.0;
        this.ordersGroup.cash = 0.0;
        this.ordersGroup.pix = 0.0;

        this.ordersByUsers = [];
        orderGateway.getOrdersSummaryByDataBetween(this.periodo.inicio, this.periodo.fim,
          res => {
            console.log(res);
            this.loading = false;
            this.ordersByUsers = res.orders;
            this.ordersByUsers.forEach(obu => {
              this.ordersGroup.total += obu.total;
              this.ordersGroup.totalCompany += obu.totalCompany;
              this.ordersGroup.amount += obu.amount;
              this.ordersGroup.card += obu.card;
              this.ordersGroup.cash += obu.cash;
              this.ordersGroup.pix += obu.pix;
            });
            storage.setUserLogged(JSON.stringify(res.user));
            storage.setCompany(JSON.stringify(res.company));
            this.notifications = res.notifications;
          }, err => {
            this.loading = false;
            console.log(err);
          }

        )
      },
      showPlanDialog(show) {
        this.dialogPlan = show
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
          this.ordersGroup.periodDescription = this.datesDisplay;
          this.filterOrders();
        }
      },
      goToLinkNotify(path) {
        this.$router.push(path);
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
      this.periodo = this.formatarPeriodo(new Date(), new Date())
      this.ordersGroup.periodDescription = 'Hoje (' + new Date().toLocaleDateString('pt-BR', { year: 'numeric', month: '2-digit', day: '2-digit' }) + ')';
      this.filterOrders()
      this.findBalance();
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

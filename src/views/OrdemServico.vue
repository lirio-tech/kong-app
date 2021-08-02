<template>
    <v-container :style="`${this.$vuetify.theme.dark ? '' : 'background: white' }`">
              <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
              <div v-if="true">
                  <v-row>
                      <v-col cols="2" style="margin-top: 10px;">   
                          <v-btn icon small style="display: inline;"
                              :to="{ 'path': '/'}" 
                          > 
                              <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                          </v-btn>
                      </v-col> 
                      <v-col cols="8" align="center" >  
                              <span v-if="order._id" style="font-size: 1.2rem !important;">Ordem de Serviço</span>
                              <span v-else style="font-size: 1.2rem !important;">Nova Ordem Serviço</span>
                      </v-col>       
                  </v-row>    
                  <v-row>
                      <v-col cols="12" sm="12">
                        <center 
                          class="display-2" 
                          :class="{  'warning--text': (order.total <= 0), 'success--text': (order.total > 0 ) }" 
                          align="center" 
                          justify="space-around"
                        > 
                              {{ order.total | currency }}
                        </center>
                        <br/>
                        <center 
                          class="primary--text" 
                          align="center" 
                          justify="space-around"
                          style="margin-top: -20px;"
                        > 
                              Comissão de {{ order.commission | currency }}
                        </center>

                      </v-col>
                      <v-col cols="12" sm="12" v-if="isAdmin() || userLogged.allowEditOrder === true ||  !order._id">
                          <div class="d-flex" style="margin-top: -15px;">
                            <v-col cols="6">
                              <v-select
                                  v-model="service.type"
                                  size="1" 
                                  :items="typeServices"
                                  label="Serviço"
                                  ref="serviceType"
                                  required filled 
                                  @change="setFocusServicePrice"                             
                              ></v-select>                                    
                            </v-col>
                            
                            <v-col cols="4">
                              <v-text-field
                                autocomplete="off"
                                label="Valor"
                                v-model="service.priceBR"
                                @focus="$event.target.select()"
                                ref="servicePrice"
                                @keyup="service.priceBR = maskCurrency(service.priceBR)"
                                filled
                              />
                            </v-col>
                            <v-col cols="1" >
                              <v-btn icon outlined class="mt-3" v-on:click="addService">
                                <v-icon>mdi-plus</v-icon>
                              </v-btn>                            
                            </v-col>
                          </div>
                      </v-col>
                      <v-col cols="12" sm="12" class="mt-0 pt-0">
                        <v-container>
                            <v-simple-table dense style="margin-top: -18px;">
                              <template v-slot:default>
                                <thead >
                                  <tr>
                                    <th class="text-left">
                                      Serviço
                                    </th>
                                    <th></th>
                                    <th class="text-left">
                                      Valor
                                    </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="item in order.services" :key="item.type">
                                    <td>{{ item.type }} </td>
                                    <td>{{ item.percentCommission }}%</td>
                                    <td>{{ item.price | currency }}</td>
                                    <td>
                                      <v-icon 
                                        @click="deleteItem(item)" class="error--text"
                                        v-if="(isAdmin() || userLogged.allowEditOrder === true) || !order._id">
                                        mdi-delete
                                      </v-icon>
                                    </td>
                                  </tr>
                                  <tr v-if="order.services.length === 0">
                                      <td align="center" class="error--text" colspan="3"><h3>Não há serviços adicionados</h3></td>
                                  </tr>
                                </tbody>
                              </template>
                            </v-simple-table>
                        </v-container>
                      </v-col>

                      <v-col cols="12">
                          <v-form 
                            v-model="valid" 
                            v-on:submit.prevent="save"
                            ref="orderForm"
                            id="orderForm"
                          >
                              <v-row>
                                <v-col cols="12">                                  
                                  <v-radio-group
                                    v-model="order.paymentType"
                                    row
                                    style="margin-top: -10px; margin-left: 10%;"
                                  >
                                    <v-radio
                                      label="Dinheiro"
                                      value="cash"
                                    >
                                    </v-radio>
                                    <v-radio
                                      label="Cartão"
                                      value="card"
                                    ></v-radio>
                                    <v-radio
                                      label="Pix"
                                      value="pix"
                                    ></v-radio>                                    
                                  </v-radio-group>                              
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">                      
                                    <v-text-field v-model="order.customer.name"
                                                    label="Cliente"
                                                    ref="customerName"
                                                    :rules="customerNameRules"
                                                    append-icon="mdi-account"
                                                    filled
                                                    style="margin-top: -20px;">                                
                                    </v-text-field>  
                                </v-col>
                                <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">                      
                                    <v-text-field v-model="order.customer.phone_number"
                                                    label="Celular"
                                                    ref="customerPhone"
                                                    v-mask="'(##) #####-####'"
                                                    append-icon="mdi-whatsapp"
                                                    filled
                                                    style="margin-top: -20px;">                                
                                    </v-text-field>  
                                </v-col>
                                  <v-col
                                   xl="6" lg="6" md="8" sm="12" xs="12" cols="12"
                                  >
                                    <v-text-field v-model="dateFormatted"
                                                    @blur="date = parseDate(dateFormatted)"
                                                    label="Data"
                                                    ref="date"
                                                    v-mask="'##/##/####'"
                                                    append-icon="mdi-calendar"
                                                    filled
                                                    clearable
                                                    style="margin-top: -20px;">                                
                                    </v-text-field>  
                                  </v-col>                                                       
                                <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">        
                                    <v-combobox 
                                        v-model="order.user" 
                                        size="1" 
                                        :items="users"
                                        append-icon="mdi-account"
                                        label="Funcionário"
                                        ref="user"
                                        required filled 
                                        item-text='name'
                                        item-value='_id'          
                                        v-if="isAdmin() || order._id"     
                                        :disabled="order._id || order.total > 0"
                                        @change="setServices"
                                        style="margin-top: -20px;"                         
                                    ></v-combobox>                                              
                                </v-col>
                              </v-row> 
                              <v-row align="center"
                                     justify="space-around"
                                     v-if="(isAdmin() || userLogged.allowEditOrder === true) || !order._id"
                                     >
                                  <v-btn 
                                      type="submit" 
                                      depressed  
                                      x-large 
                                      style="width: 45%"
                                      color="success"
                                      :loading="loadingSave"
                                      :disabled="loadingSave"
                                    >Salvar</v-btn>
                                  <v-btn 
                                    color="error" 
                                    v-if="isAdmin() && order._id"
                                    :loading="loadingDelete"
                                       x-large 
                                      style="width: 45%"
                                    :disabled="loadingDelete"
                                    v-on:click="deleteOrder"
                                  >
                                      Deletar
                                  </v-btn>           
                                                           
                              </v-row>           
                          </v-form>                
                      </v-col>
                  </v-row>
              </div>      
              <br/><br/><br/><br/><br/><br/>            
    </v-container>
</template>

<script>
import gateway from '../api/gateway'
import { mapGetters } from 'vuex'
import DialogPlan from '../components/DialogPlan'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'
  export default {
    name: 'OrdemServico',
    components: {
      DialogPlan
    },
    data: vm => ({
        loadingSave: false,
        loadingDelete: false,
        dialogPlan: false,
        customerNameRules: [
            v => !!v || 'Nome do Cliente Obrigatório',
            v => (v && v.length <= 20) || 'Nome deve ser menor que 20 caracteres',
        ],
        priceRules: [ 
            v => !!v || 'Valor obrigatório',
            v => (v &&  Number(v.replaceAll('R$ ', '').replaceAll('.', '').replaceAll(',', '.') ) > 0) || 'Valor deve ser maior que R$ 0,00',
        ],         
        valid: true,
        isLoading: false,
        menu: false,
        modal: false,
        menu2: false,       
        date: new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10),
        dateFormatted: vm.formatDate(new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10)),     
        updatedAt: null,
        createdAt: null,   
        order: {
          services: [],
          total: 0,
          date: "",
          price: 20.00,
          priceBR: "20,00",
          user: {},
          customer: {},
          company: '',
          paymentType: 'cash',
          commission: 0,
          totalCompany: 0,
        },
        service: {
          type: "",
          price: 0,
          priceBR: "0",
        },
        myCompany: {},
        typeServices: [],
        users: [],
        userLogged: {
          type: null
        }
    }),
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },
      save() {
        if (this.orderHasServices() && this.$refs.orderForm.validate()) {
          this.order.date = this.date;
          if(this.order.date.includes('/')) {
            const [day, month, year] = this.order.date.split('/');
            this.order.date = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
          }
          this.loadingSave = true;     
          this.order.company = this.userLogged.company;     
          gateway.saveOrder(this.order,
            res => {
              this.order = res;
              this.loadingSave = false;          
              alert('Gravado com sucesso');
              this.$router.push('/');
            }, err => {
              console.log(err.response);
              this.loadingSave = false;          
              if(err.response.status === 401) {
                this.$router.push('/login');
                return;
              }
              if(err.response.status === 412) {
                alert(err.response.data.message)
                this.dialogPlan = true;                
                return;
              }
              if(err.response.status === 422) {
                alert(err.response.data.message)            
                return;
              }              
              alert('Erro ao gravar, por favor tente novamente')
            });
        }
      },
      setFocusServicePrice() {
        this.service.priceBR = this.maskCurrency(this.order.user.services.filter(it => it.type === this.service.type)[0].price);
        this.$refs.servicePrice.focus(); 
      },
      orderHasServices() {
        if(!this.order.services || this.order.services.length <= 0) {
          alert('Obrigatorio adicionar 1 Serviço');
          this.$refs.serviceType.focus();
          return false;
        }
        return true;
      },
      addService() {
        if(!this.service.type) {
          alert('Selecione o Serviço');
          this.$refs.serviceType.focus();
          return;
        }
        this.service.price = this.numberBrToUS(this.service.priceBR);
        if(!this.service.price) {
          alert('Valor deve ser maior que zero');
          this.$refs.servicePrice.focus();
          return;
        }        
        
        const percentCommission = this.userLogged.services.filter(it => it.type === this.service.type)[0].percentCommission;
        const priceCommission = this.service.price * percentCommission / 100;
        
        this.order.services.push({
            type: this.service.type, 
            price: this.service.price,
            priceCommission: priceCommission,
            percentCommission: percentCommission,
            priceCompany: this.service.price - priceCommission,
        });

        this.order.total += Number(this.service.price);
        this.order.commission += priceCommission; 
        this.order.totalCompany += this.service.price - priceCommission; 

        this.service = {type: "", priceBR: "0,00"};
      },
      deleteItem(service) { 
          this.order.total -= service.price;
          this.order.commission -= service.priceCommission;
          this.order.totalCompany -= service.totalCompany;
          this.order.services.splice(this.order.services.indexOf(service), 1);
      },
      formatDate (date) {
        if (!date) return null;

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },
      formatDateTime (dateTime) {
        let date = dateTime.substr(0,10);
        let time = dateTime.substr(11,5);
        console.log(time);
        if (!date) return null;

        const [year, month, day] = date.split('-');
        return `${day}/${month}/${year} ${time}`
      },      
      parseDate (date) {
        if (!date) return null;
        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },      
      maskCurrency(v) {
          v=String(v);
          v=v.replace(/\D/g,"");//Remove tudo o que não é numero
          v=String(Number(v));
          v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
          v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares
          v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
          return v;
      },      
      numberBrToUS(v) {
        return Number(v.replace('R$ ', '').replace('.', '').replace(',', '.'));
      },           
      numberUsToBr(v) {
          return v.toLocaleString('pt-br', {minimumFractionDigits: 2});
      },      
      deleteOrder() {        
        if (this.isAdmin() && confirm('Deseja Relamente Excluir?')) {
          this.loadingDelete = true;          
          gateway.deleteOrder(this.order._id,
            () => {
              this.loadingDelete = false;              
              alert('Excluido com sucesso');
              this.$router.push('/');
            }, err => {
              console.log(err);
              this.loadingDelete = false;
            });
        }
      },
      findAllUsers() {
        gateway.getUsers('enabled', res => {
          this.users = res;
          console.log(this.users);
          this.loadingDelete = false;
          this.loadingSave = false;    
          setTimeout(
            () => {
              if(this.order.user._id) {    
                this.order.user = this.users.filter(it => it._id === this.order.user._id)[0];
                this.setServices();
              }
            }, 2000
          )
        }, err => {
          console.log(err);
          this.loadingDelete = false;
          this.loadingSave = false;        
        });
      },
      showPlanDialog(show) {
        this.dialogPlan = show;
      },
      setServices() {
          this.typeServices = [];
          this.order.user.services.forEach(s => this.typeServices.push(s.type) );        
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.myCompany = storage.getCompany();
      this.userLogged.services.forEach(s => this.typeServices.push(s.type) );

      console.log(this.$route.params._id);
      if(this.$route.params._id) {
        gateway.getOrderById(this.$route.params._id,
          res => {
            this.order = res;
            this.dateFormatted = this.formatDate(this.order.date); 
            this.createdAt = this.formatDateTime(this.order.createdAt);
            this.updatedAt = this.formatDateTime(this.order.updatedAt);
            this.order.priceBR = this.numberUsToBr(this.order.price);
            this.loadingDelete = false;
            this.loadingSave = false;           
          }, err => {
            console.log(err);
            this.loadingDelete = false;
            this.loadingSave = false;            
          });
      }
      if(this.isAdmin()) {
          this.findAllUsers();
      } else {
        this.users.push(this.userLogged);
        this.loadingDelete = false;
        this.loadingSave = false;             
      }      
      this.order.user = this.userLogged;
      this.loadingDelete = false;
      this.loadingSave = false;     
    },
    watch: {
      date() {
        this.dateFormatted = this.formatDate(this.date)
      },      
    },    
    computed: {
        ...mapGetters({
            company: "companyStore/company"
        }), 
    }          
  }
</script>

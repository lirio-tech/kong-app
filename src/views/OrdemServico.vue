<template>
    <v-container>
              <div v-if="true">
                  <v-row>
                      <v-col cols="2" style="margin-top: 10px;">   
                          <v-btn icon small style="display: inline;"
                              :to="{ 'path': '/'}"
                          > 
                              <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                          </v-btn>
                      </v-col> 
                      <v-col cols="8" align="center" >  
                              <span v-if="order._id" style="font-size: 1.6rem !important;">Corte</span>
                              <span v-else style="font-size: 1.6rem !important;">Novo Corte</span>
                      </v-col>       
                  </v-row>    
                  <v-row>
                      <v-col cols="12" sm="12">
                        <h1 :class="{  'warning--text': (order.total <= 0), 'success--text': (order.total > 0 ) }" 
                            align="center" 
                            justify="space-around"> 
                              {{ order.total | currency }}
                        </h1>
                      </v-col>
                      <v-col cols="12" sm="12" v-if="(userLogged.type && userLogged.type === 'administrator') || !order._id">
                          <div class="d-flex">
                            <v-col cols="6">
                              <v-select
                                v-model="service.type"
                                :items="typeServices"
                                item-text="name"
                                item-value="name"
                                filled
                                ref="serviceType"
                                @change="setFocusServicePrice"
                                label="Servico"
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
                            <v-col cols="2" >
                              <v-btn icon outlined class="mt-3" v-on:click="addService">
                                <v-icon>mdi-plus</v-icon>
                              </v-btn>                            
                            </v-col>
                          </div>
                      </v-col>
                      <v-col cols="12"  class="mt-0 pt-0">

                            <v-simple-table dense >
                              <template v-slot:default>
                                <thead >
                                  <tr>
                                    <th class="text-left">
                                      Servico
                                    </th>
                                    <th class="text-left">
                                      Valor
                                    </th>
                                    <th></th>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr v-for="item in order.services" :key="item.type">
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.price | currency }}</td>
                                    <td>
                                      <v-icon 
                                        small @click="deleteItem(item)" class="error--text"
                                        v-if="userLogged.type === 'administrator' || !order._id">
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
                      </v-col>

                      <hr/>
                      <v-col cols="12" sm="12">
                          <v-form 
                            v-model="valid" 
                            v-on:submit.prevent="save"
                            ref="orderForm"
                            id="orderForm"
                          >
                              <v-container>
                              <v-row>
                                <v-col cols="12" md="12" xs="12">                      
                                    <v-text-field v-model="order.customer.name"
                                                    label="Cliente"
                                                    ref="customerName"
                                                    :rules="customerNameRules"
                                                    prepend-icon="mdi-account"
                                                    filled>                                
                                    </v-text-field>  
                                </v-col>
                              </v-row>               
                              <v-row>
                                <v-col cols="12" md="12" xs="12">                      
                                    <v-text-field v-model="order.customer.phone_number"
                                                    label="Celular"
                                                    ref="customerPhone"
                                                    v-mask="'(##) #####-####'"
                                                    prepend-icon="mdi-whatsapp"
                                                    filled>                                
                                    </v-text-field>  
                                </v-col>
                              </v-row>                                                              
                              <v-row>
                                  <v-col
                                    cols="12"
                                    sm="12"
                                    md="12"
                                  >
                                    <v-menu
                                      v-model="menu2"
                                      :close-on-content-click="false"
                                      :nudge-right="40"
                                      transition="scale-transition"
                                      offset-y
                                      min-width="auto"
                                    >
                                      <template v-slot:activator="{ on, attrs }">
                                        <v-text-field
                                          v-model="dateFormatted"
                                          @blur="date = parseDate(dateFormatted)"
                                          label="Data"
                                          ref="date"
                                          prepend-icon="mdi-calendar"
                                          readonly
                                          filled
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="date"
                                        @input="menu2 = false"
                                        locale="pt-br"
                                      ></v-date-picker>
                                    </v-menu>
                                  </v-col>                                                       
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="12" xs="12">        
                                    <v-combobox 
                                        v-model="order.user" 
                                        size="1" 
                                        :items="users"
                                        prepend-icon="mdi-account"
                                        label="Cabeleiro"
                                        ref="user"
                                        required filled 
                                        item-text='name'
                                        item-value='_id'          
                                        v-if="userLogged.type === 'administrator' || order._id"                              
                                    ></v-combobox>                                              
                                </v-col>
                              </v-row>
                              <v-row v-if="order._id">
                                  <v-col cols="12" md="4">                      
                                      <v-text-field v-model="createdAt"
                                                      label="Lancado"
                                                      prepend-icon="mdi-calendar"
                                                      disabled
                                                      filled required>                                
                                      </v-text-field>  
                                  </v-col>
                              </v-row>                              
                              <v-row v-if="order._id">
                                  <v-col cols="12" md="4">                      
                                      <v-text-field v-model="updatedAt"
                                                      label="Alterado"
                                                      prepend-icon="mdi-calendar"
                                                      disabled
                                                      filled required>                                
                                      </v-text-field>  
                                  </v-col>
                              </v-row>                                                            
                              <v-row align="center"
                                     justify="space-around"
                                     v-if="userLogged.type === 'administrator' || !order._id">
                                  <v-btn 
                                      type="submit" 
                                      depressed  
                                      color="success"
                                      :loading="loadingSave"
                                      :disabled="loadingSave"
                                    >Salvar</v-btn>
                                  <v-btn 
                                    color="error" 
                                    v-if="userLogged.type === 'administrator' && order._id"
                                    :loading="loadingDelete"
                                    :disabled="loadingDelete"
                                    v-on:click="deleteOrder"
                                  >
                                      Deletar
                                  </v-btn>                                    
                              </v-row>
                              </v-container>
                          </v-form>                
                      </v-col>
                  </v-row>
              </div>           
    </v-container>
</template>

<script>
import gateway from '../api/gateway';
  // import gateway from '../api/gateway';
  export default {
    name: 'OrdemServico',
    data: vm => ({
        loadingSave: false,
        loadingDelete: false,
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
          date: new Date().toLocaleString( 'sv', { timeZoneName: 'short' } ).substr(0,10),
          price: 40.00,
          priceBR: "40,00",
          user: {},
          customer: {},
        },
        service: {
          type: "",
          price: 0,
          priceBR: "0",
        },
        typeServices: ['Corte de Cabelo', 'Barba', 'Sobrancelha'],
        users: [],
        userLogged: {
          type: null
        }
    }),
    methods: {
      save() {
        if (this.orderHasServices() && this.$refs.orderForm.validate()) {
          this.order.date = this.date;
          this.loadingSave = true;          
          gateway.saveOrder(this.order,
            res => {
              this.order = res;
              this.loadingSave = false;          
              alert('Gravado com sucesso');
              this.$router.push('/');
            }, err => {
              console.log(err);
              this.loadingSave = false;          
            });
        }
      },
      setFocusServicePrice() {
        this.$refs.servicePrice.focus(); 
      },
      orderHasServices() {
        if(!this.order.services || this.order.services.length <= 0) {
          alert('Obrigatorio adicionar 1 servico');
          this.$refs.serviceType.focus();
          return false;
        }
        return true;
      },
      addService() {
        if(!this.service.type) {
          alert('Selecione o Servico');
          this.$refs.serviceType.focus();
          return;
        }
        this.service.price = this.numberBrToUS(this.service.priceBR);
        if(!this.service.price) {
          alert('Valor deve ser maior que zero');
          this.$refs.servicePrice.focus();
          return;
        }        
        
        this.order.services.push({type: this.service.type, price: this.service.price});
        this.order.total += Number(this.service.price);
        this.service = {type: "", priceBR: "0,00"};
      },
      deleteItem(service) {
          this.order.total -= service.price;
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

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year} ${time}`
      },      
      parseDate (date) {
        if (!date) return null

        const [day, month, year] = date.split('/')
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
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
          return Number(v.replaceAll('R$ ', '').replaceAll('.', '').replaceAll(',', '.') );
      },           
      numberUsToBr(v) {
          return v.toLocaleString('pt-br', {minimumFractionDigits: 2});
      },      
      deleteOrder() {        
        if (this.userLogged.type === 'administrator' && confirm('Deseja Relamente Excluir?')) {
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
      }
    },
    beforeMount() {
      this.loadingDelete = true;
      this.loadingSave = true;
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
      
      gateway.getUsers(res => {
        this.users = res;
        this.loadingDelete = false;
        this.loadingSave = false;        
      }, err => {
        console.log(err);
      this.loadingDelete = false;
      this.loadingSave = false;        
      });

      this.userLogged = JSON.parse(localStorage.getItem('user'));
      this.order.user = this.userLogged;
    },
    watch: {
      date() {
        this.dateFormatted = this.formatDate(this.date)
      },      
    },    
  }
</script>

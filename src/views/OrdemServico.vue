<template>
    <v-container>
        <v-main class="">
            <v-row justify="space-around">
              <div v-if="true">
                  <v-row>
                      <v-col cols="2" style="margin-top: 10px;">   
                          <v-btn icon small style="display: inline;"
                              :to="{ 'path': '/'}"
                          > 
                              <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                          </v-btn>
                      </v-col> 
                      <v-col cols="9">  
                              <span style="font-size: 2.0rem !important;">Novo Corte</span>
                      </v-col>       
                  </v-row>    
                  <v-row>
                      <v-col cols="12" sm="12">
                          <v-form 
                            v-model="valid" 
                            v-on:submit.prevent="save"
                            ref="clienteForm"
                            id="clienteForm"
                          >
                              <v-container>
                              <v-row>
                                <v-col cols="12" md="12" xs="12">                      
                                    <v-text-field v-model="order.customer.name"
                                                    label="Cliente"
                                                    prepend-icon="mdi-account"
                                                    filled>                                
                                    </v-text-field>  
                                </v-col>
                              </v-row>               
                              <v-row>
                                <v-col cols="12" md="12" xs="12">                      
                                    <v-text-field v-model="order.customer.phone_number"
                                                    label="Celular"
                                                    v-mask="'(##) #####-####'"
                                                    prepend-icon="mdi-whatsapp"
                                                    filled>                                
                                    </v-text-field>  
                                </v-col>
                              </v-row>                                                              
                              <v-row>
                                  <!-- <v-col cols="12" md="4">                      
                                      <v-text-field v-model="order.date"
                                                      label="Data"
                                                      filled required>                                
                                      </v-text-field>  
                                  </v-col> -->
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
                                      <v-text-field v-model="order.priceBR"
                                                  label="Valor"
                                                  prepend-icon="mdi-plus"
                                                  filled required>
                                      </v-text-field>
                                  </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="12" xs="12">        
                                    <v-combobox 
                                        v-model="order.typeService" 
                                        size="1" 
                                        :items="typeServices"
                                        label="Tipo de Servico"
                                        prepend-icon="mdi-account-check"
                                        ref="typeService"
                                        required filled
                                    ></v-combobox>                                              
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="12" xs="12">        
                                    <v-combobox 
                                        v-model="order.user.name" 
                                        size="1" 
                                        :items="users"
                                        prepend-icon="mdi-account"
                                        label="Cabeleiro"
                                        ref="user"
                                        required filled disabled
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
                                     justify="space-around">
                                  <v-btn 
                                      type="submit" 
                                      depressed  
                                      color="success"
                                      :loading="isLoading"
                                      :disabled="isLoading"
                                    >Salvar</v-btn>
                                  <v-btn color="error">
                                    Deletar
                                  </v-btn>                                    
                              </v-row>
                              </v-container>
                          </v-form>                
                      </v-col>
                  </v-row>
              </div>
            </v-row>                        
        </v-main>        
    </v-container>
</template>

<script>
import gateway from '../api/gateway';
  // import gateway from '../api/gateway';
  export default {
    name: 'OrdemServico',
    data: vm => ({
        valid: true,
        isLoading: false,
        menu: false,
        modal: false,
        menu2: false,       
        date: new Date().toISOString().substr(0, 10),
        dateFormatted: vm.formatDate(new Date().toISOString().substr(0, 10)),     
        updatedAt: null,
        createdAt: null,   
        order: {
          typeService: 'Corte de Cabelo',
          date: new Date().toISOString().substr(0, 10),
          price: 40.00,
          priceBR: "40,00",
          user: {
            _id: "d6v12ed52gb2rfthrt",
            username: "diegolirio",
            name: "Diego Lirio"
          },
          customer: {},
        },
        typeServices: ['Corte de Cabelo', 'Barba', 'Sobrancelha'],
        users: ['Diego']
    }),
    methods: {
      save() {
        this.order.date = this.date;
        this.order.price = this.numberBrToUS(this.order.priceBR);
        gateway.saveOrder(this.order,
          res => {
            this.order = res;
            alert('Gravado com sucesso');
            this.$router.push('/');
          }, err => {
            console.log(err);
          });
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
    },
    beforeMount() {
      if(this.$route.params._id) {
        gateway.getOrderById(this.$route.params._id,
          res => {
            this.order = res;
            this.dateFormatted = this.formatDate(this.order.date);
            this.createdAt = this.formatDateTime(this.order.createdAt);
            this.updatedAt = this.formatDateTime(this.order.updatedAt);
            this.order.priceBR = this.numberUsToBr(this.order.price);
          }, err => {
            console.log(err);
          });
      }
    },
    watch: {
      date() {
        this.dateFormatted = this.formatDate(this.date)
      },
      order: {
        deep: true,
        handler() {
          console.log(this.order.priceBR);
          this.order.priceBR = this.maskCurrency(this.order.priceBR);
        }
      }      
    },    
  }
</script>

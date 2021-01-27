<template>
    <v-container>
        <v-main class="">
            <v-row justify="start">
              <div v-if="true">
                  <v-row>
                      <v-col cols="1" style="margin-top: 10px;">   
                          <v-btn icon small style="display: inline;"
                              :to="{ 'path': '/'}"
                          > 
                              <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                          </v-btn>
                      </v-col> 
                      <v-col cols="11">  
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
                                <v-col cols="12" md="4">                      
                                    <v-text-field v-model="order.customer.name"
                                                    label="Cliente"
                                                    prepend-icon="mdi-calendar"
                                                    filled>                                
                                    </v-text-field>  
                                </v-col>
                              </v-row>               
                              <v-row>
                                <v-col cols="12" md="4">                      
                                    <v-text-field v-model="order.customer.phone_number"
                                                    label="Celular"
                                                    prepend-icon="mdi-calendar"
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
                                    sm="6"
                                    md="4"
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
                                          v-model="order.date"
                                          label="Data"
                                          prepend-icon="mdi-calendar"
                                          readonly
                                          filled
                                          v-bind="attrs"
                                          v-on="on"
                                        ></v-text-field>
                                      </template>
                                      <v-date-picker
                                        v-model="order.date"
                                        @input="menu2 = false"
                                      ></v-date-picker>
                                    </v-menu>
                                  </v-col>                                                       
                              </v-row>
                              <v-row>
                                  <v-col cols="12" md="4">
                                      <v-text-field v-model="order.price"
                                                  label="Valor"
                                                  prepend-icon="mdi-calendar"
                                                  filled required>
                                      </v-text-field>
                                  </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="3" xs="3">        
                                    <v-combobox 
                                        v-model="order.typeService" 
                                        size="1" 
                                        :items="typeServices"
                                        label="Tipo de Servico"
                                        prepend-icon="mdi-calendar"
                                        ref="typeService"
                                        required filled
                                    ></v-combobox>                                              
                                </v-col>
                              </v-row>
                              <v-row>
                                <v-col cols="12" md="3" xs="3">        
                                    <v-combobox 
                                        v-model="order.user.name" 
                                        size="1" 
                                        :items="users"
                                        prepend-icon="mdi-calendar"
                                        label="Cabeleiro"
                                        ref="user"
                                        required filled disabled
                                    ></v-combobox>                                              
                                </v-col>
                              </v-row>
                              <v-row v-if="order._id">
                                  <v-col cols="12" md="4">                      
                                      <v-text-field v-model="order.createdAt"
                                                      label="Lancamento"
                                                      disabled
                                                      filled required>                                
                                      </v-text-field>  
                                  </v-col>
                              </v-row>                              
                              <v-row v-if="order._id">
                                  <v-col cols="12" md="4">                      
                                      <v-text-field v-model="order.updatedAt"
                                                      label="Alterado"
                                                      disabled
                                                      filled required>                                
                                      </v-text-field>  
                                  </v-col>
                              </v-row>                                                            
                              <v-row>
                                  <v-btn 
                                      type="submit" 
                                      depressed  
                                      color="success"
                                      :loading="isLoading"
                                      :disabled="isLoading"
                                  >Salvar</v-btn>
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
     data: () => ({
        valid: true,
        isLoading: false,
        menu: false,
        modal: false,
        menu2: false,       
        order: {
          typeService: 'Corte de Cabelo',
          date: new Date().toISOString().substr(0, 10),
          price: 40.00,
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
        gateway.saveOrder(this.order,
          res => {
            this.order = res;
            alert('Gravado com sucesso');
            this.$router.push('/');
          }, err => {
            console.log(err);
          });
      },
    },
    beforeMount() {
      if(this.$route.params._id) {
        gateway.getOrderById(this.$route.params._id,
          res => {
            this.order = res;
          }, err => {
            console.log(err);
          });
      }
    }
  }
</script>

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
                                      <v-text-field v-model="order.date"
                                                      label="Data"
                                                      filled required>                                
                                      </v-text-field>  
                                  </v-col>
                                  <v-col cols="12" md="4">
                                      <v-text-field v-model="order.price"
                                                  label="Valor"
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
                                        label="Cabeleiro"
                                        ref="user"
                                        required filled disabled
                                    ></v-combobox>                                              
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
       order: {
         typeService: 'Corte de Cabelo',
         date: new Date(),
         price: 40.00,
         user: {
           _id: "d6v12ed52gb2rfthrt",
           username: "diegolirio",
           name: "Diego Lirio"
         }
       },
       typeServices: ['Corte de Cabelo', 'Barba', 'Sobrancelha'],
  //     itemsPeriodo: ['Hoje', 'Mes Atual', 'Mes Anterior', 'Customizado'],
  //     periodo: {
  //       inicio: new Date(),
  //       fim: new Date()
  //     },
  //     headers: [
  //         { text: "Data", value: "createdAt" },
  //         { text: "Cabelereiro", value: "usuario.nome" },
  //         { text: "Destinatario", value: "tipoServico" },
  //         { text: "Valor", value: "valor" },
  //         { text: "Cliente", value: "cliente.nome" },
  //     ],                
  //     orders: [],      
  //     selectPeriodo: 'Hoje'
  }),
  methods: {
    save() {
      alert(JSON.stringify(this.order));
      gateway.saveOrder(this.order,
        res => {
          this.order = res;
          alert('Gravado com sucesso');
        }, err => {
          console.log(err);
        });
    },
  },
  //   beforeMount() {
  //     gateway.getOrdersByDataBetween(this.periodo.inicio, this.periodo.fim,
  //       res => {
  //           this.orders = res;
  //       }, err => {
  //           console.log(err);
  //       });
  //   }
  }
</script>

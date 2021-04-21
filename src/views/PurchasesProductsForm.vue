<template>
    <v-container>
        <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/admin/purchases-products'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="9" align="center">   
                  <span style="font-size: 1.8rem !important;" v-if="'_new' === $route.params._id">  
                    Nova Compra
                  </span>
                  <span style="font-size: 1.8rem !important;" v-else>  
                    Editar Compra
                  </span>                  
              </v-col>
        </v-row>
        <v-row>
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
                <v-stepper
                    v-model="e1"
                    vertical
                >
                    <v-stepper-step
                        step="1"
                        complete
                    >
                        Fornecedor                      
                    </v-stepper-step>

                    <v-stepper-content step="1">
                        <v-form 
                            id="formOne" 
                            ref="formOne" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="onSubmit"
                        >          
                            <v-text-field
                                autocomplete="off"
                                label="Fornecedor"
                                prepend-icon="mdi-home"
                                required filled
                                :rules="[val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres']"
                                v-model="purchase.supplier.name"
                                ref="supplierName"
                            />
                            <v-text-field
                                autocomplete="off"
                                label="Data"
                                prepend-icon="mdi-calendar"
                                :rules="[val => val && val.length === 10 || 'Deve ser igual a 10 Caracteres']"
                                required filled
                                v-model="purchase.date"
                                ref="date"
                            />                      
                            <br/>
                            <v-btn
                                color="green darken-2"
                                type="submit"
                            >
                                Proximo
                            </v-btn>
                        </v-form>                      
                    </v-stepper-content>

                    <v-stepper-step step="2">
                        Produtos 
                    </v-stepper-step>
                    <v-stepper-content step="2">
                        <v-form
                            id="formTwo"
                            ref="formTwo"
                            v-on:submit.prevent="onSubmit">                   

                            <v-col cols="12" md="12">      
                                <v-autocomplete
                                    style="margin-top: -5px"
                                    v-model="model"
                                    allow-overflow
                                    :items="items"
                                    :search-input.sync="searchProduct"
                                    @change="selectedProduct"
                                    color="white" 
                                    item-text="product.name"
                                    item-value="product._id"
                                    item-disabled="false"
                                    label="Pesquisar Produto"
                                    no-filter filled
                                    return-object
                                    prepend-inner-icon="fas fa-search"
                                ></v-autocomplete>
                            </v-col>   
                            <v-col cols="12" md="4">                      
                                <v-text-field v-model="product.name"
                                            label="Nome"
                                            ref="productName"
                                            readonly
                                            :rules="[val => val && val.length > 3 || 'Deve ser igual a 3 Caracteres']"
                                            required filled>
                                </v-text-field>  
                            </v-col>            
                            <v-col cols="12" md="4">                      
                                <v-text-field v-model="product.priceUnitPurchase"
                                            label="Preco da Compra (Unidade)"
                                            ref="productPriceUnitPurchase"
                                            required filled>
                                </v-text-field>  
                            </v-col>        
                            <v-col cols="12" md="4">                      
                                <v-text-field v-model="product.amount"
                                            label="Quantidade"
                                            ref="productAmount"
                                            required filled>
                                </v-text-field>  
                            </v-col>      
                            <v-col cols="12" md="4">                      
                                <v-text-field v-model="product.priceUnitIntentionSale"
                                            label="Preco de Intencao de Venda (Unidade)"
                                            ref="productPriceUnitIntentionSale"
                                            required filled>
                                </v-text-field>  
                            </v-col>              
                            <v-col cols="12" md="4">                      

                            </v-col>
                            <v-col cols="12" md="4">                      
                                <v-btn
                                    color="grey darken-2"
                                    @click="e1 = 1"
                                >
                                    Voltar
                                </v-btn>                               
                                <v-btn
                                    color="green darken-2"
                                    type="submit"
                                >
                                    Proximo
                                </v-btn>                                      
                            </v-col>                                                                         
                        </v-form>                    
                    </v-stepper-content>                  
                </v-stepper>
            </v-col>
        </v-row>        
        <SnackBar :color="message.color" :text="message.text" :show="message.show" />
    </v-container>
</template>

<script>
import storage from '../storage'
import gatewayPub from '../api/gatewayPub'
import UserTypes from '../utils/UserTypes'
import SnackBar from '../components/SnackBar'
export default {
    name: 'Perfil',
    components: {
        SnackBar
    },
    data: () => ({
      e1: 1,
      isLoading: false, 
      valid: true,
      userLogged: {
        type: 'none'
      }, 
      company: {},
      message: {
        show: false,
        color: 'green',
        text: 'Hi'
      },       
      entries: [],
      model: {},
      product: {},
      purchase: {supplier: {}},
      searchProduct: "",
    }),
    methods: {
        isAdmin() {
            return UserTypes.isAdmin(this.userLogged.type);
        },
        showMessage(color, text) {
            this.message.color = color;
            this.message.text = text;
            this.message.show = true;
        }, 
        onSubmit() {
            if(this.e1 === 1) {
                if(!this.$refs.formOne.validate()) {
                    return;
                }              
                this.e1 = 2;  
            } else {
                this.e1 = 1;
            }
        },
        selectedProduct() {
            this.product.name = this.model.product.name;
            //this.searchProduct='';
            //this.$refs.transportadoraEndereco.focus();
        },            
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
      gatewayPub.getPurchasesById(this.$route.params._id,
        res => {
            this.purchase = res;
        }, () => { 
            alert('Erro ao Busca Compra');
        })
    },
    watch: {
            searchProduct(val) {
                if (!val || val.length < 3) {
                    this.entries = [];
                    return;
                }
                this.entries = [{product: {name: "Coca-Cola"}}]
                // gateway.getTransportadoras(
                //     resp => this.entries = resp,
                //     () => this.showMessage('red', 'Erro ao Buscar Transportadora')
                // );
            },        
    },
    computed: {
        items() {
            return this.entries;
        },           
    },
  }
</script>

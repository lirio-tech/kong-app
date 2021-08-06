<template>
    <v-container>
        <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/admin/purchases-products'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
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
            <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
                <v-stepper
                    v-model="e1"
                    vertical
                >
                    <v-stepper-step
                        step="1"
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
                                v-model="purchase.dateBR"
                                ref="dateBR"
                            />                      
                            <br/>
                            <v-btn
                                color="primary darken-2"
                                type="submit"
                                style="width:45%"
                            >
                                Proximo
                            </v-btn>
                        </v-form>                      
                    </v-stepper-content>

                    <v-stepper-step step="2" >
                        Produtos 
                    </v-stepper-step>
                    <v-stepper-content step="2">
                            <v-col cols="6" md="6" lg="6" xl="6">      
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
                                <v-btn
                                    color="info darken-2"
                                    @click="addProduct"
                                >
                                    +
                                </v-btn>  
                            </v-col>   
                            <div v-if="productEdit">
                                <v-col cols="12" md="4">                      
                                    <v-text-field v-model="product.name"
                                                label="Nome"
                                                ref="productName"
                                                readonly
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
                                    <v-btn
                                        color="grey darken-2"
                                        @click="productEdit = false; product = {}"
                                        style="width:45%"
                                    >
                                        Cancelar
                                    </v-btn>              
                                    &nbsp;                 
                                    <v-btn
                                        color="info darken-2"
                                        @click="addProduct"
                                        style="width:45%"
                                    >
                                        Adicionar
                                    </v-btn>                                      
                                </v-col>   
                            </div>

                            <v-form
                                id="formTwo"
                                ref="formTwo"
                                v-on:submit.prevent="onSubmit">    

                                <div v-if="!productEdit">
                                    <v-col cols="12" sm="12">
                                        <v-sheet min-height="20vh" rounded="lg">
                                            <v-data-table 
                                                :headers="headers" 
                                                :items="purchase.products" 
                                                item-key="code"
                                                class="elevation-1"
                                                hide-default-footer
                                                loading-text="Carregando... Por favor aguarde"
                                                @click:row="clickRow"
                                            >               
                                                <template v-slot:item.name="{ item }">
                                                    <v-chip>
                                                        {{ item.name }}                            
                                                    </v-chip>
                                                </template>        
                                                <template v-slot:item.priceUnitPurchase="{ item }">
                                                    R$ {{ item.priceUnitPurchase | currency }}                            
                                                </template>                                                                                                 
                                            </v-data-table>               
                                        </v-sheet>
                                    </v-col>
                                    <v-col cols="12" md="4">                      
                                        <v-btn
                                            color="grey darken-2"
                                            @click="e1 = 1"
                                            style="width:45%"
                                        >
                                            Voltar
                                        </v-btn>              
                                        &nbsp;                 
                                        <v-btn
                                            color="primary darken-2"
                                            type="submit"
                                            style="width:45%"
                                        >
                                            Proximo
                                        </v-btn>                                      
                                    </v-col>          
                                </div>          
                            </v-form>                                                                     
                    </v-stepper-content>      

                    <v-stepper-step
                        step="3"                        
                    >
                        Resumo                      
                    </v-stepper-step>

                    <v-stepper-content step="3">
                        <v-form 
                            id="form3" 
                            ref="form3" 
                            v-model="valid" 
                            align="left"
                            lazy-validation 
                            v-on:submit.prevent="onSubmit"
                        >          
                            <v-col cols="12">
                              <div class="overline mb-4 grey--text" style="margin-bottom: -25px;" >
                                  Total da Compra 
                              </div>                        
                              <span style="margin-top: -25px; font-size: 2.0rem">R$ {{ this.purchase.total | currency }}</span>
                            </v-col>   
                            <v-col cols="12">
                              <span class="grey--text">
                                  Data: 
                              </span>
                              <span >
                                  {{ purchase.dateBR }}
                              </span>                                                      
                            </v-col>      
                            <v-col cols="12">
                              <span class="grey--text">
                                  Fornecedor: 
                              </span>
                              <span >
                                  {{ purchase.supplier.name }}
                              </span>                                                      
                            </v-col>                                                                           
                            <br/>
                            <v-col cols="12" sm="12">
                                <v-sheet min-height="20vh" rounded="lg">
                                    <v-data-table 
                                        :headers="headers" 
                                        :items="purchase.products" 
                                        item-key="code"
                                        class="elevation-1"
                                        hide-default-footer
                                        loading-text="Carregando... Por favor aguarde"
                                        @click:row="clickRow"
                                    >               
                                        <template v-slot:item.name="{ item }">
                                            <v-chip>
                                                {{ item.name }}                            
                                            </v-chip>
                                        </template>        
                                        <template v-slot:item.priceUnitPurchase="{ item }">
                                            R$ {{ item.priceUnitPurchase | currency }}                            
                                        </template>                                                                                                 
                                    </v-data-table>               
                                </v-sheet>
                            </v-col>                            
                            <v-btn
                                color="grey darken-2"
                                @click="e1 = 2"
                                style="width:45%"
                            >
                                Voltar
                            </v-btn>              
                            &nbsp;                             
                            <v-btn
                                color="green darken-2"
                                type="submit"
                                style="width:45%"
                            >
                                Salvar
                            </v-btn>
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
import dateUtil from '../utils/date'
export default {
    name: 'Perfil',
    components: {
        SnackBar
    },
    data: () => ({
      e1: 2,
      isLoading: false, 
      valid: true,
      userLogged: {
        type: 'none'
      }, 
      headers: [
        { text: "Produto", value: "name" },
        { text: "Preco Unitario", value: "priceUnitPurchase" },
        { text: "Quantidade", value: "amount" }
      ],         
      company: {},
      message: {
        show: false,
        color: 'green',
        text: 'Hi'
      },       
      entries: [],
      model: {},
      product: {},
      productEdit: false,
      purchase: {
          supplier: {}, 
          products: [],
          dateBR: dateUtil.dateToStringPtBR(new Date()),
          total: 0
      },
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
            setTimeout(() => this.message.show = false, 4000);
        }, 
        onSubmit() {
            if(this.e1 === 1) {
                if(!this.$refs.formOne.validate()) {
                    return;
                }              
                this.e1 = 2;  
            } 
            else 
            if(this.e1 === 2 && this.productEdit === false) {
                if(this.purchase.products && this.purchase.products.length > 0) {
                    this.e1 = 3;
                } else {
                    alert('Adicione 1 Produto para prosseguir com a Compra!');
                    return;
                }
            }
            else 
            if(this.e1 === 3) {
                alert(JSON.stringify(this.purchase))
            }
        },
        selectedProduct() {
            this.product.name = this.model.product.name;
            this.productEdit = true;
            //this.searchProduct='';
            //this.$refs.transportadoraEndereco.focus();
        },     
        addProduct() {
            this.purchase.products.push(this.product);
            this.purchase.total += (Number(this.product.priceUnitPurchase) * Number(this.product.amount));
            this.productEdit = false;
            this.product = {};
        }       
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
      if('_new' !== this.$route.params._id) {
        gatewayPub.getPurchasesById(this.$route.params._id,
            res => {
                this.purchase = res;
            }, () => { 
                alert('Erro ao Busca Compra');
            })
      }

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

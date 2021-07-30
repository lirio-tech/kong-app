<template>
    <v-container>
        <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="5" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                    Compras
                  </span>
              </v-col>
              <v-col cols="2" align="center">   
                  <v-btn 
                      :to="{ path:'/admin/purchases-products/_new'}" 
                      class="ma-2"
                      outlined
                      color="cyan"
                  >Nova Compra</v-btn>                        
              </v-col>   
        </v-row>
        <v-row>
                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg">
                        <v-data-table 
                            :headers="headers" 
                            :items="purchases" 
                            item-key="_id"
                            class="elevation-1"
                            hide-default-footer
                            loading-text="Carregando... Por favor aguarde"
                            @click:row="clickRow"
                        >                        
                            <template v-slot:item.date="{ item }">
                                {{ new Date(item.date).toLocaleDateString('pt-BR') }}                            
                            </template> 
                        </v-data-table>               
                    </v-sheet>
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
      isLoading: false, 
      userLogged: {
        type: 'none'
      }, 
      company: {},
      message: {
        show: false,
        color: 'green',
        text: 'Hi'
      },       
      headers: [
        { text: "Fornecedor", value: "supplier.name" },
        { text: "Data", value: "date" },
        { text: "Total", value: "total" }
      ],           
      purchases: []
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
        clickRow(row) {
            this.purchases.map((it) => {
                let selected = it === row;
                if(selected) {
                    this.$router.push('/admin/purchases-products/'+it._id);
                }
            })        
        },        
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
      gatewayPub.getPurchasesByCompany(this.company._id,
        res => {
            this.purchases = res;
        }, () => { 
            alert('Erro ao Buscar Compras');
        })
    }
  }
</script>

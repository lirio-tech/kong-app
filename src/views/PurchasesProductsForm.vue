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
                <v-col cols="12" sm="12">
                    {{ purchase }}
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
      purchase: {}
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
    }
  }
</script>

<template>
    <v-container>
        <v-row>
            <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                <v-btn icon small style="display: inline;" @click="$router.go(-1)">
                    <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="10" align="center">   
                <span style="font-size: 1.9rem !important;">Pagamento</span>
            </v-col>
        </v-row>        
        <v-main class="">
          <v-row class="grey--text">
            <v-col cols="12">
              <h2>Pix</h2>
              <h3 :style="'color:'+plan.color">Plano {{ plan.name }}</h3>
              <span class="display-3">{{ plan.price | currency }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
                <v-img 
                  :src="plan.pixQrcode"
                ></v-img>
            </v-col>
          </v-row>  
          <v-row>
            <v-col cols="12" align="center">
              Copie e Cole: &nbsp;
              <v-btn
                v-clipboard:copy="plan.pixCopyAndPast"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                <span class="cyan--text">
                  Copiar 
                  <v-icon color="cyan">
                      mdi-content-copy
                  </v-icon>
                </span> 
              </v-btn>     
            </v-col>   
          </v-row>
          <v-row>
            <v-col cols="12" align="center">
              <a 
                style="color: inherit; text-decoration: none"
                href="https://api.whatsapp.com/send?phone=5511961409798&text=Olá, quero efetuar o pagamento via PIX no Wiskritorio App e gostaria de tirar algumas duvidas!">              
                  <span 
                    class="green--text"
                  >
                    Apos efetuar o pagamento Compartilhe o comprovante via WhatsApp 
                    <v-btn>
                      <v-icon
                        color="green"
                      >
                        mdi-whatsapp
                      </v-icon>
                    </v-btn>
                  </span>
              </a>
            </v-col>
          </v-row>
        </v-main>
    </v-container>
</template>
<script>
// import { mapGetters } from 'vuex'
import gateway from '../api/gateway'
export default {
  name: 'Payment',
  data:() => ({
    loadingPay: false,
    plan: {},
  }),
  computed: {
      // ...mapGetters({ 
      //     plan: "planStore/plan"
      // }), 
  },
  beforeMount() {
    console.log(this.$route.params.planName);
    this.plan = gateway
                  .getAllPlans()
                  .filter(p => p.name === this.$route.params.planName)[0];
    this.plan.pixQrcode = require('../assets/plano-premium-basic-10.png');
    console.log(this.plan);
  },
  methods: {
    onCopy() {
        alert('Codigo Copie e Cole PIX copiado')
    },
    onError(){
        alert('Erro ao Copiar Codigo Copie e Cole')
    } 
  }
}
</script>
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
        <br />    
        <v-main class="">
          <v-row class="grey--text">
            <v-col cols="12" align="center">
              <h2>Pix</h2>
              <h3 :style="'color:'+plan.color">Plano {{ plan.name }}</h3>
              <span class="display-2">{{ plan.price | currency }}</span>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" align="center">
                <vue-qrcode :value="plan.pixCopyAndPast" />
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
          <br/><br/><br/>
          <v-row>
            <v-col cols="12" align="center">
              <a 
                style="color: inherit; text-decoration: none"
                href="https://api.whatsapp.com/send?phone=5511961409798&text=Olá, estou no Kong Barber App e efetuando o pagamento via PIX">              
                  <span 
                    class="green--text"
                  >
                    Apos efetuar o pagamento Compartilhe o comprovante via WhatsApp clicando no icone abaixo<br/>
                    <v-btn color="green darken-1" fab small>
                      <v-icon
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
import VueQrcode from 'vue-qrcode'
import storage from '../storage';
export default {
  name: 'Payment',
  components: { VueQrcode },
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
    if(this.$route.params.planName !== 'Personalizado') {
      this.plan = gateway
                .getAllPlans()
                .filter(p => p.name === this.$route.params.planName)[0];
    } else {
      this.plan = storage.getPlanCustom();
    }
    console.log(this.plan);
  },
  methods: {
    onCopy() {
      alert('Codigo PIX copiado')
    },
    onError(){
      alert('Erro ao Copiar Codigo Copie e Cole')
    } 
  }
}
</script>
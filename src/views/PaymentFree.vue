<template>
    <v-container>
        <v-row>
            <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                <v-btn icon small style="display: inline;" @click="$router.go(-1)">
                    <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="10" align="center">   
                <span style="font-size: 1.9rem !important;">Free</span>
            </v-col>
        </v-row>    
        <br />    
        <v-main class="">

          <v-row class="grey--text">
            <v-col cols="12" align="center">
              <h2>{{ company.name }}</h2>
              <h3 >Plano Atual é o {{ company.plan.name }}</h3>
              <span>Data de Vencimento: {{ getDatePtBr(new Date(company.plan.dateEnd)) }}</span>
            </v-col>
          </v-row>          

          <v-row class="grey--text">
            <v-col cols="12" align="center">
              <p>Seu Plano atual é o Basico, após o vencimento o plano Free será assumido como seu plano Atual.</p>
            </v-col>
          </v-row>          
          <br/>

          <v-row class="grey--text">
            <v-col cols="12" align="center">
              <span class="display-1">Deseja continuar?</span>
              <br/>
              <br/>
              <v-btn large color="secondary" @click="$route.go(-1)">Nao</v-btn> &nbsp;
              <v-btn large color="primary" @click="activePlanFree">Sim, quero o Plano Free</v-btn>
            </v-col>
          </v-row>          

          

        </v-main>
    </v-container>
</template>
<script>
import storage from '../storage'
import uDate from '../utils/date'
import gateway from '../api/gateway'
export default {
  name: 'Payment',
  data:() => ({
    loadingPay: false,
    plan: {},
    company: {}
  }),
  computed: {
  },
  beforeMount() {
      // Verify situation Company
      this.company = storage.getCompany();
  },
  methods: {
    getDatePtBr(dt) {
      return uDate.dateToStringPtBR(dt).substring(0, 10);
    },
    activePlanFree() {
      gateway.setPlanFreeCompany(this.company._id,
        (res) => {
          alert('Plano Atualizado para o Plano Free');
          this.company = res;
          storage.setCompany(JSON.stringify(this.company));
          this.$router.push('/');
        },
        () => {
          alert('Erro ao Voltar para o Plano Free');
        });
    }
  }
}
</script>
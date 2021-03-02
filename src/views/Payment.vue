<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-col cols="12"  v-if="loadingPay" style="margin-top: -23px; width: 100%">
            <v-progress-linear
              indeterminate
              rounded
              :active="loadingPay"
              background-opacity="0.42"
              buffer-value="100"
              height="7"
              value="0"
              color="light-blue"
            ></v-progress-linear>
          </v-col>   
          <v-row>
            <v-col cols="12">
              <h2>Pagamento com Pix</h2>
              <h3>Plano {{ $route.params.planName }}</h3>
              <span class="display-1">R$ 10,00</span>
            </v-col>
            <v-col cols="12">
                <h5>Nubank</h5>
                <v-img 
                  src="../assets/plano-premium-basic-10.png"
                ></v-img>
            </v-col>
          </v-row>
        </v-main>
    </v-container>
</template>
<script>
import AppBar from '../components/AppBar'
export default {
  name: 'Payment',
  components: {
    AppBar
  },
  data:() => ({
    loadingPay: false,
  })
}
</script>
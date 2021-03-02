<template>
    <v-container>
        <v-row>
            <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                <v-btn icon small style="display: inline;" @click="$router.go(-1)">
                    <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="10" align="center">   
                    <span style="font-size: 2.0rem !important;">Pagamento</span>
            </v-col>
        </v-row>        
        <v-main class="">
          <br/>
          <v-row>
            <v-col cols="12">
              <h2>Pix</h2>
              <h3>Plano {{ $route.params.planName }}</h3>
              <span class="display-3">R$ 10,00</span>
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
export default {
  name: 'Payment',
  data:() => ({
    loadingPay: false,
  })
}
</script>
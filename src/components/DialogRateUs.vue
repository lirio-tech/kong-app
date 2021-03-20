<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline">
          Avalie-nos
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text>
            <RateUs />
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="dialog = false"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>

    </v-dialog>
  </div>
</template>
<script>
import RateUs from './RateUs'
export default {
    props: ['dialog'],
    components: {RateUs}
}
</script>
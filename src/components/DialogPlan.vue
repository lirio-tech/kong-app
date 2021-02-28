<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <Plan />

      <v-btn
          x-large
          dark
          style="width: 100%; color: red"
          @click="$emit('show-plan-dialog', false)"
      >
          <v-icon left>
              mdi-close
          </v-icon>
          Voltar
      </v-btn>      
      <br/><br/><br/>
    </v-dialog>    
</template>

<script>
import Plan from './Plan';
export default {
    props:['dialog'],
    components: {
      Plan
    },
    data () {
      return {
        notifications: false,
        sound: true,
        widgets: false,
      }
    },
}
</script>
<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <Plan />
      <v-btn
          dark
          text
          @click="$emit('show-plan-dialog', false)"
      >
          Voltar
      </v-btn>      
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
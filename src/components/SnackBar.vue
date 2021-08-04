<template>
    <v-snackbar
      v-model="show"
      :timeout="timeout"
      :color="color"
      outlined
    >
      {{ text }}
    </v-snackbar>      
</template>
<script>
export default {
    name: 'SnackBar',
    props: ['show', 'text', 'color','timeout']
}
</script>
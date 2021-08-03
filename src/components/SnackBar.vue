<template>
    <v-snackbar
      v-model="show"
      timeout="3500"
      :color="color"
      outlined
    >
      {{ text }}
    </v-snackbar>      
</template>
<script>
export default {
    name: 'SnackBar',
    props: ['show', 'text', 'color']
}
</script>
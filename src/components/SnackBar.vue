<template>
    <v-snackbar
      v-model="show"
      timeout="2500"
      :color="color"
      outlined
    >
      {{ text }}
    </v-snackbar>      
</template>
<script>
export default {
    props: ['show', 'text', 'color']
}
</script>
<template>
    <v-text-field
        autocomplete="off"
        label="Facebook"
        prepend-icon="mdi-facebook"
        v-model="model"
        filled
        :disabled="disabled"
        :hint="`facebook.com/${model ? model : ''}`" 
    />    
</template>
<script>
export default {
    name: 'FacebookInput',
    props: {
        value: { 
            type: String,
            required: true,
        },    
        disabled: {
            type: Boolean,
            require: false,
            default: false,
        }    
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
            this.$emit('set-facebook', value); 
        },
      },
    },
}
</script>

<template>  
    <v-text-field 
        v-model="model"
        label="WhatsApp"
        ref="whats"
        :v-mask="mask"
        prepend-icon="mdi-whatsapp"
        :disabled="disabled"
        filled
    />                  
</template>
<script>
export default {
    name: 'WhatsappInput',
    props: {
        value: { 
            type: String,
            required: true,
        },    
        disabled: {
            type: Boolean,
            require: false,
            default: false,
        },
        mask: {
            type: String,
            default: '(##) #####-####'
        }
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
            this.$emit('set-whatsapp', value); 
        },
      },
    },
}
</script>

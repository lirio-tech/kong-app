<template>
    <v-text-field
        autocomplete="off"
        label="Instagram"
        prepend-icon="mdi-instagram"
        v-model="model"
        filled
        :disabled="disabled"
        :hint="`instagram.com/${model ? model : ''}`" 
    />    
</template>
<script>
export default {
    name: 'InstagramInput',
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
            let v = String(value).toLocaleLowerCase().trim();
            v=v.replace(/[^a-zA-Z_.0-9]/g, "");
            this.$emit('set-instagram', v); 
        },
      },
    },
}
</script>

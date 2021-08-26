<template>

    <v-text-field
        autocomplete="off"
        label="@rroba"
        prepend-icon="mdi-at"
        :rules="[ 
            val => val && val.length > 1 || 'Deve ser maior do que 3 Caracteres',
            val => val && val.length <= 30 || 'tamanho maximo eh de 30 Caracteres',
        ]"
        :counter="30"
        required
        v-model="model"
        ref="companyarroba"
        :disabled="disabled"
        filled
    />


</template>
<script>
export default {
    name: 'ArrobaInput',
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
    },
    computed: {
      model: {
        get() {
          return this.value;
        },
        set(value) {
            let v = String(value).toLocaleLowerCase().trim();
            v=v.replace(/[^a-zA-Z-_0-9]/g, "");
            this.$emit('set-arroba', v); 
        },
      }, 
    },
}
</script>

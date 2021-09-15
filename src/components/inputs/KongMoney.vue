<template> 
    <v-text-field
        autocomplete="off"
        :label="label"
        v-model="value"
        ref="valueCurrency"  
        :rules="rules"
        filled
        @keyup="$emit('mask-currency', value)"
    />    
</template> 
<script>
export default {
    name: 'KongMoney',
    props: ['value', 'label', 'rules'],
    // methods: {
         
    // },
    // computed: {
    //   model: {
    //     get() {
    //       return this.value;
    //     },
    //     set(value) {
    //         console.log(value)
    //         let v = this.maskCurrency(value);
    //         this.$emit('set-value', v); 
    //     },
    //   },
    // },
}
</script>

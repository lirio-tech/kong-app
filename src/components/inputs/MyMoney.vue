<template>
    <vuetify-money
        :value="value"
        v-bind:label="label"
        v-bind:placeholder="placeholder"
        v-bind:readonly="readonly"
        v-bind:disabled="disabled"
        v-bind:outlined="outlined"
        v-bind:clearable="clearable"
        v-bind:valueWhenIsEmpty="valueWhenIsEmpty"
        v-bind:options="options"
        v-bind:properties="properties"
        v-bind:backgroundColor="$vuetify.theme.dark ? '#FFFFFF14' : 'white'"
        :rules="[valueRule]"
        @input="$emit('input', value)"
    />    
</template>
<script>
export default {
    name: 'MyMoney',
    props: ['value', 'label'],
    data: () => ({
        placeholder: " ",
        readonly: false,
        disabled: false,
        outlined: false,
        clearable: false,
        valueWhenIsEmpty: "",
        options: {
            locale: "pt-BR",
            prefix: "R$",
            suffix: "",
            length: 11,
            precision: 2
        },
        properties: {
            // hint: "my hint",
            // You can add other v-text-field properties, here.
            filled: true,  
        },      
        valueRule: v  => {
            if (!v.trim()) return true;
            if (Number(v.replace('R$ ', '').replace('.', '').replace(',', '.')) >= 0) return true;
            return 'Valor deve ser maior que ZERO';
        },        
    })
}
</script>

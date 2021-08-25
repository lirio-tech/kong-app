<template>
    <v-text-field
        autocomplete="off"
        label="Instagram"
        prepend-icon="mdi-instagram"
        :value="value"
        filled
        @keyup="$emit('instagram-keypress-event', value)"
    />    
</template>
<script>
export default {
    name: 'InstagramInput',
    props: ['value'],
    data: () => ({
   
    }),
    computed() {
        
    }
}
</script>

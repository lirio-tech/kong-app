<template>
    <a 
        style="color: inherit; text-decoration: none"
        :href="`tel:55${customer.phone_number.replace(/\D/g,'')}`"
    >                 
        <v-btn
        color="success darken-2"
        small
        >
            <v-icon>mdi-phone</v-icon> <span style="margin-left: 5px;">Ligar</span>
        </v-btn>  
    </a>       
</template>
<script>
export default {
    name: 'ButtonContactCustomerCallPhoneNumber',
    props: [ 'customer' ]
}
</script>
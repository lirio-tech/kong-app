<template>
    <a 
        style="color: inherit; text-decoration: none"
        :href="`https://api.whatsapp.com/send?phone=55${customer.phone_number.replace(/\D/g,'')}&text=Olá ${customer.name}`"
    >                        
        <v-btn
        color="success darken-2"
        small
        >
            <v-icon>mdi-whatsapp</v-icon> <span style="margin-left: 5px;">WhatsApp</span>
        </v-btn>  
    </a>       
</template>
<script>
export default {
    name: 'ButtonContactCustomerWhatsApp',
    props: [ 'customer' ]
}
</script>
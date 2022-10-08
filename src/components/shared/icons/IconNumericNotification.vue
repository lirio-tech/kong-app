<template>

    <v-icon
        color="red"
    >
        mdi-numeric-{{ number }}-circle
    </v-icon>    

</template>
<script>
export default {
    name: 'IconNumericNotification',
    props: {
        number: { 
            type: Number,
            required: true,
        }
    },
    computed: {
      model: {
        // get() {
        //   return this.number;
        // }
      }, 
    },
}
</script>

<template>
    <v-col cols="12" v-if="!$vuetify.theme.dark && (isAndroid() || !isIphone())">
        <!-- <center>
            <a href="https://play.google.com/store/apps/details?id=com.konglify.app.ladyapp">
                <v-img 
                width="250"
                src="../assets/google-play.png" 
                /> 
            </a>
        </center> -->
    </v-col>
</template>
<script>
import device from '../utils/device'
export default {
    methods: {
        isAndroid() {
            return device.isAndroid();
        },
        isIphone() {
            return device.isIphone();
        }                 
    }  
}
</script>
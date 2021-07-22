<template>
    <v-container >
        <div >
            <v-row>
                <v-col cols="2" style="margin-top: 10px;">   
                    <v-btn icon small style="display: inline;"
                        @click="goBack"
                    > 
                        <v-icon large>mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col> 
                <v-col cols="8" align="center" >  
                        <span style="font-size: 2.0rem !important;" class="white--text">Fale Conosco</span>
                </v-col>       
            </v-row>    
            <br/><br/>
            <Contact />
        </div>           
    </v-container>
</template>
<script>
import Contact from '../components/Contact'
export default {
    components: {
        Contact
    },
    methods: {    
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>
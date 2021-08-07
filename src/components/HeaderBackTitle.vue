<template>
    <v-row>
        <v-col cols="1" style=" margin-top: 3px;">   
            <v-btn icon style="display: inline;"
                @click="goBack"
            >
                <v-icon large :color="titleColor ? titleColor : 'white darken-2'">mdi-chevron-left</v-icon>
            </v-btn>
        </v-col>
        <v-col cols="8" style="margin-left: 20px;">   
            <span style="font-size: 1.6rem !important;" :class="titleColor ? titleColor+'--text' : 'white--text'">  
                {{ title }}
            </span>
        </v-col> 
        <v-col cols="2" v-if="btnPath" style="margin-left: -21px;">   
            <v-btn 
                :to="{ path: btnPath}" 
                class="primary--text"
            >
                <!-- <v-icon>mdi-plus</v-icon> -->
                {{ btnName ? btnName : 'Novo' }}
            </v-btn>                        
        </v-col>         
    </v-row>
</template>
<script>
export default {
    name: 'HeaderBackTitle',
    props: ['title', 'titleColor', 'btnPath', 'btnName'],
    methods: {    
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>
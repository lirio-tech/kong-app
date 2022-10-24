<template>
    <v-container >
        <div >
            <v-row>
                <v-col cols="2" style="margin-top: 5px;">   
                    <v-btn icon small style="display: inline;"
                        @click="goBack"
                    > 
                        <v-icon color="white-grey darken-2">mdi-chevron-left</v-icon>
                    </v-btn>
                </v-col> 
                <v-col cols="8" align="center" >  
                        <span style="font-size: 1.6rem !important;" class="white--text">{{ appType === 'app' ? 'Kongapp' : 'Lady App' }}</span>
                </v-col>       
            </v-row>   
            <br/>

            <v-container >
                <v-row align="center">

                    <v-col
                        xl="6" lg="6" md="6" sm="6" xs="12" cols="12"
                        align="center"
                    >
                        <h4 class="grey--text">Compartilhe o App</h4>
                        <p class="grey--text">
                            Versão: {{ version() }} 
                        </p>                           
                        <br/>
                        <vue-qrcode 
                            :value="urlShare" 
                            
                            :width="120"
                        />
                        <v-btn
                            style="margin-top:-100px;margin-left:30px;"
                            fab
                            x-large        
                            @click="share"            
                        >
                            <v-icon
                                icon-size="30px"
                            >
                                mdi-share
                            </v-icon>
                        </v-btn>
                    </v-col>
                    <v-col
                        xl="6" lg="6" md="6" sm="6" xs="12" cols="12"
                        align="center"
                    >
                            <h4 class="grey--text">Android ou IPhone ?</h4>
                            <p class="grey--text">
                                clique no icone  e siga os passos para instalar o App
                            </p>     
                            <br/>

                            <v-btn
                                x-large    
                                text    
                                to="/public/iphone"
                            >
                                <v-img 
                                    
                                    src="../assets/apple.png"
                                    height="115"
                                    width="105"              
                                            
                                ></v-img>
                            </v-btn>
                            <v-btn
                                x-large    
                                text    
                                to="/public/android"
                            >
                                <v-img 
                                    src="../assets/android.webp"
                                    height="100"
                                    width="90"
                                    
                                ></v-img> 
                            </v-btn>
                    </v-col>       
                </v-row>
                <br/><br/><br/>
                <v-row align="center" v-if="!userLogged">
                    <v-col
                        xl="12" lg="12" md="12" sm="12" xs="12" cols="12"
                        align="center"
                    >
                           
                            <v-btn
                                large        
                                to="/login"
                            >
                               Login
                            </v-btn>
                            &nbsp;
                            <v-btn
                                large        
                                to="/sign-up"
                                color="primary"
                            >
                               Cadastre-se
                            </v-btn>
                    </v-col>                                       
                </v-row>
            </v-container>
              

        </div>           
    </v-container>
</template>
<script>
import VueQrcode from 'vue-qrcode';
// import GetItOnGooglePlay from '../components/GetItOnGooglePlay.vue';
import device from '../utils/device'
import appConfig from '../utils/appConfig'
import storage from '../storage';
export default {
    data: () => ({
        userLogged: null
    }),
    components: {
        VueQrcode,
        // GetItOnGooglePlay,
    },
    methods: {
        sendMessageWhatsapp() {
            window.open(
                `https://api.whatsapp.com/send?phone=5511961409798&text=Olá, Gostaria de tirar algumas duvidas sobre o ${this.appType === 'app' ? 'Kongapp' : 'Lady App' } !`
            );
        },        
        goBack() {
            this.$router.go(-1)
        },
        isMobile() {
            return device.isMobile();
        },
        isAndroid() {
            return device.isAndroid();
        },        
        isIphone() {
            return device.isIphone();
        },
        agent() {
            return device.agent();
        },
        share() {
            const shareData = {
                title: 'Kongapp', //this.appType === 'app' ? 'Kongapp' : 'Lady App',
                text: `💈Gerencie seu Salão/Studio/Barbearia ✂️ 💰 com o App mais simples e fácil, tudo em seu celular 📱`,
                url: this.urlShare,
            }            
            return navigator.share(shareData)
        },
        version() {
            return appConfig.version();
        }                         
    },
    computed: {
       appType() {
           return this.$vuetify.theme.dark ? 'app' : 'ladyapp';
       }, 
       urlApp() {
           //return this.appType === 'app' ? 'https://app.kongbarber.com' : 'https://ladyapp.com.br';
           return 'https://app.kongapp.com.br';
       },
       urlShare() {
           return `${this.urlApp}/#/public/identify-device`;
       }
    },
    beforeMount() {
        this.userLogged = storage.getUserLogged();
    }
}
</script>
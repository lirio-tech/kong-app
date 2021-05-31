<template>
    <v-container >
        <div >
            <v-row>
                <v-col cols="2" style="margin-top: 10px;">   
                    <v-btn icon small style="display: inline;"
                        @click="goBack"
                    > 
                        <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col> 
                <v-col cols="8" align="center" >  
                        <span style="font-size: 2.0rem !important;">{{ appType === 'app' ? 'Kong Barber App' : 'Lady App' }}</span>
                        <br/><small class="grey--text">Versão: 0.9.4 </small>
                </v-col>       
            </v-row>   

            <br/><br/>

            <v-row 
                class="d-flex justify-center"
                flex 
            >
                <h3 class="grey--text">Compartilhe o App</h3>
            </v-row>   
            
            <br/><br/>

            <v-row>
                
                <v-container >
                    <v-row align="center">
                        <v-col
                            cols="6"
                            sm="6"
                            md="6"
                            align="center"
                        >
                            <vue-qrcode 
                                :value="urlApp" 
                                style="margin-left:50px;"
                            />
                        </v-col>
                        <v-col
                            cols="6"
                            sm="6"
                            md="6"
                            align="center"
                        >
                            <v-btn
                                elevation="2"
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
                    </v-row>
                </v-container>
            </v-row>

            <br/><br/><br/>            

            <div>
                <v-row 
                    class="d-flex justify-center"
                    flex 
                >
                    <h2 class="grey--text">Android ou IPhone ? </h2>
                </v-row>      
                <v-row 
                    class="d-flex justify-center"
                    flex 
                >
                    <span class="grey--text">
                        clique no icone 
                    </span>
                </v-row>   
                <v-row 
                    class="d-flex justify-center"
                    flex 
                >
                    <span class="grey--text">
                        e siga os passos para instalar o App
                    </span>
                </v-row>   

                <br/><br/>
                <v-row 
                    class="d-flex justify-center"
                    flex 
                >
                    <v-col cols="6" align="center">
                        <router-link to="/public/android">
                            <v-img 
                                src="../assets/android.webp"
                                height="125"
                                width="125"
                                style="margin-left:50px;"
                            ></v-img>
                        </router-link>
                    </v-col>
                    <v-col cols="6">
                        <router-link to="/public/iphone">
                            <v-img 
                                src="../assets/apple.png"
                                height="155"
                                width="145"              
                                style="margin-top:-15px;"              
                            ></v-img>
                        </router-link>
                    </v-col>                
                </v-row>   
            </div>
        </div>           
    </v-container>
</template>
<script>
import VueQrcode from 'vue-qrcode'
import device from '../utils/device'
export default {
    components: {
        VueQrcode
    },
    methods: {
        sendMessageWhatsapp() {
            window.open(
                `https://api.whatsapp.com/send?phone=5511943197487&text=Olá, Gostaria de tirar algumas duvidas sobre o ${this.appType === 'app' ? 'Kong Barber' : 'Lady' } App!`
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
                title: this.appType === 'app' ? 'Kong Barber App' : 'Lady App',
                text: `💈Gerencie ${this.appType === 'app' ? 'sua Barbearia' : 'seu Salão/Studio' } ✂️ 💰 com o App mais simples e fácil, tudo em seu celular 📱`,
                url: this.urlShare,
            }            
            return navigator.share(shareData)
        }                         
    },
    computed: {
       appType() {
           return this.$vuetify.theme.dark ? 'app' : 'ladyapp';
       }, 
       urlApp() {
           return `https://${this.appType}.kongbarber.com`;
       },
       urlShare() {
           return `${this.urlApp}/#/public/identify-device`;
       }
    }
}
</script>
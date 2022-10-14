<template>
  <v-container fluid>
    <AppBar v-if="!isMobile()"/>
    <v-main>
        <v-row >
            <v-col cols="2" style="margin-top: 16px;" >   
                <v-btn icon small style="display: inline;"
                    @click="$router.go(-1)"
                > 
                    <v-icon large color="white-grey darken-2">mdi-chevron-left</v-icon>
                </v-btn>
            </v-col>                
            <v-col align="center" cols="8" class="pt-6" style="padding: 0">
                <p class="mr-2 text-center green--text" 
                   style="font-family: 'Frijole', cursive; font-size: 1.8rem;">
                    Android
                </p>             
            </v-col>
            <v-col align="center" cols="12" class="pt-6" style="padding: 0">
                <v-img 
                    src="../assets/android.webp"
                    height="120"
                    width="120"
                ></v-img>   
            </v-col>            
        </v-row>
        <!-- <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    1. Primeiro passo é Abrir o <a href="https://app.wiskritorio.com.br" class="cyan--text" target="blank">app.wiskritorio.com.br</a> 
                    no Google Chrome
                </p>  
                <v-img 
                    src="../assets/chrome.png"
                    height="80"
                    width="80"
                ></v-img>
            </v-col>        
        </v-row>    
        <br/><br/><br/> -->
        <v-row >
            <v-col align="center" xl="12" lg="12" md="12" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    1. No Menu <v-icon>mdi-dots-vertical</v-icon>
                     clique em <b>Instalar aplicativo</b>
                </p>  
                <v-img 
                    src="../assets/android/WhatsApp-1.jpeg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>    
        <br/><br/><br/>
        <v-row >
            <v-col align="center" cols="12">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    2. <b>Instalar aplicativo</b>
                </p>  
                <v-img 
                    src="../assets/android/WhatsApp-2.jpeg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>    
        <br/><br/><br/>
        <v-row >
            <v-col align="center" cols="12">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    3. Agora clique no Link Instalar
                </p>  
                <v-img 
                    src="../assets/android/WhatsApp-3.jpeg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>    
        <br/><br/><br/>
        <v-row >
            <v-col align="center" cols="12">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    Pronto!!! <br/><span class="primary--text">Kongapp</span> Instalado com Sucesso sem ocupar espaço no seu Celular
                </p>  
                <v-img 
                    src="../assets/android/WhatsApp-4.jpeg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>    
        <br/><br/><br/>
        <v-row >
            <v-container >
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    Ainda com Duvidas ?
                </p>                  
                <Contact />
            </v-container>
        </v-row>           
        <br/><br/><br/><br/>
    </v-main>
  </v-container>
</template>

<script>
import Contact from '../components/Contact'
import AppBar from '@/bounded-context/shared/components/appbar/AppBar' 
import device from '../utils/device'
export default {
    components: {
        AppBar,
        Contact
    },
    methods: {
        isMobile() {
            return device.isMobile();
        }
    }
}
</script>
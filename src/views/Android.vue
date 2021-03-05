<template>
  <v-container fluid>
    <AppBar />
    <v-main>
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
                <p class="mr-2 text-center green--text" 
                   style="font-family: 'Frijole', cursive; font-size: 1.8rem;">
                    Android
                </p>  
                <v-img 
                    src="../assets/android.webp"
                    height="75"
                    width="75"
                ></v-img>                
            </v-col>
        </v-row>
        <br/><br/><br/>
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    1. Primeiro passo é Abrir o <a href="app.wiskritorio.com.br" class="cyan--text" target="blank">app.wiskritorio.com.br</a> 
                    no Google Chrome
                </p>  
                <v-img 
                    src="../assets/chrome.png"
                    height="80"
                    width="80"
                ></v-img>
            </v-col>        
        </v-row>    
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    2. No menu clique em Install e adicione na Tela Principal
                </p>  
                <!-- <v-img 
                    src="../assets/chrome.png"
                    height="80"
                    width="80"
                ></v-img> -->
            </v-col>        
        </v-row>         
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    3. 
                </p>  
                <!-- <v-img 
                    src="../assets/chrome.png"
                    height="80"
                    width="80"
                ></v-img> -->
            </v-col>        
        </v-row>         
        <v-row >
            <v-container >
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    Duvidas ???
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
import AppBar from '../components/AppBar'
export default {
    components: {
        AppBar,
        Contact
    }
}
</script>
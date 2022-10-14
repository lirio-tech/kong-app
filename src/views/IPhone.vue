<template>
  <v-container fluid>
    <AppBar />
    <v-main>
        <v-row >
            <v-col cols="2" style="margin-top: 10px;">   
                <v-btn icon small style="display: inline;"
                    @click="$router.go(-1)"
                > 
                    <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                </v-btn>
            </v-col>             
            <v-col align="center" cols="8" class="pt-6" style="padding: 0">
                <p class="mr-2 text-center grey--text" 
                   style="font-family: 'Frijole', cursive; font-size: 1.4rem;">
                    Iphone
                </p>               
            </v-col>
            <v-col align="center" cols="12" class="pt-6" style="padding: 0">
                <v-img 
                    src="../assets/apple.png"
                    height="120"
                    width="120"
                ></v-img>   
            </v-col>
        </v-row>
        <!-- <br/><br/>
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">1. Primeiro passo é Abrir o <a href="https://app.wiskritorio.com.br" class="cyan--text" target="blank">app.wiskritorio.com.br</a> 
                    no</span> Safari
                </p>  
                <v-img 
                    src="../assets/safari.png"
                    height="80"
                    width="80"
                ></v-img>
            </v-col>        
        </v-row>     -->
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">1. No Safari Clique no Icone de Compartilhar</span> <v-icon>mdi-shared</v-icon>
                </p>  
                <v-img 
                    src="../assets/iphone-install-1.jpg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>         
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">2. Agora vá até a opção</span> Adicione na Tela de Início
                </p>  
                <v-img 
                    src="../assets/iphone-install-2.jpg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>           
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">3. E por último clique em <span class="blue--text">Adicionar</span>, no Canto Superior Direito</span>
                </p>  
                <v-img 
                    src="../assets/iphone-install-3.jpg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>       
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    Pronto!!! <br/><span class="primary--text">Kongapp</span> Instalado com Sucesso sem ocupar espaço no seu Celular
                </p>  
                <v-img 
                    src="../assets/iphone-installed.gif"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>       
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
export default {
    components: {
        AppBar,
        Contact
    }
}
</script>
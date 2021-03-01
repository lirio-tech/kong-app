<template>
    <v-container >
        <div >
            <v-row>
                <v-col cols="2" style="margin-top: 10px;">   
                    <v-btn icon small style="display: inline;"
                        :to="{ 'path': '/'}"
                    > 
                        <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                    </v-btn>
                </v-col> 
                <v-col cols="8" align="center" >  
                        <span style="font-size: 1.6rem !important;">Fale Conosco</span>
                </v-col>       
            </v-row>    
            <br/><br/><br/>
            <v-row 
                class="d-flex justify-center"
                flex
            >
                <v-img 
                    @click="sendMessageWhatsapp"
                    max-height="150"
                    max-width="150"
                    src="../assets/whatsapp.png"
                ></v-img>
            </v-row>
            <br/><br/><br/>
            <v-row 
                class="d-flex justify-center"
                flex
            >
                <a href="tel:11961409798"
                   style="color: inherit; text-decoration: none"
                >
                    <span class="display-1">(11) 96140-9798 </span>
                </a>            
                
            </v-row>
        </div>           
    </v-container>
</template>
<script>
export default {
    methods: {
    sendMessageWhatsapp() {
      window.open(
        "https://api.whatsapp.com/send?phone=11961409798&text=Olá, Gostaria de tirar algumas duvidas sobre o Wiskritorio App!"
      );
    },        
    }
}
</script>
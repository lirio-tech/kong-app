<template>
    <div >
        <v-row 
            class="d-flex justify-center"
            flex 
        >
            <span class="grey--text">clique no icone </span>
        </v-row>   
        <br/>   <br/>      
        <v-row 
            class="d-flex justify-center"
            flex
        >
            <a style="color: inherit; text-decoration: none"
            href="https://api.whatsapp.com/send?phone=5511971656615&text=Olá, Gostaria de tirar algumas duvidas sobre o App!">
                <v-img 
                    max-height="90"
                    max-width="90"
                    src="../assets/whatsapp.png"
                ></v-img>
            </a>
        </v-row>
        <br/><br/><br/>
        <v-row 
            class="d-flex justify-center"
            flex
        >
            <a href="tel:11971656615"
                style="color: inherit; text-decoration: none"
            >
                <span class="display-1">(11) 97165-6615 </span>
            </a>            
            
        </v-row>
    </div>           
</template>
<script>
export default {
    methods: {
        sendMessageWhatsapp() {
            window.open(
                "https://api.whatsapp.com/send?phone=5511971656615&text=Olá, Gostaria de tirar algumas duvidas sobre o Kongapp!"
            );
        },        
        goBack() {
            this.$router.go(-1)
        }
    }
}
</script>
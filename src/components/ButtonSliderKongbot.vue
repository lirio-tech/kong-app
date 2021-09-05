<template>

  <div> 
    <v-slide-item
      v-slot="{ active, toggle }"
    >
      <v-btn
        style="margin-top: 7px;"
        class="mx-2"
        :input-value="active"
        active-class="purple white--text"
        depressed
        @click="toggle; showWarning()"
      >
          <span class="icon-emoji">🐵 </span>
          <span class="grey--text" style="margin-left: 5px; ">Chatbot</span>          
      </v-btn>
    </v-slide-item>             

    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            class="teal lighten-2 white--text"
          >
            <v-btn
              icon
              small
              @click="dialog = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                Chatbot
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          
          <v-col cols="12">
              <center>
                  <h1>Em breve seus clientes poderá realizar agendamento pelo Chatbot quando você não responder na hora. </h1>
                  <br/><br/>
                  <h2 class="warning--text">Aguarde. </h2>
              </center>
          </v-col>


          
          <div style="flex: 1 1 auto;"></div>
        </v-card>
        
    </v-dialog>      

  </div>   
                          
</template>

<script>
export default {
    name: 'ButtonSliderPix',
    props: [ 'company' ],
    data: () => ({
      dialog: false
    }),
    methods: {
        showWarning() {
          this.dialog = true;
        }
    },
    beforeMount() {
    }
  }
</script>

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
        @click="toggle; showPix()"
      >
          <v-icon color="teal lighten-2">mdi-rhombus-split</v-icon>
          <span class="grey--text" style="margin-left: 5px; ">Pix</span>          
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
                Pix
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          
          <v-col cols="12">
              <h5>Apresente para a Pessoa que irá Pagar</h5>
              {{ company.pixCopyPast }}

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
        showPix() {
            console.log(this.company.pixCopyPast);
            if(this.company.pixCopyPast) {
              this.dialog = true;
            } else {
              alert('Você não cadastrou o Pix Copie e Cole. Vá em Menu > Configurações > Tipos de Pagamento');
            }
        }
    },
    beforeMount() {
    }
  }
</script>

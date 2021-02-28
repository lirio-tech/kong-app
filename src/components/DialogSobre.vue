<template>
  <div class="text-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <v-card>
        <v-card-title class="headline lighten-2">
          Barber App - Versao: 0.3.1
        </v-card-title>

        <v-card-text>   
          <v-container >
            <v-row align="center">
              <v-col
                cols="6"
                sm="6"
                md="6"
              >
                <vue-qrcode value="https://app.wiskritorio.com.br" />
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
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            text
            @click="$emit('show-dialog', false)"
          >
            Fechar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script>
    import VueQrcode from 'vue-qrcode'
    export default {
        props: ['dialog'],
        components: { VueQrcode },
        data () {
            return {
            }
        },
        methods: {
            share() {
                // navigator
                //     .share({
                //         title: document.title,
                //         text: 'Hello World',
                //         url: window.location.href
                //     })
                //     .then(() => console.log('Successful share! 🎉'))
                //     .catch(err => console.error(err));    
                alert('Compartilhar');
            }
        }
    }
</script>
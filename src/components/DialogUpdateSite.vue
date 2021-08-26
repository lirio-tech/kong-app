<template>
    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card v-if="userLogged">
          <v-toolbar
            class="primary white--text"
          >
            <v-btn
              icon
              small
              @click="$emit('show-dialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                Alterar Site
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <v-form 
                  v-on:submit.prevent="updateInfos"
                  ref="updateInfosForm"
                  id="updateInfosForm"
                >              

                    <h4>Site</h4>

                    <v-text-field
                        :value="urlSite()"
                        readonly
                        :append-icon="'mdi-content-copy'"
                        v-clipboard:copy="urlSite()"
                        v-clipboard:success="onCopy"
                        v-clipboard:error="onError"                        
                    ></v-text-field>

                    <h4>Arroba</h4>
                    <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">      
                          <arroba-input 
                              :value="companySite.arroba"
                              @set-arroba="setArroba"                          
                          ></arroba-input>
                    </v-col>              

                    <h4>Título do Site</h4>
                    <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                        <v-text-field
                            v-model="companySite.title"
                            filled
                            prepend-icon="mdi-home"                 
                        ></v-text-field>           
                    </v-col>                      

                    <h4>Rede Social</h4>
                
                      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">     
                            <instagram-input 
                              :value="companySite.instagram"
                              @set-instagram="setInstagram"
                            ></instagram-input>
                      </v-col>       
                      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">    
                            <facebook-input
                              :value="companySite.facebook"
                              @set-facebook="setFacebook"
                            ></facebook-input>                        
                      </v-col>       
                      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">     
                            <whatsapp-input
                                :value="companySite.whatsapp"
                                @set-whatsapp="setWhatsapp"                          
                            ></whatsapp-input>
                      </v-col>               
                      <v-col 
                          cols="12"
                          sm="6"
                          align="center"
                          justify="space-around"
                      >
                        <v-btn 
                            style="width: 90%"
                            color="success"
                            x-large
                            type="submit"
                        >
                          Salvar
                        </v-btn>                                                                               
                      </v-col>           
                </v-form>                                          
            </v-container>
          </v-card-text>          
          <div style="flex: 1 1 auto;"></div>
        </v-card>
        <snack-bar :color="message.color" :text="message.text" :show="message.show" />
    </v-dialog>    
</template>

<script>
import UserTypes from '../utils/UserTypes'
import storage from '../storage'
import InstagramInput from './inputs/InstagramInput.vue'
import FacebookInput from './inputs/FacebookInput.vue'
import ArrobaInput from './inputs/ArrobaInput.vue'
import WhatsappInput from './inputs/WhatsappInput.vue'
import commons from '../utils/commons'
import SnackBar from './SnackBar.vue'
export default {
    components: { 
      InstagramInput, 
      FacebookInput,
      WhatsappInput,
      ArrobaInput,
      SnackBar,
    },
    props: {
      dialog: {
        type: Boolean,
        require: true,
      },
      companySite: {
        type: Object,
        require: true,
      },
      company: {
        type: Object,
        require: true,
      }      
    },
    data () {
      return {
        userLogged: {},
        message: { show: false, color: 'primary', text: '' },  
      }
    }, 
    methods: {
      
      setInstagram(value) { this.companySite.instagram = value; },
      setFacebook(value)  { this.companySite.facebook = value; },      
      setWhatsapp(value)  { this.companySite.whatsapp = value; },    
      setArroba(value)    { this.companySite.arroba = value; },    

      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      },
      updateInfos() {
          if(this.$refs.updateInfosForm.validate()) {
              alert(JSON.stringify(this.companySite))
          }
      },
      urlSite() {
        return commons.urlCompany(this.companySite, this.company.companyType);
      },
      onCopy() {
        this.showMessage('Site Copiado :)'); 
      },
      onError(){
        alert('Erro ao Copiar Codigo Copie e Cole')
      },
      showMessage(text) {
        this.message.show = true;
        this.message.color = 'info';
        this.message.text = text;
        setTimeout(() => this.message.show = false, 4000);
      },      
    },
    computed: {
    
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.companySite.instagram = 'diegolirio'
    }
}
</script>
<style scoped>
</style>
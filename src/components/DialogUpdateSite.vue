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
          

                    <v-tabs
                      v-model="tab"
                      centered
                      icons-and-text
                      fixed-tabs
                    >
                      <v-tabs-slider></v-tabs-slider>

                      <v-tab href="#tab-infos">
                        Informações
                        <v-icon>mdi-at</v-icon>
                      </v-tab>

                      <v-tab href="#tab-photos">
                        Fotos do Site
                        <v-icon>mdi-image</v-icon>
                      </v-tab>

                    </v-tabs>

                    <v-tabs-items v-model="tab">
                      <v-tab-item
                        value="tab-infos"
                      >
                          <v-container >
                              <v-form 
                                v-on:submit.prevent="updateInfos"
                                ref="updateInfosForm"
                                id="updateInfosForm"
                              >         
                    
                                  <h4>🏠 Site</h4>

                                  <v-text-field
                                      :value="urlSite()"
                                      readonly
                                      :append-icon="'mdi-content-copy'"
                                      v-clipboard:copy="urlSite()"
                                      v-clipboard:success="onCopy"
                                      v-clipboard:error="onError"                        
                                  ></v-text-field>

                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">      
                                        <arroba-input 
                                            :value="companySite.arroba"
                                            @set-arroba="setArroba"        
                                            :disabled="companySite.subdomainSync"                  
                                        ></arroba-input>
                                  </v-col>              

                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="Título do Site"
                                          v-model="companySite.title"
                                          filled
                                          prepend-icon="mdi-home"                 
                                      ></v-text-field>
                                  </v-col>              

                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">      
                                      <v-textarea
                                        v-model="companySite.description"
                                        prepend-icon="mdi-home"    
                                        filled
                                        rows="3"
                                      >
                                        <template v-slot:label>
                                          <div>
                                            Descrição do Site
                                          </div>
                                        </template>
                                      </v-textarea>


                                  </v-col>                                  

                                  <h4>📱 Redes Sociais</h4>
                              
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

                                    <h4>📍 Endereço</h4>    

                                    <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="CEP"
                                          v-model="companySite.address.postalCode"
                                          filled
                                          v-mask="'#####-###'"
                                          @keyup="getAddress"
                                          prepend-icon="mdi-google-maps"      
                                          ref="postalCode"           
                                      ></v-text-field>           
                                  </v-col>                 
                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="Rua"
                                          v-model="companySite.address.street"
                                          filled
                                          prepend-icon="mdi-google-maps"       
                                          ref="street"                     
                                      ></v-text-field>           
                                  </v-col>   
                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="Número"
                                          v-model="companySite.address.number"
                                          filled
                                          prepend-icon="mdi-google-maps"   
                                          ref="number"              
                                      ></v-text-field>           
                                  </v-col>   
                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="Bairro"
                                          v-model="companySite.address.district"
                                          filled
                                          prepend-icon="mdi-google-maps"       
                                          ref="district"                               
                                      ></v-text-field>           
                                  </v-col>   
                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="Cidade"
                                          v-model="companySite.address.city"
                                          filled
                                          prepend-icon="mdi-google-maps"                 
                                      ></v-text-field>           
                                  </v-col>   
                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                      <v-text-field
                                          label="Estado"
                                          v-model="companySite.address.state"
                                          filled
                                          prepend-icon="mdi-google-maps"    
                                          max="2"             
                                          ref="state"                               
                                      ></v-text-field>           
                                  </v-col>                 
                                  <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">   
                                    <v-text-field
                                        label="Complemento"
                                        v-model="companySite.address.complement"
                                        filled
                                        prepend-icon="mdi-google-maps"            
                                        ref="complement" 
                                    ></v-text-field>           
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
                                          :loading="loadingInfo"
                                      >
                                        Salvar
                                      </v-btn>                                                                               
                                    </v-col>     

                                    <br/><br/><br/>  


                              </v-form>                                          
                          </v-container>
                      </v-tab-item>
                      <v-tab-item
                        value="tab-photos"
                      >
                          <v-container >
                              <v-form 
                                v-on:submit.prevent="updatePhotos"
                                ref="updatePhotosForm"
                                id="updatePhotosForm"
                              >                               
                                <h4>Photos</h4>
                              </v-form>
                          </v-container>
                      </v-tab-item>
                    </v-tabs-items>      
                   

          
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
import companyGateway from '../api/companyGateway'
import addressGateway from '../api/addressGateway'
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
        loadingInfo: false,
        userLogged: {},
        message: { show: false, color: 'primary', text: '' },  
        tab: null,
        text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',        
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
                this.loadingInfo = true;
                companyGateway.updateCompanySite(this.company._id, this.companySite._id, this.companySite,
                    () => {
                        this.showMessage('Atualizado com Sucesso!!!'); 
                        this.loadingInfo = false;
                        this.$router.push(`/@/${this.companySite.arroba}`);
                    }, (err) => {
                        this.loadingInfo = false;
                        if(err.response.status === 500) {
                            alert('Erro ao se Atualizar Infos do Site :( Tente novamente mais tarde ');
                        } else {
                            alert(err.response.data.message);
                        }
                    });
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
      getAddress() {
        if(this.companySite.address.postalCode.length === 9) {
            addressGateway.getAddreesByCep(this.companySite.address.postalCode.replace(/[^0-9]/g, ""), 
              res => {
                console.log(res);
                  this.companySite.address.postalCode = res.postalCode;
                  this.companySite.address.street = res.street;
                  this.companySite.address.district = res.district;
                  this.companySite.address.city = res.city;
                  this.companySite.address.state = res.state;
                  this.setFocusAddress();
              }, () => {

              }) 
        }
      },
      setFocusAddress() {
          if(!this.companySite.address.postalCode) this.$refs.postalCode.focus();
          else if(!this.companySite.address.number) this.$refs.number.focus();
          else if(!this.companySite.address.district) this.$refs.district.focus();
          else if(!this.companySite.address.city) this.$refs.city.focus();
          else if(!this.companySite.address.state) this.$refs.state.focus();
          else this.$refs.complement.focus();
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
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

                      <v-tab href="#tab-photos">
                        Fotos do Site
                        <v-icon>mdi-image</v-icon>
                      </v-tab>

                      <v-tab href="#tab-infos">
                        Informações
                        <v-icon>mdi-at</v-icon>
                      </v-tab>

                    </v-tabs>

                    <v-tabs-items v-model="tab">
                      <v-tab-item
                        value="tab-photos"
                      >
                          <v-container >
                              <v-form 
                                v-on:submit.prevent="updatePhotos"
                                ref="updatePhotosForm"
                                id="updatePhotosForm"
                              >       
                                <br/>          
                                <h4>Foto de Capa</h4>
                                <br/>
                                <v-row>
                                  <v-col xl="12" lg="12" md="12" sm="12" xs="12" cols="12">   
                                    <v-card flat class="rounded-0">
                                        <v-img
                                          :src="companySite.photoCover"
                                          height="175"
                                          class="grey darken-4"
                                        >
                                              <v-card-title class="align-end fill-height" style="float: right;">
                                                  <v-btn fab style="z-index: 9999" small @click="clickUploadPhotoCover" :loading="isSelecting">
                                                    <v-icon>mdi-camera</v-icon>
                                                  </v-btn>
                                                  <input
                                                    ref="uploader"
                                                    class="d-none"
                                                    type="file"
                                                    accept="image/jpeg, image/jpg"
                                                    @change="onFileChanged"
                                                  >                                                      
                                              </v-card-title>
                                        </v-img>
                                    </v-card>
                                  </v-col> 
                                </v-row>

                                <br/>          
                                <h4>Fotos de Galeria</h4>
                                <br/>

                                <v-row>
                                  <v-col
                                    v-for="photo in companySite.photos"
                                    :key="photo._id"
                                    class="d-flex child-flex"
                                    xl="3" lg="3" md="3" sm="6" xs="6" cols="6"

                                  >
                                    <v-img
                                      :src="`${photo.photo}`"
                                      :lazy-src="`${photo.photo}`"
                                      aspect-ratio="1"
                                      class="grey lighten-2"
                                    >

                                              <v-card-title class="align-end fill-height" style="float: right;">
                                                  <v-btn 
                                                    fab small style="z-index: 9999" 
                                                    @click="clickUploadPhotoGalleryItem(photo)"
                                                    :loading="companySite && companySite.photos && photoItemGallerySeletedIndex === companySite.photos.indexOf(photo)"
                                                  >
                                                    <v-icon>mdi-camera</v-icon>
                                                  </v-btn>                                                     
                                              </v-card-title>

                                    </v-img>                                 
                                  </v-col>
                                  <input
                                    ref="uploaderGalleryItem"
                                    class="d-none"
                                    type="file"
                                    accept="image/jpeg, image/jpg"
                                    @change="onFileItemChanged"
                                  >                                        
                                </v-row>      


                              </v-form>
                          </v-container>
                      </v-tab-item>                      
                      <v-tab-item
                        value="tab-infos"
                      >
                          <v-container >
                              <v-form 
                                v-on:submit.prevent="updateInfos"
                                ref="updateInfosForm"
                                id="updateInfosForm"
                              >         
                                
                                  <br/>
                                  <h4>🏠 &nbsp;Site</h4>

                                  <v-text-field
                                      :value="urlSite()"
                                      readonly
                                      filled
                                      :append-icon="'mdi-content-copy'"
                                      v-clipboard:copy="urlSite()"
                                      v-clipboard:success="onCopy"
                                      v-clipboard:error="onError"                        
                                  ></v-text-field>

                                  <v-text-field
                                      :value="urlAssistantSchedule()"
                                      readonly
                                      filled
                                      prepend-icon="mdi-clock"    
                                      label="Assistente de Agendamento"
                                      :append-icon="'mdi-content-copy'"
                                      v-clipboard:copy="urlAssistantSchedule()"
                                      v-clipboard:success="onCopyUrlAssistantSchedule"
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
                                          <v-text-field 
                                              v-model="companySite.whatsapp"
                                              label="WhatsApp"
                                              ref="whats"
                                              v-mask="'(##) #####-####'"
                                              filled
                                              prepend-icon="mdi-whatsapp"
                                          />                                    

                                    </v-col>           

                                    <h4>🕑 Horário de Funcionamento</h4>  

                                    <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">     
                                          <v-text-field
                                              v-model="companySite.timeStartAt"
                                              type="time"
                                              filled
                                              :rules="[v => !!v || 'Horário Obrigatório',]"
                                              prepend-icon="mdi-clock"
                                          ></v-text-field>            
                                    </v-col>                  
                                    <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12">     
                                          <v-text-field
                                              v-model="companySite.timeEndAt"
                                              type="time"
                                              filled
                                              :rules="[v => !!v || 'Horário Obrigatório',]"
                                              prepend-icon="mdi-clock"
                                          ></v-text-field>            
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
                    </v-tabs-items>      
                   

          
          <div style="flex: 1 1 auto;"></div>
        </v-card>
        <snack-bar :color="message.color" :text="message.text" :show="message.show" :timeout="message.timeout" />
    </v-dialog>    
</template>

<script>
import UserTypes from '../utils/UserTypes'
import storage from '../storage'
import InstagramInput from './inputs/InstagramInput.vue'
import FacebookInput from './inputs/FacebookInput.vue'
import ArrobaInput from './inputs/ArrobaInput.vue'
import commons from '../utils/commons'
import SnackBar from './SnackBar.vue'
import companyGateway from '../api/companyGateway'
import addressGateway from '../api/addressGateway'
const CLEAN_INDEX = -9999
export default {
    components: { 
      InstagramInput, 
      FacebookInput,
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
        message: { show: false, color: 'primary', text: '', timeout: 5000 },  
        tab: null,
        isSelecting: false,
        photoCover: '',
        photoGallery: '',
        photoGalleryItem: {},
        photoItemGallerySeletedIndex: CLEAN_INDEX,
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
                    (res) => {
                        console.log('res', res)
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
      clickUploadPhotoCover() {
          this.isSelecting = true
          window.addEventListener('focus', () => {
            this.isSelecting = false
          }, { once: true })
          this.$refs.uploader.click()          
      },
      onFileChanged(event) {
          event.preventDefault();
          let reader = new FileReader();
          let file = event.target.files[0];
          reader.onloadend = () => {
              //file = file;
              this.photoCover = reader.result.split(',')[1];
              let payload = { _siteId: this.companySite._id, photoCover: 'data:image/jpeg;base64,' + this.photoCover };
              this.isSelecting = true
              companyGateway.uploadPhotoCover(payload,
                res => {
                  this.isSelecting = false
                  this.$emit('set-company-site-photo-cover-url', res.urlImage)
                },
                () => {
                  this.isSelecting = false
                  alert('Algo deu errado ao alterar Foto da Capa :( Tente novamente.');
                }
              )
          };
          reader.readAsDataURL(file);
      },         
      clickUploadPhotoGalleryItem(photo) {
          this.photoGalleryItem = photo;
          this.photoItemGallerySeletedIndex = this.companySite.photos.indexOf(this.photoGalleryItem);
          window.addEventListener('focus', () => {
            this.photoItemGallerySeletedIndex = CLEAN_INDEX;
          }, { once: true })
          this.$refs.uploaderGalleryItem.click()             
      },      
      onFileItemChanged(event) {
          event.preventDefault();
          let reader = new FileReader();
          let file = event.target.files[0];
          reader.onloadend = () => {
              //file = file;
              this.photoGallery = reader.result.split(',')[1];
              let payload = { _siteId: this.companySite._id, photoGallery: 'data:image/jpeg;base64,' + this.photoGallery };
              this.photoItemGallerySeletedIndex = this.companySite.photos.indexOf(this.photoGalleryItem);
              companyGateway.uploadPhotoGallery(this.companySite._id, this.photoGalleryItem._id, payload, 
                (res) => {
                  this.photoItemGallerySeletedIndex = CLEAN_INDEX;
                  this.$emit('set-company-site-photos', res)
                },
                () => {
                  this.isSelecting = false
                  alert('Algo deu errado ao carregar Foto da Galeria :( Tente novamente');
                }
              )
          };
          reader.readAsDataURL(file);
      },            
      urlSite() {
        return commons.urlCompany(this.companySite, this.company.companyType);
      },
      urlAssistantSchedule() {
        return this.urlSite() + '?tab=AGENDA&realizarAgendamento=true';
      },
      onCopy() {
        this.message.timeout = 5000;
        this.showMessage('Copiado :)'); 
      },
      onCopyUrlAssistantSchedule() {
        this.message.timeout = 9000;
        this.showMessage('Copiado!!! \nEnvie para seus Clientes. \nUtilize o assistente como resposta automática no WhatsApp ;-) '); 
      },      
      onError(){
        alert('Erro ao Copiar')
      },
      showMessage(text) {
        this.message.show = true;
        this.message.color = 'info';
        this.message.text = text;
        setTimeout(() => this.message.show = false, this.message.timeout);
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
    }
}
</script>
<style scoped>
</style>
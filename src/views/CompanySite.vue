<template>
  <div>
      <v-card class="overflow-hidden">
        <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
          :src="companySite.photoCover"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(70,85,151,.5), rgba(18,28,52,.7)"
            ></v-img>
          </template>

          <v-app-bar-nav-icon></v-app-bar-nav-icon>

            <span style="align-self: flex-end; position: absolute;" >{{ companySite.title }} </span>
     
          <v-spacer></v-spacer>
     
          <v-btn icon @click="openWhats()" v-if="companySite.whatsapp">
            <v-icon>mdi-whatsapp</v-icon>
          </v-btn>

          <v-btn icon  @click="openInsta()" v-if="companySite.instagram">
            <v-icon>mdi-instagram</v-icon>
          </v-btn>

          <v-btn icon  @click="openFace()" v-if="companySite.facebook">
            <v-icon>mdi-facebook</v-icon>
          </v-btn>      

          <template v-slot:extension>
            <v-tabs align-with-title>

              <v-tab @click="tabView = 'AGENDA'">Agendamento</v-tab>
              <v-tab @click="tabView = 'HOME'">Fotos</v-tab>
              <v-tab @click="tabView = 'CONTATO'">Contato</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
        <v-sheet
          id="scrolling-techniques-3"
          class="overflow-y-auto"
          max-height="600"
        >
          <v-container style="height: 220px;">
                
          </v-container>
        </v-sheet>
        
      </v-card>
      <center v-if="userLogged">
          <br/> 
          <v-btn :color="btnUpdateSite" to="/"><v-icon>mdi-arrow-left</v-icon>App</v-btn> &nbsp;
          <v-btn :color="btnUpdateSite" @click="showDialog(true)"><v-icon>mdi-edit</v-icon>Alterar Site</v-btn> &nbsp;
          <v-btn :color="btnUpdateSite" @click="sharedMyCompany"><v-icon>mdi-share</v-icon></v-btn>
      </center>
      <v-container v-if="tabView === 'HOME'">
          <br/>
          <center class="white--text">
            {{ companySite.description }}
          </center>
          <br/>
          <v-row>
            <v-col
              v-for="photo in companySite.photos"
              :key="photo._id"
              class="d-flex child-flex"
              xl="4" lg="4" md="4" sm="6" xs="12" cols="12"

            >
              <v-img
                :src="`${photo.photo}`"
                :lazy-src="`${photo.photo}`"
                aspect-ratio="1"
                class="grey lighten-2"
              >
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-progress-circular
                      indeterminate
                      color="grey lighten-5"
                    ></v-progress-circular>
                  </v-row>
                </template>
              </v-img>
            </v-col>
          </v-row>          
      </v-container>
      <v-container v-if="tabView === 'AGENDA'">
        <v-row>
            <v-col xl="4" lg="4" md="4" sm="12" xs="12" cols="12">   
              <hour-working :openAt="companySite.openAt" />
            </v-col>
        </v-row>     
        <br/>
        <site-agendamentos :company="company"></site-agendamentos>
      </v-container>
      <v-container v-if="tabView === 'CONTATO'">

        <v-row>
            <v-col cols="6" style="margin-left: 0px;">   
                <span style="font-size: 1.6rem !important;" class="white--text">  
                    Contato
                </span>
            </v-col> 
            <v-col cols="3" >   
              <a
                v-if="companySite.address && companySite.address.lat"
                style="color: inherit; text-decoration: none" 
                :href="getUrlUber()"
                target="_blank"
              >
                  <v-img align="" src="@/assets/img/uber.png" height="33" width="33" />
              </a>
            </v-col>              
            <!-- <v-col cols="2" >   
              <a
                v-if="companySite.address && companySite.address.lat && userLogged && userLogged.type === 'sys_admin'"
                style="color: inherit; text-decoration: none" 
                :href="getUrl99()"
                target="_blank"
              >
                  <v-img align="" src="@/assets/img/99.png" height="32" width="32" />
              </a>
            </v-col>              -->
            <v-col cols="3" style=" margin-top: -3px;">   
              <a 
                v-if="companySite.address && companySite.address.lat"
                style="color: inherit; text-decoration: none;" 
                :href="getUrlWaze()"
                target="_blank"
              >
                  <v-img align="" src="@/assets/img/Waze.png" height="41" width="41" />
              </a>
            </v-col> 

        </v-row>                 
        <br/>
        <v-row>
            <v-col
              v-if="companySite.address && companySite.address.lat && companySite.address.lng"
              xl="6" lg="6" md="6" sm="6" xs="12" cols="12"
            >
                <GmapMap
                  :center='{ lat: companySite.address.lat, lng: companySite.address.lng, }'
                  :zoom='companySite.address.lat == -14.1738762 && companySite.address.lng == -49.5344501 ? 4 : 16'
                  style='width:100%;  height: 400px;'
                >
                    <gmap-info-window :options="{ pixelOffset: { width: 0, height: -50 } }" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
                      <h3 class="black--text">{{infoContent}}</h3>
                      <br/>
                      <p>
                        <a :href="getUrlGoogleMaps()"
                          target="blank"
                        >
                          Google Maps
                        </a>
                      </p>
                    </gmap-info-window>                
                    <gmap-marker 
                      v-for="(item, key) in coordinates" 
                      :key="key" 
                      :position="getPosition(item)" 
                      :clickable="true" 
                      @click="toggleInfo(item, key)" 
                      :icon="{ url: require('../assets/barber_marker.png')}" 
                    />
                </GmapMap>

            </v-col>
            <v-col
              xl="6" lg="6" md="6" sm="6" xs="12" cols="12"
            > 
                <div v-if="companySite.address && companySite.address.description">
                    <h4 class="white--text">📍 Endereço</h4>   <br/>
                    <p style="margin-left: 30px;"><small class="white--text">{{ companySite.address.description }}</small> </p>
                </div>
                <br/>
                <div v-if="companySite.instagram || companySite.facebook">
                    
                    <h4 class="white--text">
                      📱 Siga a gente nas Redes 
                    </h4>   

                    <p v-if="companySite.instagram" 
                      style="margin-left: 10px; margin-top: 15px;"
                    >
                        <v-btn text @click="openInsta()" v-if="companySite.instagram">
                          <v-icon color="white">mdi-instagram</v-icon> 
                          <span style="text-transform: lowercase; margin-left: 10px;" class="white--text">@{{companySite.instagram}}</span>
                        </v-btn>                        
                    </p>
                    
                    <p v-if="companySite.facebook" 
                      style="margin-left: 10px;"
                    >
                        <v-btn text @click="openFace()" v-if="companySite.facebook">
                          <v-icon color="white">mdi-facebook</v-icon> 
                          <span style="text-transform: lowercase; margin-left: 10px;" class="white--text">/{{companySite.facebook}}</span>
                        </v-btn>     
                    </p>
                    <br/>
                    <p v-if="companySite.whatsapp">
                        <v-btn icon @click="openWhats()" v-if="companySite.whatsapp">
                          <v-icon color="green">mdi-whatsapp</v-icon>
                        </v-btn>
                        <span class="green--text">{{ companySite.whatsapp }}</span>
                    </p>                    
                </div>
                <br/>

            </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" style="margin-left: 0px;">   
                <span style="font-size: 1.2rem !important;" class="white--text">  
                    Equipe
                </span>
            </v-col> 
            <v-col xl="6" lg="6" md="6" sm="12" xs="12" cols="12" v-for="u in team" :key="u.username">   
                <center>
                    <v-card>
                        <br/>
                        <v-img 
                          :src="u.avatar ? u.avatar : 'https://www.vippng.com/png/full/416-4161690_empty-profile-picture-blank-avatar-image-circle.png'" 
                          height="100" 
                          width="100" 
                          class="rounded-circle text-center" 
                        />
                        <span style="font-size: 1.0rem !important;">  
                            {{ u.name }}
                        </span>      
                        <br/> <br/>                      
                    </v-card>
                   
                </center>

            </v-col>             
        </v-row>
        <br/><br/><br/>
      </v-container>     
      <dialog-update-site 
        v-if="userLogged"
        :dialog="dialogUpdate"
        :companySite="companySite"
        :company="company"
        @show-dialog="showDialog"
        @set-company-site="setCompanySite"
        @set-company-site-photo-cover-url="setCompanySitePhotoCoverUrl"
        @set-company-site-photos="setCompanySitePhotos"
      ></dialog-update-site>       

    <dialog-plan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
    <snack-bar :color="message.color" :text="message.text" :show="message.show" :timeout="message.timeout" />
  </div>
</template>
<script>
import companyGateway from '../api/companyGateway'
import gateway from '../api/gateway'
import DialogPlan from '../components/DialogPlan.vue'
import DialogUpdateSite from '../components/DialogUpdateSite.vue'
import HourWorking from '../components/HourWorking.vue'
import SiteAgendamentos from '../components/SiteAgendamentos.vue'
import SnackBar from '../components/SnackBar.vue'
import storage from '../storage'
import commons from '../utils/commons'
import UserTypes from '../utils/UserTypes'
const IMAGES_RANDOM_URL = 'https://picsum.photos/1920/1080?random'
export default {
  components: { DialogUpdateSite, SiteAgendamentos, DialogPlan, SnackBar, HourWorking, },
  data: () => ({
    tabView: 'AGENDA',
    dialogUpdate: false,
    
    dialogPlan: false,
    userLogged: {},
    companySite: {
      title: '',
      description: '',
      whatsapp: '',
      facebook: '',
      instagram: '',
      photoCover: IMAGES_RANDOM_URL,
      address: {},
    },
    company: {},
    message: { show: false, color: 'primary', text: '', timeout: 5000 },  
    coordinates: { },
    infoPosition: null,
    infoContent: null,
    infoOpened: true,
    infoCurrentKey: null,
    btnUpdateSite: 'primary',
    agendamentos: [],
    team: []
  }),
  methods: {
    isAdmin() {
      return this.userLogged && UserTypes.isAdmin(this.userLogged.type);
    },    
    openWhats() {
        window.location.href = `https://api.whatsapp.com/send?phone=55${this.companySite.whatsapp}&text=Oi ${this.company.name} 💈, estou no seu site 🙂`
    },
    openInsta() {
        window.location.href = `https://instagram.com/${this.companySite.instagram}`
    },
    openFace() {
        window.location.href = `https://facebook.com/${this.companySite.facebook}`        
    }, 
    getUrlGoogleMaps() {
        return `https://www.google.com/maps/?q=${this.companySite.address.lat},${this.companySite.address.lng}`;
    },
    getUrlUber() {
        return `https://m.uber.com/ul/?action=setPickup&client_id=${process.env.VUE_APP_UBER_CLIENT_ID}&pickup=my_location&dropoff[formatted_address]=${this.companySite.address.description}&dropoff[latitude]=${this.companySite.address.lat}&dropoff[longitude]=${this.companySite.address.lng}`
    },
    getUrlWaze() {
        return `https://www.waze.com/ul?ll=${this.companySite.address.lat}%2C${this.companySite.address.lng}&navigate=yes&zoom=17`;
    },
    getUrl99() {
        return `uber://?action=setPickup&client_id=${process.env.VUE_APP_UBER_CLIENT_ID}&pickup=my_location&dropoff[formatted_address]=${this.companySite.address.description}&dropoff[latitude]=${this.companySite.address.lat}&dropoff[longitude]=${this.companySite.address.lng}`;
    },
    getCompanyArroba(arroba) {
        companyGateway.getCompanySiteByArroba(arroba,
            (res) => {
                if(res) {
                    this.companySite = res.companySite;
                    if(!this.companySite.address) this.companySite.address = {};
                    this.company = res.company;
                    this.setCoordinates(this.companySite);             

                    gateway.getUsersSite(this.company._id, 
                      res => this.team = res, 
                      () => { }
                    )

                }
            }, () => {
                alert('Erro ao buscar informações do Site ');
            });
    },    
    setCoordinates(companySite) {
        console.log(companySite.address.lat, companySite.address.lng)
        this.coordinates = { 
            0: {
                full_name: companySite.title,
                lat: companySite.address.lat, lng: companySite.address.lng
            },
        };    
        this.toggleInfo(this.coordinates[0], "0");  
    },
    sharedMyCompany() {
        const shareData = {
            title: this.company.name,
            text: `💈 Conheça nosso Site`,
            url: 'https://'+commons.urlCompany(this.companySite),
        }    
        console.log(shareData)        
        return navigator.share(shareData);      
    },
    sharedMyCompanyAgendamento() {
        const shareData = {
            title: this.company.name,
            text: `💈 Faça o seu Agendamento`,
            url: 'https://'+commons.urlCompany(this.companySite) + '?tab=AGENDA&realizarAgendamento=true',
        }    
        console.log(shareData)        
        return navigator.share(shareData);     
    },
    forwardApp() {
        let path = '/public/help';
        //if(this.company.companyType === 'BARBER') {
            return `https://app.kongapp.com.br/#${path}`;
        // } else {
        //     return `https://app.ladyapp.com.br/#${path}`;
        // }
    },
    showDialog(show) {
      if(this.company.plan.name != 'Free') { 
          this.dialogUpdate = show;
      } else {
        alert('Para Personalizar seu Site assine agora mesmo o Plano Premium');
        this.showPlanDialog(true);
      }
    },
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
    },
    setCompanySite(companySite) {
        this.companySite = companySite;
        this.setCoordinates(this.companySite);  
    },
    setCompanySitePhotoCoverUrl(urlPhotoCover) {
        this.companySite.photoCover = urlPhotoCover;
    },    
    setCompanySitePhotos(photosGallery) {
        this.companySite.photos = photosGallery;
    },
    showPlanDialog(show) {
      this.dialogPlan = show
    },    
    toggleInfo: function(marker, key) {
      console.log(marker, key);
      this.infoPosition = this.getPosition(marker)
      this.infoContent = marker.full_name
      if (this.infoCurrentKey == key) {
        this.infoOpened = !this.infoOpened
      } else {
        this.infoOpened = true
        this.infoCurrentKey = key
      }
    },
    flashingButtons() {
      const interval = 700;
      const timeStartAt = 3000;
      setTimeout(() => {
        this.btnUpdateSite = ''
        setTimeout(() => { 
          this.btnUpdateSite = 'primary' 
          setTimeout(() => {
            this.btnUpdateSite = ''
            setTimeout(() => { this.btnUpdateSite = 'primary' }, interval)
          }, interval);          
        }
        , interval)
      }, timeStartAt);
    },
    showMessage(text) {
      this.message.show = true;
      this.message.color = 'info';
      this.message.text = text;
      setTimeout(() => this.message.show = false, this.message.timeout);
    },       
    urlAssistantSchedule() {
      return 'https://'+commons.urlCompany(this.companySite) + '?tab=AGENDA&realizarAgendamento=true';
    },    
    onCopyUrlAssistantSchedule() {
      this.showMessage('Copiado!!! \nEnvie para seus Clientes. \nUtilize o assistente como resposta automática no WhatsApp ;-) '); 
    },      
    onError(){
      alert('Erro ao Copiar')
    },
  },
  beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getCompanyArroba(this.$route.params.arroba);
      if(this.$route.query.tab) { this.tabView = this.$route.query.tab }

  },
  mounted() {
    this.flashingButtons()
  }        
}
</script>

<style scoped>
.v-app-bar-title__content {
  width: 500px;
}
</style>
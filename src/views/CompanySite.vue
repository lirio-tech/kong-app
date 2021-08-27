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
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-nav-icon></v-app-bar-nav-icon>

       
            <span style="align-self: flex-end; width: 1000px;">💈 {{ companySite.title }} </span>
     

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


          <a :href="forwardApp()" target="blank" style="color: inherit; text-decoration: none">
            <v-btn icon >
              <v-icon>mdi-login</v-icon>
            </v-btn>              
          </a>

          <!-- <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn> -->

          <template v-slot:extension>
            <v-tabs align-with-title>

              <v-tab @click="tabView = 'HOME'">Home</v-tab>
              <v-tab @click="tabView = 'AGENDA'">Agenda</v-tab>
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
          <v-btn color="primary" to="/"><v-icon>mdi-arrow-left</v-icon>App</v-btn> &nbsp;
          <v-btn color="primary" @click="showDialog(true)"><v-icon>mdi-edit</v-icon>Alterar Site</v-btn> &nbsp;
          <v-btn color="primary" @click="sharedMyCompany"><v-icon>mdi-share</v-icon></v-btn>
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
          <h2 class="white--text">Agenda</h2>
      </v-container>
      <v-container v-if="tabView === 'CONTATO'">
          <h2 class="white--text">Contato</h2>
            <v-col
              xl="6" lg="6" md="6" sm="6" xs="12" cols="12"
            >
                <GmapMap
                  :center='center'
                  :zoom='16'
                  style='width:100%;  height: 400px;'
                >
                  <gmap-info-window :options="infoOptions" :position="infoPosition" :opened="infoOpened" @closeclick="infoOpened=false">
                    {{infoContent}}
                  </gmap-info-window>                
                    <gmap-marker 
                      v-for="(item, key) in coordinates" 
                      :key="key" 
                      :position="getPosition(item)" 
                      :clickable="true" 
                      @click="toggleInfo(item, key)" 
                   
                    />
                       <!-- :icon="{ url: require('../../assets/img/marker-a.png')}" -->
                </GmapMap>

            </v-col>
      </v-container>     
      <dialog-update-site 
        v-if="isAdmin()"
        :dialog="dialogUpdate"
        :companySite="companySite"
        :company="company"
        @show-dialog="showDialog"
      ></dialog-update-site>       
  </div>
</template>
<script>
import companyGateway from '../api/companyGateway'
import DialogUpdateSite from '../components/DialogUpdateSite.vue'
import storage from '../storage'
import commons from '../utils/commons'
import UserTypes from '../utils/UserTypes'

export default {
  components: { DialogUpdateSite, },
  data: () => ({
    tabView: 'HOME',
    dialogUpdate: false,
    userLogged: {},
    companySite: {
      whatsapp: '',
      facebook: '',
      instagram: '',
      photoCover: 'https://picsum.photos/1920/1080?random',
      address: {}
    },
    company: {},

    center: { lat: -23.533900584696596, lng: -46.36626008454244  },
    coordinates: {
      0: {
        full_name: 'Wiskritorio Barber Shop',
            lat: -23.533900584696596, lng: -46.36626008454244 
      },
    },
    infoPosition: null,
    infoContent: null,
    infoOpened: false,
    infoCurrentKey: null,
    infoOptions: {
      pixelOffset: {
        width: 0,
        height: -35
      }
    },    

  }),
  methods: {
    isAdmin() {
      return UserTypes.isAdmin(this.userLogged.type);
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
    getCompanyArroba(arroba) {
        companyGateway.getCompanySiteByArroba(arroba,
            (res) => {
                if(res) {
                    this.companySite = res.companySite;
                    if(!this.companySite.address) this.companySite.address = {};
                    this.company = res.company;
                }
            }, () => {
                alert('Erro ao buscar informações do Site ');
            });
    },    
    sharedMyCompany() {
        const shareData = {
            title: this.company.name,
            text: `💈 Conheça nosso Site`,
            url: 'https://'+commons.urlCompany(this.companySite, this.company.companyType),
        }    
        console.log(shareData)        
        return navigator.share(shareData);      
    },
    forwardApp() {
        let path = '/public/help';
        if(this.company.companyType === 'BARBER') {
            return `https://app.kongbarber.com/#${path}`;
        } else {
            return `https://app.ladyapp.com.br/#${path}`;
        }
    },
    showDialog(show) {
      this.dialogUpdate = show;
    },
    getPosition: function(marker) {
      return {
        lat: parseFloat(marker.lat),
        lng: parseFloat(marker.lng)
      }
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
    }

  },
  beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getCompanyArroba(this.$route.params.arroba);

      this.toggleInfo(this.coordinates[0], "0");

  }
}
</script>

<style scoped>
.v-app-bar-title__content {
  width: 500px;
}
</style>
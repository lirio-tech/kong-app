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
          <h4>Agenda</h4>
      </v-container>
      <v-container v-if="tabView === 'CONTATO'">
          <h4>Contato</h4>
          <v-card
            class="pa-4"
            flat
            height="300px"
            img="https://cdn.vuetifyjs.com/images/toolbar/map.jpg"
          >
            <v-toolbar
              dense
              floating
            >
              <v-text-field
                hide-details
                prepend-icon="search"
                single-line
              ></v-text-field>

              <v-btn icon>
                <v-icon>my_location</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-dots-vertical</v-icon>
              </v-btn>
            </v-toolbar>
          </v-card>          
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
      photoCover: 'https://picsum.photos/1920/1080?random'
    },
    company: {}
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
    }
  },
  beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getCompanyArroba(this.$route.params.arroba)
  }
}
</script>

<style scoped>
.v-app-bar-title__content {
  width: 500px;
}
</style>
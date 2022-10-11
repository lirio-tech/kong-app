<template>
  <v-dialog
    :value="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
      <v-card>
        <v-toolbar
          class="second white--text" height="190"
        >
          <v-toolbar-title>

              <p>
                  <v-btn
                    :style="userLogged ? 'padding-left: 51px; position: absolute; top: 25px;' : 'padding-left: 48px; position: absolute; top: 25px;'"
                    icon
                    small
                    @click="$emit('show-menu-user-dialog', false)"
                  >
                    <v-icon color="grey">mdi-close</v-icon>
                  </v-btn>      
              </p>
              
                  <v-row 
                    class="mr-0 ml-0"
                    v-if="!userLogged"  
                  >
                      <v-col > 
                          <v-row>
                            <v-img 
                              avatar
                              max-width="350"
                              src="@/assets/img/kongapp-name-removebg.png" 
                            />
                              <small 
                                class="grey--text"
                                style="padding-left: 30px"
                              >
                                Studio
                              </small>
                            </v-row>
                      </v-col>
                  </v-row>                        
                  <v-row 
                    class="mr-0 ml-0"
                    v-else
                  >
                                <v-col >
                                    <v-avatar size="80" color="grey">
                                        <v-icon
                                            medium
                                            dark
                                        >
                                            mdi-account
                                        </v-icon>     
                                    </v-avatar>
                                </v-col>
                                <v-col style="padding-top: 35px;"> 
                                      <router-link 
                                        :to="'/perfil'" 
                                        style="text-decoration: none"
                                        :class="getClassText()"
                                      >
                                        <v-row>
                                            <span >
                                                {{ userLogged.name.split(' ')[0] }} - {{ viewBO }}
                                            </span>                                   
                                        </v-row>
                                        <v-row>
                                            <small class="grey--text">veja seu perfil</small>
                                        </v-row>
                                      </router-link>
                                </v-col>
                </v-row>
                
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>    
        <v-card-text>
          
            <v-simple-table fluid>
              <template v-slot:default>
                  <tbody>
                    <tr v-if="(userLogged && userLogged.type === 'sys_admin')">
                      <td style="padding: 30px 0px 20px 0px;">
                          <router-link to="/system" style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Backoffice <v-chip color="red" style="margin-left: 15px;" outlined small>Backoffice</v-chip>
                              </v-col>
                          </router-link>    
                      </td>
                    </tr>
                    <tr v-if="userLogged">
                      <td style="padding: 30px 0px 20px 0px;">
                            <router-link :to="'/perfil'" style="color: inherit; text-decoration: none">
                                <v-col cols="10" class="font-weight-medium">
                                Configurações
                                </v-col> 
                            </router-link>                          
                        </td>
                      </tr>
                      <tr v-if="isAdmin()" >
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link to="/admin/users" style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Funcionários
                                  <v-chip color="primary" style="margin-left: 15px;" outlined small>ADMIN</v-chip>
                              </v-col>
                          </router-link>                                                        
                        </td>
                      </tr>
                      <tr v-if="userLogged && userLogged.type === 'hairdresser'">
                        <td style="padding: 30px 0px 20px 0px;" >
                          <router-link :to="{ path: '/users-balance-detail/'+userLogged._id }" style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Meu Extrato
                              </v-col>
                          </router-link>                                                                          
                        </td>
                      </tr>
                      <tr v-if="!userLogged">
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link to="/login" style="color: inherit; text-decoration: none">
                                <v-col cols="10" class="font-weight-medium">
                                    Login
                                </v-col>
                          </router-link>     
                        </td>
                      </tr>
                      <tr v-if="!userLogged">
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link to="/sign-up" style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Cadastre-se
                              </v-col>
                          </router-link>                           
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 0px 20px 0px;">
                          <div 
                              style="cursor: pointer;" @click="showPlanDialog(true)">                           
                              <v-col cols="12" class="font-weight-medium">
                                  Planos <v-chip v-if="!company || (company && company.plan.name === 'Free')" color="orange" style="margin-left: 15px;" outlined small>Seja Premium</v-chip>
                              </v-col>
                          </div>                        
                        </td>
                      </tr>
                      <tr v-if="userLogged">
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link 
                              :to="isAdmin() ? '/admin/agendamentos' : '/agendamentos'" 
                              style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Agendamentos 
                              </v-col>
                          </router-link>                           
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link 
                              to="/public/avalie-nos" 
                              style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Avalie-nos
                              </v-col>
                          </router-link>                        
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link 
                              to="/public/help" 
                              style="color: inherit; text-decoration: none">
                              <v-col cols="10" class="font-weight-medium">
                                  Ajuda
                                <small class="font-weight-thin"> v{{ version() }}</small>
                              </v-col>
                          </router-link>                        
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 0px 20px 0px;">
                          <router-link 
                                to="/public/fale-conosco" 
                                style="color: inherit; text-decoration: none">
                                <v-col cols="10" class="font-weight-medium">
                                    Fale Conosco
                                </v-col>
                            </router-link>  
                        </td>
                      </tr>
                      <tr>
                        <td style="padding: 30px 0px 20px 0px;">
                            <div 
                                style="cursor: pointer;" 
                                @click="logout"
                                v-if="userLogged"
                            >                           
                                <v-col cols="12" class="font-weight-medium">
                                    Sair
                                </v-col>
                            </div>
                        </td>
                      </tr> 
                  </tbody>
              </template>
            </v-simple-table>                        
              
        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>

      <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
      
  </v-dialog>    
</template>

<script>
import storage from '@/storage'
import DialogPlan from '@/components/DialogPlan'
import UserTypes from '@/utils/UserTypes'
import appConfig from '@/utils/appConfig'
export default {
  name: 'DialogMenuUser',
  props:['dialog'],
  components: {
    DialogPlan
  },
  data () {
    return {
      userLogged: {},
      dialogPlan: false,
      isDarkMode: true,
      viewBO: 0
    }
  }, 
  methods: {
    showPlanDialog(show) {
      this.dialogPlan = show
    },    
    isAdmin() {
        return this.userLogged && UserTypes.isAdmin(this.userLogged.type);
    },    
    version() {
      return appConfig.version();
    },    
    logout() {
      storage.logout();
      this.$router.push('/login');
    },    
    getClassText() {
      return this.$vuetify.theme.dark ? 'white--text' : 'black--text'
    }
  },
  computed: {

  },
  beforeMount() {
    this.userLogged = storage.getUserLogged();
  },
  mounted() {
  }
}
</script>
<style scoped>
</style>
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
                  ref="agendamentoForm"
                  id="agendamentoForm"
                >              
                    <br/>
                      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12" v-if="isAdmin()">     
                        
                        <instagram-input 
                          :value="companySite.instagram"
                          v-on:instagram-keypress-event="instagramKeyPressEvent"
                        ></instagram-input>

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

    </v-dialog>    
</template>

<script>
import UserTypes from '../utils/UserTypes'
import storage from '../storage'
import InstagramInput from './inputs/InstagramInput.vue'
export default {
  components: { InstagramInput, },
    props:['dialog'],
    data () {
      return {
        userLogged: {},
        companySite: {}
      }
    }, 
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      },
      updateInfos() {

      },
      instagramKeyPressEvent(value) {
        console.log(value)
        this.companySite.instagram = String(value).toLowerCase()
        console.log(this.companySite.instagram)
      }
 
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
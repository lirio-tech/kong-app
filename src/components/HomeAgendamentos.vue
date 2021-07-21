<template>

    <div>
        <router-link to="/agendamentos" style="color: inherit; text-decoration: none">
            <v-card
              class="mx-auto"
              max-width="800"
              outlined
            >
                  <v-list-item three-line>
                    <v-list-item-content>                                  
                          <v-col cols="12">
                              <span 
                                style="font-size: 1.0rem !important;"
                              >
                                Agendamentos
                              </span>                            
                              <br/><br/>
                              <span 
                                style="font-size: 1.0rem !important;"
                                class="caption grey--text"
                              >
                                Ultimo
                              </span>
                          </v-col>            
                          <v-col cols="12">
                              > ultimo
                          </v-col>           
                          <br/>
                          <v-col cols="12">
                              <span 
                                style="font-size: 1.0rem !important;"
                                class="caption grey--text"
                              >
                                Proximo
                              </span>
                          </v-col>            
                          <v-col cols="12">
                              > proximo
                          </v-col>                                       
                    </v-list-item-content>
                  </v-list-item>
            </v-card>      
        </router-link>        
    </div>            
</template>
 
<script>
export default {
    name: 'HomeAgendamentos',
    props: [ 'userLogged' ],
    data() {
      return {
        
      }
    }
  }
</script>

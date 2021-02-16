<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/admin/users'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.8rem !important;">Cadastro de Usuario</span>
              </v-col>
          </v-row>          
            <v-row>
                <v-col cols="12" sm="12">
                    
                </v-col>
            </v-row>              
        </v-main>
    </v-container>
</template>

<script>
  import AppBar from '../components/AppBar'
  export default {
    name: 'UsuarioForm',
    components: { AppBar },
    data: () => ({
      user: {}
    }),
    methods: {
      
    },
    beforeMount() {
      this.userLogged = JSON.parse(localStorage.getItem('user'));      
    }
  }
</script>

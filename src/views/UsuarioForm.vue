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
              <v-col cols="12" md="4">                      
                  <v-text-field 
                      v-model="user.username"
                      label="Username"
                      ref="username"
                      filled required readonly>
                  </v-text-field>  
              </v-col>
              <v-col cols="12" md="4">                      
                  <v-text-field v-model="user.name"
                              label="Nome"
                              ref="nome"
                              required
                              readonly
                              filled>
                  </v-text-field>
              </v-col>
              <v-col cols="12" md="4">
                  <v-text-field
                      label="Criado"
                      v-model="user.createdAt"
                      ref="createdAt"
                      required filled disabled
                  />
              </v-col>
              <v-col cols="12" md="4">
                  <v-text-field
                      label="Alterado"
                      v-model="user.updatedAt"
                      ref="updatedAt"
                      required filled disabled
                  />
              </v-col>                                    
          </v-row>         
        </v-main>
    </v-container>
</template>

<script>
  import gateway from '../api/gateway'
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
      gateway.getUserById(
            this.$route.params._id,
            res => this.user = res,
            err => console.log(err)
      );  
    }
  }
</script>

<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="8" align="center">   
                      <span style="font-size: 2.0rem !important;">Usuarios</span>
              </v-col>
          </v-row>          
            <v-row>
                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg">
                        <v-data-table 
                            :headers="headers" 
                            :items="users" 
                            item-key="code"
                            class="elevation-1"
                            hide-default-footer
                            loading-text="Carregando... Por favor aguarde"
                            @click:row="clickRow"
                        >                        
                            <template v-slot:item.disabled="{ item }">
                                <v-chip>
                                  <v-icon 
                                    color="green"
                                    text-color="white"
                                    v-if="!item.disabled"
                                  >
                                    mdi-check 
                                  </v-icon>
                                  <v-icon 
                                    color="red"
                                    text-color="white"
                                    v-else
                                  >
                                    mdi-close 
                                  </v-icon>                                  
                                </v-chip>
                            </template>                                                                   
                        </v-data-table>               
                    </v-sheet>
                </v-col>
            </v-row>              
        </v-main>
    </v-container>
</template>

<script>
  import gateway from '../api/gateway';
  import AppBar from '../components/AppBar'
  export default {
    name: 'UsuarioList',
    components: { AppBar },
    data: () => ({
      headers: [
        { text: "Nome", value: "name" },
        { text: "Username", value: "username" },
        { text: "Tipo", value: "type" },
        { text: "Criado", value: "createdAt" },
        { text: "Alterado", value: "updatedAt" },
        { text: "Ativo", value: "disabled" },
      ],                
      users: []
    }),
    methods: {
      getUsers() {
        gateway.getUsers('all', res => {
          this.users = res;
        }, err => {
          console.log(err);
        })
      },
      clickRow(row) {
          this.users.map((it) => {
              let selected = it === row;
              if(selected) {
                  this.$router.push('/admin/users/'+it._id);
              }
          })        
      }
    },
    beforeMount() {
      this.userLogged = JSON.parse(localStorage.getItem('user'));
      this.getUsers();
    }
  }
</script>

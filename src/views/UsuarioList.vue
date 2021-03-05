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
              <v-col cols="7" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                    <span v-if="users && users.length > 1">
                      {{ users.filter(it => it.disabled !== true).length }} usuários <br/>
                      <!-- <small class="grey--text">{{ users.filter(it => it.disabled === false).length }} ativos</small> -->
                    </span>
                    <span v-else>Usuários </span>
                  </span>
              </v-col>
              <v-col cols="2" align="center">   
                  <v-btn 
                      :to="{ path:'/admin/users/_newUser'}" 
                      class="ma-2"
                      outlined
                      color="cyan"
                  >Novo</v-btn>                        
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
                                <v-chip :color="!item.disabled ? 'green' : 'red'">
                                  <v-icon 
                                    v-if="!item.disabled"
                                  >
                                    mdi-check 
                                  </v-icon>
                                  <v-icon 
                                    v-else
                                  >
                                    mdi-close 
                                  </v-icon>                                  
                                </v-chip>
                            </template>      
                            <template v-slot:item.createdAt="{ item }">
                                {{ 
                                  new Date(item.createdAt)
                                      .toLocaleDateString('pt-BR', 
                                        {
                                            year: 'numeric',
                                            month: ('numeric'),
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        }) }}                            
                            </template> 
                            <template v-slot:item.updatedAt="{ item }">
                                {{ 
                                  new Date(item.updatedAt)
                                      .toLocaleDateString('pt-BR', 
                                        {
                                            year: 'numeric',
                                            month: ('numeric'),
                                            day: 'numeric',
                                            hour: 'numeric',
                                            minute: 'numeric'
                                        }) }}                            
                            </template> 
                            <template v-slot:item.type="{ item }">
                               <v-chip :color="item.type === 'administrator' ? 'blue' : ''">
                                {{ getTypePtBR(item.type) }}                            
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
      },
      getTypePtBR(type) {
        if(type === 'administrator') {
          return 'Administrador';
        } 
        if(type === 'hairdresser') {
          return 'Comum';
        }
        return type;
      }
    },
    beforeMount() {
      this.userLogged = JSON.parse(localStorage.getItem('user'));
      this.getUsers();
    }
  }
</script>

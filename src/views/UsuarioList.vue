<template>
    <v-container>
        <app-bar />             
        <v-main class="">
            <header-back-title title="Funcionários" btnPath="/admin/users/_newUser" btnName="Novo"/>
            <!-- <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="white darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="7" align="center">   
                  <span style="font-size: 1.8rem !important;" class="white--text">  
                    Funcionários
                  </span>
              </v-col> 
              <v-col cols="2" align="center">   
                  <v-btn 
                      :to="{ path:'/admin/users/_newUser'}" 
                      class="ma-2 primary--text"
                  >Novo</v-btn>                        
              </v-col>              
          </v-row>            -->
            <v-row>
                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg">
                        <v-data-table 
                            :headers="headers" 
                            :items="users" 
                            item-key="code"
                            :items-per-page="50"
                            :search="search"
                            :custom-filter="filterUsers"
                            class="elevation-1"
                            hide-actions
                            hide-default-footer
                            loading-text="Carregando... Por favor aguarde"
                            @click:row="clickRow"
                        >                        
                            <template v-slot:top>
                              <v-text-field
                                v-model="search"
                                label="Pesquise o Funcionário"
                                class="mx-4"
                              ></v-text-field>
                            </template>                        
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
                               <v-chip :color="isAdmin(item.type) ? 'primary' : ''">
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
import AppBar from '../components/AppBar.vue';
import HeaderBackTitle from '../components/HeaderBackTitle.vue';
import storage from '../storage';
import UserTypes from '../utils/UserTypes';
  export default {
  components: { AppBar, HeaderBackTitle },
    name: 'UsuarioList',
    data: () => ({
      search: '',
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
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      getUsers() {
        gateway.getUsers('all', res => {
          this.users = res;
          console.log(this.users);
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
        return UserTypes.getDescriptionPtBR(type);
      },
      filterUsers(value, search, item) {
        console.log(value, search, item)
        return value != null &&
          search != null &&
          typeof value === 'string' &&
          value.toString().toLocaleUpperCase().indexOf(search.toString().toLocaleUpperCase()) !== -1
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getUsers();
    }
  }
</script>

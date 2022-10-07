<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/system'}" 
                  >
                      <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="7" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                      Usuarios                     
                  </span>
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
                            <template v-slot:item.device="{ item }">
                                {{ device(item.device) }}                            
                            </template>                                
                        </v-data-table>               
                    </v-sheet>
                </v-col>
            </v-row>              
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../../api/gateway';
import AppBar from '@/components/appbar/AppBar'
import storage from '../../storage';
import UserTypes from '../../utils/UserTypes';
export default {
    name: 'SystemUserList',
    components: { AppBar },
    data: () => ({
      headers: [
        { text: "Nome", value: "name" },
        { text: "Username", value: "username" },
        { text: "Tipo", value: "type" },
        { text: "Criado", value: "createdAt" },
        { text: "Alterado", value: "updatedAt" },
        { text: "Desativado", value: "disabled" },
        { text: "Telefone", value: "phone_number" },
        { text: "SmartPhone", value: "device" },
      ],                
      users: []
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      getUsers() {
        
        gateway.getUsersByCompanyId(this.$route.params.companyId,'all', res => {
          this.users = res;
        }, err => {
          console.log(err);
        })
      },
      clickRow(row) {
          this.users.map((it) => {
              let selected = it === row;
              if(selected) {
                  this.$router.push('/system/users/'+it._id);
              }
          })        
      },
      getTypePtBR(type) {
        return UserTypes.getDescriptionPtBR(type);
      },
      device(dvc) {
          if(!dvc) return 'Outros';
          if(dvc.toLowerCase().includes('iphone')) return 'iPhone';
          if(dvc.toLowerCase().includes('android')) return 'Android';
          return 'Outros'
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.getUsers();
    }
  }
</script>

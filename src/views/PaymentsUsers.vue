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
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                    Pagamentos
                  </span>
              </v-col>           
          </v-row>          
            <v-row>
                <v-col cols="12" sm="12">
                    <v-sheet min-height="70vh" rounded="lg">
                        <v-data-table 
                            :headers="headers" 
                            :items="usersPayments" 
                            item-key="code"
                            class="elevation-1"
                            hide-default-footer
                            loading-text="Carregando... Por favor aguarde"
                            @click:row="clickRow"
                        >                                                  
                        </v-data-table>               
                    </v-sheet>
                </v-col>
            </v-row>              
        </v-main>
    </v-container>
</template>

<script>
//import gateway from '../api/gateway';
import AppBar from '../components/AppBar'
import storage from '../storage';
import UserTypes from '../utils/UserTypes';
  export default {
    name: 'PaymentsUsers',
    components: { AppBar },
    data: () => ({
      headers: [
        { text: "Funcionario", value: "name" },
        { text: "Username", value: "valueReceive" }
      ],                
      usersPayments: [{name: 'Guilherme', valueReceive: 150.50}]
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
      // clickRow(row) {
      //     this.users.map((it) => {
      //         let selected = it === row;
      //         if(selected) {
      //             this.$router.push('/admin/users/'+it._id);
      //         }
      //     })        
      // },
      getTypePtBR(type) {
        return UserTypes.getDescriptionPtBR(type);
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

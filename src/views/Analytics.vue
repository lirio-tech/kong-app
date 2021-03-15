<template>
    <v-container>
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="8" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                    Graficos
                  </span>
              </v-col>
              <v-col cols="2" align="center" style="margin-top: 12px;">   
                  <v-btn icon small style="display: inline;">
                      <v-icon large color="blue-grey">mdi-menu</v-icon>
                  </v-btn>
              </v-col>

          </v-row>          
          
        </v-main>
    </v-container>
</template>

<script>
import storage from '../storage';
import UserTypes from '../utils/UserTypes'
export default {
    name: 'Analytics',
    data: () => ({
    }),
    methods: {
      isAdmin(type) {
        return UserTypes.isAdmin(type);
      },
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

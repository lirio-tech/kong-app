<template>
    <v-app-bar
      app
      flat
    >      
        <v-row justify="start" align="center"> 
            <router-link to="/" style="color: inherit; text-decoration: none">
              <v-btn text >
                <span style="font-family: 'Frijole', cursive; font-size: 1.2rem;">
                  <span style="color: #006666;"></span><span class="cyan--text">Wiskritório</span>
                </span>
              </v-btn>
            </router-link>
        </v-row>
        <v-row justify="end" align="center" >
            <v-menu bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on">
                    <v-icon style="font-size: 1.6rem">mdi-dots-vertical</v-icon>
                </v-btn>
                </template>
                <v-card>
                    <v-list-item-content class="justify-center">
                        <router-link :to="'/perfil'" style="color: inherit; text-decoration: none">
                            <v-row class="mr-0 ml-0">
                                <v-col cols="3">
                                    <v-avatar size="40" color="grey">
                                        <v-icon
                                            medium
                                            dark
                                        >
                                            mdi-account
                                        </v-icon>     
                                    </v-avatar>
                                </v-col>
                                <v-col cols="9"> 
                                    <div>
                                        <span class="font-weight-black">
                                            {{ userLogger.username }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="font-weight-thin">veja seu perfil</span>
                                    </div>
                                </v-col>
                            </v-row>
                        </router-link>

                        <div style="cursor: pointer;" @click="sobre">                           
                            <v-divider class="my-1"></v-divider>
                            <v-col cols="12" class="font-weight-medium">
                                Sobre
                            </v-col>
                        </div>

                        <div style="cursor: pointer;" @click="logout">                           
                            <v-divider class="my-1"></v-divider>
                            <v-col cols="12" class="font-weight-medium">
                                Sair
                            </v-col>
                        </div>

                    </v-list-item-content>
                </v-card>                
            </v-menu>
        </v-row>
    </v-app-bar>    
</template>

<script>
    export default {
        data:() => ({
            userLogger: {}
        }),
        computed: {
            username() {
                return localStorage.getItem('username');
            }
        },
        methods: {
            logout() {
                localStorage.clear();
                this.$router.push('/login');
            },
            sobre() {
                alert('Version: 0.1.1');
            }
        }, 
        beforeMount() {
            this.userLogger = JSON.parse(localStorage.getItem('user'));
        }
    }
</script>
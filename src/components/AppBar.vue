<template>
    <v-app-bar
      app
      flat
    >      
        <v-row justify="start" align="center"> 
            <router-link to="/" style="color: inherit; text-decoration: none">
              <v-btn text >
                <span style="font-family: 'Frijole', cursive; font-size: 1.2rem;">
                  <span style="color: #006666;"></span><span class="primary--text">Wiskritório</span>
                </span> 
              </v-btn>
            </router-link>
        </v-row>
        <v-row justify="end" align="center" >
            <v-menu bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" style="margin-bottom: 20px;">
                    <v-icon style="font-size: 1.6rem">mdi-account-circle-outline</v-icon>
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

                        <router-link v-if="userLogger && userLogger.type === 'administrator'" to="/admin/users" style="color: inherit; text-decoration: none">
                            <v-divider class="my-1"></v-divider>
                            <v-col cols="10" class="font-weight-medium">
                            Usuarios <v-chip color="cyan" style="margin-left: 15px;" outlined small>novo</v-chip>
                            </v-col>
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
        <DialogSobre :dialog="dialog" v-on:show-dialog="showDialog"/>
    </v-app-bar>    
</template>

<script>
    import DialogSobre from './DialogSobre'
    export default {
        components: {
            DialogSobre
        },
        data:() => ({
            userLogger: {},
            dialog: false
        }),
        methods: {
            logout() {
                localStorage.clear();
                this.$router.push('/login');
            },
            sobre() {
                this.dialog = true;
            },
            showDialog(show) {
                this.dialog = show;
            }
        }, 
        beforeMount() {
            this.userLogger = JSON.parse(localStorage.getItem('user'));
        }
    }
</script>
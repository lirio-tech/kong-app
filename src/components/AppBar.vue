<template>
    <v-app-bar
      app
      flat
    >      
        <v-row justify="start" align="center"> 
            <router-link to="/" style="color: inherit; text-decoration: none">
              <v-btn text >
                <span style="font-family: 'Frijole', cursive; font-size: 1.2rem;">
                  <span :class="getColor()">{{ company.nome }}</span>
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
                            Usuarios <v-chip color="cyan" style="margin-left: 15px;" outlined small>admin</v-chip>
                            </v-col>
                        </router-link>                           
                        <router-link v-if="userLogger && userLogger.type === 'administrator'" to="/admin/users" style="color: inherit; text-decoration: none">
                            <v-divider class="my-1"></v-divider>
                            <v-col cols="10" class="font-weight-medium">
                            Plano <v-chip color="cyan" style="margin-left: 15px;" outlined small>admin</v-chip>
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
    import { mapGetters } from 'vuex'
    export default {
        components: {
            DialogSobre
        },
        data:() => ({
            userLogger: {},
            dialog: false,
            companyName: ''
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
            },
            getColor() {
                let color = 'yellow--text';
                if(new Date().getDay() % 5 == 0) 
                    color = 'green--text'
                else if(new Date().getDay() % 4 == 0) 
                    color = 'purple--text'
                else if(new Date().getDay() % 3 == 0) 
                    color = 'primary--text'     
                else if(new Date().getDay() % 2 == 0) 
                    color = 'orange--text' 
                return color;
            }
        }, 
        beforeMount() {
            this.userLogger = JSON.parse(localStorage.getItem('user'));
        },
        computed: {
            ...mapGetters({
                company: "companyStore/company"
            }), 
        }       
    }
</script>
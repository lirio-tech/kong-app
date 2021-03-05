<template>
    <v-app-bar
      app
      flat
    >      
        <v-row justify="start" align="center"> 
            <router-link to="/" style="color: inherit; text-decoration: none">
              <v-btn text >
                <span style="font-family: 'Frijole', cursive; font-size: 1.1rem;">
                  <span :class="getColor()">{{ company ? company.shortName : 'Wiskritório App' }}</span>
                </span>  
              </v-btn>
            </router-link>
        </v-row>
        <v-row justify="end" align="center" >
            <v-menu bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" style="margin-bottom: 20px;">
                    <v-icon v-if="userLogger" style="font-size: 1.6rem">mdi-account-circle-outline</v-icon>
                    <v-icon v-else style="font-size: 1.6rem">mdi-menu</v-icon>
                </v-btn>
                </template>
                <v-card >
                    <v-list-item-content class="justify-center">
                        <router-link 
                            :to="'/perfil'" 
                            style="color: inherit; text-decoration: none"
                            v-if="userLogger"
                        >
                            <v-row class="mr-0 ml-0">
                                <v-col cols="3">
                                    <v-avatar size="50" color="grey">
                                        <v-icon
                                            medium
                                            dark
                                        >
                                            mdi-account
                                        </v-icon>     
                                    </v-avatar>
                                </v-col>
                                <v-col cols="9"> 
                                    <div style="margin-top:10px;">
                                        <span class="font-weight-black white--text" >
                                            {{ userLogger.name.split(' ')[0] }}
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
                            <v-divider class="my-1"></v-divider>
                        </router-link>                              

                        <router-link v-if="!userLogger" to="/login" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Login
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>     
                        <router-link v-if="!userLogger" to="/sign-up" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Cadastre-se
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>     

                        <div 
                            style="cursor: pointer;" @click="showPlanDialog(true)">                           
                            <v-col cols="12" class="font-weight-medium">
                                Planos
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </div>                        
                        
                        <router-link 
                            to="/public/fale-conosco" 
                            style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Fale Conosco
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>     

                        <router-link 
                            to="/public/help" 
                            style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Sobre o App
                            </v-col>
                        </router-link>                                                   

                        <div 
                            style="cursor: pointer;" 
                            @click="logout"
                            v-if="userLogger"
                        >                           
                            <v-divider class="my-1"></v-divider>
                            <v-col cols="12" class="font-weight-medium">
                                Sair
                            </v-col>
                        </div>

                    </v-list-item-content>
                </v-card>                
            </v-menu>
        </v-row>
        <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
    </v-app-bar>    
</template>

<script>
import DialogPlan from './DialogPlan'
import gateway from '../api/gateway';
    // import { mapGetters } from 'vuex'
    export default {
        name: 'AppBar',
        components: {
            DialogPlan
        },
        data:() => ({
            userLogger: null,
            company: null,
            dialog: false,
            dialogPlan: false
        }),
        methods: {
            logout() {
                localStorage.clear();
                this.$router.push('/login');
            },
            showDialog(show) {
                this.dialog = show;
            },
            showPlanDialog(show) {
                this.dialogPlan = show
            },
            getColor() {
                let color = 'primary--text';
                if(new Date().getDay() % 5 == 0) 
                    color = 'primary--text'
                else if(new Date().getDay() % 4 == 0) 
                    color = 'primary--text'
                else if(new Date().getDay() % 3 == 0) 
                    color = 'primary--text'     
                else if(new Date().getDay() % 2 == 0) 
                    color = 'primary--text' 
                return color; 
            } 
        },  
        beforeMount() {
            this.userLogger = JSON.parse(localStorage.getItem('user'));
            this.company = JSON.parse(localStorage.getItem('company'));
            if(!this.company && this.userLogger) {
                gateway.getCompanyById(this.userLogger.company,
                res => {
                    this.company = res;
                },
                () => {
                    alert('Erro, tente novamente mais tarde');
                })
            }
            // if(cpny) {
            //     this.$store.commit('companyStore/setCompany', cpny); 
            // } else {
            //     localStorage.clear();
            // }
        },
        // computed: {
        //     ...mapGetters({ 
        //         company: "companyStore/company"
        //     }), 
        // }       
    }
</script>
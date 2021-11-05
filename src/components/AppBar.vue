<template>
    <v-app-bar
      app
      flat
    >      
        <v-row justify="start" align="center"> 
            <router-link to="/" style="color: inherit; text-decoration: none">
              <v-btn text >
                <span style="font-family: 'Frijole', cursive; font-size: 1.1rem;">
                  <span class="primary--text">{{ company ? company.shortName : ($vuetify.theme.dark ? 'Kongapp' : 'Lady App') }}</span>
                </span>  
              </v-btn>
            </router-link>
        </v-row>
        <v-row justify="end" align="center" >
            <v-menu bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" style="margin-bottom: 20px;">
                    <v-icon v-if="userLogged" style="font-size: 1.6rem">mdi-account-circle</v-icon>
                    <v-icon v-else style="font-size: 1.6rem">mdi-menu</v-icon>
                </v-btn>
                </template>
                <v-card >
                    <v-list-item-content class="justify-center">
                        <router-link 
                            :to="'/perfil'" 
                            style="color: inherit; text-decoration: none"
                            v-if="userLogged"
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
                                        <span class="font-weight-black" >
                                            {{ userLogged.name.split(' ')[0] }}
                                        </span>
                                    </div>
                                    <div>
                                        <span class="font-weight-thin">veja seu perfil</span>
                                    </div>
                                </v-col>
                            </v-row>
                            <br/>
                            <v-divider />                                                 
                        </router-link>

                        <!-- <div style="cursor: pointer;" @click="setThemeLadyModoON(themeLadyModoON)">      
                            <v-list-item>
                                <v-list-item-content>
                                    <v-list-item-title>
                                        White/Black
                                    </v-list-item-title>
                                </v-list-item-content>
                                <v-list-item-action>
                                    <v-switch v-model="themeLadyModoON" />
                                </v-list-item-action>
                            </v-list-item>
                            <v-divider />                                                 
                        </div> -->

                        <router-link v-if="userLogged && userLogged.type === 'sys_admin'" to="/system" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                System <v-chip color="red" style="margin-left: 15px;" outlined small>SYSTEM</v-chip>
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>     
                        <router-link v-if="userLogged && userLogged.type === 'sys_admin'" to="/admin/purchases-products" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                            Compras de Produtos <v-chip color="primary" style="margin-left: 15px;" outlined small>SYS</v-chip>
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>                                                                     
                        <router-link v-if="userLogged" :to="'/perfil'" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                            Configurações
                            </v-col> 
                            <v-divider class="my-1"></v-divider>
                        </router-link>     
                        <router-link v-if="isAdmin()" to="/admin/users" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Funcionários
                                <v-chip color="primary" style="margin-left: 15px;" outlined small>ADMIN</v-chip>
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>          
                        <router-link v-if="isAdmin()" to="/users-balance" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Pagamentos
                                <v-chip color="primary" style="margin-left: 15px;" outlined small>ADMIN</v-chip>
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>                            
                        <router-link v-if="userLogged && userLogged.type === 'hairdresser'" :to="{ path: '/users-balance-detail/'+userLogged._id }" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Meu Extrato
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>                                                    
                        <router-link v-if="!userLogged" to="/login" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Login
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>     
                        <router-link v-if="!userLogged" to="/sign-up" style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Cadastre-se
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>     

                        <div 
                            style="cursor: pointer;" @click="showPlanDialog(true)">                           
                            <v-col cols="12" class="font-weight-medium">
                                Planos <v-chip v-if="!company || (company && company.plan.name === 'Free')" color="orange" style="margin-left: 15px;" outlined small>Seja Premium</v-chip>
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </div>                        
                        <router-link 
                            v-if="false"
                            :to="isAdmin() ? '/admin/agendamentos' : '/agendamentos'" 
                            style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Agendamentos 
                                <v-chip color="primary" style="margin-left: 15px;" outlined small>Novo</v-chip>
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>        
                        <router-link 
                            to="/public/avalie-nos" 
                            style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Avalie-nos
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>    
                        <router-link 
                            to="/public/help" 
                            style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Ajuda
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>  
                        <router-link 
                            to="/public/fale-conosco" 
                            style="color: inherit; text-decoration: none">
                            <v-col cols="10" class="font-weight-medium">
                                Fale Conosco
                            </v-col>
                            <v-divider class="my-1"></v-divider>
                        </router-link>  
                        <div 
                            style="cursor: pointer;" 
                            @click="logout"
                            v-if="userLogged"
                        >                           
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
import storage from '../storage';
import UserTypes from '../utils/UserTypes'
export default {
        name: 'AppBar',
        components: {
            DialogPlan
        },
        data:() => ({
            userLogged: null,
            company: null,
            dialog: false,
            dialogPlan: false,
            themeLadyModoON: true
        }),
        methods: {
            // setThemeLadyModoON(isLadyModoON) {
            //     storage.setThemeLadyModoON(isLadyModoON);
            //     this.themeLadyModoON = isLadyModoON;
            //     this.$vuetify.theme.dark = !this.themeLadyModoON;
            // },            
            logout() {
                storage.logout();
                this.$router.push('/login');
            },
            showDialog(show) {
                this.dialog = show;
            },
            showPlanDialog(show) {
                this.dialogPlan = show
            },
            isAdmin() {
                return this.userLogged && UserTypes.isAdmin(this.userLogged.type);
            }
        },  
        beforeMount() {
            this.userLogged = storage.getUserLogged();
            this.company = storage.getCompany();
            console.log(this.company);
            if(!this.company && this.userLogged) {
                gateway.getCompanyById(this.userLogged.company,
                res => {
                    this.company = res;
                },
                () => {
                    alert('Erro, tente novamente mais tarde');
                })
            }
            // this.themeLadyModoON = Boolean(storage.getThemeLadyModoON());
            // this.$vuetify.theme.dark = !this.themeLadyModoON;
            
        },       
    }
</script>
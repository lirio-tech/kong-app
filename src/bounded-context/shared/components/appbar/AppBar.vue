<template>
    <v-app-bar
      app
      flat
    >      
        <v-row justify="start" align="center"> 
            <router-link to="/" style="color: inherit; text-decoration: none">
              <v-btn text >
                <span style="font-family: 'Frijole', cursive; font-size: 0.9rem;">
                  <span class="primary--text">{{ company ? company.shortName : 'Kongapp' }}</span>
                </span>  
              </v-btn>
            </router-link>
        </v-row>
        <v-row justify="end" align="center" >
            <v-menu bottom min-width="200px" rounded offset-y v-if="userLogged">
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="showNotificationsDialog(true)" style="margin-bottom: 20px;">
                        <div v-if="notifications && notifications.amountNotRead > 0">
                            <v-icon 
                                style="font-size: 1.6rem"
                                class="shaking-bell"
                            >
                                mdi-bell-badge-outline
                            </v-icon>
                            <v-icon 
                                size="10" 
                                color="red"
                                style="position: absolute; top: -6px;left: 19px;"
                                class="shaking-bell"
                            >
                                mdi-circle
                            </v-icon>
                        </div>
                        <v-icon v-else style="font-size: 1.6rem">mdi-bell-outline</v-icon>
                    </v-btn>
                </template>
            </v-menu>
            <v-menu bottom min-width="200px" rounded offset-y>
                <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on" @click="showMenuUserDialog(true)" style="margin-bottom: 20px;">
                        <v-icon v-if="userLogged" style="font-size: 1.6rem">mdi-account-circle</v-icon>
                        <v-icon v-else style="font-size: 1.6rem">mdi-menu</v-icon>
                    </v-btn>
                </template>        
            </v-menu>
        </v-row>
        
        <DialogMenuUser :dialog="dialogMenuUser" v-on:show-menu-user-dialog="showMenuUserDialog" />

        <DialogNotifitions :dialog="dialogNotifitions" :notifications="notifications" v-on:show-notifications-dialog="showNotificationsDialog" />
    
    </v-app-bar>    
</template>

<script>
import DialogNotifitions from '@/bounded-context/notifications/components/DialogNotifications'
import DialogMenuUser from './menu/DialogMenuUser'
import gateway from '@/api/gateway';
import notificationGateway from '@/api/notificationGateway'
import storage from '@/storage';
import UserTypes from '@/utils/UserTypes'
import appConfig from '@/utils/appConfig'

export default {
        name: 'AppBar',
        components: {
            DialogNotifitions,
            DialogMenuUser
        },
        data:() => ({
            userLogged: null,
            company: null,
            dialogNotifitions: false,
            dialogMenuUser: false,
            notifications: {
                list: [],
                amountNotRead: 0,
                amountRead: 0
            }
        }),
        methods: {
            logout() {
                storage.logout();
                this.$router.push('/login');
            },
            isAdmin() {
                return this.userLogged && UserTypes.isAdmin(this.userLogged.type);
            },
            version() {
                return appConfig.version();
            },
            showNotificationsDialog(show) {
                this.dialogNotifitions = show
            },
            showMenuUserDialog(show) {
                this.dialogMenuUser = show
            }                              
        },  
        beforeMount() {
            this.userLogged = storage.getUserLogged();
            this.company = storage.getCompany();
            if(!this.company && this.userLogged) {
                gateway.getCompanyById(this.userLogged.company,
                res => {
                    this.company = res;
                },
                () => {
                    alert('Erro, tente novamente mais tarde');
                })
            }
            
            notificationGateway.get(
                res => {
                    this.notifications = res;
                }, err => {
                    console.error('Erro ao buscar notificacoes', err);
                }
            )            
        },       
    }
</script>
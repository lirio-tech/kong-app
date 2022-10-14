<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                    <v-btn icon small style="display: inline;"
                        @click="$router.go(-1)"
                    >
                        <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                    </v-btn>
              </v-col>                 
              <v-col cols="10">   
                <p class="mr-2 text-center grey--text" 
                  style="font-size: 1.6rem;">
                    Lista de Notificações
                </p>  
              </v-col>
          </v-row>          
          <v-row>
                <ListViewNotifications :list="notifications" v-on:click-item="clickItem"/>
                
          </v-row>         

        </v-main>
    </v-container>
</template>

<script>
import AppBar from '@/bounded-context/shared/components/appbar/AppBar'
import storage from '@/storage';
import notificationGateway from '@/api/notificationGateway';
import ListViewNotifications from '../../../notifications/components/ListViewNotifications.vue';
import companyGateway from '../../../../api/companyGateway';
  export default {
    name: 'BackofficeNotificationOptions',
    components: {
    AppBar,
    ListViewNotifications
},
    data: () => ({
      loading: false,
      userLogged: {
        type: 'none'
      },
      notifications: []
    }),
    methods: {
        getList() {
          const pagination = {
            page: 0,
            size: 10,
            sortField: 'createdAt',
            sortDirection: 'asc'
          }
          notificationGateway.getListPage(
            pagination,
            res => {
                this.notifications = res;
            },
            err => {
                console.error(err);
                alert('Erro innesperado ao Buscar Lista')
            }
          )
        },
        clickItem(item) {
            companyGateway.getCompanyById(
              item.company, 
              res => {
                alert(res.name);
              },
              err => {
                console.error(err);
                alert('Erro Inesperado');
              }
            )
        }
    },
    beforeMount() {
      this.getList()
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

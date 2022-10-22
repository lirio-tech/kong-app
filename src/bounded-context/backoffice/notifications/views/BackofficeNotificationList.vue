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
                <ListViewNotifications 
                    :list="notifications" 
                    v-on:click-item="clickItem"
                />
          </v-row>         
          <v-row
            align="center"
            justify="space-around"          
            style="padding-top: 20px; padding-bottom: 50px;"
          >
                <v-btn
                  @click="loadMore"
                  :loading="loading"
                >
                        Carregar mais
                </v-btn>            
          </v-row>

        </v-main>
        <DialogViewNotification 
          :company="company" 
          :notification="notification" 
          :dialog="dialogViewNotification" 
          v-on:show-notification-dialog="showNotificationDialog"
        />
    </v-container>
</template>

<script>
import AppBar from '@/bounded-context/shared/components/appbar/AppBar'
import storage from '@/storage';
import notificationGateway from '@/api/notificationGateway';
import ListViewNotifications from '../../../notifications/components/ListViewNotifications.vue';
import companyGateway from '../../../../api/companyGateway';
import DialogViewNotification from '../components/DialogViewNotification.vue';
  export default {
    name: 'BackofficeNotificationOptions',
    components: {
    AppBar,
    ListViewNotifications,
    DialogViewNotification
},
    data: () => ({
      loading: false,
      dialogViewNotification: false,
      userLogged: {
        type: 'none'
      },
      pagination: {
          page: 0,
          size: 10,
          sortField: 'createdAt',
          sortDirection: 'desc'
      },        
      notifications: [],
      isReturn10: true, 
      company: {},
      notification: {}
    }),
    methods: {
        getList() {
          this.loading = true;
          notificationGateway.getListPage(
            this.pagination,
            res => {
                this.loading = false;
                this.notifications.push(...res);
                this.isReturn10 = res.length >= this.pagination.size;
            },
            err => {
                this.loading = false;
                console.error(err);
                alert('Erro innesperado ao Buscar Lista')
            }
          )
        },
        clickItem(item) {
            companyGateway.getCompanyById(
              item.company, 
              res => {
                this.notification = item;
                this.company = res;
                this.showNotificationDialog(true);
              },
              err => {
                console.error(err);
                alert('Erro Inesperado');
              }
            )
        },
        loadMore() {
            if(!this.isReturn10) {
              alert('Todos as notificações já foram carregadas');
              return;
            }
            this.pagination.page++;
            this.getList();
        },
        showNotificationDialog(show, notificationDeleted) {
          this.dialogViewNotification = show;
          if(notificationDeleted) {
            this.notifications.splice(this.notifications.indexOf(notificationDeleted), 1);
          }
        }
    },
    beforeMount() {
      this.getList({ page: 0, size: 10, sortField: 'createdAt', sortDirection: 'asc' })
      this.userLogged = storage.getUserLogged();
    }
  }
</script>

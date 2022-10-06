<template>
  <v-dialog
    :value="dialog"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
  >
      <v-card>
        <v-toolbar
          class="primary white--text"
        >
          <v-btn
            icon
            small
            @click="$emit('show-notifications-dialog', false)"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>      
          <v-toolbar-title style="margin-left:-10px;">
              Notificações
          </v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>    
        <v-card-text>
          
                  <v-row v-if="notifications.length !== 0 && !loading">
                      
                          <v-sheet min-height="70vh" rounded="lg" >           
                              <v-simple-table >
                                <template v-slot:default>
                                  <tbody>
                                    <tr
                                      v-for="n in notifications"
                                      :key="n._id"
                                      @click="clickRow(n)"
                                    >
                                      <td>
                                        <span class="icon-emoji-30">💎</span> 
                                      </td>
                                      <td style="padding: 30px 0px 20px 0px;">
                                        <p class="grey--text">
                                          {{n.createdAt}} - {{ n.title }} 
                                          <span class="chevron-right red--text">
                                            <v-icon v-if="n.isNotRead" size="15" color="red">mdi-brightness-1</v-icon>
                                          </span>
                                        </p> 
                                        <span>
                                          {{ n.description }}
                                        </span>

                                      </td>
                                    </tr>
                                  </tbody>
                                </template>
                              </v-simple-table>                        
                          </v-sheet>
                      
                  </v-row>              
              
        </v-card-text>          
        <div style="flex: 1 1 auto;"></div>
      </v-card>
      
  </v-dialog>    
</template>

<script>
import storage from '../../storage'
export default {
  name: 'DialogNotifications',
  props:['dialog'],
  data () {
    return {
      userLogged: {},
      notifications: [],
    }
  }, 
  methods: {

  },
  computed: {

  },
  beforeMount() {
    this.userLogged = storage.getUserLogged();
  },
  mounted() {
    this.notifications = [
      {
        _id: "asewcewc-wcv-v-ev--v-dv-dfv",
        title: "Assinatura",
        description: "Seu plano de assinatura está vencendo, realize o pagamento e continue mantendo a visão da seu Faturamento, Agendamentos, Comissão :) ",
        createdAt: '05/10/2022',
        isNotRead: false
      },
      {
        _id: "asewcewc-wcv-v-ev--v-dv-dfv",
        title: "Assinatura",
        description: "Seu plano de assinatura está vencendo, realize o pagamento e continue mantendo a visão da seu Faturamento, Agendamentos, Comissão :) ",
        createdAt: '05/10/2022',
        isNotRead: true
      }      
    ]
  }
}
</script>
<style scoped>
  .notification {
    padding: 25px 0px 75px 0px;
  }
</style>
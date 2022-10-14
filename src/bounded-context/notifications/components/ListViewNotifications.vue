<template>
            <v-simple-table fluid>
              <template v-slot:default>
                  <tbody v-if="list.length !== 0">
                    <tr
                      v-for="item in list"
                      :key="item"
                      @click="$emit('click-item', item)"
                    >
                      <td>
                        <v-btn v-if="item.mdi" fab>
                              <v-icon :color="item.mdiColor">{{ item.mdi }}</v-icon>
                        </v-btn>
                        <v-btn v-else fab>
                              <span  class="icon-emoji-30">
                              {{ item.emojiIcon }}
                              </span>
                        </v-btn>
                      </td>
                      <td style="padding: 30px 0px 20px 0px;">
                        <p>
                          {{ item.title }}
                          <span style="padding-left: 10px;" class="red--text">
                            <v-icon 
                              v-if="item.isNotRead" 
                              size="15" 
                              color="red"
                            >
                              mdi-brightness-1
                            </v-icon>
                          </span>
                          <br/><small class="grey--text">{{item.createdAt}}</small>
                        </p> 
                        <span class="grey--text">
                          {{ item.description }}
                        </span>
                      </td>
                    </tr>
                  </tbody>  
                  <tfoot>
                    <tr
                      v-if="list.length === 0"
                    >                    
                        <td style="padding-top: 50px;">
                            <v-btn fab>
                                  <span  class="icon-emoji-30">
                                    😓
                                  </span>
                            </v-btn>
                          </td>
                          <td style="padding: 70px 0px 20px 0px;">
                            <span class="grey--text">
                              Não há Notificações para Você no Momento!
                            </span>
                          </td>
                    </tr>
                  </tfoot>
              </template>
            </v-simple-table>        
</template>

<script>
export default {
    name: 'ListViewNotifications',
    props: ["list"],
    computed: {
      model: {

      }, 
    },
    methods: {
      
    }
}
</script>

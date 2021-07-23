<template>
  <div>
        <v-card
          class="mx-auto"
          max-width="344"
          color="red lighten-4"
        >
                    <v-card-text>
                      <div>Conclua esse agendamento :)</div>
                      <p class="text-h6 text--primary">
                        Soraya
                      </p>
                      <div class="text--primary">
                        Unha <br/>
                        23/07/2021 12:00 as 13:00
                      </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn
                          color="white" 
                          
                          
                          class="indigo--text"
                        >
                          Alterar
                        </v-btn>                        
                        <v-btn
                          color="red" 
                          
                          class="white--text"
                          
                        >
                          Cancelar
                        </v-btn>
                        
                        <v-btn
                          color="success"
                          
                          
                        >
                          Concluir
                        </v-btn>   
                    </v-card-actions>

        </v-card>      
  </div>      
</template>
 
<script>
import UserTypes from '../utils/UserTypes'
export default {
    name: 'HomeAgendamentoCard',
    props: [ 'agendamento', 'userLogged' ],
    data() {
      return {
        
      }
    },
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },      
    }
  }
</script>

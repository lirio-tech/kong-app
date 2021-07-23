<template>
  <div>
        <v-card
          class="mx-auto"
          max-width="344"
          :color="getColorSituation(agendamento.status)"
        >
              <v-card-text>
                      <div>{{ getTitle(agendamento.status) }}</div>
                      <p class="text-h6 text--primary">
                        {{ agendamento.customer.name }}
                      </p>
                      Profissional: <b>{{ agendamento.user.name }}</b> <br />
                      Serviço: <b>{{ getDescriptionServices(agendamento.services) }}</b> <br/>
                      {{ new Date(agendamento.dateTimeStartAt).toLocaleString('pt-BR').substring(0,10) }} às {{ new Date(agendamento.dateTimeStartAt).toLocaleString('pt-BR').substring(11,16) }} <br/>
                        
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
    // data() {
    //   return {
        
    //   }
    // },
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },      
      getColorSituation(situation) {
        if(situation === 'PRIOR') return 'red lighten-3';
        if(situation === 'PENDING') return 'info lighten-1';
        return ''
      },
      getTitle(status){
        if(status === 'PRIOR') return 'Conclua esse agendamento :)';
        if(status === 'PENDING') return 'Próximo Agendamento';
        return ''        
      },
        getDescriptionServices(services) {
            let description = ''
            for(var i in services) {
              description += `${services[i].type}, `
            }
            return description;
        },      
    }
  }
</script>

<template>
    <v-container>
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/system'}" 
                  >
                      <v-icon large color="blue-grey darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                  <span style="font-size: 1.8rem !important;">  
                      Avaliacoes
                  </span>
              </v-col>            
          </v-row>          
          <v-row>
            <v-col cols="12">
                <v-simple-table dense >
                    <template v-slot:default>
                      <thead >
                        <tr>
                            <th class="text-center">Usuário</th>
                            <th class="text-center">Score</th>
                            <th class="text-left">Description</th>
                            <th></th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="rate in rates" :key="rate._id">
                            <td class="text-center">{{ rate.userId }}</td>
                            <td class="text-center">{{ rate.scoreRating }}</td>
                            <td>{{ rate.ratingDescription }}</td>
                        </tr>
                      </tbody>
                    </template>
                </v-simple-table>

            </v-col>
                                                  <!-- <v-rating
                                        background-color="grey lighten-2"
                                        color="amber"
                                        hover
                                        v-model="scoreRating"
                                        length="5"
                                        size="40"
                                    ></v-rating> -->
          </v-row>
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../../../api/gateway';
import storage from '../../../storage';
export default {
    name: 'BackofficeRateUsList',
    components: {  },
    data: () => ({
      rates: []
    }),
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      gateway.getAllRatedUs(res => {
        this.rates = res;
        }, () => {
          alert('Erro ao Carregar avaliacoes');
        });
    },
    computed: {
    }
  }
</script>

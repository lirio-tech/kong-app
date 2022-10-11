<template>
    <v-container>
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
                <span class="mr-2 text-center grey--text" 
                   style="font-size: 2.0rem;">
                    Estabelecimentos Ativos
                </span>  
              </v-col>
          </v-row>     
          <v-row justify="start">
                <v-dialog
                  v-model="loading"
                  hide-overlay
                  persistent
                  width="300"
                >
                  <v-card
                    color="primary"
                    dark
                  >
                    <v-card-text>
                      Por favor aguarde...
                      <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                      ></v-progress-linear>
                    </v-card-text>
                  </v-card>
                </v-dialog>          
            </v-row>
            <v-row>
              <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-dialog
                      ref="dialog"
                      v-model="modal"
                      :return-value.sync="date" 
                      persistent
                      width="290px"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          v-model="datesDisplay"
                          label="Escolha o Periodo"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        v-model="dates"
                        range
                      >
                        <v-spacer></v-spacer>
                        <v-btn
                          text
                          color="primary"
                          @click="modal = false"
                        >
                          Cancel
                        </v-btn>
                        <v-btn
                          text
                          color="primary"
                          @click="$refs.dialog.save(date); getCompaniesActives(dates)"
                        >
                          OK
                        </v-btn>
                      </v-date-picker>
                    </v-dialog>
              </v-col>     
            </v-row> 
            <v-row> 
              <v-col cols="12">
                Total: {{ companies.length }} <br /><br />

                        <v-simple-table >
                          <template v-slot:default>
                            <thead>
                              <tr>
                                <th class="text-center caption">
                                  Company
                                </th>                                                              
                                <th class="text-center">
                                  Total
                                </th>
                                <th class="text-center caption">
                                  Plano
                                </th>                                                                                                  
                                <th class="text-center caption">
                                  Vencimento
                                </th> 
                                <th class="text-center caption">
                                  Ult. Lacto
                                </th>                                                                  
                              </tr>
                            </thead>
                            <tbody>
                              <tr
                                v-for="c in companies"
                                :key="c._id"
                              >
                                <td class="text-center caption">
                                    <router-link :to="`/system/companies/${c._id}/options`" class="primary--text">
                                        {{ c.shortName }}
                                    </router-link>
                                </td>
                                <td class="text-center caption">R$ {{ c.total | currency }}</td>
                                <td class="text-center caption">{{ c.planName }}</td>
                                <td class="text-center caption">{{ c.planDateEnd }}</td>
                                <td class="text-center caption">{{ c.lastAt }}</td>
                              </tr>
                            </tbody>
                          </template>
                        </v-simple-table>   
              </v-col>
            </v-row>
            <br/><br/><br/>
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../../api/gateway';
import storage from '../../storage';
import date from '../../utils/date';
export default {
    name: 'BackofficeCompaniesActives',
    components: { 
    },
    data: () => ({
      loading: false,
      dataReturnOK: true,
      userLogged: { 
        type: 'none'
      },
      dates: [date.getNewDateAddDay(0), date.dateToStringEnUS(new Date())], 
      date: new Date().toISOString().substr(0, 10),
      companies: []
    }),
    methods: {
      getCompaniesActives(dates) {
        this.loading = true;
        gateway.getAnalyticsCompaniesActives(dates,
          res => {
              this.dataReturnOK = true;
              this.loading = false;
              this.companies = res;
          }, () => {
              this.dataReturnOK = false;
              this.loading = false;
              alert('Erro ao Buscar Estabelecimentos Ativos');
          });           
      },
      optionCompany(company) {
          this.$route.push(`/system/companies/${company._id}/options`);
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();   
      this.getCompaniesActives(this.dates);
    },
    computed: {
      datesDisplay() {
        console.log(this.dates);
        if(this.dates[0] && this.dates[1]) {
          let ini = this.dates[0].split('-');
          let end = this.dates[1].split('-');
          return `${ini[2]}/${ini[1]} à ${end[2]}/${end[1]}`; 
        } 
        let ini = this.dates[0].split('-');
        return `${ini[2]}/${ini[1]}/${ini[0]}`;
      },      
    }
    
  }
</script>

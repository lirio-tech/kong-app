<template>

  <div>

    <v-card
      class="mx-auto"
      max-width="800"
      outlined
    >
            <v-list-item three-line>
              <router-link :to="{ path:'/analytics'}" style="color: inherit; text-decoration: none">
                  <v-list-item-content >       
                        <v-col cols="12">
                           <span class="icon-emoji">✂️</span> <span class="grey--text" style="margin-left: 15px">Ordem de Serviços</span>
                            <v-icon class="chevron-right">mdi-chevron-right</v-icon>
                        </v-col>                                            
                        <v-col cols="11" style="margin-top: -20px;">
                          <div class="overline mb-4 grey--text" >
                              Periodo: 
                              <span class="">{{ ordersGroup.periodDescription }}</span>
                          </div>                           
                        </v-col>       
            
                        <v-col cols="7">
                          <v-list-item-title class="headline mb-1" style="margin-top: -40px;">
                              <span class="caption grey--text">Total Recebido</span><br/>
                              <div style="font-size: 1.5rem" v-if="!loading">
                                <span class="">R$ {{ ordersGroup.total | currency }} </span>
                              </div>
                              <div v-else> 
                                    <v-skeleton-loader tile type="heading" />
                              </div>                              
                          </v-list-item-title>
                        </v-col>
                        <v-col cols="5">
                          <v-list-item-title class="text-center" style="margin-top: -40px;">
                              <span class="caption grey--text">Qtde.</span><br/>
                              <span class="">{{ ordersGroup.amount }} </span>                                                   
                          </v-list-item-title>
                        </v-col>          
                        <v-col cols="7" v-if="!loading">
                          <v-list-item-title class="" style="margin-top: -10px;">
                              <span class="caption grey--text">Liquido Recebido</span><br/>
                                <span class="">R$ {{ ordersGroup.netTotal | currency }} </span>                           
                          </v-list-item-title>
                        </v-col>
                        <v-col cols="5" v-if="!loading">
                          <v-list-item-title class="text-center" style="margin-top: -10px;">
                              <span class="caption grey--text">Paguei de Taxa</span><br/>
                              <span class="">R$ {{ ordersGroup.cardRateValueDiscount | currency }} </span>                        
                          </v-list-item-title>
                        </v-col>                                             
                        <hr-line />
                        <v-col cols="4" class="text-center">
                            <v-icon color="green" style="margin-top: -4px">
                              mdi-cash
                            </v-icon> 
                            <br/>
                            <span class="grey--text" style="font-size: 1.1rem" v-if="!loading">
                              R$ {{ ordersGroup.cash | currency }}
                            </span>
                            <div v-else style="margin-left: 30px"> 
                                  <v-skeleton-loader tile type="heading" />
                            </div>                                                       
                        </v-col>
                        <v-col cols="4" style="margin-top:5px" class="text-center" small>
                            <v-icon color="purple" style="margin-top: -2px">
                              mdi-credit-card
                            </v-icon>                                    
                            <br/>
                            <span class="grey--text" style="font-size: 1.1rem" v-if="!loading">
                              R$ {{ ordersGroup.card | currency }}
                            </span>                                
                            <div v-else style="margin-left: 30px"> 
                                  <v-skeleton-loader tile type="heading" />
                            </div>                                                                                   
                        </v-col> 
                        <v-col cols="4" style="margin-top:5px" class="text-center" small>
                            <v-icon color="teal lighten-2" style="margin-top: -2px">
                              mdi-rhombus-split
                            </v-icon>                                    
                            <br/>
                            <span class="grey--text" style="font-size: 1.1rem" v-if="!loading">
                              R$ {{ ordersGroup.pix | currency }}
                            </span>                                
                            <div v-else style="margin-left: 30px"> 
                                  <v-skeleton-loader tile type="heading" />
                            </div>                                                                                       
                        </v-col> 

                        <hr-line />
                        <br/>
                        <div class="caption grey--text" v-if="ordersByUsers && ordersByUsers.length > 0">
                            <span class="">Total de Lucro</span>
                        </div>                          
                        <v-row 
                          style="margin-top:-5px"
                        >
                            <v-col cols="2" class="text-center" v-if="!loading">
                                <v-icon color="grey">mdi-home</v-icon>
                            </v-col>
                            <v-col cols="5" class="grey--text" style="font-size: 1.1rem" v-if="!loading">
                                  {{ company.shortName }}
                            </v-col> 
                            <v-col 
                              v-if="!loading"
                              cols="4" 
                              class="grey--text" 
                              :style="'font-size: 1.1rem;'"
                            >
                                R$ {{ ordersGroup.totalCompany | currency }}
                            </v-col>
                            <v-col 
                              v-if="loading"
                              cols="12" 
                            >
                              <v-skeleton-loader tile type="list-item" />
                            </v-col>                            
                        </v-row>                           
                        <div class="caption grey--text" v-if="ordersByUsers && ordersByUsers.length > 0">
                            <span class="">Comissão</span>
                        </div>                              
                        <v-row 
                          v-for="usr in ordersByUsers" 
                          :key="usr._id" 
                          style="margin-top:-5px"
                        >
                            <v-col cols="2" class="text-center">
                                <v-icon color="grey">mdi-account</v-icon>
                            </v-col>
                            <v-col cols="5" class="grey--text" style="font-size: 1.1rem">
                                  {{ usr._id }}
                            </v-col> 
                            <v-col cols="4" class="grey--text" :style="'font-size: 1.1rem;'">
                                  R$ {{ usr.commission | currency }}
                            </v-col>
                        </v-row>                         
                        <hr-line v-if="ordersGroup.amount" style="margin-top: 15px;"/>
                  </v-list-item-content>
              </router-link>
            </v-list-item>
            <v-card-actions > 
                <v-col cols="12" class="text-center" style="margin-top: -15px;">
                  <v-btn 
                      :to="{ path:'/ordem-servico'}" 
                      class="ma-2 primary--text"
                      x-large
                      style="width: 80%"
                      :color="btnNew"
                  >
                    <v-icon style="margin-right: 10px;">
                      mdi-content-cut
                    </v-icon>
                    Novo 
                  </v-btn>  
                </v-col>
            </v-card-actions>
            <v-col cols="12" class="text-center" style="margin-top: -30px;margin-bottom: -15px;">
              <router-link to="/orders" style="color: inherit; text-decoration: none">
                <v-btn text class="overline grey--text">
                  Ver Detalhes                                    
                </v-btn>
                  
              </router-link>
            </v-col>        
    </v-card>              

  </div>                
                          
</template>

<script>
import storage from '../storage';
import HrLine from './HrLine.vue'
export default {
  name: 'HomeOrderServiceAdmin',
  components: { HrLine },
  props: [ 'ordersGroup', 'ordersByUsers', 'company', 'loading'],
  data() {
    return {
      btnNew: ''
    }
  },
  mounted() {
      let incBtn = storage.getIncrementButton();
      if(incBtn % 3 === 0 || incBtn === 0) {
          setTimeout(() => {
            this.btnNew = this.$vuetify.theme.dark ? 'secondary darken-5' : 'purple lighten-5'
            setTimeout(() => { this.btnNew = '' }, 1000)
          }, 2000) 
      }
      incBtn++;
      storage.incrementButton(incBtn);
  }      
}
</script>
<style scoped>
  .green--text--lighten-3 {
    color: #C5E1A5
  }
</style>
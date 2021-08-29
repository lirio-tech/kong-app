<template>

  <div v-if="companySite">
    <v-card
      class="mx-auto"
      max-width="800"
      outlined
    >
        <router-link :to="{ path: '/@/'+companySite.arroba }"  style="color: inherit; text-decoration: none">
             <v-card-text class="black--text" style="margin-top: -10px;margin-bottom: -12px;">
                <v-col cols="12" >
                    <span class="icon-emoji">💎</span> 
                    <span class="grey--text" style="margin-left: 25px; font-size: 1.2rem">Meu Site</span>
                    <v-icon style="margin-top: 0px;float: right;">mdi-chevron-right</v-icon>
                </v-col>   
             </v-card-text>
        </router-link>
    </v-card>            

  </div>                
                          
</template>

<script>
import companyGateway from '../api/companyGateway'
import storage from '../storage';
export default {
    name: 'HomeSite',
    props: [ 'company' ],
    data: () => ({
        companySite: {},
    }),
    beforeMount() {
          if(storage.getCompanySite()) {
            this.companySite = storage.getCompanySite();
            storage.setCompanySite(JSON.stringify(this.companySite));
          } else {
            companyGateway.getCompanySiteById(this.company._id,
                (res) => {
                    if(res) this.companySite = res;
                }, () => {
                    alert('Erro ao buscar informaçoes do Site ');
                });
          }
    }
  }
</script>

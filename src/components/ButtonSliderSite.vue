<template>

  <v-slide-item
    v-slot="{ active, toggle }"
    v-if="companySite.arroba"
  >
    <v-btn
      style="margin-top: 7px;"
      class="mx-2"
      :input-value="active"
      active-class="purple white--text"
      depressed
      @click="toggle"
      :to="{ path: '/@/'+companySite.arroba }" 
    >
        <span class="icon-emoji">💎</span> 
        <span class="grey--text" style="margin-left: 5px;">Meu Site</span>          
    </v-btn>
  </v-slide-item>                     
                          
</template>

<script>
import companyGateway from '../api/companyGateway'
import storage from '../storage';
export default {
    name: 'ButtonSliderSite',
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

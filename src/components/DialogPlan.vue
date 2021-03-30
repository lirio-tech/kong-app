<template>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <div>
        <v-card>
          <v-toolbar
            dark
            class="blue-grey darken-3"
          >
            <v-btn
              icon
              dark
              small
              @click="$emit('show-plan-dialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title >
                Escolha o Plano melhor para VC :-)
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
        </v-card>
        <v-container style="margin-top: -12px;">
          <CardPlanData 
              :company="company" 
              :showBtnPlanDialog="false"
              :userView="userLogged"
          />   

          <v-card
              v-for="plan in plans" 
              :key="plan._id"
              outlined
            >
              <v-subheader class="overline">
                Plano {{ (plan.type === 'Free' ? '' : 'Premium ') + plan.type }}
              </v-subheader>
              <v-list-item two-line>
                <v-list-item-content>
                  <v-list-item-title 
                    class="headline " 
                    :style="'color:'+plan.color"
                  >
                    {{ plan.name }}
                    <v-chip 
                      v-if="company && company.plan.name === plan.name"
                      color="green" 
                      style="margin-left: 15px;" 
                      outlined
                    >
                        Seu plano Atual
                    </v-chip>
                    <v-chip 
                      v-if="(plan.advantage && !userLogged) || (plan.advantage && company && company.plan.name !== plan.name)"
                      color="yellow" 
                      style="margin-left: 15px;" 
                      outlined
                    >
                      Mais Vantajoso
                    </v-chip>           
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>

              <v-card-text>
                <v-row align="center">
                  <v-col
                    cols="12"
                  >
                    <span class="display-3">
                        {{ plan.price | currency }}
                    </span>
                    <span v-if="plan.type === 'Mensal' || plan.type === 'Anual'">
                      por {{ plan.type === 'Mensal' ? 'Mês' : 'Ano' }}
                    </span>              
                  </v-col>
                </v-row>
              </v-card-text>

              <v-list-item
                v-for="benefit in plan.benefits"
                :key="benefit.description"
              >
                  
                  <v-icon>
                    {{ benefit.icon }}
                  </v-icon>
                  
                  <span style="margin-left: 15px" class="subtitle-1 grey--text">{{ benefit.description }}</span>
              </v-list-item>

              <v-card-actions>
                <v-btn 
                  v-if="company && plan.name === company.plan.name && 'Free' === company.plan.name"
                  style="width: 100%; color: green" 
                  x-large 
                  readonly
                >
                  <v-icon left>mdi-check</v-icon>
                  Plano Atual
                </v-btn>                  
                <v-btn 
                  v-if="company && plan.name === company.plan.name && 'Free' !== company.plan.name"
                  style="width: 100%; color: green" 
                  x-large 
                  @click="goPayment(plan)"
                >
                  <v-icon left>mdi-check</v-icon>
                  Renovar Plano
                </v-btn>             
                <v-btn 
                  v-if="!company || plan.name !== company.plan.name"
                  style="width: 100%"
                  :color="plan.color" 
                  x-large
                  @click="goPayment(plan)"
                >
                  <v-icon left v-if="plan.button.icon">{{ plan.button.icon }}</v-icon>
                  {{ plan.button.label }}
                </v-btn>          
              </v-card-actions>

          </v-card>
          <v-card style="margin-top: 0px; margin-bottom: -30px;" outlined>
            <v-alert        
              prominent
            >
              <br/>
              <v-row>
                <v-col cols="12" class="overline">
                  Não encontrou um plano ideal? <br/>
                  Simule um Plano Ideal para você ;-)
                </v-col>
                <v-col cols="12" class="text-center">
                  <router-link to="/public/simulator-plan" style="color: inherit; text-decoration: none">
                    <v-btn x-large style="width: 100%;">Simular Plano</v-btn>
                  </router-link>
                </v-col>
              </v-row>
              <br/>
            </v-alert>
          </v-card>
        </v-container>
      </div>      

    </v-dialog>    
</template>

<script>
import gateway from '../api/gateway'
import storage from '../storage'
import CardPlanData from '../components/CardPlanData'
import UserTypes from '../utils/UserTypes'
export default {
    props:['dialog'],
    components: {
      CardPlanData
    },
    data () {
      return {
        company: {
          plan: { name: 'Free' }
        },
        plans: [], 
      }
    },
    beforeMount() {
      this.company = storage.getCompany();
      this.userLogged = storage.getUserLogged();
      this.plans = gateway.getAllPlans();
    },    
    methods: {
      goPayment(plan) {
        if(!this.userLogged) {
          alert('Cadastre-se ou Efetue o Login para escolher seu Plano');
          return;
        }
        if(plan.name === 'Free' && this.company && this.company.plan.name !== 'Free') {
          this.$router.push(`/admin/payment-free`);
          return;
        }        
        this.$router.push(`/admin/payment/${plan.name}`);
      },
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      }
    }
}
</script>
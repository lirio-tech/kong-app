<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="white darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="9" align="center">   
                      <span style="font-size: 1.8rem !important;" class="white--text">Simulador </span>
              </v-col>
          </v-row>    
          <v-row>
              <v-col cols="12">
                  
                <v-slider
                    v-model="amountUsersAdmin"
                    min="1"
                    label="Admin"
                    prepend-icon="mdi-account"
                    max="10"
                    thumb-label
                ></v-slider>                
              </v-col>
              <v-col cols="12">
                <v-slider
                    style="margin-top: -25px"
                    v-model="amountUsersCommon"
                    min="0"
                    prepend-icon="mdi-account"
                    label="Comum"
                    max="15"
                    thumb-label
                ></v-slider>                
              </v-col>         
              <v-col cols="12">
                <v-slider
                    style="margin-top: -25px"
                    v-model="cashMouth"
                    min="3"
                    prepend-icon="mdi-content-cut"
                    label="1K Mes"
                    max="60"
                    thumb-label
                ></v-slider>                
              </v-col>       
              <v-col cols="12">
                <v-slider
                    style="margin-top: -25px"
                    v-model="amountMouth"
                    min="1"
                    prepend-icon="mdi-calendar"
                    label="Meses"
                    max="24"
                    thumb-label
                ></v-slider>                
              </v-col>                                   
          </v-row>      
          <v-row>
              <v-col cols="12">
                    <v-card
                        outlined
                        style="margin-top: -20px"
                    >
                        <v-subheader class="overline">
                            Plano Premium 
                            <span class="amber--text" style="margin-left:15px">
                                {{ amountMouth + ' ' + (amountMouth > 1 ? 'Meses' : 'Mês') }} 
                            </span>
                            <router-link 
                                style="margin-left: 30px;" 
                                :to="`/system/companies/${company._id}?planName=Smart&price=${plan.price}&amountUsers=${amountUsersAdmin+amountUsersCommon}&amountUsersAdmin=${amountUsersAdmin}&amountUsersCommon=${amountUsersCommon}&maxCash=${cashMouth*1000}&amountMouth=${amountMouth}`" 
                                v-if="userLogged.type === 'sys_admin'"
                            >
                                Apply Plan
                            </router-link>                            
                        </v-subheader>
                        <v-list-item two-line style="margin-top: -20px">
                            <v-list-item-content>
                                <v-list-item-title 
                                    class="headline " 
                                >
                                    Personalizado               
                                </v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>

                        <v-card-text style="margin-top: -20px">
                            <v-row align="center">
                            <v-col
                                cols="12"
                            >
                                <span 
                                    class="text-decoration-line-through subtitle-1 grey--text" 
                                    v-if="plan.priceWithoutDiscount > plan.price"
                                >
                                    R$ {{ plan.priceWithoutDiscount | currency }}
                                </span> 
                                <span 
                                    style="margin-left: 10px;"
                                    class="subtitle-1 grey--text" 
                                    v-if="plan.priceWithoutDiscount > plan.price"
                                >
                                    {{ Math.trunc(plan.discountPercentage * 100) }}% OFF
                                </span>                                 
                                <br/>
                                <span class="display-3">
                                    R$ {{ plan.price | currency }}
                                </span>
                            </v-col>
                            </v-row>
                        </v-card-text>

                        <v-list-item v-for="benefit in plan.benefits" :key="benefit._id" style="margin-top: -7px">                            
                            <v-icon>
                                {{ benefit.icon }}
                            </v-icon>                            
                            <span style="margin-left: 15px" class="subtitle-1 amber--text">{{ benefit.description }}</span>
                        </v-list-item>

                        <v-card-actions>
                            <v-btn 
                                style="width: 100%;color: #48a287"
                                x-large
                                @click="goPayment(plan)"
                            >
                                <v-icon left>mdi-rocket-launch</v-icon>
                                Pagar com Pix
                            </v-btn>          
                        </v-card-actions>

                    </v-card>         
              </v-col>
          </v-row>
          <br/><br/><br/>
        </v-main>
    </v-container>
</template>

<script>
//import gateway from '../api/gateway'
import AppBar from '../components/AppBar'
import storage from '../storage';
import UserTypes from '../utils/UserTypes'
export default {
    name: 'SimulatorPlan',
    components: { 
        AppBar, 
    },
    data: () => ({
        amountUsersAdmin: 1,
        amountUsersCommon: 0,
        amountMouth: 1,
        cashMouth: 2,
        userLogged: {},
        company: {}
    }),
    methods: {
        goPayment(plan) {
            console.log(plan)
            if(!this.userLogged) {
                alert('Cadastre-se ou Efetue o Login para escolher seu Plano');
                return;
            }
            storage.setPlanCustom(JSON.stringify(plan));
            this.$router.push(`/admin/payment/${plan.name}`);            
        },
        numberUsToBr(v) {
            return v.toLocaleString('pt-br', {minimumFractionDigits: 2});
        },      
        isAdmin() {
            return UserTypes.isAdmin(this.userLogged.type)
        }        
    },
    beforeMount() {
        this.userLogged = storage.getUserLogged();
        this.company = storage.getCompany();
        if(this.company.plan.name !== 'Free') {
            this.amountUsersAdmin = this.company.plan.amountUsersAdmin;
            this.amountUsersCommon = this.company.plan.amountUsersCommon;            
            this.cashMouth = (this.company.plan.maxCash/1000);

            let diffMillis = Math.abs(new Date(this.company.plan.dateEnd)  - new Date(this.company.plan.dateStarted));
            let diffMonth = diffMillis / 1000 / 60 / 60/ 24 / 30; 
            this.amountMouth = diffMonth;
        }
    },
    computed: {
        plan() {
            let priceWithoutDiscount = ((this.amountUsersAdmin*5)+(this.amountUsersCommon*2.5)+(this.cashMouth*0.75))*this.amountMouth;
            let discountPercentage = (this.amountMouth*0.01);
            if(discountPercentage > 0.20) {
                discountPercentage = 0.20
            }
            
            let priceOfTheDiscount = priceWithoutDiscount * discountPercentage;
            let priceAppliedDiscount = priceWithoutDiscount - priceOfTheDiscount;
            if(priceAppliedDiscount < 9.99) {
                priceAppliedDiscount = 9.99
            }
            let codePix = `00020126510014BR.GOV.BCB.PIX0114+55119431974870211Plano Smart5204000053039865802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062140510PlanoSmart63045227`;
            return {
                name: "Personalizado",
                type: `Meses=${this.amountMouth}`,
                price: priceAppliedDiscount,
                priceWithoutDiscount: priceWithoutDiscount,
                priceOfTheDiscount: priceOfTheDiscount,
                discountPercentage: discountPercentage,
                benefits: [
                    {
                        icon: "mdi-account",
                        description: `${this.amountUsersAdmin} Usuário(s) Admin`
                    },
                    {
                        icon: "mdi-account",
                        description: `${this.amountUsersCommon} Usuário(s) Comum`
                    },                
                    {
                        icon: "mdi-content-cut",
                        description: `R$${ this.numberUsToBr(this.cashMouth*1000)} por Mês de Lançamentos`
                    }
                ],
                button: {
                    label: "Quero Esse",
                    icon: "mdi-rocket-launch"
                },
                color: "cyan",
                advantage: false,
                pixCopyAndPast: codePix
            };
        }
    }
}
</script>

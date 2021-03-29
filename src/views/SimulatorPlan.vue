<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/'}"
                  >
                      <v-icon large color="blue-grey">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="9" align="center">   
                      <span style="font-size: 1.8rem !important;">Simulador </span>
              </v-col>
          </v-row>    
          <v-row>
              <v-col cols="12">
                <v-slider
                    v-model="amountUsersAdmin"
                    min="1"
                    label="Usuario Admin"
                    max="5"
                    thumb-label
                ></v-slider>                
              </v-col>
              <v-col cols="12">
                <v-slider
                    style="margin-top: -20px"
                    v-model="amountUsersCommon"
                    min="0"
                    label="Usuario Comum"
                    max="20"
                    thumb-label
                ></v-slider>                
              </v-col>         
              <v-col cols="12">
                <v-slider
                    style="margin-top: -20px"
                    v-model="cashMouth"
                    min="2"
                    label="R$ 1K p/ Mes"
                    max="50"
                    thumb-label
                ></v-slider>                
              </v-col>       
              <v-col cols="12">
                <v-slider
                    style="margin-top: -20px"
                    v-model="amountMouth"
                    min="1"
                    label="Qtde de Meses"
                    max="60"
                    thumb-label
                ></v-slider>                
              </v-col>                                   
          </v-row>      
          <v-row>
              <v-col cols="12">
                    <v-card
                        outlined
                    >
                        <v-subheader class="overline">
                            Plano Premium <span class="amber--text">{{ ' - ' + amountMouth + ' ' + (amountMouth > 1 ? 'Meses' : 'Mês') }} </span>
                        </v-subheader>
                        <v-list-item two-line>
                            <v-list-item-content>
                            <v-list-item-title 
                                class="headline " 
                            >
                                Personalizado
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
                            </v-col>
                            </v-row>
                        </v-card-text>

                        <v-list-item v-for="benefit in plan.benefits" :key="benefit._id">                            
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
                                                    
        </v-main>
    </v-container>
</template>

<script>
//import gateway from '../api/gateway'
import AppBar from '../components/AppBar'
import storage from '../storage';
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
        userLogged: {}
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
    },
    beforeMount() {
        this.userLogged = storage.getUserLogged();
    },
    computed: {
        plan() {
            let price = ((this.amountUsersAdmin*5)+(this.amountUsersCommon*2.5)+(this.cashMouth*0.75))*this.amountMouth;
            //price = price - (price * (this.amountMouth*0.05))
            if(price < 9.99) {
                price = 9.99
            }
            let codePix = `00020126720014BR.GOV.BCB.PIX0111353576598690235WiskritorioApp-Plano Premium Personalizado5204000053039865405${price}5802BR5925Diego Lirio Damacena Pere6009SAO PAULO61080540900062160512NUAdeHEok7F463047A09`;
            return {
                name: "Personalizado",
                type: "Mensal",
                price: price,
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
                color: "blue",
                advantage: false,
                pixCopyAndPast: codePix
            };
        }
    }
}
</script>

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
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.8rem !important;">Aplicar Plano </span>
              </v-col>
          </v-row>    
          <v-row >
              <v-container>
                <v-col cols="12" align="center">   
                        <v-radio-group
                            v-model="view"
                            row
                        >
                            <v-radio
                                label="Aplicar Plano"
                                value="APPLY_PLAN"
                            ></v-radio>                    
                            <v-radio
                                label="Verificar Dados"
                                value="EDIT"
                            ></v-radio>
                        </v-radio-group>
                </v-col>
              </v-container>
          </v-row>
          <v-row v-if="'APPLY_PLAN' === view">
              <v-col cols="12">   
                    <v-form 
                        v-model="valid" 
                        v-on:submit.prevent="applyPlanNow"
                        ref="applyPlanForm"
                        id="applyPlanForm"
                    >    
                    <v-container>
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12"
                            style="margin-left: 20%"
                        >
                            <h3>Plano: {{ planView.name }}</h3>
                            <v-radio-group
                                v-model="planView.name"
                                mandatory
                            >
                                <v-radio
                                    label="Simples"
                                    value="Simples"
                                ></v-radio>
                                <v-radio
                                    label="Top"
                                    value="Top"
                                ></v-radio>      

                                <v-radio
                                    label="Smart"
                                    value="Smart"
                                ></v-radio>                                                                                                                                                                
                            </v-radio-group>                                                           
                        </v-col>    
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12">
                            <v-text-field
                                autocomplete="off"
                                label="Valor do pagamento"
                                v-model="planView.price"
                                @focus="$event.target.select()"
                                ref="servicePrice"
                                :rules="[v => !!v || 'Obrigatório',]"
                                @keyup="planView.price = maskCurrency(planView.price)"
                                filled
                            />
                            <!-- <kong-money 
                                v-model="planView.price"
                                :label="'Valor do pagamento'"
                                @mask-currency="maskCurrency"
                                :rules="[v => !!v || 'Obrigatório',]"
                            /> -->
                        </v-col>        
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12">
                            <v-menu
                            v-model="menu2"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                :value="computedDateFormattedMomentjsStart"
                                label="Inicio"
                                readonly
                                filled
                                v-bind="attrs"
                                v-on="on"
                                :rules="[v => !!v || 'Obrigatório',]"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="planView.dateStart"
                                @input="menu2 = false"
                                locale="pt-br"
                            ></v-date-picker>
                            </v-menu>                            
                        </v-col>
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12">
                            <v-menu
                            v-model="menu1"
                            :close-on-content-click="false"
                            :nudge-right="40"
                            transition="scale-transition"
                            offset-y
                            min-width="auto"
                        
                            >
                            <template v-slot:activator="{ on, attrs }">
                                <v-text-field
                                :value="computedDateFormattedMomentjsEnd"
                                label="Fim"
                                readonly
                                filled
                                v-bind="attrs"
                                v-on="on"
                                :rules="[v => !!v || 'Obrigatório',]"
                                ></v-text-field>
                            </template>
                            <v-date-picker
                                v-model="planView.dateEnd"
                                @input="menu1 = false"
                                locale="pt-br"
                            ></v-date-picker>
                            </v-menu>                            
                        </v-col>                               
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12" v-if="planView.name === 'Smart'">
                            <v-text-field 
                                v-model="planView.amountUsers"
                                label="Qtde Usuarios"
                                ref="applyAmountUsers"
                                prepend-icon="mdi-account"
                                filled
                            />
                        </v-col>     
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12" v-if="planView.name === 'Smart'">
                            <v-text-field 
                                v-model="planView.amountUsersAdmin"
                                label="Qtde Usuarios Admin"
                                ref="applyamountUsersAdmin"
                                prepend-icon="mdi-account"
                                filled
                            />
                        </v-col>
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12" v-if="planView.name === 'Smart'">
                            <v-text-field 
                                v-model="planView.amountUsersCommon"
                                label="Qtde Funcionários"
                                ref="amountUsersCommon"
                                prepend-icon="mdi-account"
                                filled
                            />
                        </v-col>                        
                        <v-col  xl="6" lg="6" md="8" sm="12" xs="12" cols="12" v-if="planView.name === 'Smart'">
                            <v-text-field 
                                v-model="planView.maxCash"
                                label="R$ Max de Valor Lancado"
                                ref="maxCash"
                                prepend-icon="mdi-cash"
                                filled
                            />
                        </v-col>    

                            <v-btn 
                                type="submit" 
                                depressed  
                                x-large 
                                color="green"
                                :loading="loadingSave"
                                :disabled="loadingSave"
                                style="width: 100%"
                                align="center"
                            >Aplicar Plano</v-btn>                                                        
                        
                    </v-container>
                    </v-form>
              </v-col>
          </v-row>
          <v-row v-if="view === 'EDIT'">
              <v-col cols="12" align="center">   
                <v-form 
                    v-model="valid" 
                    v-on:submit.prevent="save"
                    ref="companyForm"
                    id="companyForm"
                >         
                    <v-row>
                            <v-col cols="12" md="4">                      
                                <v-text-field
                                    autocomplete="off"
                                    label="Nome do seu Estabelecimento"
                                    prepend-icon="mdi-home"
                                    required filled readonly
                                    :rules="[val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres']"
                                    v-model="company.name"
                                    ref="companyName"
                                />
                            </v-col>
                            <v-col cols="12" md="4">                      
                                <v-text-field
                                    autocomplete="off"
                                    label="Nome Abreviado"
                                    prepend-icon="mdi-home"
                                    :rules="[ 
                                        val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres',
                                        val => val && val.length <= 13 || 'tamanho maximo eh de 13 Caracteres',
                                    ]"
                                    required filled readonly
                                    v-model="company.shortName"
                                    ref="companyShortName"
                                />
                            </v-col>    
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.payment.price"
                                    label="Valor do Pagamento"
                                    ref="price"
                                    prepend-icon="mdi-cash"
                                    filled
                                />
                            </v-col>                                                                                           
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.dateStarted"
                                    label="Inicio do Plano"
                                    ref="date"
                                    prepend-icon="mdi-calendar"
                                    filled readonly
                                />
                            </v-col>     
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.dateEnd"
                                    label="Fim do Plano"
                                    ref="dateEnd"
                                    prepend-icon="mdi-calendar"
                                    filled
                                />
                            </v-col>         
                            <v-col cols="12" md="4">
                                <v-text-field 
                                    v-model="company.plan.name"
                                    label="Plano"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled  readonly
                                    :disabled="company.plan.name != 'Smart'"
                                />
                            </v-col>                                                                             
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.amountUsers"
                                    label="Quantidade de Usuarios"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled 
                                    :disabled="company.plan.name != 'Smart'"
                                />
                            </v-col>      
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.amountUsersAdmin"
                                    label="Usuarios Admin"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled readonly
                                    :disabled="company.plan.name != 'Smart'"
                                />
                            </v-col>     
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.amountUsersCommon"
                                    label="Funcionários"
                                    ref="amountUsersCommon"
                                    prepend-icon="mdi-cash"
                                    filled 
                                    :disabled="company.plan.name != 'Smart'"
                                />
                            </v-col>            
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.maxCash"
                                    label="Valor Maximo p/ Lancamento"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled readonly
                                    :disabled="company.plan.name != 'Smart'"
                                />
                            </v-col>                                                                                                                                                                                                                
                            <v-col cols="12" md="4">
                                <v-text-field
                                    label="Criado"
                                    v-model="company.createdAt"
                                    ref="createdAt"
                                    prepend-icon="mdi-calendar"
                                    required filled disabled
                                />
                            </v-col>
                            <v-col cols="12" md="4">
                                    <v-text-field
                                    label="Alterado"
                                    v-model="company.updatedAt"
                                    ref="updatedAt"
                                    prepend-icon="mdi-calendar"
                                    required filled disabled
                                    />
                            </v-col>   
                    </v-row>    
                    <v-row 
                        align="center"
                        justify="space-around"
                    >
                            <v-btn 
                                type="button"  
                                depressed  
                                x-large 
                                color="purple"
                                style="width: 80%"
                                @click="selectCompany"
                            >Entrar como {{ company.shortName }} </v-btn>                                
                    </v-row>       
                </v-form>    
              </v-col> 
          </v-row>                                           
          <br/><br/>
        </v-main>
    </v-container>
</template>

<script>
import companyGateway from '../../api/companyGateway'
import storage from '../../storage'
import inputs from '../../utils/inputs'
import moment from 'moment'
import date from '../../utils/date'
export default {
    name: 'UsuarioForm', 
    components: { 
    },
    data: () => ({
        menu1: false,
        menu2: false,
        loadingSave: false,
        valid: true,
        show: false,
        company: { 
            plan: {}
        },
        view: 'APPLY_PLAN',
        planView: { 
            name: 'Simples', 
            price: '9,90', 
            amountUsers: 2, 
            amountUsersAdmin: 1, 
            amountUsersCommon: 1, 
            maxCash: 5000,
            dateStart: date.getNewDateAddDay(0),
            dateEnd: date.getNewDateAddDay(30),
        },
    }),
    methods: {
      selectCompany() {
          this.userLogged.company = this.company._id;
          storage.setUserLogged(JSON.stringify(this.userLogged));
          storage.setCompany(JSON.stringify(this.company));
          this.$router.push('/');
      },       
      numberBrToUS(v) {
        return Number(v.replace('R$ ', '').replace('.', '').replace(',', '.'));
      },          
      applyPlanNow() {
        if(!this.$refs.applyPlanForm.validate()) {
            return;
        }

        if(!this.planView.name) {
            alert('Selecione o Plano');
            return;
        }

        const planApply = {
            name: this.planView.name,
            price: this.numberBrToUS(this.planView.price),
            amountUsers: this.planView.amountUsers,
            amountUsersAdmin: this.planView.amountUsersAdmin,
            amountUsersCommon: this.planView.amountUsersCommon,
            maxCash: this.planView.maxCash,
            dateStart: this.planView.dateStart,
            dateEnd: this.planView.dateEnd,
        };

        companyGateway.applyPlan(this.company._id, planApply,
            res => {
                this.company = res;
                alert('Plano Alterado com Sucesso');
                this.view = 'EDIT'
            },
            (err) => {
                if(err.response.status >= 400 && err.response.status <= 499) {
                alert(err.response.data.message)              
                return;
                }                     
                alert('Erro, Tente novamente');
            })
      },
      maskCurrency(value) {
          return inputs.maskCurrency(value)
      },
    },
    beforeMount() { 
        this.userLogged = storage.getUserLogged();   

        companyGateway.getCompanyById(
                    this.$route.params._id,
                    res => { 
                        this.company = res;
                        if(this.$route.query.planName) {
                            this.planView.name = this.$route.query.planName;
                            this.planView.price = inputs.maskCurrency(this.$route.query.price+'0');
                            this.planView.amountUsers = this.$route.query.amountUsers;
                            this.planView.amountUsersAdmin = this.$route.query.amountUsersAdmin;
                            this.planView.amountUsersCommon = this.$route.query.amountUsersCommon;
                            this.planView.maxCash = this.$route.query.maxCash;
                            if(this.$route.query.amountMouth) { 
                                this.planView.dateStart = date.getNewDateAddDay(0);
                                this.planView.dateEnd = date.getNewDateAddDay(this.$route.query.amountMouth*30);
                            }
                        } else {
                            this.planView.name = this.company.plan.name;
                            // if(this.planView.name == 'Simples' || this.planView.name == 'Top' || this.planView.name == 'Smart') { 
                            //     this.planView.price = this.company.plan.payment.price;
                            //     this.planView.amountUsers = this.company.plan.amountUsers;
                            //     this.planView.amountUsersAdmin = this.company.plan.amountUsersAdmin;
                            //     this.planView.amountUsersCommon = this.company.plan.amountUsersCommon;
                            //     this.planView.maxCash = this.company.plan.maxCash;                            
                            // } 
                        }
                    },
                    () => alert('Erro, tente novamente')
            );        
      

    },
    computed: {
      computedDateFormattedMomentjsStart() {
        moment.locale('pt-br');
        return this.planView.dateStart ? moment(this.planView.dateStart).format('DD/MM/YYYY') : ''
      },   
      computedDateFormattedMomentjsEnd() {
        moment.locale('pt-br');
        return this.planView.dateEnd ? moment(this.planView.dateEnd).format('DD/MM/YYYY') : ''
      },        
    }    
  }
</script>

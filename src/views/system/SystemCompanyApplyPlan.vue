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
            <v-form 
                v-model="valid" 
                v-on:submit.prevent="applyPlanNow"
                ref="applyPlanForm"
                id="applyPlanForm"
            >    
              <v-container>
                <v-col cols="12" md="4"
                    style="margin-left: 20%"
                >
                    <h3>Plano: {{ applyPlan.name }}</h3>
                    <v-radio-group
                        v-model="applyPlan.name"
                        mandatory
                    >
                        <v-radio
                            label="Basico"
                            value="Basico"
                        ></v-radio>
                        <v-radio
                            label="Gold"
                            value="Gold"
                        ></v-radio>    
                        <v-radio
                            label="É Nóis"
                            value="É Nóis"
                        ></v-radio>      
                        <v-radio
                            label="Tamo Junto"
                            value="Tamo Junto"
                        ></v-radio>          
                        <v-radio
                            label="Infinity"
                            value="Infinity"
                        ></v-radio>        
                        <v-radio
                            label="Personalizado"
                            value="Custom"
                        ></v-radio>                                                                                                                                                                
                    </v-radio-group>                                                           
                </v-col>    
                <v-col cols="12" md="4" v-if="applyPlan.name !== 'Free'">
                    <v-text-field 
                        v-model="applyPlan.payment.price"
                        label="Valor do Pagamento"
                        ref="applyPlanPrice"
                        prepend-icon="mdi-cash"
                        filled
                    />
                </v-col>        
                <v-col cols="12" md="4" v-if="applyPlan.name !== 'Free'">
                    <v-text-field 
                        v-model="applyPlan.dateStartedPtBR"
                        label="Inicio"
                        ref="applyInicio"
                        v-mask="'##/##/####'"
                        prepend-icon="mdi-calendar"
                        filled
                    />
                </v-col>
                <v-col cols="12" md="4" v-if="applyPlan.name !== 'Free'">
                    <v-text-field 
                        v-model="applyPlan.dateEndPtBR"
                        label="Final"
                        v-mask="'##/##/####'"
                        ref="applyFim"
                        prepend-icon="mdi-calendar"
                        filled
                    />
                </v-col>                                  
                <v-col cols="12" md="4" v-if="applyPlan.name === 'Custom'">
                    <v-text-field 
                        v-model="applyPlan.amountUsers"
                        label="Qtde Usuarios"
                        ref="applyAmountUsers"
                        prepend-icon="mdi-account"
                        filled
                    />
                </v-col>     
                <v-col cols="12" md="4" v-if="applyPlan.name === 'Custom'">
                    <v-text-field 
                        v-model="applyPlan.amountUsersAdmin"
                        label="Qtde Usuarios Admin"
                        ref="applyamountUsersAdmin"
                        prepend-icon="mdi-account"
                        filled
                    />
                </v-col>
                <v-col cols="12" md="4" v-if="applyPlan.name === 'Custom'">
                    <v-text-field 
                        v-model="applyPlan.amountUsersCommon"
                        label="Qtde Usuarios Comum"
                        ref="amountUsersCommon"
                        prepend-icon="mdi-account"
                        filled
                    />
                </v-col>                        
                <v-col cols="12" md="4" v-if="applyPlan.name === 'Custom'">
                    <v-text-field 
                        v-model="applyPlan.maxCash"
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
                                    required filled
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
                                    required filled
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
                                    v-mask="'####-##-##'"
                                    prepend-icon="mdi-calendar"
                                    filled
                                />
                            </v-col>     
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.dateEnd"
                                    label="Inicio do Plano"
                                    ref="date"
                                    v-mask="'####-##-##'"
                                    prepend-icon="mdi-calendar"
                                    filled
                                />
                            </v-col>                                                 
                            <v-col cols="12" md="4"
                                style="margin-left: 20%"
                            >
                                <v-radio-group
                                    v-model="company.plan.name"
                                >
                                    <v-radio
                                        label="Free"
                                        value="Free"
                                    ></v-radio>
                                    <v-radio
                                        label="Basico"
                                        value="Basico"
                                    ></v-radio>
                                    <v-radio
                                        label="Gold"
                                        value="Gold"
                                    ></v-radio>    
                                    <v-radio
                                        label="É Nóis"
                                        value="É Nóis"
                                    ></v-radio>      
                                    <v-radio
                                        label="Tamo Junto"
                                        value="Tamo Junto"
                                    ></v-radio>          
                                    <v-radio
                                        label="Infinity"
                                        value="Infinity"
                                    ></v-radio>        
                                    <v-radio
                                        label="Personalizado"
                                        value="Custom"
                                    ></v-radio>                                                                                                                                                                
                                </v-radio-group>                                                           
                            </v-col>          
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.amountUsers"
                                    label="Quantidade de Usuarios"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled 
                                    :disabled="company.plan.name != 'Custom'"
                                />
                            </v-col>      
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.amountUsersAdmin"
                                    label="Usuarios Admin"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled 
                                    :disabled="company.plan.name != 'Custom'"
                                />
                            </v-col>     
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.amountUsersCommon"
                                    label="Usuarios Comum"
                                    ref="amountUsersCommon"
                                    prepend-icon="mdi-cash"
                                    filled 
                                    :disabled="company.plan.name != 'Custom'"
                                />
                            </v-col>            
                            <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                                <v-text-field 
                                    v-model="company.plan.maxCash"
                                    label="Valor Maximo p/ Lancamento"
                                    ref="maxCash"
                                    prepend-icon="mdi-cash"
                                    filled
                                    :disabled="company.plan.name != 'Custom'"
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
                            <!-- <v-btn 
                                type="submit" 
                                depressed  
                                x-large 
                                color="success"
                                :loading="loadingSave"
                                :disabled="loadingSave"
                                style="width: 50%"
                            >Salvar</v-btn> -->
                            <v-btn 
                                type="button" 
                                depressed  
                                x-large 
                                color="primary"
                                style="width: 50%"
                                @click="selectCompany"
                            >Selecionar</v-btn>                                
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
 
export default {
    name: 'UsuarioForm',
    components: { 
    },
    data: () => ({
        loadingSave: false,
        valid: true,
        show: false,
        company: { 
            plan: {}
        },
        view: 'CHOOSE',
        applyPlan: {
            name: '',
            payment: {price: 0}
        }
    }),
    methods: {
      save() {
        if(!this.$refs.companyForm.validate()) {
            return;
        }
      },
      selectCompany() {
          this.userLogged.company = this.company._id;
          storage.setUserLogged(JSON.stringify(this.userLogged));
          storage.setCompany(JSON.stringify(this.company));
          this.$router.push('/');
      },
      parseDate(date) {
        if (!date) return null;
        const [day, month, year] = date.split('/');
        return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
      },           
      getPlan(planName) {
          let result = {
              payment: { price: 0 },
              dateStartedPtBR: new Date(),
              dateEndPtBR: new Date(),
              amountUsers: 1,
              amountUsersAdmin: 1,
              amountUsersCommon: 0,  
              maxCash: 500,
          };
          if(this.applyPlan.name !== 'Custom') {
            this.applyPlan = this.company.plan;
          }
          switch(planName) {
              case 'Basico':
                  result.payment.price = 10;
                  result.amountUsers = 2;
                  result.amountUsersAdmin = 1;
                  result.amountUsersCommon = 1;
                  result.maxCash = 2000;
                  result.dateStartedPtBR = new Date().toLocaleString('pt-BR').substring(0,10);
                  result.dateEndPtBR = new Date(
                      result.dateEndPtBR.getFullYear(),
                      result.dateEndPtBR.getMonth()+1,
                      result.dateEndPtBR.getDate()
                  ).toLocaleString('pt-BR').substring(0,10);
                  break;
              case 'Gold':
                  result.payment.price = 90;
                  result.amountUsers = 2;
                  result.amountUsersAdmin = 1;
                  result.amountUsersCommon = 1;
                  result.maxCash = 4000;                  
                  result.dateStartedPtBR = new Date().toLocaleString('pt-BR').substring(0,10);
                  result.dateEndPtBR = new Date(
                      result.dateEndPtBR.getFullYear(),
                      result.dateEndPtBR.getMonth()+12,
                      result.dateEndPtBR.getDate()
                  ).toLocaleString('pt-BR').substring(0,10);
                  break;                  
              case 'É Nóis':
                  result.payment.price = 20;
                  result.amountUsers = 6;
                  result.amountUsersAdmin = 2;
                  result.amountUsersCommon = 4;     
                  result.maxCash = 6000;             
                  result.dateStartedPtBR = new Date().toLocaleString('pt-BR').substring(0,10);
                  result.dateEndPtBR = new Date(
                      result.dateEndPtBR.getFullYear(),
                      result.dateEndPtBR.getMonth()+1,
                      result.dateEndPtBR.getDate()
                  ).toLocaleString('pt-BR').substring(0,10);
                  break;                          
              case 'Tamo Junto':
                  result.payment.price = 180;
                  result.amountUsers = 6;
                  result.amountUsersAdmin = 2;
                  result.amountUsersCommon = 4;       
                  result.maxCash = 12000;                             
                  result.dateStartedPtBR = new Date().toLocaleString('pt-BR').substring(0,10);
                  result.dateEndPtBR = new Date(
                      result.dateEndPtBR.getFullYear(),
                      result.dateEndPtBR.getMonth()+12,
                      result.dateEndPtBR.getDate()
                  ).toLocaleString('pt-BR').substring(0,10);
                  break;                            
              case 'Infinity':
                  result.payment.price = 900;
                  result.amountUsers = 8;
                  result.amountUsersAdmin = 3;
                  result.amountUsersCommon = 5;    
                  result.maxCash = 25000;                             
                  result.dateStartedPtBR = new Date().toLocaleString('pt-BR').substring(0,10);
                  result.dateEndPtBR = new Date(2099, 5, 20).toLocaleString('pt-BR').substring(0,10);
                  break;                            
              case 'Custom':
                  result.payment.price = 200;
                  result.amountUsers = 3;
                  result.amountUsersAdmin = 1;
                  result.amountUsersCommon = 2;    
                  result.maxCash = 4500;                      
                  result.dateStartedPtBR = new Date().toLocaleString('pt-BR').substring(0,10);
                  result.dateEndPtBR = new Date(
                      result.dateEndPtBR.getFullYear(),
                      result.dateEndPtBR.getMonth()+2,
                      result.dateEndPtBR.getDate()                      
                  ).toLocaleString('pt-BR').substring(0,10);
                  break;                                                                                          
          }
          return result;
      },
      applyPlanNow() {
        this.applyPlan.dateStarted = this.parseDate(this.applyPlan.dateStartedPtBR);
        this.applyPlan.dateEnd = this.parseDate(this.applyPlan.dateEndPtBR);
        
        if(!this.applyPlan.name) {
            alert('Selecione o Plano');
            return;
        }
        if( this.applyPlan.name === 'Free') {
            alert('Plano Free em desenvolvimento');
            return;
        }

        companyGateway.applyPlan(this.company._id, this.applyPlan,
            res => {
                this.company = res;
                alert('Plano Alterado com Sucesso');
                this.view = 'EDIT'
            },
            () => {
                alert('Erro, Tente novamente');
            })
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();   
      companyGateway.getCompanyById(
                this.$route.params._id,
                res => { 
                    this.company = res;
                    this.applyPlan.name = this.company.plan.name;
                },
                () => alert('Erro, tente novamente')
        );  
    },
    watch: {
        applyPlan: {
            deep: true,
            handler()  {
                let getPlan = this.getPlan(this.applyPlan.name);
                this.applyPlan.payment.price = getPlan.payment.price;
                this.applyPlan.dateStartedPtBR = getPlan.dateStartedPtBR;
                this.applyPlan.dateEndPtBR = getPlan.dateEndPtBR;
                this.applyPlan.amountUsers = getPlan.amountUsers;
                this.applyPlan.amountUsersAdmin = getPlan.amountUsersAdmin;
                this.applyPlan.amountUsersCommon = getPlan.amountUsersCommon;    
                this.applyPlan.maxCash = getPlan.maxCash;
            }   
        }
    },
  }
</script>

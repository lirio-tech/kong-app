<template>
    <v-container>
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/system'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.8rem !important;">Estabelecimento </span>
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
                    <v-radio-group
                        v-model="applyPlan.name"
                        @change="selectedPlan"
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
                            label="Custom"
                            value="Custom"
                        ></v-radio>                                                                                                                                                                
                    </v-radio-group>                                                           
                </v-col>    
                <v-col cols="12" md="4" v-if="company.plan.name !== 'Free'">
                    <v-text-field 
                        v-model="applyPlan.payment.price"
                        label="Valor do Pagamento"
                        ref="applyPlanPrice"
                        prepend-icon="mdi-cash"
                        filled
                    />
                </v-col>        
                
                    <v-btn 
                        type="submit" 
                        depressed  
                        x-large 
                        color="primary"
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
                                        label="Custom"
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
                    <!-- <v-row 
                        align="center"
                        justify="space-around"
                    >
                            <v-btn 
                                type="submit" 
                                depressed  
                                x-large 
                                color="success"
                                :loading="loadingSave"
                                :disabled="loadingSave"
                                style="width: 50%"
                            >Salvar</v-btn>                                        
                    </v-row>        -->
                </v-form>    
              </v-col> 
          </v-row>                                           
          <br/><br/>
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../../api/gateway'
import storage from '../../storage'
 
export default {
    name: 'UsuarioForm',
    components: { 
    },
    data: () => ({
        loadingSave: false,
        valid: true,
        show: false,
        dateFormatted: '',
        company: { 
            plan: {}
        },
        view: 'CHOOSE',
        applyPlan: {
            payment: {}
        }
    }),
    methods: {
      save() {
        if(!this.$refs.companyForm.validate()) {
            return;
        }
      },
      selectedPlan() {
          switch(this.applyPlan.name) {
              case 'Basico':
                  this.applyPlan.payment.price = 10;
                  break;
              case 'Gold':
                  this.applyPlan.payment.price = 90;
                  break;                  
              case 'É Nóis':
                  this.applyPlan.payment.price = 20;
                  break;                          
              case 'Tamo Junto':
                  this.applyPlan.payment.price = 180;
                  break;                            
              case 'Infinity':
                  this.applyPlan.payment.price = 900;
                  break;                            
              case 'Custom':
                  this.applyPlan.payment.price = 200;
                  break;                                                                                          
          }
      },
      applyPlanNow() {
        if(!this.applyPlan.name) {
            alert('Selecione o Plano');
            return;
        }
        if( this.applyPlan.name === 'Free') {
            alert('Plano Free em desenvolvimento');
            return;
        }

        gateway.applyPlan(this.company._id, this.applyPlan,
        res => {
            this.company = res;
            alert('Plano Alterado com Sucesso');
        },
        () => {
            alert('Erro, Tente novamente');
        })
      }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();   
      gateway.getCompanyById(
                this.$route.params._id,
                res => { 
                    this.company = res;
                    this.applyPlan.name = this.company.plan.name;
                },
                () => alert('Erro, tente novamente')
        );  
    }
  }
</script>

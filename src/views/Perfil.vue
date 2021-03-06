<template>
    <v-container>
        <DialogPlan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
        <v-row>
            <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                <v-btn icon small style="display: inline;"
                    :to="{ 'path': '/'}"
                >
                    <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="8" align="center">   
                    <span style="font-size: 2.0rem !important;">Perfil</span>
            </v-col>
        </v-row>
        <v-expansion-panels accordion hover focusable>
            <v-expansion-panel>
                <v-expansion-panel-header>Perfil</v-expansion-panel-header>
                <v-expansion-panel-content>

                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-form 
                            v-model="valid" 
                            v-on:submit.prevent="save"
                            id="produtoForm"
                            ref="produtoForm">
                                <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">                      
                                        <v-text-field 
                                            v-model="userLogged.username"
                                            label="Username"
                                            ref="username"
                                            filled required readonly>
                                        </v-text-field>  
                                    </v-col>
                                    <v-col cols="12" md="4">                      
                                        <v-text-field v-model="userLogged.name"
                                                    label="Nome"
                                                    ref="nome"
                                                    required
                                                    readonly
                                                    filled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            label="Criado"
                                            v-model="userLogged.createdAt"
                                            ref="createdAt"
                                            required filled disabled
                                        />
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            label="Alterado"
                                            v-model="userLogged.updatedAt"
                                            ref="updatedAt"
                                            required filled disabled
                                        />
                                    </v-col>                                    
                                </v-row>
                                <v-row>
                                    <v-btn 
                                        type="submit" 
                                        depressed 
                                        color="success"
                                        :loading="isLoading"
                                        :disabled="isLoading"
                                    >Salvar</v-btn>
                                </v-row>
                                </v-container>
                            </v-form>                
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>Alterar Senha</v-expansion-panel-header>
                <v-expansion-panel-content>

                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>{{ company.shortName }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <br/>
                    <span class="d-flex justify-end" flex v-if="userLogged.type === 'administrator'">
                        <router-link to="/" style="color: inherit; text-decoration: none">
                            <v-btn fab x-small>
                                <v-icon>
                                    mdi-pencil
                                </v-icon>    
                            </v-btn>
                        </router-link>                          
                    </span> 
                    <span>Nome: {{ company.name }} </span> 
                    <br/>
                    <span>Short Name: {{ company.shortName }} </span>
                    <br/>
                    <span>Endereco: {{ company.endereco }} </span>     
                    <br/><br/>                    
                    <v-card>
                        <br/>
                        <div 
                            class="overline green--text" 
                            align="center"
                            dark
                        >
                            Seu Plano Atual é o {{ company.plan.name }}
                        </div>
                        <br/>
                        <div 
                            class="overline green--text" 
                            align="center"
                            dark
                        >                            
                            <v-btn 
                                small 
                                color="primary"
                                @click="showPlanDialog(true)"
                            >
                                Escolha um plano ideal para VC ;-)
                            </v-btn>
                            
                        </div>
                        <br/>
                    </v-card>  

                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>
    </v-container>
</template>

<script>
import storage from '../storage';
import DialogPlan from '../components/DialogPlan'
  //import gateway from '../api/gateway';
export default {
    name: 'Perfil',
    components: {
        DialogPlan
    },
    data: () => ({
      isLoading: false,
      show: false,
      valid: true,
      dialogPlan: false,
      userLogged: {
        type: 'none'
      }, 
      userNew: {},
      company: {}
    }),
    methods: {
        showPlanDialog(show) {
            this.dialogPlan = show
        }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
    }
  }
</script>

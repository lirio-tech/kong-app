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
        <v-expansion-panels
            v-model="panel"
            multiple
            hover
            focusable
            >        
            <v-expansion-panel>
                <v-expansion-panel-header>{{ company.shortName }}</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <span class="d-flex justify-end" flex v-if="isAdmin">
                        <router-link to="/" style="color: inherit; text-decoration: none">
                            <v-btn fab x-small>
                                <v-icon>
                                    mdi-pencil
                                </v-icon>    
                            </v-btn>
                        </router-link>                          
                    </span> 
                    <span><span class="grey--text">Nome:</span> {{ company.name }} </span> 
                    <br/>
                    <span><span class="grey--text">Short Name:</span> {{ company.shortName }} </span>
                    <br/>
                    <span v-if="company.endereco"><span class="grey--text">Endereco:</span> {{ company.endereco }} </span>     
                    <br />
                    <CardPlanData 
                        :company="company" 
                        :showBtnPlanDialog="true"
                        v-on:show-plan-dialog="showPlanDialog"
                    />
                </v-expansion-panel-content>
            </v-expansion-panel>            
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
                                        <v-text-field 
                                            v-model="userLogged.name"
                                            label="Nome"
                                            ref="nome"
                                            required
                                            readonly
                                            filled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">                      
                                        <v-text-field 
                                            v-model="userLogged.type"
                                            label="Tipo"
                                            ref="tipo"
                                            required
                                            readonly
                                            filled>
                                        </v-text-field>
                                    </v-col>                 
                                    <v-col cols="12" md="4">                      
                                        <v-text-field 
                                            v-model="userLogged.email"
                                            label="E-mail"
                                            ref="email"
                                            required
                                            readonly
                                            filled>
                                        </v-text-field>
                                    </v-col>       
                                    <v-col cols="12" md="4">                      
                                        <v-text-field 
                                            v-model="userLogged.phone_number"
                                            label="Celular"
                                            ref="phone"
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
                                    <!-- <v-col cols="12" md="4">
                                        <v-text-field
                                            label="Alterado"
                                            v-model="userLogged.updatedAt"
                                            ref="updatedAt"
                                            required filled disabled
                                        />
                                    </v-col>                                     -->
                                </v-row>
                                </v-container>
                            </v-form>                
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="false">
                <v-expansion-panel-header>Alterar Senha</v-expansion-panel-header>
                <v-expansion-panel-content>

                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel v-if="userLogged.type === 'sys_admin'">
                <v-expansion-panel-header>Configurações</v-expansion-panel-header>
                <v-expansion-panel-content>
                    <v-row>
                        <v-col cols="12" sm="12">
                          <v-form 
                            id="configForm"
                            ref="configForm">
                                <v-container>
                                    <v-row>
                                        <v-col 
                                            cols="12" md="4" 
                                        >
                                            Tabela: 
                                            <v-radio-group
                                                v-model="userLogged.table"
                                                row
                                            >
                                                <v-radio
                                                    label="Tabela Simples"
                                                    value="simple"
                                                ></v-radio>
                                                <v-radio
                                                    label="Tabela Mobile"
                                                    value="data"
                                                ></v-radio>
                                            </v-radio-group>  
                                        </v-col>      
                                    </v-row>
                                    <v-row v-if="userLogged.type === 'sys_admin'">
                                        <v-col cols="12">
                                            {{ getDevice() }}
                                        </v-col>
                                    </v-row>
                                </v-container>
                            </v-form>                
                        </v-col>
                    </v-row>                    
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
    </v-container>
</template>

<script>
import storage from '../storage';
import DialogPlan from '../components/DialogPlan'
  //import gateway from '../api/gateway';
import CardPlanData from '../components/CardPlanData'  
import UserTypes from '../utils/UserTypes'
export default {
    name: 'Perfil',
    components: {
        DialogPlan,
        CardPlanData
    },
    data: () => ({
      isLoading: false, 
      show: false,
      valid: true,
      dialogPlan: false,
      panel: [0],
      userLogged: {
        type: 'none'
      }, 
      userNew: {},
      company: {}
    }),
    methods: {
        showPlanDialog(show) {
            this.dialogPlan = show
        },
        isAdmin() {
            return UserTypes.isAdmin(this.userLogged.type);
        },
        getDevice() {
            return navigator.userAgent;
        }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.company = storage.getCompany();
    }
  }
</script>

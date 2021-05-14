<template>
    <v-container>
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
                    <v-row style="margin-top:15px">
                        <v-col cols="10">
                            <span><span class="grey--text">Nome:</span> {{ company.name }} </span>                     
                            <br/>
                            <span><span class="grey--text">Short Name:</span> {{ company.shortName }} </span>
                            <br/>
                            <span v-if="company.endereco"><span class="grey--text">Endereco:</span> {{ company.endereco }} </span>     
                        </v-col>
                        <v-col cols="1">
                            <span style="margin-left: -15px;">
                                <router-link :to="{path: '/company/'+company._id}" style="color: inherit; text-decoration: none">
                                    <v-btn fab small outlined color="cyan">
                                        <v-icon>
                                            mdi-home
                                        </v-icon>    
                                    </v-btn>
                                </router-link>  
                            </span>     
                        </v-col>    
                    </v-row>

                    <br />
                    <CardPlanData 
                        :company="company" 
                        :showBtnPlanDialog="true"
                        v-on:show-plan-dialog="showPlanDialog"
                        :userView="userLogged"
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
            <v-expansion-panel>
                <v-expansion-panel-header>Alterar Senha</v-expansion-panel-header>
                <v-expansion-panel-content>
                        <br/><br/>
                        <v-form 
                            id="formChangePassword" 
                            ref="formChangePassword" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="onSubmitChangePassword"
                        >        
                            <v-row>
                                <v-text-field
                                    label="Senha Atual"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append.prevent="show = !show"
                                    prepend-icon="mdi-lock-outline"
                                    v-model="userChangePassword.passwordCurrent"
                                    :rules="[val => val && val.length > 3 || 'Senha deve conter no minimo 4 Caracteres']"
                                    required filled
                                />
                                <v-text-field
                                    label="Nova Senha"
                                    prepend-icon="mdi-lock-outline"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append.prevent="show = !show"
                                    v-model="userChangePassword.passwordNew"
                                    :rules="[val => val && val.length > 3 || 'Nova Senha deve conter 4 Caracteres']"
                                    required filled
                                />
                                <v-text-field
                                    label="Confirmacao de Nova Senha"
                                    prepend-icon="mdi-lock-outline"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append.prevent="show = !show"
                                    v-model="userChangePassword.passwordNewConfirmation"
                                    :rules="[val => val && val === userChangePassword.passwordNew || 'Confirmacao da Senha nao confere']"
                                    required filled
                                />     
                            </v-row>
                            <v-row> 
                                <v-col cols="12" class="text-center">
                                    <v-btn 
                                        :loading="isLoading"
                                        class="ma-2"
                                        large
                                        style="width: 75%"
                                        outlined
                                        color="green"
                                        type="submit"
                                    >Salvar</v-btn>                                            
                                </v-col>  
                            </v-row>
                        </v-form>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
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
                                            Visualização da Tabela: 
                                            <v-radio-group
                                                v-model="userLogged.configuration.table"
                                                row
                                            >
                                                <v-radio
                                                    label="Tabela Simples"
                                                    value="simple"
                                                ></v-radio>
                                                <v-radio
                                                    label="Tabela Mobile"
                                                    value="mobile"
                                                ></v-radio>
                                            </v-radio-group>  
                                        </v-col>      
                                    </v-row>
                                    <v-row>
                                        <v-col cols="12" class="text-center">
                                            <v-btn 
                                                :loading="isLoading"
                                                @click="updateConfiguration"
                                                class="ma-2"
                                                large
                                                style="width: 75%"
                                                outlined
                                                color="green"
                                            >Salvar</v-btn>                                            
                                        </v-col>  
                                    </v-row>
                                    
                                </v-container>
                            </v-form>                
                        </v-col>
                    </v-row>                    
                </v-expansion-panel-content>
            </v-expansion-panel>
        </v-expansion-panels>
        <SnackBar :color="message.color" :text="message.text" :show="message.show" />
    </v-container>
</template>

<script>
import storage from '../storage'
import gateway from '../api/gateway'
import UserTypes from '../utils/UserTypes'
import SnackBar from '../components/SnackBar'
import CardPlanData from '../components/CardPlanData'
export default {
    name: 'Perfil',
    components: {
        SnackBar,
        CardPlanData
    },
    data: () => ({
      isLoading: false, 
      show: false,
      valid: true,
      dialogPlan: false,
      panel: [],
      userLogged: {
        type: 'none'
      }, 
      userNew: {},
      company: {},
      message: {
        show: false,
        color: 'green',
        text: 'Hi'
      },       
      userChangePassword: {}   
    }),
    methods: {
        showPlanDialog(show) {
            this.dialogPlan = show 
        },
        isAdmin() {
            return UserTypes.isAdmin(this.userLogged.type);
        },
        updateConfiguration() {
            this.isLoading = true;
            gateway.updateConfigurationUser(this.userLogged._id, this.userLogged.configuration,
                () => {
                    this.isLoading = false;
                    storage.setUserLogged(JSON.stringify(this.userLogged));
                    this.showMessage('green', 'Configurações Atualizada')
                },
                () => {
                    this.isLoading = false;
                    this.showMessage('error', 'Erro ao Atualizar Configurações');
                }
            )
        },
        showMessage(color, text) {
            this.message.color = color;
            this.message.text = text;
            this.message.show = true;
        },
        onSubmitChangePassword() {
            this.isLoading = true;
            gateway.changePassword( 
                this.userLogged._id,
                this.userChangePassword,
                res => {
                    this.isLoading = false;
                    alert(res.message);
                }, () => {
                    this.isLoading = false;
                    alert('Erro ao Alterar Senha');
                });
        }
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      if(!this.userLogged.configuration) {
          this.userLogged.configuration = {table: 'mobile'};
      }
      this.company = storage.getCompany();
      this.panel = this.isAdmin() && this.company.plan.name === 'Free' ? [0] : [];      
    }
  }
</script>

<template>
    <v-container>
        <header-back-title title="Configurações" />
        <br/>
        <v-expansion-panels
            v-model="panel"
            multiple
            hover
            focusable
            >        
                <v-expansion-panel>
                    <v-expansion-panel-header>{{ 'Meu Plano' }}</v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <card-plan-data 
                            style="margin-top: 5px"
                            :company="company" 
                            :userView="userLogged"
                        />
                        <v-btn block style="margin-top:10px" @click="showPlanDialog(true)">
                            Planos
                        </v-btn>
                    </v-expansion-panel-content>
                </v-expansion-panel>          
                <v-expansion-panel>
                    <v-expansion-panel-header>{{ company.shortName }}</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col cols="12">  
                            <v-form 
                                id="formCompany" 
                                ref="formCompany" 
                                v-model="valid" 
                                lazy-validation 
                                v-on:submit.prevent="onSubmitCompanyName"
                            >          
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Nome do seu Estabelecimento"
                                        prepend-icon="mdi-home"
                                        required
                                        :rules="[val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres']"
                                        v-model="company.name"
                                        ref="companyName"
                                        :disabled="!isAdmin()"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Nome no App"
                                        prepend-icon="mdi-home"
                                        :rules="[ 
                                            val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres',
                                            val => val && val.length <= 15 || 'tamanho maximo eh de 15 Caracteres',
                                        ]"
                                        required
                                        v-model="company.shortName"
                                        ref="companyShortName"
                                        :counter="15"
                                        :disabled="!isAdmin()"
                                    />
                                </v-col>                              
                                <br/>
                                <v-btn
                                    color="success"
                                    type="submit"
                                    :disabled="!isAdmin()"
                                >
                                    Salvar
                                </v-btn>                                
                            </v-form>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>  
                <v-expansion-panel>
                    <v-expansion-panel-header>Site</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col cols="12">  
                            <v-form 
                                id="formCompanySite" 
                                ref="formCompanySite" 
                                v-model="valid" 
                                lazy-validation 
                                v-on:submit.prevent="onSubmitCompanySite"
                            >          
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Facebook"
                                        prepend-icon="mdi-facebook"
                                        v-model="companySite.facebook"
                                        @blur="companySite.facebook = companySite.facebook.toLowerCase()"
                                        :disabled="!isAdmin()"
                                        :hint="`facebook.com/${companySite.facebook ? companySite.facebook : ''}`" 
                                    />
                                </v-col>                   
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Instagram"
                                        prepend-icon="mdi-instagram"
                                        v-model="companySite.instagram"
                                        @blur="companySite.instagram = companySite.instagram.toLowerCase()"
                                        :disabled="!isAdmin()"
                                        :hint="`instagram.com/${companySite.instagram ? companySite.instagram : ''}`" 
                                    />
                                </v-col>            
                                <v-col cols="12">
                                    <v-text-field 
                                        v-model="companySite.whatsapp"
                                        label="WhatsApp"
                                        ref="whats"
                                        v-mask="'(##) #####-####'"
                                        prepend-icon="mdi-whatsapp"
                                        :disabled="!isAdmin()"
                                    />                                    
                                </v-col>                                                                              
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Link"
                                        prepend-icon="mdi-at"
                                        :rules="[ 
                                            val => val && val.length > 1 || 'Deve ser maior do que 3 Caracteres',
                                            val => val && val.length <= 40 || 'tamanho maximo eh de 40 Caracteres',
                                        ]"
                                        required
                                        v-model="companySite.subdomain"
                                        @blur="companySite.subdomain = companySite.subdomain.toLowerCase()"
                                        ref="companysubdomain"
                                        :counter="40"
                                        :disabled="!isAdmin()"
                                        :hint="linkCompany" 
                                    />
                                </v-col>        
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Site"
                                        prepend-icon="mdi-link"
                                        required
                                        v-model="companySite.site"
                                        @blur="companySite.site = companySite.site.toLowerCase()"
                                        ref="site"
                                        :counter="40"
                                        :disabled="!isAdmin()"
                                        :hint="`Ex: www.barbearia.com.br`" 
                                    />
                                </v-col>                                                                                            
                                <br/>
                                <v-btn
                                    color="success"
                                    type="submit"
                                    :disabled="!isAdmin()"
                                >
                                    Salvar
                                </v-btn>           
                                &nbsp;           
                                <v-btn
                                    type="button"
                                    :to="`/site/${companySite.subdomain}`"
                                    :disabled="!isAdmin()"
                                >
                                    Alterar Site
                                </v-btn>                                               
                            </v-form>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>                  
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>Serviços de {{ company.shortName }}</v-expansion-panel-header>
                    <v-expansion-panel-content>            
                                <v-col align="center" >
                                    <v-chip color="primary" outlined small >
                                        Somente para Administradores 
                                    </v-chip>             
                                </v-col>                   
                                <v-row >
                                    <v-col cols="6" >
                                        <v-text-field
                                            autocomplete="off"
                                            label="Serviço"
                                            v-model="service.type"                    
                                            filled
                                        />                        
                                    </v-col>                    
                                    <v-col cols="4">
                                        <v-text-field
                                            autocomplete="off"
                                            label="Valor"
                                            v-model="service.priceBR"
                                            @focus="$event.target.select()"
                                            ref="servicePrice"
                                            @keyup="service.priceBR = maskCurrency(service.priceBR)"
                                            filled
                                        />
                                    </v-col>                   
                                    <v-col cols="1">
                                        <v-btn icon outlined class="mt-3" @click="addService" :loading="loadingAddService">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>                            
                                    </v-col>
                                </v-row>              
                                <v-row>
                                <v-col cols="12"  class="mt-0 pt-0">

                                    <v-simple-table dense >
                                        <template v-slot:default>
                                            <thead >
                                            <tr>
                                                <th class="text-left" style="width: 20px;">
                                                    Serviço
                                                </th>
                                                <th class="text-left">
                                                    Valor R$
                                                </th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in services" :key="item.type">
                                                <td>{{ item.type }}</td>
                                                <td>{{ item.price | currency }}</td>
                                                <td>
                                                    <v-icon 
                                                        small color="info"
                                                        @click="editService(item)">
                                                       >
                                                        mdi-pencil
                                                    </v-icon>      
                                                </td>                                                   
                                                <td>
                                                    <v-icon 
                                                        v-if="deleteServiceIndex !== services.indexOf(item)"
                                                        @click="deleteService(item)" class="error--text">
                                                        mdi-delete
                                                    </v-icon>
                                                    <v-icon v-if="deleteServiceIndex === services.indexOf(item)">mdi mdi-loading mdi-spin</v-icon>
                                                </td>
                                            </tr>
                                            <tr v-if="!company.services || company.services.length === 0">
                                                <td align="center" class="error--text" colspan="3"><h3>Não há serviços adicionados</h3></td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                    <br/>
                                    <router-link 
                                        align="right" 
                                        to="/admin/users" 
                                        class="primary--text d-flex flex-row-reverse"
                                        style="color: inherit; text-decoration: none"
                                        
                                    >
                                        <v-icon color="primary">mdi-chevron-right</v-icon>
                                        Funcionários
                                    </router-link>
                                </v-col> 
                                </v-row>
                                <br/>
                                <!-- <v-btn
                                    color="green darken-2"
                                    type="button"
                                    @click="onSubmit"
                                >
                                    Salvar
                                </v-btn> -->
                    </v-expansion-panel-content>
                </v-expansion-panel>           
                <v-expansion-panel>
                    <v-expansion-panel-header>Meus Serviços</v-expansion-panel-header>
                    <v-expansion-panel-content>   
                        <br/>                         
                        <v-row>
                            <v-col cols="12"  class="mt-0 pt-0">

                                    <v-simple-table dense >
                                        <template v-slot:default>
                                            <thead >
                                            <tr>
                                                <th class="text-left">
                                                    Serviço
                                                </th>
                                                <th class="text-left">
                                                    Valor
                                                </th>
                                                <th class="text-left">
                                                    Comissão        
                                                </th>    
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in userLogged.services" :key="item.type">
                                                <td>{{ item.type }}</td>
                                                <td>R$ {{ item.price | currency }}</td>
                                                <td>{{ item.percentCommission }}%</td>
                                                
                                            </tr>
                                            <tr v-if="!userLogged.services || userLogged.services.length === 0">
                                                <td align="center" class="error--text" colspan="3"><h3>Não há serviços adicionados</h3></td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col> 
                                </v-row>
                                <br/>
                    </v-expansion-panel-content>
                </v-expansion-panel>                      
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>Historico de Pagamento</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col cols="12" >  
                                <v-col align="center" >
                                    <v-chip color="primary" outlined small >
                                        Somente para Administradores 
                                    </v-chip>        
                                </v-col>
                                <v-col cols="12">
                                        <v-card
                                            class="mx-auto"
                                        >
                                            <v-list two-line>
                                                <v-list-item-group
                                                    v-model="selected"
                                                    active-class="pink--text"
                                                    multiple
                                                >
                                                    <span v-if="!items || items.length < 1">Nao ha pagamentos registrados</span>
                                                    <template v-for="(item, index) in items">
                                                    <v-list-item :key="item._id">
                                                        <template >
                                                        <v-list-item-content>
                                                            
                                                            <v-list-item-title 
                                                                v-text="item.plan.name"
                                                            ></v-list-item-title>

                                                            <v-list-item-subtitle
                                                                class="text--primary"
                                                            >
                                                                R$ {{ item.plan.payment.price | currency }}
                                                            </v-list-item-subtitle>

                                                            <v-list-item-subtitle 
                                                            >
                                                                Inicio: {{ getDateFormated(item.plan.dateStarted) }}
                                                            </v-list-item-subtitle>
                                                            <v-list-item-subtitle 
                                                            >
                                                                Vencimento: {{ getDateFormated(item.plan.dateEnd) }}
                                                            </v-list-item-subtitle>

                                                        </v-list-item-content>
                                                        </template>
                                                    </v-list-item>

                                                    <v-divider
                                                        v-if="index < items.length - 1"
                                                        :key="index"
                                                    ></v-divider>
                                                    </template>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-card>
                                </v-col>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>                
                <v-expansion-panel>
                    <v-expansion-panel-header>App</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                      
                        <v-col cols="12" >  
                             <span class="primary--text">Modo {{ themeKong ? 'Kong' : 'Lady' }}</span>
                            <v-switch v-model="themeKong" />      
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>                                                                       
                <v-expansion-panel>
                    <v-expansion-panel-header>Meu Perfil</v-expansion-panel-header>
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
                                                :value="getTypeDescription(userLogged.type)"
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
                                            color="success"
                                            type="submit"
                                        >Salvar</v-btn>                                            
                                    </v-col>  
                                </v-row>
                            </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
        </v-expansion-panels>
        
        <v-dialog
            :value="dialogServiceUpdate"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
        >
            <v-card>
            <v-toolbar
                class="primary"
            >
                <v-btn
                icon
                small
                @click="dialogServiceUpdate = false"
                >
                <v-icon>mdi-close</v-icon>
                </v-btn>      
                <v-toolbar-title style="margin-left:-17px;">
                    {{ serviceUpdate.type }}
                </v-toolbar-title>
                <v-spacer></v-spacer>
            </v-toolbar>    
            <v-card-text>
                <v-container >
                    <br/>
                    <small>
                        <v-icon small>mdi-information-outline</v-icon>
                        Ao Alterar o nome do Serviço será alterado para Todos os Funcionários que possui o mesmo.
                    </small>                    
                    <br/><br/>
                    <v-form 
                        v-on:submit.prevent="submitChangeService"
                        ref="submitChangeService"
                        id="submitChangeService"
                    >  
                        <v-col
                            cols="12"
                            sm="6"
                            >
                            <v-text-field 
                                v-model="serviceUpdate.type"
                                label="Serviço"
                                filled required
                                ref="Serviço"
                                :rules="[v => !!v || 'Serviço Obrigatório',]"
                            ></v-text-field>  
                        </v-col>              
                        <v-col 
                            cols="12"
                            sm="6"
                        >
                            <my-money v-model="serviceUpdate.price" label="Valor" />
                        </v-col>
                        <v-col 
                            cols="12"
                            sm="6"
                            align="center"
                            justify="space-around"
                        >                      
                            <v-btn 
                                style="width: 90%"
                                color="success"
                                x-large
                                type="submit"
                                :loading="loadingUpdateService"
                                :disabled="loadingUpdateService"
                            >
                             OK
                            </v-btn>                                                                               
                        </v-col>       
  
                    </v-form>                                          
                </v-container>
            </v-card-text>          
            <div style="flex: 1 1 auto;"></div>
            </v-card>

        </v-dialog>            
        
        <snack-bar :color="message.color" :text="message.text" :show="message.show" />
        <dialog-plan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />



    </v-container>
</template>

<script>
import storage from '../storage'
import gateway from '../api/gateway'
import companyGateway from '../api/companyGateway'
import UserTypes from '../utils/UserTypes'
import DialogPlan from '../components/DialogPlan.vue'
import SnackBar from '../components/SnackBar.vue'
import CardPlanData from '../components/CardPlanData.vue'
import MyMoney from '../components/inputs/MyMoney.vue'
import HeaderBackTitle from '../components/HeaderBackTitle.vue'
export default {
    name: 'Perfil',
    components: {
        CardPlanData,
        DialogPlan,
        SnackBar, 
        MyMoney,
        HeaderBackTitle,
    },
    data: () => ({
      dialogServiceUpdate: false,
      loadingUpdateService: false,
      isLoading: false, 
      deleteServiceIndex: -1,
      loadingAddService: false,
      show: false,
      valid: true,
      dialogPlan: false,
      panel: [],
      userLogged: {
        type: 'none'
      }, 
      userNew: {},
      company: {facebook: '', instagram: ''},
      companySite: {},
      services: [],
      companyWithoutUpdate: {},
      users: [],
      selected: [2],
      message: {
        show: false,
        color: 'green',
        text: 'Hi'
      },       
      items: [],      
      userChangePassword: {},
      service: {
            type: '',
            price: 0.00,
            priceBR: "0,00",
            time: "01:00"                       
      },      
      serviceBeforeUpdateType: '',
      serviceUpdate: {
            type: '',
            price: 0.00,
            time: "01:00"                       
      },        
      themeKong: true,
      money: {
            decimal: ',',
            thousands: '.',
            prefix: 'R$ ',
            precision: 2,
            masked: false
      },
    }),
    methods: {
        showPlanDialog(show) {
            this.dialogPlan = show 
        },
        isAdmin() {
            return UserTypes.isAdmin(this.userLogged.type);
        },
        getTypeDescription(type) {
            return UserTypes.getDescriptionPtBR(type);
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
        addService() {

            if(this.company.services.filter(it => it.type.toLowerCase() === this.service.type.toLowerCase()).length > 0) {
                alert('Serviço já Adicionado');
                return;                
            }
            
            if(!this.service.type) {
                alert('Descricao do Serviço Obrigatorio');
                return;
            }
            this.service.price = this.numberBrToUS(this.service.priceBR);
            if(this.service.price <= 0) {
                alert('Valor do Serviço deve ser maior que ZERO');
                return;
            }          
            this.loadingAddService = true;            
            companyGateway.saveCompanyService(this.company._id, this.service,
                    (res) => {
                        this.services = res;
                        this.service.type = '';
                        this.service.price = 0;
                        this.service.priceBR = '0,00';
                        this.service.time = "01:00";      
                        this.company.services = res;                  
                        storage.setCompany(JSON.stringify(this.company));
                        this.loadingAddService = false;            
                        this.showMessage('green', 'Serviço foi adicionado para todos os Funcionários com 50% de comissão');
                    }, () => {
                        this.loadingAddService = false;            
                        alert('Erro ao Salvar');
                    });          
        },        
        submitChangeService() {
            if(this.$refs.submitChangeService.validate()) {
                    this.loadingUpdateService = true;
                    companyGateway.updateCompanyService(this.company._id, this.serviceBeforeUpdateType, this.serviceUpdate,
                            (res) => {
                                this.services = res;
                                this.serviceUpdate.type = '';
                                this.serviceUpdate.price = 0;
                                this.serviceUpdate.time = "01:00";      
                                this.company.services = res;                  
                                storage.setCompany(JSON.stringify(this.company));         
                                this.showMessage('primary', 'Serviço foi alterado para todos os Funcionários');
                                this.dialogServiceUpdate = false;
                                this.loadingUpdateService = false;
                            }, () => {        
                                this.loadingUpdateService = false;
                                alert('Erro ao Alterar');
                            });                
            }
        },
        showMessage(color, text) {
            this.message.color = color;
            this.message.text = text;
            this.message.show = true;
            setTimeout(() => this.message.show = false, 4000);
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
        },
        formatDateTime (dateTime) {
            let date = dateTime.substr(0,10);
            let time = dateTime.substr(11,5);
            if (!date) return null;

            const [year, month, day] = date.split('-');
            return `${day}/${month}/${year} ${time}`
        },      
        updateCommission() {
            gateway.updateCommission(this.users,
                    () => {
                        alert('Atualizado com Sucesso!!!');
                    }, () => {
                        alert('Erro ao Salvar');
                    });
        },      
        updateProducts() {
            this.companyWithoutUpdate.product = this.company.product;
            gateway.saveCompany(this.companyWithoutUpdate,
                    () => {
                        this.company = this.companyWithoutUpdate;
                        storage.setCompany(JSON.stringify(this.companyWithoutUpdate));
                    }, () => {
                        alert('Erro ao Salvar');
                    });                
        },
        getUsers() {
            gateway.getUsers('all', res => {
            this.users = res;
            }, () => {})
        },      
        getPaymentsHistByCompany() {
            gateway.getPaymentsHistByCompany(
                res => {
                    this.items = res;
                }, () => {
                    alert('Erro ao Buscar pagamentos');
                });
        },         
        getCompanySite(companyId) {
            companyGateway.getCompanySiteById(companyId,
                (res) => {
                    if(res) this.companySite = res;
                }, () => {
                    alert('Erro ao buscar informaçoes do Site ');
                });
        },
        onSubmitCompanyName() {
            if(this.$refs.formCompany.validate()) {
                this.companyWithoutUpdate.name = this.company.name;
                this.companyWithoutUpdate.shortName = this.company.shortName;
                companyGateway.saveCompany(this.companyWithoutUpdate,
                    () => {
                        alert('Atualizado com Sucesso!!!');
                        storage.setCompany(JSON.stringify(this.companyWithoutUpdate));
                    }, (err) => {
                        if(err.response.status === 500) {
                            alert('Erro ao se Cadastrar, tente novamente mais tarde ');
                        } else {
                            alert(err.response.data.message);
                        }
                    });
            }
        },  
        onSubmitCompanySite() {
            if(this.$refs.formCompanySite.validate()) {
                companyGateway.saveCompanySite(this.company._id, this.companySite,
                    () => {
                        alert('Atualizado com Sucesso!!!');
                        storage.setCompany(JSON.stringify(this.companyWithoutUpdate));
                    }, (err) => {
                        if(err.response.status === 500) {
                            alert('Erro ao se Atualizar Infos do Site :( Tente novamente mais tarde ');
                        } else {
                            alert(err.response.data.message);
                        }
                    });
            }
        },    
        deleteService(svc) {
            if(confirm('Atenção :: Ao Excluir Serviço será excluído de todos os Funcionários, desejá continuar?')) {
                this.deleteServiceIndex = this.services.indexOf(svc);
                companyGateway.deleteCompanyService(this.company._id, svc.type,
                    (res) => {
                        this.company.services = res;
                        this.services = res;
                        storage.setCompany(JSON.stringify(this.company));
                        this.deleteServiceIndex = -1;
                        this.showMessage('primary', 'Serviço foi excluído para todos os Funcionários');
                    }, () => {
                        this.deleteServiceIndex = -1;
                        alert('Erro ao Excluir');
                    });          
            }
        },   
        editService(svc) {
            this.serviceBeforeUpdateType = svc.type;
            this.serviceUpdate = { type: svc.type, price: svc.price };
            this.dialogServiceUpdate = true;
        },
        maskCurrency(v) {
            v=String(v);
            v=v.replace(/\D/g,"");//Remove tudo o que não é numero
            v=String(Number(v));
            v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
            v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares
            v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
            return v;
        },                
        numberBrToUS(v) {
            return Number(v.replace('R$ ', '').replace('.', '').replace(',', '.'));
        },     
        numberUsToBR(v) {
            return Number(v.replace(',', '').replace('.', ','));
        },            
        getDateFormated(date) {
            if (!date) return null;

            const [year, month, day] = date.split('-')
            return `${day}/${month}/${year}`
        },            
        setThemeKong(isKong) {
            storage.setThemeKong(isKong);
            this.themeKong = isKong;
            this.$vuetify.theme.dark = !this.isKong;
        },                
    },
    beforeMount() {
      this.themeKong = this.$vuetify.theme.dark;
      this.userLogged = storage.getUserLogged();
      this.userLogged.createdAt = this.formatDateTime(this.userLogged.createdAt);
      if(!this.userLogged.configuration) {
          this.userLogged.configuration = {table: 'mobile'};
      }
      this.company = storage.getCompany();
      this.companyWithoutUpdate = storage.getCompany();
      this.services = this.companyWithoutUpdate.services;
      this.panel = this.isAdmin() && this.company.plan.name === 'Free' ? [0] : [];      
      this.getUsers();
      this.getPaymentsHistByCompany();     
      this.getCompanySite(this.company._id); 
      this.themeKong = Boolean(storage.getThemeKong());
    },
    watch: {
        themeKong() {
            this.$vuetify.theme.dark = this.themeKong ;
            storage.setThemeKong(this.themeKong);
        }
    },
    computed: {
        linkCompany: function() {
            return (this.$vuetify.theme.dark ? 'app.kongbarber.com' : 'ladyapp.com.br') +`/#/site/${this.companySite.subdomain}`;
        }
    }
  }
</script>
<style scoped>
  .v-money {
      margin-left: -20px;
      width: 250px;
      font-size: 30px;
  }
</style>
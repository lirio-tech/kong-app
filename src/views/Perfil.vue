<template>
    <v-container>
        <v-row>
            <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                <v-btn icon small style="display: inline;"
                    :to="{ 'path': '/'}"
                >
                    <v-icon large color="white darken-2">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="8" align="center">   
                    <span style="font-size: 1.8rem !important;" class="white--text">Configurações</span>
            </v-col>
        </v-row>
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
                                            val => val && val.length <= 16 || 'tamanho maximo eh de 15 Caracteres',
                                        ]"
                                        required
                                        v-model="company.shortName"
                                        ref="companyShortName"
                                        :disabled="!isAdmin()"
                                    />
                                </v-col>
                                <br/>
                                <v-btn
                                    color="green darken-2"
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
                    <v-expansion-panel-header>Serviços</v-expansion-panel-header>
                    <v-expansion-panel-content>                
                                <v-row >
                                    <v-col cols="12" style="margin-top: 5px; margin-bottom: -40px">
                                        <v-text-field
                                            autocomplete="off"
                                            label="Nome do Serviço"
                                            v-model="service.type"                    
                                            filled
                                        />                        
                                    </v-col>                    
                                    <v-col cols="5">
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
                                    <v-col cols="5">
                                      <v-text-field
                                        label="Tempo"
                                        filled
                                        v-model="service.time"
                                        type="time"
                                      ></v-text-field>                                   
                                    </v-col>                                    
                                    <v-col cols="1">
                                        <v-btn icon outlined class="mt-3" @click="addService">
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
                                                <th class="text-left">
                                                Serviço
                                                </th>
                                                <th class="text-left">
                                                Valor
                                                </th>
                                                <th class="text-left">
                                                Tempo
                                                </th>                                                
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in company.services" :key="item.type">
                                                <td>{{ item.type }}</td>
                                                <td>{{ item.price | currency }}</td>
                                                <td>{{ item.time }}</td>
                                                <td>
                                                <v-icon 
                                                    @click="deleteService(item)" class="error--text">
                                                    mdi-delete
                                                </v-icon>
                                                </td>
                                            </tr>
                                            <tr v-if="!company.services || company.services.length === 0">
                                                <td align="center" class="error--text" colspan="3"><h3>Não há serviços adicionados</h3></td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
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
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>
                        Comissão por Funcionário
                    </v-expansion-panel-header>
                    <v-expansion-panel-content> 
                        <v-form 
                            id="formCompany" 
                            ref="formCompany" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="updateCommission"
                        >
                            <br/>
                            <v-chip color="primary" style="margin-left: 15px;" outlined small>
                                Somente Usuarios Admin acessam a Comissão 
                            </v-chip>
                            <br/><br/>
                            <v-col cols="12" v-for="user in users" :key="user._id">
                                <v-slider
                                    style="margin-top: -25px"
                                    v-model="user.percentCommission"
                                    min="1"
                                    prepend-icon="mdi-account"
                                    :label="`${user.name} (${user.percentCommission}%)`"
                                    max="100"
                                    thumb-label
                                ></v-slider>  
                            </v-col>
                            <br/>                            
                            <v-btn
                                color="green"
                                type="submit"
                            >
                                Salvar
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>       
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>Historico de Pagamento</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col cols="12" >  
                                <v-col align="center" >
                                    <v-chip color="primary" outlined small >
                                        Somente Usuarios Admin acessam aos pagamentos
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
                                                                {{ item.plan.payment.price | currency }}
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
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>Produtos</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col align="center" >
                            <v-chip color="primary" outlined small >
                                Somente Usuarios Admin conseguem alterar
                            </v-chip>        
                        </v-col>                        
                        <v-col cols="12" >  
                            <v-sheet class="pa-5">
                                <v-switch
                                v-model="company.products.schedule"
                                inset
                                :label="`Agendamento`"
                                @change="updateProducts"
                                ></v-switch>
                            </v-sheet>                            
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
                                            outlined
                                            color="green"
                                            type="submit"
                                        >Salvar</v-btn>                                            
                                    </v-col>  
                                </v-row>
                            </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>
        </v-expansion-panels>
        <snack-bar :color="message.color" :text="message.text" :show="message.show" />
        <dialog-plan :dialog="dialogPlan" v-on:show-plan-dialog="showPlanDialog" />
    </v-container>
</template>

<script>
import storage from '../storage'
import gateway from '../api/gateway'
import UserTypes from '../utils/UserTypes'
import DialogPlan from '../components/DialogPlan.vue'
import SnackBar from '../components/SnackBar.vue'
import CardPlanData from '../components/CardPlanData.vue'
export default {
    name: 'Perfil',
    components: {
        CardPlanData,
        DialogPlan,
        SnackBar,
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
      themeKong: true,
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
            
            if(!this.company.services) {
                this.company.services = []
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
            this.company.services.push({type: this.service.type, price: this.service.price, time: this.service.time});
            this.service.type = '';
            this.service.price = 0;
            this.service.priceBR = '0,00';
            this.service.time = "01:00";
            gateway.saveCompany(this.company,
                    () => {
                        storage.setCompany(JSON.stringify(this.company));
                    }, () => {
                        alert('Erro ao Salvar');
                    });          
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
        onSubmitCompanyName() {
            if(this.$refs.formCompany.validate()) {
                this.companyWithoutUpdate.name = this.company.name;
                this.companyWithoutUpdate.shortName = this.company.shortName;
                gateway.saveCompany(this.companyWithoutUpdate,
                    () => {
                        alert('Atualizado com Sucesso!!!');
                        storage.setCompany(JSON.stringify(this.companyWithoutUpdate));
                    }, () => {
                        alert('Erro ao Salvar');
                    });
            }
        },      
        deleteService(svc) {
            this.company.services.splice(this.company.services.indexOf(svc), 1);
            gateway.saveCompany(this.company,
                () => {
                    storage.setCompany(JSON.stringify(this.company));
                }, () => {
                    alert('Erro ao Salvar');
                });          
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
      this.panel = this.isAdmin() && this.company.plan.name === 'Free' ? [0] : [];      
      this.getUsers();
      this.getPaymentsHistByCompany();      
      this.themeKong = Boolean(storage.getThemeKong());
    },
    watch: {
        themeKong() {
            this.$vuetify.theme.dark = this.themeKong ;
            storage.setThemeKong(this.themeKong);
        }
    }
  }
</script>

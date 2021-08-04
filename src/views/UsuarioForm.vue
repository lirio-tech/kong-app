<template>
    <v-container :style="`${this.$vuetify.theme.dark ? '' : 'background: white' }`">           
        <SnackBar :show="message.show" :text="message.text" :color="message.color" />
        <div >
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/admin/users'}"
                  >
                      <v-icon large color="primary darken-2">mdi-chevron-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.6rem !important;" class="primary--text">Cadastro de Usuário </span>
              </v-col>
          </v-row>          
        
            <v-form 
                v-model="valid" 
                v-on:submit.prevent="save"
                ref="userForm"
                id="userForm"
                v-if="!loading"
            >         
                <v-row>      
                        <v-col cols="12" md="4">                      
                            <v-text-field 
                                v-model="user.username"
                                autocomplete="off"
                                label="Username (Login)"
                                ref="username"
                                prepend-icon="mdi-account"
                                filled required
                                :rules="[
                                    val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres',
                                    val => (val && val.length <= 15) || 'Username deve ser menor que 15 caracteres'
                                ]"
                                @blur="user.username = user.username.toLowerCase()"
                                @keyup="user.username = removeSpecialChar(user.username)"
                            ></v-text-field>  
                        </v-col>
                        <v-col cols="12" md="4">                      
                            <v-text-field v-model="user.name"
                                        label="Nome do Novo Usuario"
                                        ref="nome"
                                        required
                                        prepend-icon="mdi-account"
                                        :rules="[
                                            val =>  val && val.length > 3    || 'Deve ser maior do que 3 Caracteres',
                                            val => (val && val.length <= 20) || 'Nome deve ser menor que 20 caracteres'
                                        ]"
                                        filled>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" v-if="$route.params._id === '_newUser'"> 
                            <v-text-field
                                    label="Senha"
                                    v-model="user.password"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append.prevent="show = !show"
                                    prepend-icon="mdi-lock-outline"
                                    :rules="passwordRules"
                                    ref="password"
                                    required
                                    filled
                            />                            
                        </v-col>        
                        <v-col cols="12" md="4" v-if="$route.params._id === '_newUser'"> 
                            <v-text-field
                                    label="Confirmar Senha"
                                    v-model="user.passwordConfirm"
                                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                    :type="show ? 'text' : 'password'"
                                    @click:append.prevent="show = !show"
                                    prepend-icon="mdi-lock-outline"
                                    :rules="passwordConfirmRules"
                                    ref="passwordConfirm"
                                    required
                                    filled
                            />                                                    
                        </v-col>         
                        <v-col cols="12" md="4">                      
                            <v-text-field v-model="user.email"
                                        label="Email"
                                        ref="email"
                                        required
                                        prepend-icon="mdi-at"
                                        filled>
                            </v-text-field>
                        </v-col>    
                        <v-col cols="12" md="4">                      
                            <v-text-field v-model="user.phone_number"
                                        label="Celular/WhatsApp"
                                        ref="phone"
                                        required 
                                        v-mask="'(##) #####-####'"
                                        prepend-icon="mdi-whatsapp"
                                        filled>
                            </v-text-field>
                        </v-col>                                  
                        <v-col cols="12" md="4" v-if="$route.params._id !== '_newUser' && user.disabledAt">
                                <v-text-field
                                label="Desativado em"
                                v-model="user.disabledAtPtBr"
                                ref="updatedAt"
                                prepend-icon="mdi-calendar"
                                required filled disabled
                                />
                        </v-col>                                                                          
                        <v-col cols="12" md="4" v-if="$route.params._id !== '_newUser'">
                            <v-text-field
                                label="Criado"
                                v-model="user.createdAtPtBr"
                                ref="createdAt"
                                prepend-icon="mdi-calendar"
                                required filled disabled
                            />
                        </v-col>
                        <v-col cols="12" md="4" v-if="$route.params._id !== '_newUser'">
                                <v-text-field
                                label="Alterado"
                                v-model="user.updatedAtPtBr"
                                ref="updatedAt"
                                prepend-icon="mdi-calendar"
                                required filled disabled
                                />
                        </v-col>   
                        <v-col 
                            cols="12" md="4" 
                            style="margin-left: 40%" 
                            v-if="user._id !== userLogged._id"
                        >
                                <v-switch
                                    dense
                                    v-model="user.enabled"
                                    :label="user.enabled ? 'Ativo' : 'DESATIVADO'"
                                ></v-switch>    
                                
                        </v-col>                           
                        <!-- <v-col cols="12" >
                            <v-subheader>Comissão</v-subheader>
                            <v-card-text>
                            <v-slider
                                v-model="user.percentCommission"
                                :label="`${user.percentCommission}%`"
                            ></v-slider>
                            </v-card-text>
                        </v-col> -->
                        <v-col 
                            cols="9" md="4" 
                            style="margin-left: 10%" 
                            v-if="user._id && user.type === 'hairdresser'"
                        >
                                <v-tooltip
                                v-model="showInfoAllowUpdateEmployee"
                                top
                                >
                                <template v-slot:activator="{ on, attrs }">
                                    <v-btn
                                    icon
                                    v-bind="attrs"
                                    v-on="on"
                                    >
                                    <v-icon color="grey lighten-1" v-if="false">
                                        mdi-information-outline
                                    </v-icon>
                                    </v-btn>
                                </template>
                                <span>
                                    Os funcionários não tem poder para alterar as ordens de serviços 
                                    já cadastradas, mesmo lançadas por ele mesmo, ao habilitar esse 
                                    campo o funcionário poderá alterar suas ordens de serviço, 
                                    como Valores, Serviços e Cliente.
                                </span>
                                </v-tooltip>                           
                                <v-switch
                                    dense
                                    v-model="user.allowEditOrder"
                                    label="Alterar Ordens de Serviços"
                                    append-icon="mdi-information-outline"
                                    @click:append.prevent="showInfoAllowUpdateEmployee = !showInfoAllowUpdateEmployee"                                    
                                ></v-switch>    
                             
                        </v-col>      
                        <v-col cols="12" md="12" v-if="userLogged.type === 'sys_admin'">
                                <v-text-field
                                label="Device"
                                v-model="user.device" 
                                ref="device"
                                prepend-icon="mdi-calendar"
                                filled disabled
                                />
                        </v-col>                                                                          
                </v-row>                 
                <v-row>
                    <v-col cols="12"  class="mt-0 pt-0">
                        <span class="primary--text">
                            Serviços que {{ user.name }} possui <br/><br/>
                        </span>
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
                                    Commissão
                                    </th>                                                
                                    <th></th>
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in user.services" :key="item.type">
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.price | currency }}</td>
                                    <td>{{ item.percentCommission }}%</td>
                                    <td>
                                        <v-icon 
                                            small color="info"
                                            @click="editService(item)" class="primary--text">
                                            mdi-pencil
                                        </v-icon>      
                                    </td>
                                    <td>
                                        <v-icon 
                                            small
                                            @click="deleteService(item)" class="error--text">
                                            mdi-arrow-down
                                        </v-icon>                                    
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot v-if="!user.services || user.services.length === 0">
                                    <tr>
                                        <td align="" class="error--text" colspan="4"><b>Não há serviços adicionados</b></td>
                                    </tr>
                                </tfoot>                                
                            </template>
                        </v-simple-table>
                    </v-col> 
                </v-row>       
                <br/><br/>
                <v-row>
                    <v-col cols="12"  class="mt-0 pt-0">
                        Serviços que {{ user.name }} não possui <br/><br/>
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
                                    <th></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr v-for="item in services" :key="item.type">
                                    <td>{{ item.type }}</td>
                                    <td>{{ item.price | currency }}</td>
                                    <td>
                                    <v-icon 
                                        @click="addService(item)" class="success--text">
                                        mdi-arrow-up
                                    </v-icon>
                                    </td>
                                </tr>
                                </tbody>
                                <tfoot v-if="!services || services.length === 0">
                                    <tr>
                                        <td align="" class="grey--text" colspan="3"><b>Todos os serviços foram adicionados</b></td>
                                    </tr>
                                </tfoot>   
                            </template>
                        </v-simple-table>
                    </v-col> 
                </v-row>                          
                <v-row 
                    align="center"
                    justify="space-around"
                >
                    <v-col cols="12" md="12" align="center">
                        <v-btn 
                            type="submit" 
                            depressed  
                            x-large 
                            color="success"
                            :loading="loadingSave"
                            :disabled="loadingSave"
                            style="width: 40%"
                        >Salvar</v-btn>     
                        &nbsp;&nbsp;   
                        <v-btn 
                            v-if="user._id && user._id !== userLogged._id && user.type === 'hairdresser'"
                            type="button" 
                            depressed  
                            x-large 
                            color="primary"
                            :loading="loadingAdm"
                            :disabled="loadingAdm"
                            style="width: 40%"
                            @click="becomeAdmin"
                        >Tornar Admin</v-btn>    
                        
                        <v-btn 
                            v-if="user._id && user._id !== userLogged._id && user.type === 'administrator'"
                            type="button" 
                            depressed  
                            x-large 
                            color="grey"
                            :loading="loadingAdm"
                            :disabled="loadingAdm"
                            style="width: 40%"
                            @click="becomeCommon"
                        >Tornar Comum</v-btn>                               
                    </v-col>                                                  
                </v-row>                    
            </v-form>          

            <br/><br/>

            <v-dialog
                :value="dialog"
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
                    @click="dialog = false"
                    >
                    <v-icon>mdi-close</v-icon>
                    </v-btn>      
                    <v-toolbar-title style="margin-left:-17px;">
                        {{ service.type }}
                    </v-toolbar-title>
                    <v-spacer></v-spacer>
                </v-toolbar>    
                <v-card-text>
                    <v-container >
                        <br/>
                        <small>
                            <v-icon small>mdi-information-outline</v-icon>
                            Para alterar nome do Serviço vá em > Configurações > Serviços de {{ company.shortName }}
                        </small>                    
                        <br/><br/>
                        <v-form 
                            v-on:submit.prevent="submitChangePercentCommission"
                            ref="commissionForm"
                            id="commissionForm"
                        >  
                            <v-col cols="12">
                                <money v-model="service.price" v-bind="money"></money>
                            </v-col>                                              
                            <v-col cols="12" >
                                <v-subheader>Comissão</v-subheader>
                                <v-card-text>
                                    <v-slider
                                        v-model="service.percentCommission"
                                        :label="`${service.percentCommission}%`"
                                    ></v-slider>
                                </v-card-text>
                            </v-col>               
                            <v-col cols="12">
                                <b>{{ user.name }} recebera {{ service.price * service.percentCommission / 100 | currency }} por Servico </b>
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
        </div>
        
    </v-container>
</template>

<script>
import gateway from '../api/gateway'
import SnackBar from '../components/SnackBar'
import storage from '../storage'
import InputsUtils from '../utils/inputs'
export default {
    name: 'UsuarioForm',
    components: { 
        SnackBar,
    },
    data: () => ({
        showInfoAllowUpdateEmployee: false,
        dialog: false,
        loading: false,
        loadingSave: false,
        loadingAdm: false,
        valid: true,
        show: false,
        user: { 
            enabled: true,
            passwordConfirm: '',
            type: 'hairdresser',
            percentCommission: 50,
            services: []
        },
        services: [],
        service: {},
        enabled: true,
        message: {},      
        passwordRules: [
            v => !!v || 'Senha do Usuario Obrigatório',
            v => (v && v.length > 3) || 'Senha deve ser maior que 3 caracteres',
        ],                          
        passwordConfirmRules: [
            v => (!!v) || 'Confirmacao de Senha deve ser equivalente',
        ],         
        userLogged: {},
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false
        }                                    
    }),
    beforeMount() {
      this.userLogged = storage.getUserLogged();   
      this.company = storage.getCompany();   
      if(this.$route.params._id !== '_newUser') {
        this.loading = true;
        gateway.getUserById(
                this.$route.params._id,
                res => {
                    if(!res.services) res.services = [];
                    this.user = res;
                    this.user.disabledAtPtBr = new Date(this.user.disabledAt).toLocaleDateString('pt-BR');
                    this.user.createdAtPtBr = new Date(this.user.createdAt).toLocaleDateString('pt-BR');
                    this.user.updatedAtPtBr = new Date(this.user.updatedAt).toLocaleDateString('pt-BR');
                    this.user.enabled = !this.user.disabled;
                    this.enabled = this.user.enabled;
                    this.loading = false;
                    
                    this.company.services.forEach(s => {

                        let svcCount = this.user.services.filter(it => it.type === s.type)
                        if(!this.user.services || svcCount.length == 0) {
                            this.services.push(s);
                        }
                    })
                },
                err => { 
                    this.loading = false;
                    console.log(err)
                }
        );  
      } else {
          this.user.services = this.company.services;
          this.user.services.forEach(s => s.percentCommission = 50);
      }
    },    
    methods: {
      becomeAdmin() {
          if (confirm(`${this.user.name} tera acesso de administrador e podera ver a contabilidade completa.\n\nDeseja Relamente Tornar ${this.user.name} Admin?`)) {
            gateway.becomeUserAdmin(this.user._id,
                res => {
                    console.log(res);
                    this.$router.push('/admin/users');                
                }, err => {
                    if(err.response.status === 412 || 
                    err.response.status === 422 ||
                    err.response.status === 403) {
                        alert(err.response.data.message)
                    } else {                        
                        alert('Erro ao tornar o usuario um Admin, tente novamente');                
                    }
                })
          }
      },
      becomeCommon() {
          gateway.becomeUserCommon(this.user._id,
            () => {
                this.$router.push('/admin/users');              
            }, err => {
                if(err.response.status === 412 || 
                   err.response.status === 422 ||
                   err.response.status === 403) {
                    alert(err.response.data.message)
                } else {                        
                    alert('Erro ao alterar usuario para Comum, tente novamente');                
                }
            })
      },
      save() {
        this.user.disabled = !this.user.enabled;
        if(!this.$refs.userForm.validate()) {
            return;
        }

        if (!this.user.password.match(this.user.passwordConfirm)) {
            alert('Confirmacao de Senha deve ser equivalente');
            this.showMessage('red', 'Confirmacao de Senha deve ser equivalente');
            return;
        }
        this.loadingSave = true;
        this.user.company = this.company;
        if(this.$route.params._id && this.$route.params._id !== '_newUser') {
            let desabilitando = this.enabled === true && this.user.enabled === false;
            if(desabilitando && !confirm('Apos desativar o usuario voce podera ativa-lo novamente apos 3 dias, deseja realmente desativar usuario?')) {
                this.loadingSave = false;
                return;
            }
            gateway.updateUser(
                this.$route.params._id,
                this.user,
                res => {
                    console.log(res);
                    this.loadingSave = false;
                    this.$router.push('/admin/users');
                },
                err => {
                    this.loadingSave = false;
                    if(err.response.status === 412 || err.response.status === 422) {
                        alert(err.response.data.message)
                    }                        
                    console.log(err);
                }
            );
        } else {
                gateway.signUp(
                    this.user,
                    res => {
                        console.log(res);
                        this.loadingSave = false;
                        this.$router.push('/admin/users');
                    },
                    err => {
                        console.log(err);
                        this.loadingSave = false;
                        if(err.response.status === 500) {
                            alert('Erro ao Cadastrar usuario, tente novamente');
                        } else {
                            alert(err.response.data.message);
                        }
                    }
            );            
        }    
      },
      removeSpecialChar(v) {
            return InputsUtils.usernameInputs(v);
      },       
      showMessage(color, text) {
            this.message.color = color;
            this.message.text = text;
            this.message.show = true;
      },
      deleteService(service) {
            this.user.services.splice(this.user.services.indexOf(service), 1);
            this.services.push(service);
      },
      addService(service) {
            service.percentCommission = 50
            this.user.services.push(service);
            this.editService(service);
            this.services.splice(this.services.indexOf(service), 1);
      },
      editService(service) {
          this.service = { 
              index: this.user.services.indexOf(service),
              type: service.type, 
              price: service.price, 
              percentCommission: service.percentCommission
            };
          this.dialog = true; 
      },              
      submitChangePercentCommission() {
          this.user.services[this.service.index].price = this.service.price;
          this.user.services[this.service.index].percentCommission = this.service.percentCommission;
          this.dialog = false;
      }
    },
  }
</script>
<style scoped>
  .v-money {
      margin-left: -20px;
      color: green;
      width: 250px;
      font-size: 30px;
  }
</style>

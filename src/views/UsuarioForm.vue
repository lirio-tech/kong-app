<template>
    <v-container>
        <AppBar />             
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/admin/users'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.8rem !important;">Cadastro de Usuário </span>
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
                            style="margin-left: 10%" 
                            v-if="user._id && user.type === 'hairdresser'"
                        >
                                <v-switch
                                    dense
                                    v-model="user.allowEditOrder"
                                    label="Permitir Alterar Serviços"
                                ></v-switch>    
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
                            style="width: 48%"
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
                            style="width: 48%"
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
                            style="width: 48%"
                            @click="becomeCommon"
                        >Tornar Comum</v-btn>                               
                    </v-col>                                                  
                </v-row>                    
            </v-form>                                                
            <br/><br/>
        </v-main>
        <SnackBar :show="message.show" :text="message.text" :color="message.color" />
    </v-container>
</template>

<script>
import gateway from '../api/gateway'
import AppBar from '../components/AppBar'
import SnackBar from '../components/SnackBar'
import storage from '../storage'
import InputsUtils from '../utils/inputs'
export default {
    name: 'UsuarioForm',
    components: { 
        AppBar, 
        SnackBar
    },
    data: () => ({
        loading: false,
        loadingSave: false,
        loadingAdm: false,
        valid: true,
        show: false,
        user: { 
            enabled: true,
            passwordConfirm: '',
            type: 'hairdresser'
        },
        enabled: true,
        message: {},      
        passwordRules: [
            v => !!v || 'Senha do Usuario Obrigatório',
            v => (v && v.length > 3) || 'Senha deve ser maior que 3 caracteres',
        ],                          
        passwordConfirmRules: [
            v => (!!v) || 'Confirmacao de Senha deve ser equivalente',
        ],         
        userLogged: {}                         
    }),
    methods: {
      becomeAdmin() {
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
        this.user.company = this.userLogged.company;
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
      }        
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();   
      if(this.$route.params._id !== '_newUser') {
        this.loading = true;
        gateway.getUserById(
                this.$route.params._id,
                res => {
                    this.user = res;
                    this.user.disabledAtPtBr = new Date(this.user.disabledAt).toLocaleDateString('pt-BR');
                    this.user.createdAtPtBr = new Date(this.user.createdAt).toLocaleDateString('pt-BR');
                    this.user.updatedAtPtBr = new Date(this.user.updatedAt).toLocaleDateString('pt-BR');
                    this.user.enabled = !this.user.disabled;
                    this.enabled = this.user.enabled;
                    this.loading = false;
                },
                err => { 
                    this.loading = false;
                    console.log(err)
                }
        );  
      }
    }
  }
</script>

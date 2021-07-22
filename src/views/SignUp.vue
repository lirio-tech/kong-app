<template>
  <v-container fluid>
    <AppBar />
    <v-main>
        <v-row justify="center">
           
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
     
                <p class="mr-2 text-center grey--text" 
                   style="font-family: 'Frijole', cursive; font-size: 1.8rem;">
                    Cadastre-se
                </p>  

                <center>
                   <v-avatar
                        class="profile"
                        color="black"
                        size="90"
                    >
                      <v-img 
                        v-if="$vuetify.theme.dark"
                        avatar
                        src="../assets/kong.png" 
                      />
                      <v-img 
                        v-else
                        avatar
                        src="../assets/lady.png" 
                      />                      
                   </v-avatar>
                </center>                
                <br/>
                <v-stepper
                    v-model="e1"
                    vertical
                >
                    <v-stepper-step
                        step="1"
                        complete
                    >
                        Seu Estabelecimento
                    </v-stepper-step>

                    <v-stepper-content step="1">
                        <v-form 
                            id="formCompany" 
                            ref="formCompany" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="onSubmit"
                        >          

                            <v-text-field
                                autocomplete="off"
                                label="Nome do seu Estabelecimento"
                                prepend-icon="mdi-home"
                                required
                                :rules="[val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres']"
                                @keyup="onChangeCompanyName"
                                v-model="signup.company.name"
                                ref="companyName"
                            />
                            <v-text-field
                                autocomplete="off"
                                label="Nome Abreviado"
                                prepend-icon="mdi-home"
                                :rules="[ 
                                    val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres',
                                    val => val && val.length <= 16 || 'tamanho maximo eh de 15 Caracteres',
                                ]"
                                required
                                v-model="signup.company.shortName"
                                ref="companyShortName"
                            />
                            <!-- <br/><br/> -->
                            <!-- <v-slider
                                style="margin-top: -25px"
                                v-model="signup.company.signupAmountUsers"
                                min="1"
                                prepend-icon="mdi-account"
                                label="Profissionais"
                                max="5"
                                thumb-label
                            ></v-slider>                            -->
                            <br/>
                            <v-btn
                                color="green darken-2"
                                type="submit"
                            >
                                Proximo
                            </v-btn>
                        </v-form>
                    </v-stepper-content>

                    <v-stepper-step
                        step="2"                    
                    >
                        Usuario 
                        <small>Dono do Estabelecimento</small>
                    </v-stepper-step>

                    <v-stepper-content step="2">
                        <v-form 
                            id="formUser" 
                            ref="formUser" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="onSubmit"
                        >        
                            <v-text-field
                                autocomplete="off"
                                label="Nome do Dono"
                                prepend-icon="mdi-account"
                                required filled
                                v-model="signup.user.name"
                                :rules="[
                                    val =>  val && val.length > 3    || 'Deve ser maior do que 3 Caracteres',
                                    val => (val && val.length <= 20) || 'Nome deve ser menor que 20 caracteres'
                                ]"
                            />
                            <v-text-field
                                autocomplete="off"
                                label="Username (Login)"
                                prepend-icon="mdi-account"
                                required filled
                                v-model="signup.user.username"
                                @blur="signup.user.username = signup.user.username.toLowerCase()"
                                :rules="[
                                    val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres',
                                    val => (val && val.length <= 15) || 'Username deve ser menor que 15 caracteres'
                                ]"
                                @keyup="signup.user.username = removeSpecialChar(signup.user.username)"
                            />
                            <v-text-field 
                                v-model="signup.user.phone_number"
                                label="Celular/WhatsApp"
                                ref="phone"
                                required
                                v-mask="'(##) #####-####'"
                                prepend-icon="mdi-whatsapp"
                                filled
                            />
                            <v-text-field
                                label="Senha"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append.prevent="show = !show"
                                prepend-icon="mdi-lock-outline"
                                v-model="signup.user.password"
                                :rules="[val => val && val.length > 3 || 'Senha deve conter no minimo 4 Caracteres']"
                                required filled
                            />
                            <v-text-field
                                label="Confirmacao de Senha"
                                prepend-icon="mdi-lock-outline"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append.prevent="show = !show"
                                v-model="signup.user.confirmPassword"
                                :rules="[val => val && val === signup.user.password || 'Confirmacao da Senha nao confere']"
                                required filled
                            />
                            <v-btn
                                color="green darken-2"
                                large
                                type="submit"
                                :loading="loading"
                            >
                                Salvar
                            </v-btn>
                            
                            <v-btn large dark  style="margin-left:50px" @click="e1 = 1">
                                Voltar
                            </v-btn>
                        </v-form>
                    </v-stepper-content>

                </v-stepper> 
                
            </v-col>
        
        </v-row>
        <br/><br/>
        <v-row justify="center">
            <router-link 
                :to="{ path: '/login' }" 
                style="color: inherit; text-decoration: none;"
            >
                <span class="text-no-wrap primary--text" style="font-size: 1.2rem;">
                    <v-icon color="primary">
                        mdi-arrow-left
                    </v-icon>
                    Ja sou cadastrado
                </span>
            </router-link>    
        </v-row>
        <get-it-on-google-play />
    </v-main>
  </v-container>
</template>

<script>
import gateway from '../api/gateway'
import AppBar from '../components/AppBar'
import GetItOnGooglePlay from '../components/GetItOnGooglePlay.vue';
import storage from '../storage';
import InputsUtils from '../utils/inputs'
const STEP_COMPANY = 1;
const STEP_USER = 2;
export default {
    components: {
        AppBar,
        GetItOnGooglePlay
    },
    data: () => ({
        valid: true,
        show: false,
        loading: false,
        e1: 1,
        signup: {
            company: {
                name: '',
                shortName: '',
                signupAmountUsers: 1,
                companyType: 'BARBER'
            },
            user: {}
        }
    }),
    methods: {
        onChangeCompanyName() {
            this.signup.company.shortName = this.signup.company.name.substring(0, 15);
        },
        removeSpecialChar(v) {
          return InputsUtils.usernameInputs(v);
        }, 
        onSubmit() {
            if(this.e1 === STEP_COMPANY) {
                if(!this.$refs.formCompany.validate()) {
                    return;
                }
                this.e1++;
            } 
            else if(this.e1 === STEP_USER) {
                
                if(!this.$refs.formUser.validate()) {
                    return;
                }
                this.loading = true;
                this.signup.user.device = navigator.userAgent;
                gateway.signUpWithCompanyAndUser(this.signup,
                    res => {
                        console.log(res);
                        this.loading = false;
                        storage.setToken(res.token);
                        storage.setUserLogged(JSON.stringify(res.user));
                        storage.setCompany(JSON.stringify(res.company));
                        this.$router.push('/');                       
                    },
                    (err) => {
                        if(err.response.status === 500) {
                            alert('Erro ao se Cadastrar, tente novamente mais tarde ');
                        } else {
                            alert(err.response.data.message);
                        }
                    }
                );
            }
        }
    }
}
</script>
<template>
  <v-container fluid>
    <AppBar />
    <v-main>
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
                <p class="mr-2 text-center grey--text" 
                   style="font-family: 'Frijole', cursive; font-size: 1.4rem;">
                    Iphone
                </p>  
                <v-img 
                    src="../assets/apple.png"
                    height="120"
                    width="120"
                ></v-img>                
            </v-col>
        </v-row>
        <br/><br/>
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">1. Primeiro passo é Abrir o <a href="app.wiskritorio.com.br" class="cyan--text" target="blank">app.wiskritorio.com.br</a> 
                    no</span> Safari
                </p>  
                <v-img 
                    src="../assets/safari.png"
                    height="80"
                    width="80"
                ></v-img>
            </v-col>        
        </v-row>    
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">2. No Safari Clique no Icone de Compartilhar</span> <v-icon>mdi-shared</v-icon>
                </p>  
                <v-img 
                    src="../assets/iphone-install-1.jpg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>         
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">3. Agora ja ate a opcao</span> Adicione na Tela de Inicio
                </p>  
                <v-img 
                    src="../assets/iphone-install-2.jpg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>           
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    <span class="grey--text">4. E por ultimo clique em <span class="blue--text">Adicionar</span> do Campo Superior Direito</span>
                </p>  
                <v-img 
                    src="../assets/iphone-install-3.jpg"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>       
        <v-row >
            <v-col align="center" xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6">
                <p class="mr-2 text-center" 
                   style="font-size: 1.3rem;">
                    Pronto!!! <br/><span class="primary--text">Wiskritorio App</span> Instalado com Sucesso sem ocupar espaco no seu Celular
                </p>  
                <v-img 
                    src="../assets/iphone-installed.gif"
                    height="500"
                    width="250"
                ></v-img>
            </v-col>        
        </v-row>                       
    </v-main>
  </v-container>
</template>

<script>
import gateway from '../api/gateway'
import AppBar from '../components/AppBar'
import InputsUtils from '../utils/inputs'
const STEP_COMPANY = 1;
const STEP_USER = 2;
export default {
    components: {
        AppBar
    },
    data: () => ({
        valid: true,
        show: false,
        loading: false,
        e1: 1,
        signup: {
            company: {
                name: '',
                shortName: ''
            },
            user: {}
        }
    }),
    methods: {
        onChangeCompanyName() {
            this.signup.company.shortName = this.signup.company.name.substring(0, 13);
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
                gateway.signUpWithCompanyAndUser(this.signup,
                    res => {
                        console.log(res);
                        this.loading = false;
                        localStorage.setItem('TOKEN', res.token);
                        localStorage.setItem('user', JSON.stringify(res.user));
                        localStorage.setItem('company', JSON.stringify(res.company));
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
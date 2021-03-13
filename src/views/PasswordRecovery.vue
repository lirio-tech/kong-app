<template>
    <v-container>
        <AppBar />             
        <v-main class="" v-if="!user">            
                <v-col cols="12" align="center" v-if="!loading">   
                    <h2>
                        <v-icon large color="">mdi-arrow-left</v-icon>
                        Voltar
                    </h2>
                </v-col>
        </v-main>
        <v-main class="" v-else>
            <v-row>
                <v-col cols="12" align="center">   
                        <h2>Olá {{ user.name }}, </h2>
                        <p class="accent--text" style="font-size: 1.5rem !important;">Vamos Recuperar sua Senha?</p>
                </v-col>
            </v-row>          
            <v-row>
                <v-container>
                    <v-col cols="12"> 
                        <h2 class="">Então Vamos Lá!!!</h2>
                    </v-col>
                </v-container>
            </v-row>
            <v-form 
                v-model="valid" 
                v-on:submit.prevent="updateRecoveryPassword"
                ref="userForm"
                id="userForm"
            >         
                <v-row>
                    <v-col cols="12" md="4"> 
                        <v-text-field
                                label="Digite sua Nova Senha"
                                v-model="user.password"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append.prevent="show = !show"
                                prepend-icon="mdi-lock-outline"
                                :rules="[val => val && val.length > 3 || 'Senha deve conter no minimo 4 Caracteres']"
                                ref="password"
                                required
                                filled
                        />                            
                    </v-col>        
                    <v-col cols="12" md="4" > 
                        <v-text-field
                                label="Confirme sua Senha"
                                v-model="user.passwordConfirm"
                                :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                :type="show ? 'text' : 'password'"
                                @click:append.prevent="show = !show"
                                prepend-icon="mdi-lock-outline"
                                :rules="[val => val && val === user.password || 'Confirmacao da Senha nao confere']"
                                ref="passwordConfirm"
                                required
                                filled
                        />                                                    
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
                            color="primary"
                            :loading="loading"
                            :disabled="loading"
                            style="width: 75%"
                        >Alterar Senha</v-btn>            
                    </v-col>                                                  
                </v-row>                    
            </v-form>                                                
            <br/><br/>
        </v-main>
    </v-container>
</template>

<script>
import gateway from '../api/gateway'
import AppBar from '../components/AppBar'
export default {
    components: {
        AppBar,
    },
    data:() => ({
        valid: true,
        show: false,
        loading: false,
        user: null,
        recoverypass: null
    }),
    beforeMount() {
        this.loading = true;
        gateway.getUserByRecoveryCode(this.$route.params.code,
                    res => { 
                        console.log(res);
                        this.user = res.usr;
                        this.recoverypass = res.cd;
                        this.user.password = '';                        
                        this.loading = false;
                    },
                    () => { 
                        this.loading = false;
                        alert('Erro, tente novamente')
                    } 
            );  
    },
    methods: {
        updateRecoveryPassword() {
            this.loading = true;
            let reqBody = { 
                pw: this.user.password, 
                cpw: this.user.passwordConfirm, 
                cd: this.recoverypass.code
            };
            gateway.recoveryUpdatePassword(reqBody,
                () => {  
                    this.loading = false;
                    alert('Atualizado com sucesso');
                    this.$route.push('/');
                },
                () => {
                    this.loading = false;
                    alert('Erro ao atualizar Senha');
                })
        }
    }
}
</script>
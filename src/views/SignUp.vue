<template>
  <v-container fluid>

    <v-main class="">
        <v-row >
          
            <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
            <v-form 
                            id="form" 
                            ref="form" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="onSubmit"
            >               
                <p class="mr-2 text-center primary--text" style="font-family: 'Frijole', cursive; font-size: 2rem;">
                    Cadastro
                </p>  

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
                        

                                        <v-text-field
                                            autocomplete="off"
                                            label="Nome"
                                            prepend-icon="mdi-home"
                                            required
                                            v-model="signup.company.name"
                                        />
                                        <v-text-field
                                            autocomplete="off"
                                            label="Nome Abreviado"
                                            prepend-icon="mdi-home"
                                            required
                                            v-model="signup.company.shortName"
                                        />
                                        <v-btn
                                            color="green darken-2"
                                            @click="e1 = 2"
                                        >
                                            Proximo
                                        </v-btn>

                    </v-stepper-content>

                    <v-stepper-step
                    step="2"
                    
                    >
                    Usuario 
                     <small>Dono do estabelecimento</small>
                    </v-stepper-step>

                    <v-stepper-content step="2">

                                        <v-text-field
                                            autocomplete="off"
                                            label="Nome"
                                            prepend-icon="mdi-account"
                                            required filled
                                            v-model="signup.user.name"
                                        />
                                        <v-text-field
                                            autocomplete="off"
                                            label="Username"
                                            prepend-icon="mdi-account"
                                            required filled
                                            v-model="signup.user.username"
                                            @blur="signup.user.username = signup.user.username.toLowerCase()"
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
                                            required filled
                                        />
                                        <v-text-field
                                            label="Confirmacao de Senha"
                                            prepend-icon="mdi-lock-outline"
                                            :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                                            :type="show ? 'text' : 'password'"
                                            @click:append.prevent="show = !show"
                                            v-model="signup.user.confirmPassword"
                                            required filled
                                        />
                    <v-btn
                        color="green darken-2"
                        large
                    >
                        Salvar
                    </v-btn>
                    
                    <v-btn large dark  style="margin-left:50px" @click="e1 = 1">
                        Voltar
                    </v-btn>

                    </v-stepper-content>

                </v-stepper> 
               
            </v-form>
                
            </v-col>
        
        </v-row>
        <v-row justify="center">
            <router-link 
                :to="{ path: '/login' }" 
                style="color: inherit; text-decoration: none;"
            >
                <span class="text-no-wrap cyan--text">
                    <v-icon color="cyan" small>
                        mdi-arrow-left
                    </v-icon>
                    Ja sou cadastrado
                </span>
            </router-link>    
        </v-row>
    </v-main>
  </v-container>
</template>

<script>
export default {
    data: () => ({
        valid: true,
        show: false,
        loadingLogin: false,
        e1: 1,
        signup: {
            company: {},
            user: {}
        }
    }),
    methods: {
        onSubmit() {

        }
    }
}
</script>
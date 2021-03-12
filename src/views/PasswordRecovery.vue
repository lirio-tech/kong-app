<template>
  <v-container fluid>
    <AppBar />
    <v-main>
        <v-container fluid>
            <h1>Recuperacao de Senha</h1>
        </v-container>
        <v-row>
            <br/>
            Ola, {{ user.name }}
            <br/>
        </v-row>
        <v-row>
            <v-form 
                id="formRecovery" 
                ref="formRecovery" 
                v-model="valid" 
                lazy-validation 
                v-on:submit.prevent="onSubmit"
            >        
                <v-text-field
                    label="Senha"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append.prevent="show = !show"
                    prepend-icon="mdi-lock-outline"
                    v-model="user.password"
                    :rules="[val => val && val.length > 3 || 'Senha deve conter no minimo 4 Caracteres']"
                    required filled
                />
                <v-text-field
                    label="Confirmacao de Senha"
                    prepend-icon="mdi-lock-outline"
                    :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="show ? 'text' : 'password'"
                    @click:append.prevent="show = !show"
                    v-model="user.confirmPassword"
                    :rules="[val => val && val === user.password || 'Confirmacao da Senha nao confere']"
                    required filled
                />
                <v-btn
                    color="green darken-2"
                    large
                    type="submit"
                    :loading="loading"
                >
                    Alterar Senha
                </v-btn>
            </v-form>
        </v-row>
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
        user: {}
    }),
    beforeMount() {
      gateway.getUserByRecoveryCode(this.$route.params.code,
                res => { 
                    this.user = res;
                },
                () => alert('Erro, tente novamente')
        );  

    }
}
</script>
<template>
  <v-container fluid>
    <AppBar />
    <v-row justify="center">
      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
        <v-slide-y-transition appear>
          <v-form id="form" ref="form" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit" style="margin-top: 50px;">
            <v-card class="pa-3 pa-md-6 mx-auto">
                <p class="mr-2 text-center white--text" style="font-family: 'Frijole', cursive; font-size: 2rem;">
                  Login
                </p>
                <center>
                   <v-avatar
                        class="profile"
                        color="black"
                        size="150"
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
              <v-row justify="center">
                <v-col cols="12" md="6">
                  <div class="text-center">
                    <div class="my-2" />

                    <v-text-field
                      autocomplete="off"
                      label="Username"
                      prepend-icon="mdi-account"
                      v-model="user.username"
                      :rules="[ val => val && val.length > 0 || 'Username Obrigatorio']"
                      ref="username"
                      required
                    />

                    <v-text-field
                      label="Senha"
                      v-model="user.password"
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      @click:append.prevent="show = !show"
                      prepend-icon="mdi-lock-outline"
                      :rules="[ val => val && val.length > 0 || 'Senha Obrigatoria']"
                      ref="password"
                      required
                    />

                    <router-link 
                      :to="{ path: '/sign-up' }" 
                      style="color: inherit; text-decoration: none;"
                    >
                      <span 
                        class="text-no-wrap cyan--text"
                        style="font-size: 1.1rem;"
                      >
                        Cadastre seu Estabelecimento
                      </span>
                    </router-link>                    
                    <br /><br />

                    <v-btn 
                      type="submit" 
                      x-large 
                      :color="$vuetify.theme.dark ? 'dark' : 'primary'" 
                      :loading="loading"
                    >
                      Entrar
                    </v-btn>
                  </div>
                  <br />
                </v-col>
              </v-row>
              <v-row >
                  <get-it-on-google-play />
              </v-row>
            </v-card>
          </v-form>
        </v-slide-y-transition>
      </v-col>
    </v-row>
    <SnackBar :color="message.color" :text="message.text" :show="message.show" />
  </v-container>
</template>

<script>
import gateway from '../api/gateway'
import SnackBar from '../components/SnackBar'
import storage from '../storage'
import AppBar from '../components/AppBar'
import GetItOnGooglePlay from '../components/GetItOnGooglePlay.vue'
export default {
        components: {
          SnackBar,
          AppBar,
          GetItOnGooglePlay,
        },
        data() {
            return {
                message: {
                    show: false,
                    color: 'green',
                    text: 'Hi'
                },              
                valid: true,
                show: false,
                loading: false,
                user: {}
            }
        },
        methods: {
            onSubmit() {
                if(this.$refs.form.validate()) {     
                    this.user.username = this.user.username.toLowerCase();
                    this.loading = true;
                    this.user.device = navigator.userAgent;
                    gateway.signIn(this.user, 
                      res => {
                        this.loading = false;
                        if(!res.auth === true) {
                            alert('Usuario ou Senha Invalido');
                            return;
                        }
                        localStorage.setItem('TOKEN', res.token);
                        localStorage.setItem('user', JSON.stringify(res.user));
                        storage.setCompany(JSON.stringify(res.company));
                        if(res.user.type === 'sys_admin') {
                          this.$router.push('/system');  
                        } 
                        else { 
                          this.$router.push('/'); 
                        }                        

                      }, err => {
                        console.log('err', err.response); 
                        this.loading = true;
                        if(err.response.status === 401) {
                          alert('Usuario ou Senha Invalido');
                        } else {
                          alert('Erro interno no servidor, contate o Administrador ou Tente novamente');
                        }
                      });
                } else {
                    if(!this.user.username) {
                        this.$refs.username.focus();
                    } 
                    else if(!this.user.password) {
                        this.$refs.password.focus();
                    }                    
                }
            },
            showMessage(color, text) {
                this.message.color = color;
                this.message.text = text;
                this.message.show = true;
                setTimeout(() => this.message.show = false, 4000);
            }                          
        },
        beforeMount() {
        
        }
    }    
</script>

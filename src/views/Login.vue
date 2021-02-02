<template>
  <v-container fluid>
    <v-row justify="center">
      <v-col xl="6" lg="6" md="8" sm="12" xs="12" cols="12" class="pt-6" style="padding: 0">
        <v-slide-y-transition appear>
          <v-form id="form" ref="form" v-model="valid" lazy-validation v-on:submit.prevent="onSubmit">
            <v-card class="pa-3 pa-md-6 mx-auto">
                <p class="mr-2 text-center cyan--text" style="font-family: 'Frijole', cursive; font-size: 2rem;">
                  Login
                </p>
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
                    <br /><br />
                    
                    <v-btn type="submit" dark :loading="loading">Entrar</v-btn>
                  </div>
                </v-col>
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
    import gateway from '../api/gateway';
    import SnackBar from '../components/SnackBar';
    export default {
        components: {
          SnackBar
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
                    gateway.signIn(this.user, 
                      res => {
                        console.log('token', res.auth);
                        if(!res.auth === true) {
                            alert('Usuario ou Senha Invalido');
                            this.loading = false;
                            return;
                        }
                        localStorage.setItem('TOKEN', res.token);
                        // localStorage.setItem('username', this.user.username);
                        // localStorage.setItem('userType', this.user.type);
                        this.loading = false;
                        gateway.getUserByUsername(this.user.username,
                          res2 => {
                            localStorage.setItem('user', JSON.stringify(res2));
                            this.$router.push('/');
                          }, err2 => {
                            this.showMessage('error', err2.message);
                          });
                      }, err => {
                        //this.showMessage('error', err.message);
                        console.log('err', err.response); 
                        if(err.response.status === 401) {
                          this.loading = false;
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
            }                
        },
        beforeMount() {
        
        }
    }    
</script>

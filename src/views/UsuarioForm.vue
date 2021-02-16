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
                      <span style="font-size: 1.8rem !important;">Cadastro de Usuario</span>
              </v-col>
          </v-row>          
        
            <v-form 
                v-model="valid" 
                v-on:submit.prevent="save"
                ref="userForm"
                id="userForm"
            >         
                <v-row>
                        <v-col cols="12" md="4">                      
                            <v-text-field 
                                v-model="user.username"
                                label="Username"
                                ref="username"
                                filled required>
                            </v-text-field>  
                        </v-col>
                        <v-col cols="12" md="4">                      
                            <v-text-field v-model="user.name"
                                        label="Nome"
                                        ref="nome"
                                        required
                                        filled>
                            </v-text-field>
                        </v-col>
                        <v-col cols="12" md="4" v-if="$route.params._id === '_newUser'">                      
                            <v-text-field 
                                    v-model="user.password"
                                    label="Senha"
                                    ref="password"
                                    required
                                    filled>
                            </v-text-field>
                        </v-col>        
                        <v-col cols="12" md="4" v-if="$route.params._id === '_newUser'">                      
                            <v-text-field 
                                    v-model="user.passwordConfirm"
                                    label="Confirmar Senha"
                                    ref="passwordConfirm"
                                    required
                                    filled>
                            </v-text-field>
                        </v-col>                                          
                        <v-col cols="12">
                                <v-switch
                                    dense
                                    v-model="user.enabled"
                                    :label="user.enabled ? 'Ativo' : 'DESATIVADO'"
                                ></v-switch>    
                        </v-col>                 
                        <v-col cols="12" md="4">
                            <v-text-field
                                label="Criado"
                                v-model="user.createdAt"
                                ref="createdAt"
                                required filled disabled
                            />
                        </v-col>
                        <v-col cols="12" md="4">
                                <v-text-field
                                label="Alterado"
                                v-model="user.updatedAt"
                                ref="updatedAt"
                                required filled disabled
                                />
                        </v-col>   
                </v-row>    
                <v-row 
                    align="center"
                    justify="space-around"
                >
                    <v-btn 
                        type="submit" 
                        depressed  
                        x-large 
                        color="success"
                        :loading="loadingSave"
                        :disabled="loadingSave"
                        style="wigth: 100%"
                    >Salvar</v-btn>                                        
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
    name: 'UsuarioForm',
    components: { AppBar },
    data: () => ({
        loadingSave: false,
        valid: true,
        user: {
          enabled: true
        }
    }),
    methods: {
      save() {
        this.user.disabled = !this.user.enabled;
        if(this.$route.params._id && this.$route.params._id !== '_newUser') {
                gateway.updateUser(
                    this.$route.params._id,
                    this.user,
                    res => {
                        console.log(res);
                        this.$router.push('/admin/users');
                    },
                    err => {
                        console.log(err);
                    }
            );
        } else {
                gateway.saveUser(
                    this.user,
                    res => {
                        console.log(res);
                        this.$router.push('/admin/users');
                    },
                    err => {
                        console.log(err);
                    }
            );            
        }    
      }
    },
    beforeMount() {
      this.userLogged = JSON.parse(localStorage.getItem('user'));   
      if(this.$route.params._id === '_newUser') {
          this.user = {};
      } else {
        gateway.getUserById(
                this.$route.params._id,
                res => {
                    this.user = res;
                    this.user.enabled = !this.user.disabled;
                },
                err => console.log(err)
        );  
      }
    }
  }
</script>

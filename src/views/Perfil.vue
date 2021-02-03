<template>
    <v-container>
        <v-row>
            <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                <v-btn icon small style="display: inline;"
                    :to="{ 'path': '/'}"
                >
                    <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                </v-btn>
            </v-col>
            <v-col cols="8" align="center">   
                    <span style="font-size: 2.0rem !important;">Perfil</span>
            </v-col>
        </v-row>
        <v-expansion-panels accordion hover focusable>
            <v-expansion-panel>
                <v-expansion-panel-header>Perfil</v-expansion-panel-header>
                <v-expansion-panel-content>

                    <v-row>
                        <v-col cols="12" sm="12">
                            <v-form 
                            v-model="valid" 
                            v-on:submit.prevent="save"
                            id="produtoForm"
                            ref="produtoForm">
                                <v-container>
                                <v-row>
                                    <v-col cols="12" md="4">                      
                                        <v-text-field 
                                            v-model="userLogged.username"
                                            label="Username"
                                            ref="username"
                                            filled required readonly>
                                        </v-text-field>  
                                    </v-col>
                                    <v-col cols="12" md="4">                      
                                        <v-text-field v-model="userLogged.name"
                                                    label="Nome"
                                                    ref="nome"
                                                    required
                                                    filled>
                                        </v-text-field>
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            label="Criado"
                                            v-model="userLogged.createdAt"
                                            ref="createdAt"
                                            required filled disabled
                                        />
                                    </v-col>
                                    <v-col cols="12" md="4">
                                        <v-text-field
                                            label="Alterado"
                                            v-model="userLogged.updatedAt"
                                            ref="updatedAt"
                                            required filled disabled
                                        />
                                    </v-col>                                    
                                </v-row>
                                <v-row>
                                    <v-btn 
                                        type="submit" 
                                        depressed 
                                        color="success"
                                        :loading="isLoading"
                                        :disabled="isLoading"
                                    >Salvar</v-btn>
                                </v-row>
                                </v-container>
                            </v-form>                
                        </v-col>
                    </v-row>
                </v-expansion-panel-content>
            </v-expansion-panel>
            <v-expansion-panel>
                <v-expansion-panel-header>Alterar Senha</v-expansion-panel-header>
                <v-expansion-panel-content>

                </v-expansion-panel-content>
            </v-expansion-panel>

        </v-expansion-panels>
    </v-container>
</template>

<script>
  export default {
    name: 'Perfil',
    data: () => ({
      isLoading: false,
      valid: true,
      userLogged: {
        type: 'none'
      }
    }),
    methods: {
      save() {

      }        
    },
    beforeMount() {
      this.userLogged = JSON.parse(localStorage.getItem('user'));
    }
  }
</script>

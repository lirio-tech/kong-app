<template>
    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            class="success white--text"
          >
            <v-btn
              icon
              small
              @click="$emit('show-dialog', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                Concluir Agendamento
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <br/>
                <h2>Para concluir o Agendamento confirme as informações abaixo: </h2>

                <v-form 
                  v-on:submit.prevent="done"
                  ref="agendamentoForm"
                  id="agendamentoForm"
                >              
                    <br/>
                    <v-col cols="12">                                  
                      <v-radio-group
                        v-model="paymentType"
                        row
                      >
                        <v-radio
                          label="Dinheiro"
                          value="cash"
                        >
                        </v-radio>
                        <v-radio
                          label="Cartão"
                          value="card"
                        ></v-radio>
                        <v-radio
                          label="Pix"
                          value="pix"
                        ></v-radio>                                    
                      </v-radio-group>                              
                    </v-col>                            
                      <v-col cols="12" sm="12">           
                          <v-simple-table dense >
                          
                                  <tbody >
                                  <tr v-for="s in agendamento.services" :key="s._id">
                                      <th style="width: 50px">
                                          <v-select
                                              v-model="s.type"
                                              :items="services"
                                              item-text="type"
                                              label="Serviços"
                                              ref="services"
                                              readonly
                                              :rules="[v => v.length > 0 || 'Servico Obrigatório',]"                          
                                          ></v-select>
                                      </th>
                                      <th>
                                          <money v-model="s.price" v-bind="money"></money>
                                      </th>
                                  </tr>
                                  </tbody>
                        
                          </v-simple-table>
                      </v-col>                                              

                      <v-col 
                          cols="12"
                          sm="6"
                          align="center"
                          justify="space-around"
                      >                      
                        <v-btn 
                            style="width: 90%"
                            color="success"
                            x-large
                            type="submit"
                            :loading="loadingConcluir"
                        >
                          Concluir Agendamento
                        </v-btn>                                                                               
                      </v-col>           
                </v-form>                                          
            </v-container>
          </v-card-text>          
          <div style="flex: 1 1 auto;"></div>
        </v-card>

    </v-dialog>    
</template>

<script>
import UserTypes from '../utils/UserTypes'
import storage from '../storage'
import agendamentoGateway from '../api/agendamentoGateway';
export default {
    props:['dialog', 'agendamento'],
    data () {
      return {
        loadingConcluir: false,
        paymentType: 'card',
        userLogged: {},
        myCompany: {},
        services: [],
        value: [],        

        //date: new Date().toISOString().substr(0, 10),
        menu2: false,
        modal: false,
        money: {
          decimal: ',',
          thousands: '.',
          prefix: 'R$ ',
          precision: 2,
          masked: false
        }        

      }
    }, 
    methods: {
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type)
      },
      numberBrToUS(v) {
        return Number(v.replace('R$ ', '').replace('.', '').replace(',', '.'));
      },           
      maskCurrency(v) {
          v=String(v);
          v=v.replace(/\D/g,"");//Remove tudo o que não é numero
          v=String(Number(v));
          v=v.replace(/(\d)(\d{8})$/,"$1.$2");//coloca o ponto dos milhões
          v=v.replace(/(\d)(\d{5})$/,"$1.$2");//coloca o ponto dos milhares
          v=v.replace(/(\d)(\d{2})$/,"$1,$2");//coloca a virgula antes dos 2 últimos dígitos
          return v;
      },      
      done() {
        //this.$emit('done', this.agendamento, this.paymentType); 
        if(confirm("Deseja Realmente Concluir?")) {
            this.loadingConcluir = true;
            agendamentoGateway.agendamentoDone(this.agendamento._id, this.agendamento, this.paymentType,
              res => {
                  this.loadingConcluir = false;
                  const order = res;
                  this.$router.push("/ordem-servico/"+order._id); 
              }, (err) => {
                  this.loadingConcluir = false;
                  if(err.response.status === 401) {
                    this.$router.push('/login');
                    return;
                  }
                  if(err.response.status === 412) {
                    alert(err.response.data.message)
                    this.dialogPlan = true;                
                    return;
                  }
                  if(err.response.status === 422) {
                    alert(err.response.data.message)            
                    return;
                  }                        
                  alert('Erro ao Concluir :(');
              })
        }   
      }
    },
    computed: {
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();
      this.myCompany = storage.getCompany();
      this.services = this.myCompany.services;
    }
}
</script>
<style scoped>
  .v-money {
      margin-left: -20px;
      color: green;
      width: 100px;
      font-size: 18px;
  }
</style>
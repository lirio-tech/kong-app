<template>
    <v-container>
        <v-main class="">
          <v-row>
              <v-col cols="1" style="margin-left: 10px; margin-top: 12px;">   
                  <v-btn icon small style="display: inline;"
                      :to="{ 'path': '/perfil'}"
                  >
                      <v-icon large color="blue-grey darken-2">mdi-arrow-left</v-icon>
                  </v-btn>
              </v-col>
              <v-col cols="10" align="center">   
                      <span style="font-size: 1.8rem !important;">{{ company.shortName }} </span>
              </v-col>
          </v-row>      
          <v-row>
            <v-expansion-panels
                    v-model="panel"
                    hover
                    focusable
                    multiple
            >        
                <v-expansion-panel>
                    <v-expansion-panel-header>{{ company.shortName }}</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col cols="12">  
                            <v-form 
                                id="formCompany" 
                                ref="formCompany" 
                                v-model="valid" 
                                lazy-validation 
                                v-on:submit.prevent="onSubmit"
                            >          
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Nome do seu Estabelecimento"
                                        prepend-icon="mdi-home"
                                        required
                                        :rules="[val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres']"
                                        v-model="company.name"
                                        ref="companyName"
                                        :disabled="!isAdmin()"
                                    />
                                </v-col>
                                <v-col cols="12">
                                    <v-text-field
                                        autocomplete="off"
                                        label="Nome no App"
                                        prepend-icon="mdi-home"
                                        :rules="[ 
                                            val => val && val.length > 3 || 'Deve ser maior do que 3 Caracteres',
                                            val => val && val.length <= 16 || 'tamanho maximo eh de 15 Caracteres',
                                        ]"
                                        required
                                        v-model="company.shortName"
                                        ref="companyShortName"
                                        :disabled="!isAdmin()"
                                    />
                                </v-col>
                                <br/>
                                <v-btn
                                    color="green darken-2"
                                    type="submit"
                                    :disabled="!isAdmin()"
                                >
                                    Salvar
                                </v-btn>                                
                            </v-form>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel>
                    <v-expansion-panel-header>Serviços</v-expansion-panel-header>
                    <v-expansion-panel-content>
                                <v-col cols=12>
                                    <span>Serviço</span>                                    
                                </v-col>                   
                                <v-row >
                                    <v-col cols="12">
                                        <v-text-field
                                            autocomplete="off"
                                            label="Nome do Serviço"
                                            v-model="service.type"                    
                                            filled
                                        />                        
                                    </v-col>                    
                                    <v-col cols="5">
                                        <v-text-field
                                            autocomplete="off"
                                            label="Valor"
                                            v-model="service.priceBR"
                                            @focus="$event.target.select()"
                                            ref="servicePrice"
                                            @keyup="service.priceBR = maskCurrency(service.priceBR)"
                                            filled
                                        />
                                    </v-col>
                                    <v-col cols="5">
                                      <v-text-field
                                        label="Tempo"
                                        filled
                                        v-model="service.time"
                                        type="time"
                                         v-bind="attrs"
                                      ></v-text-field>                                   
                                    </v-col>                                    
                                    <v-col cols="1">
                                        <v-btn icon outlined class="mt-3" @click="addService">
                                            <v-icon>mdi-plus</v-icon>
                                        </v-btn>                            
                                    </v-col>
                                </v-row>              
                                <v-row>
                                <v-col cols="12"  class="mt-0 pt-0">

                                    <v-simple-table dense >
                                        <template v-slot:default>
                                            <thead >
                                            <tr>
                                                <th class="text-left">
                                                Serviço
                                                </th>
                                                <th class="text-left">
                                                Valor
                                                </th>
                                                <th class="text-left">
                                                Tempo
                                                </th>                                                
                                                <th></th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr v-for="item in company.services" :key="item.type">
                                                <td>{{ item.type }}</td>
                                                <td>{{ item.price | currency }}</td>
                                                <td>{{ item.time }}</td>
                                                <td>
                                                <v-icon 
                                                    @click="deleteService(item)" class="error--text">
                                                    mdi-delete
                                                </v-icon>
                                                </td>
                                            </tr>
                                            <tr v-if="!company.services || company.services.length === 0">
                                                <td align="center" class="error--text" colspan="3"><h3>Não há serviços adicionados</h3></td>
                                            </tr>
                                            </tbody>
                                        </template>
                                    </v-simple-table>
                                </v-col> 
                                </v-row>
                                <br/>
                                <!-- <v-btn
                                    color="green darken-2"
                                    type="button"
                                    @click="onSubmit"
                                >
                                    Salvar
                                </v-btn> -->
                    </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>
                        Comissão por Funcionário
                    </v-expansion-panel-header>
                    <v-expansion-panel-content>
                        <v-form 
                            id="formCompany" 
                            ref="formCompany" 
                            v-model="valid" 
                            lazy-validation 
                            v-on:submit.prevent="updateCommission"
                        >
                            <br/>
                            <v-chip color="primary" style="margin-left: 15px;" outlined small>
                                Somente Usuarios Admin acessam a Comissão 
                            </v-chip>
                            <br/><br/>
                            <v-col cols="12" v-for="user in users" :key="user._id">
                                <v-slider
                                    style="margin-top: -25px"
                                    v-model="user.percentCommission"
                                    min="1"
                                    prepend-icon="mdi-account"
                                    :label="`${user.name} (${user.percentCommission}%)`"
                                    max="100"
                                    thumb-label
                                ></v-slider>  
                            </v-col>
                            <br/>                            
                            <v-btn
                                color="green"
                                type="submit"
                            >
                                Salvar
                            </v-btn>
                        </v-form>
                    </v-expansion-panel-content>
                </v-expansion-panel>       
                <v-expansion-panel v-if="isAdmin()">
                    <v-expansion-panel-header>Historico de Pagamento</v-expansion-panel-header>
                    <v-expansion-panel-content>              
                        <v-col cols="12" >  
                                <v-col align="center" >
                                    <v-chip color="primary" outlined small >
                                        Somente Usuarios Admin acessam aos pagamentos
                                    </v-chip>        
                                </v-col>
                                <v-col cols="12">
                                        <v-card
                                            class="mx-auto"
                                        >
                                            <v-list two-line>
                                                <v-list-item-group
                                                    v-model="selected"
                                                    active-class="pink--text"
                                                    multiple
                                                >
                                                    <span v-if="!items || items.length < 1">Nao ha pagamentos registrados</span>
                                                    <template v-for="(item, index) in items">
                                                    <v-list-item :key="item.plan.name">
                                                        <template >
                                                        <v-list-item-content>
                                                            
                                                            <v-list-item-title 
                                                                v-text="item.plan.name"
                                                            ></v-list-item-title>

                                                            <v-list-item-subtitle
                                                                class="text--primary"
                                                            >
                                                                {{ item.plan.payment.price | currency }}
                                                            </v-list-item-subtitle>

                                                            <v-list-item-subtitle 
                                                            >
                                                                Inicio: {{ getDateFormated(item.plan.dateStarted) }}
                                                            </v-list-item-subtitle>
                                                            <v-list-item-subtitle 
                                                            >
                                                                Vencimento: {{ getDateFormated(item.plan.dateEnd) }}
                                                            </v-list-item-subtitle>

                                                        </v-list-item-content>

                                                        <!-- <v-list-item-action>
                                                            <v-icon
                                                                color="grey lighten-1"
                                                            >
                                                                mdi-check 
                                                            </v-icon>
                                                        </v-list-item-action> -->
                                                        </template>
                                                    </v-list-item>

                                                    <v-divider
                                                        v-if="index < items.length - 1"
                                                        :key="index"
                                                    ></v-divider>
                                                    </template>
                                                </v-list-item-group>
                                            </v-list>
                                        </v-card>
                                </v-col>
                        </v-col>
                    </v-expansion-panel-content>
                </v-expansion-panel>                         
            </v-expansion-panels>
          </v-row>

        </v-main>
        <SnackBar :show="message.show" :text="message.text" :color="message.color" />
    </v-container>
</template>

<script>
import gateway from '../api/gateway'
import SnackBar from '../components/SnackBar'
import storage from '../storage'
import UserTypes from '../utils/UserTypes'
export default {
    name: 'UsuarioForm',
    components: { 
        SnackBar
    },
    data: () => ({
        panel: [],
        loading: false,
        valid: true,
        company: {},
        message: {},   
        service: {
            type: '',
            price: 0.00,
            priceBR: "0,00",
            time: "01:00"                       
        },
        users: [],
      selected: [2],
      items: [],        
    }),
    methods: {
      showMessage(color, text) {
            this.message.color = color;
            this.message.text = text;
            this.message.show = true;
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
      addService() {
          console.log(this.service);
          if(!this.company.services) {
              this.company.services = []
          }
          if(!this.service.type) {
              alert('Descricao do Serviço Obrigatorio');
              return;
          }
          this.service.price = this.numberBrToUS(this.service.priceBR);
          if(this.service.price <= 0) {
              alert('Valor do Serviço deve ser maior que ZERO');
              return;
          }          
          this.company.services.push({type: this.service.type, price: this.service.price, time: this.service.time});
          this.service.type = '';
          this.service.price = 0;
          this.service.priceBR = '0,00';
          this.service.time = "01:00";
          gateway.saveCompany(this.company,
                () => {
                    storage.setCompany(JSON.stringify(this.company));
                }, () => {
                    alert('Erro ao Salvar');
                });          
      },
      numberBrToUS(v) {
        return Number(v.replace('R$ ', '').replace('.', '').replace(',', '.'));
      },                 
      deleteService(svc) {
          console.log(svc);
          this.company.services.splice(this.company.services.indexOf(svc), 1);
          gateway.saveCompany(this.company,
            () => {
                storage.setCompany(JSON.stringify(this.company));
            }, () => {
                alert('Erro ao Salvar');
            });          
      },
      isAdmin() {
        return UserTypes.isAdmin(this.userLogged.type);
      },        
      onSubmit() {
          if(this.$refs.formCompany.validate()) {
            gateway.saveCompany(this.company,
                () => {
                    alert('Atualizado com Sucesso!!!');
                    storage.setCompany(JSON.stringify(this.company));
                }, () => {
                    alert('Erro ao Salvar');
                });
          }
      },
      updateCommission() {
          gateway.updateCommission(this.users,
                () => {
                    alert('Atualizado com Sucesso!!!');
                }, () => {
                    alert('Erro ao Salvar');
                });
      },      
      getUsers() {
        gateway.getUsers('all', res => {
          this.users = res;
        }, err => {
          console.log(err);
        })
      },      
      getPaymentsHistByCompany() {
          gateway.getPaymentsHistByCompany(
            res => {
                this.items = res;
            }, () => {
                alert('Erro ao Buscar pagamentos');
            });
      },
      getDateFormated(date) {
        if (!date) return null;

        const [year, month, day] = date.split('-')
        return `${day}/${month}/${year}`
      },         
    },
    beforeMount() {
      this.userLogged = storage.getUserLogged();   
      gateway.getCompanyById(this.$route.params._id,
        res => {
            this.company = res;
        }, () => {
            alert('Erro ao buscar informacoes do Estabelecimento');
        });
        
      if(this.$route.query.panel) {
         this.panel.push(Number(this.$route.query.panel));
      }

      this.getUsers();
      this.getPaymentsHistByCompany();
    }
  }
</script>

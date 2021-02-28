<template>
  <div>
    <v-card
       
      >
            <v-toolbar
              dark
              class="green"
            >
              <v-toolbar-title>
                Escolha o Plano melhor para VC :-)
              </v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>    
    </v-card>
    
    <br/>

    <v-card
        v-for="plan in plans" 
        :key="plan._id"
      >
        <v-subheader>
          Plano {{ plan.type }}
        </v-subheader>
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title 
              class="headline" 
              :style="'color:'+plan.color"
            >
              {{ plan.name }} 
              <v-chip 
                v-if="company.plan.name === plan.name"
                color="green" 
                style="margin-left: 15px;" 
                outlined
              >
                  Seu plano Atual
              </v-chip>
              <v-chip 
                v-if="plan.advantage && company.plan.name !== plan.name"
                color="yellow" 
                style="margin-left: 15px;" 
                outlined
              >
                Mais Vantajoso
              </v-chip>           
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
            >
              <span class="display-3">
                  {{ plan.price | currency }}
              </span>
              <span v-if="plan.type === 'Mensal' || plan.type === 'Anual'">
                 por {{ plan.type === 'Mensal' ? 'Mês' : 'Ano' }}
              </span>              
            </v-col>


          </v-row>
        </v-card-text>

        <v-list-item
          v-for="benefit in plan.benefits"
          :key="benefit.description"
        >
            <v-list-item-icon>
              <v-icon>{{ benefit.icon }}</v-icon>
            </v-list-item-icon>
            <v-list-item-subtitle>{{ benefit.description }}</v-list-item-subtitle>
        </v-list-item>

        <v-card-actions>
          <v-btn 
            v-if="plan.name === company.plan.name"
            style="width: 100%; color: green" 
            x-large 
            readonly
          >
            <v-icon left>mdi-check</v-icon>
            Plano Atual
          </v-btn>             
          <v-btn 
            v-if="plan.name !== company.plan.name"
            style="width: 100%"
            :color="plan.color" 
            x-large
          >
            <v-icon left>{{ plan.button.icon }}</v-icon>
            {{ plan.button.label }}
          </v-btn>          
        </v-card-actions>

        <br/>
        <v-divider></v-divider>
        
    </v-card>

    <v-alert
      outlined
      prominent
      type="cyan"
      
    >
      <v-row align="center">
        <v-col class="grow">
          Nao encontrou um plano ideal para voce? 
          Entre em contato com a Gente ;-)
        </v-col>
        <v-col class="shrink">
          <router-link to="/public/fale-conosco" style="color: inherit; text-decoration: none">
            <v-btn>Entrar em contato</v-btn>
          </router-link>
        </v-col>
      </v-row>
    </v-alert>
    
  </div>
</template>

<script>
export default {
    data () {
      return {
        company: {
          plan: { name: 'Free' }
        },
        plans: [
          {
            "name": "Free",
            "type": "Free",
            "price": 0.00,
            "benefits": [
              {
                "icon": "mdi-account",
                "description": "1 Usuário Admin"
              },
              {
                "icon": "mdi-content-cut",
                "description": "R$ 1.000,00 por Mês de Lançamentos"
              }
            ],
            "button": {
              "label": "Voltar para o Plano Free",
              "icon": "mdi-close"
            },
            "color": "gray",
            "advantage": false
          },
          {
            "name": "Azul",
            "type": "Mensal",
            "price": 10.00,
            "benefits": [
              {
                "icon": "mdi-account",
                "description": "1 Usuário Admin + 1 Usuário Comum"
              },
              {
                "icon": "mdi-content-cut",
                "description": "R$ 2.000,00 por Mês de Lançamentos"
              }
            ],
            "button": {
              "label": "Quero Esse",
              "icon": "mdi-rocket-launch"
            },
            "color": "blue",
            "advantage": false
          },         
          {
            "name": "Gold",
            "type": "Anual",
            "price": 90.00,
            "benefits": [
              {
                "icon": "mdi-google",
                "description": "Mesmo plano do Azul sendo R$ 7,50 por Mês"
              },              
              {
                "icon": "mdi-account",
                "description": "1 Usuário Admin + 1 Usuário Comum"
              },
              {
                "icon": "mdi-content-cut",
                "description": "R$ 4.000,00 por Mês de Lançamentos"
              }
            ],
            "button": {
              "label": "Quero Esse",
              "icon": "mdi-rocket-launch"
            },
            "color": "#d4af37",
            "advantage": true
          },        
          {
            "name": "É Nóis",
            "type": "Mensal",
            "price": 20.00,
            "benefits": [          
              {
                "icon": "mdi-account",
                "description": "2 Usuário Admin + 4 Usuários Comuns"
              },
              {
                "icon": "mdi-content-cut",
                "description": "R$ 6.000,00 por Mês de Lançamentos"
              }
            ],
            "button": {
              "label": "Quero Esse",
              "icon": "mdi-rocket-launch"
            },
            "color": "cyan",
            "advantage": false
          },        
          {
            "name": "Premium",
            "type": "Anual",
            "price": 180.00,
            "benefits": [          
              {
                "icon": "mdi-google",
                "description": "Mesmo plano É Nóis sendo R$ 15,00 por Mês"
              },              
              {
                "icon": "mdi-account",
                "description": "2 Usuários Admin + 4 Usuários Comuns"
              },
              {
                "icon": "mdi-content-cut",
                "description": "R$ 12.000,00 por Mês de Lançamentos"
              }
            ],
            "button": {
              "label": "Quero Esse",
              "icon": "mdi-rocket-launch"
            },
            "color": "orange",
            "advantage": false
          },           
          {
            "name": "Forever",
            "type": "Forever",
            "price": 1200.00,
            "benefits": [                   
              {
                "icon": "mdi-account",
                "description": "3 Usuários Admin + 5 Usuários Comuns"
              },
              {
                "icon": "mdi-content-cut",
                "description": "R$ 30.000,00 por Mês de Lançamentos"
              }
            ],
            "button": {
              "label": "Quero Esse",
              "icon": "mdi-rocket-launch"
            },
            "color": "purple",
            "advantage": false
          },                                     
        ]
      }
    }
}
</script>
<template>
  <div>
    <v-card
        class="mx-auto"
        max-width="400"
      >
            <v-toolbar
              dark
              color="amber darken-2"
            >
              <v-toolbar-title>Escolha seu Plano</v-toolbar-title>
              <v-spacer></v-spacer>
            </v-toolbar>    
    </v-card>
    
    <br/>

    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline">
              Free <v-chip color="purple" style="margin-left: 15px;" outlined small>Seu plano Atual</v-chip>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              class="display-3"
              cols="12"
            >
              R$ 0,00
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>1 Usuario Admin</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-content-cut</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>R$ 1.000,00 por Mes</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-btn style="width: 100%" color="gray" disabled>
            <v-icon left>mdi-checked</v-icon>
            Plano Atual
          </v-btn>          
        </v-card-actions>
        <v-divider></v-divider>
        
    </v-card>

    <br/>
    <v-divider></v-divider>
    <br/>

    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline light-blue--text "> 
              Azul 1
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
            >
              <span class="display-3">
                 R$ 10,00
              </span>
              <span>
                 por Mes
              </span>              
            </v-col>

          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>1 Usuario Admin + 1 Usuario Comum</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-content-cut</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>R$ 2.000,00 por Mes</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-btn style="width: 100%" color="primary">
            <v-icon left>mdi-rocket-launch</v-icon>
            Quero esse
          </v-btn>
        </v-card-actions>
    </v-card>
    
    <br/>
    <v-divider></v-divider>
    <br/>

    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline amber--text ">
              Gold 1 <v-chip color="cyan" style="margin-left: 15px;" outlined small>Mais Vantajoso</v-chip>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
            >
              <span class="display-3">
                 R$ 90,00
              </span>
              <span>
                 por Ano
              </span>              
            </v-col>
            <v-col
              cols="12"
            >   
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-google</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>Mesmo plano do Azul-1 sendo R$ 7,50 por Mes</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>1 Usuario Admin + 4 Usuarios Comum</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-content-cut</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>R$ 20.000,00 por Mes de Servicos Lancados</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-btn style="width: 100%" color="amber darken-2">
            <v-icon left>mdi-rocket-launch</v-icon>
            Quero esse
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        
    </v-card>

    <br/>
    <v-divider></v-divider>
    <br/>

    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline light-blue--text">
              Azul 2
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
            >
              <span class="display-3">
                 R$ 20,00
              </span>
              <span>
                 por Mes
              </span>              
            </v-col>

          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>1 Usuario Admin + 4 Usuarios Comum</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-content-cut</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>R$ 6.000,00 por Mes</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-btn style="width: 100%" color="blue">
            <v-icon left>mdi-rocket-launch</v-icon>
            Quero esse
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
    </v-card>

    <br/>
    <v-divider></v-divider>
    <br/>

    <br/>
    <v-divider></v-divider>
    <br/>

    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline amber--text ">
              Gold 2 <v-chip color="cyan" style="margin-left: 15px;" outlined small>Mais Vantajoso</v-chip>
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
            >
              <span class="display-3">
                 R$ 180,00
              </span>
              <span>
                 por Ano
              </span>              
            </v-col>
            <v-col
              cols="12"
            >   
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-google</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>Mesmo plano do Basic-2 sendo R$ 15,00 por Mes</v-list-item-subtitle>
        </v-list-item>
        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>1 Usuario Admin + 4 Usuarios Comum</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-content-cut</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>R$ 80.000,00 por Mes de Servicos Lancados</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-btn style="width: 100%" color="amber darken-2">
            <v-icon left>mdi-rocket-launch</v-icon>
            Quero esse
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        
    </v-card>

    <br/>
    <v-divider></v-divider>
    <br/>


    <v-card
        class="mx-auto"
        max-width="400"
      >
        <v-list-item two-line>
          <v-list-item-content>
            <v-list-item-title class="headline purple--text ">
              Roxo 
            </v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-card-text>
          <v-row align="center">
            <v-col
              cols="12"
            >
              <span class="display-3">
                 R$ a Combinar
              </span>
              <span>
                 Infinito
              </span>              
            </v-col>
            <v-col
              cols="12"
            >   
            </v-col>
          </v-row>
        </v-card-text>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-account</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>Quantidade de Usuarios Infinito</v-list-item-subtitle>
        </v-list-item>

        <v-list-item>
          <v-list-item-icon>
            <v-icon>mdi-content-cut</v-icon>
          </v-list-item-icon>
          <v-list-item-subtitle>R$ Lancamento de Servicos Infinitos</v-list-item-subtitle>
        </v-list-item>
        <v-card-actions>
          <v-btn style="width: 100%" color="purple">
            <v-icon left>mdi-rocket-launch</v-icon>
            Entrar em Contato
          </v-btn>
        </v-card-actions>
        <v-divider></v-divider>
        
    </v-card>

    <br/>
    <v-divider></v-divider>
    <br/>

  </div>
</template>

<script>
export default {
    //props:['dialog'],
    data () {
      return {
      }
    },
}
</script>
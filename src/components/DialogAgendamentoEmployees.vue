<template>
    <v-dialog
      :value="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
        <v-card>
          <v-toolbar
            class="purple white--text"
          >
            <v-btn
              icon
              small
              @click="$emit('show-dialog', false, null)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>      
            <v-toolbar-title style="margin-left:-17px;">
                Selecione os Funcionários
            </v-toolbar-title>
            <v-spacer></v-spacer>
          </v-toolbar>    
          <v-card-text>
            <v-container >
                <br/>
                <h2>Seleciones os Funcionários que deseja ver a agenda: </h2>

                <v-form 
                  v-on:submit.prevent="ok"
                  ref="agendamentoForm"
                  id="agendamentoForm"
                >              
                    <br/>
                    <v-col
                      cols="12"
                      sm="6"
                    >
                      <v-select
                        v-model="usersSelected"
                        :items="users"
                        chips
                        label="Chips"
                        multiple
                        outlined
                      ></v-select>
                    </v-col>                                          

                      <v-col 
                          cols="12"
                          sm="6"
                          align="center"
                          justify="space-around"
                      >                      
                        <v-btn 
                            style="width: 90%"
                            color="purple"
                            x-large
                            type="submit"
                        >
                          OK
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
export default {
    props:['dialog', 'users'],
    data () {
      return {
        usersSelected: []
      }
    }, 
    methods: {
      ok() {
        this.$emit('show-dialog', false, this.usersSelected);
      }
    },
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
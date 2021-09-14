<template>


  <div>
    <v-card
      class="mx-auto"
      max-width="800"
      outlined
    >
        <router-link :to="{ path: '/' }"  style="color: inherit; text-decoration: none">
             <v-card-text class="black--text" style="margin-top: -10px;margin-bottom: -17px;">
                <v-col cols="12" style="margin-top: -15px; margin-bottom: -15px">
                    <span 
                        style="font-size: 0.8rem !important;"
                        class="grey--text"
                    >
                        Fala {{ userLogged.name }} você tem 
                    </span>
                    <v-icon class="chevron-right" style="margin-top: 10px;">mdi-chevron-right</v-icon>
                </v-col>               
                <v-col cols="12" >
                    <span class="icon-emoji">🚀</span> 
                    <span class="orange--text" style="margin-left: 25px; font-size: 1.2rem">
                        12.341 
                    </span>
                    <span class="red--text">XP</span> 
                    <span class="grey--text" style="margin-left: 25px;"> Bora pro Game</span>
                </v-col>   
             </v-card-text> 
        </router-link>
    </v-card>            

  </div>                
                          
</template>

<script> 
export default {
    name: 'CardXp',
    props: [ 'userLogged', 'company' ],
    data: () => ({

    }),
    beforeMount() {

    }
  }
</script>

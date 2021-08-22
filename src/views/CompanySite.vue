<template>
  <div>
      <v-card class="overflow-hidden">
        <v-app-bar
          absolute
          color="#6A76AB"
          dark
          shrink-on-scroll
          prominent
          src="https://picsum.photos/1920/1080?random"
          fade-img-on-scroll
          scroll-target="#scrolling-techniques-3"
        >
          <template v-slot:img="{ props }">
            <v-img
              v-bind="props"
              gradient="to top right, rgba(100,115,201,.7), rgba(25,32,72,.7)"
            ></v-img>
          </template>

          <v-app-bar-nav-icon></v-app-bar-nav-icon>

          <v-app-bar-title>
            <span style="width: 500px;"> Lirio Barber </span>
            
          </v-app-bar-title>

          <v-spacer></v-spacer>
    
          <v-btn icon>
            <v-icon>mdi-whatsapp</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-instagram</v-icon>
          </v-btn>

          <v-btn icon>
            <v-icon>mdi-facebook</v-icon>
          </v-btn>      

          <v-btn icon>
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs align-with-title>

              <v-tab @click="tabView = 'HOME'">Home</v-tab>
              <v-tab @click="tabView = 'AGENDA'">Agenda</v-tab>
              <v-tab @click="tabView = 'CONTATO'">Contato</v-tab>
            </v-tabs>
          </template>
        </v-app-bar>
        <v-sheet
          id="scrolling-techniques-3"
          class="overflow-y-auto"
          max-height="600"
        >
          <v-container style="height: 220px;">
                
          </v-container>
        </v-sheet>
        
      </v-card>
      <v-container v-if="tabView === 'HOME'">
          <h1>Home</h1>
      </v-container>
      <v-container v-if="tabView === 'AGENDA'">
          <h1>AGENDA</h1>
      </v-container>
      <v-container v-if="tabView === 'CONTATO'">
          <h1>CONTATO</h1>
      </v-container>            
  </div>
</template>
<script>

export default {
  data: () => ({
    tabView: 'HOME'
  }),
}
</script>

<style scoped>
.v-app-bar-title__content {
  width: 500px;
}
</style>
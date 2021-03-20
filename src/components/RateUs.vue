<template>
  <v-container fluid>
    <v-main class="" >
        <v-row justify="center">
            <v-col
                xl="6"
                lg="6"
                md="8"
                sm="12"
                xs="12"
                cols="12"
                class="pt-6"
                style="padding: 0;margin-top:-60px"
                v-if="!availabled"
            >
                <v-slide-y-transition appear>
                    <v-form
                        id="form"
                        ref="form"
                        v-model="valid"
                        lazy-validation
                        v-on:submit.prevent="onSubmit"
                    >
                        <v-card class="pa-3 pa-md-6 mx-auto">
                            <h3 class="text-center">De 1 a 5 como está sendo a sua experiência?</h3>
                            <v-row justify="center">
                                <v-col cols="12">
                                <div class="text-center">
                                    <div class="my-2" />

                                    <v-rating
                                        background-color="grey lighten-2"
                                        color="amber"
                                        hover
                                        v-model="scoreRating"
                                        length="5"
                                        size="50"
                                    ></v-rating>
                                    <h3 class="text-center"></h3>
                                    <v-row justify="center" align="center">
                                        <v-col cols="11" md="10" lg="8" xl="8">
                                        <v-textarea
                                            id="description"
                                            outlined
                                            class="mx-2"
                                            v-model="description"
                                            hint="Conte para nós como está sendo a sua experiência"
                                            rows="5"
                                            counter="500"
                                            :rules="[v => !!v || 'Obrigatorio', (v) => v.length <= 500 || 'Max 500 characters']"
                                            prepend-icon="mdi-card-text-outline"
                                        ></v-textarea>
                                        </v-col>
                                    </v-row>
                                    <v-btn type="submit" x-large color="primary" dark :loading="loadingBtn">
                                        Avaliar
                                    </v-btn>
                                </div>
                                </v-col>
                            </v-row>
                        </v-card>
                    </v-form>
                </v-slide-y-transition>
            </v-col>
            <v-col
                xl="6"
                lg="6"
                md="8"
                sm="12"
                xs="12"
                cols="12"
                class="pt-6"
                style="padding: 0"
                v-if="availabled"
            >
                <h1 class="text-center">Muito Obrigado :) </h1>
            </v-col>
            
        </v-row>
    </v-main>
  </v-container>
</template>

<script>
import gateway from '../api/gateway';
import storage from '../storage';
export default {
  name: "Denounce",
  data: () => ({
    loadingBtn: false,
    valid: false,
    description: "",
    scoreRating: 0,
    size: 100,
    availabled: false,
    userLogged: {
        type: 'none'
    }    
  }),
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loadingBtn = true;
        let data = {};
        data.ratingDescription = this.description;
        data.scoreRating = this.scoreRating
        if(this.userLogged) data.userId = this.userLogged._id;
        gateway.rateUs(data,
            () => {
               this.loadingBtn = false;
               this.availabled = true;
               alert('Avaliado com sucesso');
            }, () => {
                this.loadingBtn = false;
                alert('Erro ao Avaliar');
            });
      }
    },
  },
  beforeMount() {
    this.userLogged = storage.getUserLogged();
    if (this.$vuetify.breakpoint.name == "xs") {
      this.size = 90;
    } else {
      this.size = 140;
    }
  },
};
</script>
<style>
</style>
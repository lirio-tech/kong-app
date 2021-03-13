<template>
  <v-container fluid>
    <AppBar />             
    <v-main class="">
        <v-row justify="center">
        <v-col
            xl="6"
            lg="6"
            md="8"
            sm="12"
            xs="12"
            cols="12"
            class="pt-6"
            style="padding: 0"
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
                <h1 class="text-center display-1">Avalie-nos</h1>
                <br>
                <h4 class="text-center">Conte para nós como está sendo a sua experiência</h4>
                <v-row justify="center">
                    <v-col cols="12">
                    <div class="text-center">
                        <div class="my-2" />

                        <v-rating
                            background-color="grey lighten-2"
                            color="red"
                            hover
                            v-model="scoreRating"
                            length="5"
                            size="50"
                        ></v-rating>

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
                        <v-btn type="submit" dark :loading="loadingBtn">
                        Avaliar
                        </v-btn>
                    </div>
                    </v-col>
                </v-row>
                </v-card>
            </v-form>
            </v-slide-y-transition>
        </v-col>
        </v-row>
    </v-main>
  </v-container>
</template>

<script>
import gateway from '../api/gateway';
import AppBar from '../components/AppBar'
export default {
  name: "Denounce",
  components: {AppBar},
  data: () => ({
    loadingBtn: false,
    valid: false,
    description: "",
    scoreRating: 0,
    size: 100,
  }),
  methods: {
    onSubmit() {
      if (this.$refs.form.validate()) {
        this.loadingBtn = true;
        let data = {};
        data.ratingDescription = this.description;
        data.scoreRating = this.scoreRating
        gateway.rateUs(data,
            () => {
               this.loadingBtn = false;
               alert('Avaliado com sucesso');
               this.$router.push('/');
            }, () => {
                this.loadingBtn = false;
                alert('Erro ao Avaliar');
            });
      }
    },
  },
  beforeMount() {
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
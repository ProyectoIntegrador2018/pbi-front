<template>
  <div>
    <nutriheader title="Historial Médico" secondRoute="/nutricion/pacientes/"></nutriheader>
    <v-row justify="center">
      <!-- Desayuno -->
      <v-col cols="10">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Desayuno</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center" class="py-0">
                <v-col cols="2"  class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="2"  class="py-0">
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="2"  class="py-0">
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>

            </v-container>
          </v-card-text>
        </v-card>
      </v-col>


    </v-row>
  </div>
</template>

<script>
import nutriheader from "../components/nutriheader.vue";
export default {
  components: {
    nutriheader
  },
  data: () => ({
    desayuno: {
      frutas: "",
      verduras: "",
      leguminosas: "",
      cereal: "",
      azucar: "",
      grada: "",
      leche: "",
      carne: ""
    },
    fruit: [0, 2, 3]
  }),
  methods: {
    totalPorciones() {
      var sumitabonita = this.fruit.reduce((a, b) => a + b, 0);
      console.log(sumitabonita);
    }
  }
};
</script>
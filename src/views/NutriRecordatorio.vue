<template>
  <div>
    <nutriheader title="Recordatorio 24 hrs" secondRoute="/nutricion/pacientes/"></nutriheader>
    <v-row justify="center">
      <!-- Desayuno -->
      <v-col cols="11">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Desayuno</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="desayuno.grasa" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="desayuno.frutas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="desayuno.grasa" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>
              <!-- Esta sección se calcula automáticamente -->
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Hidratos de carbono:
                  </span>
                  <v-text-field v-model="hidratos" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Proteínas:
                  </span>
                  <v-text-field v-model="proteinas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Grasas:
                  </span>
                  <v-text-field v-model="grasas" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Suma de Calorías:
                  </span>
                  <v-text-field v-model="totalCalorias" label="0" single-line solo></v-text-field>
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
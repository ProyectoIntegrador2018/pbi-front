<template>
    <div>
        <nutriheader title="Cita de seguimiento" secondRoute="/nutricion/pacientes/"></nutriheader>

            <v-row justify="center">
      <!-- Desayuno -->
      <v-col cols="10">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Datos antropométricos</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Altura:
                  </span>
                  <v-text-field v-model="altura" label="0" single-line solo suffix="mts"></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Peso:
                  </span>
                  <v-text-field v-model="peso" label="0" single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    IMC:
                  </span>
                  <v-text-field v-model="imc" label="0" single-line solo disabled="true"></v-text-field>
                </v-col>

                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Diagnóstico IMC:
                  </span>
                  <v-text-field v-model="diag_imc" label="0" single-line solo disabled="true"></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Masa muscular:
                  </span>
                  <v-text-field v-model="masaMuscular" label="0" single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Masa grasa:
                  </span>
                  <v-text-field v-model="masaGrasa" label="0" single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    % grasa corporal:
                  </span>
                  <v-text-field v-model="grasaCorporal" label="0" single-line solo suffix="%"></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Agua corporal total:
                  </span>
                  <v-text-field v-model="aguaCorporal" label="0" single-line solo suffix="Lt."></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Agua intracelular:
                  </span>
                  <v-text-field v-model="aguaIntracelular" label="0" single-line solo suffix="Lt."></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Agua extracelular:
                  </span>
                  <v-text-field v-model="aguaExtracelular" label="0" single-line solo suffix="Lt."></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="6" class="py-0">
                  <span class="subtitle-2">
                    Tasa metabolica basal:
                  </span>
                  <v-text-field v-model="tasaMetabolica" label="0" single-line solo suffix="Kcal"></v-text-field>
                </v-col>

                <v-col cols="12" sm="6" class="py-0">
                  <span class="subtitle-2">
                    Grasa visceral:
                  </span>
                  <v-text-field v-model="grasaVisceral" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Cintura:
                  </span>
                  <v-text-field v-model="cintura" label="0" single-line solo suffix="cm"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Umbilical:
                  </span>
                  <v-text-field v-model="umbilical" label="0" single-line solo suffix="cm"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Cadera:
                  </span>
                  <v-text-field v-model="cadera" label="0" single-line solo suffix="cm"></v-text-field>
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
      altura: "",
      peso: "",
      imc: "",
      diag_imc: "",
      masaMuscular: "",
      masaGrasa: "",
      grasaCorporal: "",
      aguaCorporal: "",
      aguaIntracelular: "",
      aguaExtracelular: "",
      tasaMetabolica: "",
      grasaVisceral: "",
      cintura: "",
      umbilical: "",
      cadera: "",
      nota: ""
  }),
  methods: {
      
  }
};
</script>
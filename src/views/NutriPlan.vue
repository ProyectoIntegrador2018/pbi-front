<template>
  <div>
    <nutriheader
      title="Cita de seguimiento"
      :secondRoute="`/nutricion/pacientes/citas/${this.$route.params.recordId}`"
    />

    <v-row justify="center">
      <v-col cols="10">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Plan alimenticio</h1>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Frutas: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.fruit"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Verduras: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.vegetable"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Azúcar: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.sugar"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Cereal: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.cereal"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Leguminosas: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.legume"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Grasas: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.fat"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>
                </v-row>
                <h3>Leches</h3>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Entera: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.milkWhole"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Semidescremada: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.milkSemiSkimmed"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Descremada: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.milkSkimmed"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>
                </v-row>
                <h3>Carnes</h3>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Magra: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.meatWhole"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Semigrasosa: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.meatSemiGreasy"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Grasosa: </span>
                    <v-text-field
                      type="number"
                      v-model.number="diet.meatGreasy"
                      :rules="rules.fieldRule"
                      single-line
                      solo
                    />
                  </v-col>
                </v-row>
                <h3>Hidratos carbono</h3>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Gramos: </span>
                    <v-text-field
                      v-model="gramsCarbs"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Calorías: </span>
                    <v-text-field
                      v-model="caloriesCarbs"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Porcentaje: </span>
                    <v-text-field
                      v-model="carbsProportion"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>
                </v-row>

                <h3>Proteínas</h3>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Gramos: </span>
                    <v-text-field
                      v-model="gramsProtein"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Calorías: </span>
                    <v-text-field
                      v-model="caloriesProtein"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Porcentaje: </span>
                    <v-text-field
                      v-model="proteinProportion"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>
                </v-row>

                <h3>Grasa</h3>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Gramos: </span>
                    <v-text-field
                      v-model="gramsFat"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Calorías: </span>
                    <v-text-field
                      v-model="caloriesFat"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Porcentaje: </span>
                    <v-text-field
                      v-model="fatProportion"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Total de calorías: </span>
                    <v-text-field
                      v-model="totalCalories"
                      single-line
                      solo
                      disabled
                    />
                  </v-col>
                </v-row>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="6" class="py-0">
                <v-btn
                  large
                  block
                  @click="goToAppointments()"
                >
                  <v-icon align="center" medium>mdi-arrow-left</v-icon>
                  Regresar
                </v-btn>
              </v-col>
              <v-col cols="12" sm="6" class="py-0">
                <v-btn
                  :disabled="!valid"
                  large
                  block
                  color="primary"
                  @click="saveDiet"
                >
                  <v-icon align="center" medium color="white"
                    >mdi-content-save-outline</v-icon
                  >
                  Guardar
                </v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import nutriheader from "../components/nutriheader.vue";
import axios from "axios";
const helper = require("../helper.js");
export default {
  components: {
    nutriheader,
  },
  data() {
    return {
      diet: {
        fruit: 0,
        vegetable: 0,
        legume: 0,
        cereal: 0,
        sugar: 0,
        fat: 0,
        milkWhole: 0,
        milkSemiSkimmed: 0,
        milkSkimmed: 0,
        meatWhole: 0,
        meatSemiGreasy: 0,
        meatGreasy: 0,
      },
      rules: {
        fieldRule: [
          (v) => !isNaN(v) || "Campo requerido",
          (v) => (Number.isInteger(v) && v >= 0) || "Debe ser número positivo o mayor a cero",
        ],
      },
      valid : false,
    };
  },
  computed: {
    gramsCarbs: function () {
      return (
        (this.diet.fruit + this.diet.cereal) * 15 +
        this.diet.vegetable * 4 +
        this.diet.legume * 20 +
        (this.diet.milkSkimmed +
          this.diet.milkSemiSkimmed +
          this.diet.milkWhole) *
          12 +
        this.diet.sugar * 10
      );
    },
    caloriesCarbs: function () {
      return this.gramsCarbs * 4;
    },
    gramsFat: function () {
      return (
        this.diet.meatWhole +
        this.diet.meatSemiGreasy * 3 +
        this.diet.meatGreasy * 5 +
        this.diet.legume +
        this.diet.milkSkimmed * 2 +
        this.diet.milkSemiSkimmed * 4 +
        this.diet.milkWhole * 8 +
        this.diet.fat * 5
      );
    },
    caloriesFat: function () {
      return this.gramsFat * 9;
    },
    gramsProtein: function () {
      return (
        (this.diet.cereal + this.diet.vegetable) * 2 +
        (this.diet.meatWhole +
          this.diet.meatSemiGreasy +
          this.diet.meatGreasy) *
          7 +
        this.diet.legume * 8 +
        (this.diet.milkWhole +
          this.diet.milkSemiSkimmed +
          this.diet.milkSkimmed) *
          9 
      );
    },
    caloriesProtein: function () {
      return this.gramsProtein * 4;
    },
    totalCalories: function () {
      return this.caloriesCarbs + this.caloriesFat + this.caloriesProtein;
    },
    carbsProportion: function () {
      return this.zeroIfNan((this.caloriesCarbs / this.totalCalories) * 100);
    },
    proteinProportion: function () {
      return this.zeroIfNan((this.caloriesProtein / this.totalCalories) * 100);
    },
    fatProportion: function () {
      return this.zeroIfNan((this.caloriesFat / this.totalCalories) * 100);
    },
  },
  methods: {
    zeroIfNan(x) {
      if (isNaN(x)) {
        return 0;
      }
      return x;
    },
    goToAppointments() {
        this.$router.push(
                      '/nutricion/pacientes/citas/' + this.$route.params.recordId
                    );
    },
    parseResponse(response) {
        this.$swal({
            title: "Guardado",
            text: "Plan alimenticio guardado",
            type: "success",
            showConfirmButton : false,
        });
        this.goToAppointments();
    },
    parseError(error) {
        this.$swal({
            title: "Error",
            text: error.response.data.error,
            type: "error",
            showConfirmButton: true,
        });
    },
    saveDiet() {
        if (this.$refs.form.validate()) {
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
          const URL = helper.baseURL + "/nutricion/records/diet/" + this.$route.params.recordId + "/";
          const data = { diet : this.$data.diet};
          if (this.$route.params.dietId) {
              axios.put(URL + this.$route.params.dietId, data).then(this.parseResponse).catch(this.parseError);
          } else {
              axios.post(URL, data).then(this.parseResponse).catch(this.parseError);
          }
        }
    },
  },
  mounted() {
    if (this.$route.params.dietId) {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const URL =
        helper.baseURL +
        "/nutricion/records/diet/" +
        this.$route.params.recordId +
        "/" +
        this.$route.params.dietId;
      axios.get(URL).then((response) => {
        console.log(response);
        this.diet = response.data;
      });
    }
  },
};
</script>
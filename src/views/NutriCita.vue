<template>
  <div>
    <nutriheader
      title="Cita de seguimiento"
      :secondRoute="`/nutricion/pacientes/citas/${this.$route.params.id}`"
    ></nutriheader>

    <v-row justify="center">
      <!-- Desayuno -->
      <v-col cols="10">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Datos antropométricos</h1>
          </v-card-title>

          <v-card-text>
            <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Altura: <span class="red--text">*</span>
                    </span>
                    <v-text-field
                      required
                      v-model.number="cita.altura"
                      :rules="numFieldsRules"
                      single-line
                      solo
                      suffix="mts"
                    >
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Peso: <span class="red--text">*</span>
                    </span>
                    <v-text-field
                      required
                      v-model.number="cita.peso"
                      :rules="numFieldsRules"
                      single-line
                      solo
                      suffix="kg"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      IMC: <span class="red--text">*</span>
                    </span>
                    <v-text-field
                      required
                      v-model.number="imc"
                      :rules="numeroRules"
                      single-line
                      solo
                      disabled
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Diagnóstico IMC:<span class="red--text">*</span>
                    </span>
                    <v-text-field
                      required
                      v-model="diagnosis"
                      single-line
                      solo
                      disabled
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      <u>Masa muscular:</u>
                    </span>
                    <v-text-field
                      v-model.number="cita.masaMuscular"
                      single-line
                      solo
                      suffix="kg"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      <u>Masa grasa:</u>
                    </span>
                    <v-text-field
                      v-model.number="cita.masaGrasa"
                      single-line
                      solo
                      suffix="kg"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      <u>% grasa corporal:</u>
                    </span>
                    <v-text-field
                      v-model.number="cita.grasaCorporal"
                      single-line
                      solo
                      suffix="%"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Agua corporal total: </span>
                    <v-text-field
                      v-model.number="cita.aguaCorporal"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="Lt."
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Agua intracelular: </span>
                    <v-text-field
                      v-model.number="cita.aguaIntracelular"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="Lt."
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Agua extracelular: </span>
                    <v-text-field
                      v-model.number="cita.aguaExtracelular"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="Lt."
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2"> Tasa metabolica basal: </span>
                    <v-text-field
                      v-model.number="cita.tasaMetabolica"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="Kcal"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2"> Grasa visceral: </span>
                    <v-text-field
                      v-model.number="cita.grasaVisceral"
                      :rules="numeroRules"
                      single-line
                      solo
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Cintura: </span>
                    <v-text-field
                      v-model.number="cita.cintura"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="cm"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Umbilical: </span>
                    <v-text-field
                      v-model.number="cita.umbilical"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="cm"
                    ></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2"> Cadera: </span>
                    <v-text-field
                      v-model.number="cita.cadera"
                      :rules="numeroRules"
                      single-line
                      solo
                      suffix="cm"
                    ></v-text-field>
                  </v-col>
                </v-row>

                <v-col cols="12" class="py-0">
                  <span class="subtitle-2"> Notas: </span>
                  <v-text-field
                    v-model="cita.nota"
                    single-line
                    solo
                  ></v-text-field>
                </v-col>
              </v-container>
            </v-form>
          </v-card-text>

          <v-card-actions>
            <v-row>
              <v-col cols="12" sm="6" class="py-0">
                <v-btn large block @click="irListaCitas">
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
                  @click="save"
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
  data: () => ({
    valid: true,
    willUpdate: false,
    citaID: "",
    numFieldsRules: [
      (v) => !!v || "Campo requerido",
      (v) => /^\d+(\.?\d*)?$/.test(v) || "Debe ser número",
    ],
    numeroRules: [(v) => /^\d+(\.?\d*)?$/.test(v) || "Debe ser número"],
    cita: {
      altura: 0,
      peso: 0,
      masaMuscular: 0,
      masaGrasa: 0,
      grasaCorporal: 0,
      aguaCorporal: 0,
      aguaIntracelular: 0,
      aguaExtracelular: 0,
      tasaMetabolica: 0,
      grasaVisceral: 0,
      cintura: 0,
      umbilical: 0,
      cadera: 0,
      nota: "",
    },
  }),
  computed: {
    imc: function () {
      let calculatedImc =
        this.cita.peso / (this.cita.altura * this.cita.altura);
      if (isNaN(calculatedImc)) {
        return "No determinado";
      }
      return calculatedImc.toFixed(2);
    },
    diagnosis: function () {
      if (isNaN(this.imc)) {
        return "No determinado";
      }
      if (this.imc < 18.5) {
        return "Bajo peso";
      }
      if (this.imc >= 18.5 && this.imc <= 24.9) {
        return "Peso Normal";
      }
      if (this.imc >= 25 && this.imc <= 29.9) {
        return "Sobrepeso";
      }
      if (this.imc >= 30 && this.imc <= 34.9) {
        return "Obesidad grado I";
      }
      if (this.imc >= 35 && this.imc <= 39.9) {
        return "Obesidad grado II";
      }
      return "Obesidad grado III";
    },
  },
  methods: {
    save() {
      if (this.willUpdate) {
        this.editCita();
      } else {
        this.postNuevaCita();
      }
    },
    zeroIfNan(x) {
      if (isNaN(x)) {
        return 0;
      }
      return x;
    },
    postNuevaCita() {
      if (this.$refs.form.validate()) {
        var json_cita = {
          date: new Date(),
          height: this.cita.altura,
          weight: this.cita.peso,
          IMC: this.imc,
          IMCDiagnostic: this.diagnosis,
          muscleMass: this.cita.masaMuscular,
          fatMass: this.cita.masaGrasa,
          fatMassPct: this.cita.grasaCorporal,
          totalWater: this.cita.aguaCorporal,
          intercellWater: this.cita.aguaIntracelular,
          extracellWater: this.cita.aguaExtracelular,
          metabolicRate: this.cita.tasaMetabolica,
          visceralFat: this.cita.grasaVisceral,
          waist: this.cita.cintura,
          umbilical: this.cita.umbilical,
          hip: this.cita.cadera,
          notes: this.cita.nota,
        };

        const URL =
          helper.baseURL + "/nutricion/appointment/" + this.$route.params.id;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        axios
          .post(URL, json_cita)
          .then(() => {
            this.$swal({
              title: "Guardado",
              text: "Seguimiento guardado",
              type: "success",
              showConfirmButton: false,
            });
            this.irListaCitas();
          })
          .catch((error) => {
            this.$swal({
              title: "Error",
              text: error.response.data.error,
              type: "error",
              showConfirmButton: true,
            });
          });
      } else {
        this.load_status = "No están todos los campos";
      }
    },
    editCita() {
      if (this.$refs.form.validate()) {
        var json_cita = {
          height: this.cita.altura,
          weight: this.cita.peso,
          IMC: this.imc,
          IMCDiagnostic: this.diagnosis,
          muscleMass: this.cita.masaMuscular,
          fatMass: this.cita.masaGrasa,
          fatMassPct: this.cita.grasaCorporal,
          totalWater: this.cita.aguaCorporal,
          intercellWater: this.cita.aguaIntracelular,
          extracellWater: this.cita.aguaExtracelular,
          metabolicRate: this.cita.tasaMetabolica,
          visceralFat: this.cita.grasaVisceral,
          waist: this.cita.cintura,
          umbilical: this.cita.umbilical,
          hip: this.cita.cadera,
          notes: this.cita.nota,
        };

        const URL = helper.baseURL + "/nutricion/appointment/" + this.citaID;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");
        axios
          .put(URL, json_cita)
          .then(() => {
            this.$swal({
              title: "Actualizado",
              text: "Seguimiento guardado",
              type: "success",
              showConfirmButton: false,
            });
            this.irListaCitas();
          })
          .catch((error) => {
            this.$swal({
              title: "Error",
              text: error.response.data.error,
              type: "error",
              showConfirmButton: true,
            });
          });
      } else {
        this.load_status = "No están todos los campos";
      }
    },
    irListaCitas() {
      var route = "/nutricion/pacientes/citas/" + this.$route.params.id;
      this.$router.push(route);
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, "\\$&");
      var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return "";
      this.citaID = decodeURIComponent(results[2].replace(/\+/g, " "));
      return this.citaID;
    },
    updateView() {
      if (this.getParameterByName("cid", window.location) === null) {
        this.loadLatestAppointmentData();
        this.willUpdate = false;
      } else {
        this.willUpdate = true;
        this.loadData();
      }
    },
    loadData() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const URL = helper.baseURL + "/nutricion/appointment/" + this.citaID;

      axios
        .get(URL)
        .then((response) => {
          const infoCita = response.data;
          (this.cita.altura = infoCita.height),
            (this.cita.peso = infoCita.weight),
            (this.cita.masaMuscular = infoCita.muscleMass),
            (this.cita.masaGrasa = infoCita.fatMass),
            (this.cita.grasaCorporal = infoCita.fatMassPct),
            (this.cita.aguaCorporal = infoCita.totalWater);
          (this.cita.aguaIntracelular = infoCita.intercellWater),
            (this.cita.aguaExtracelular = infoCita.extracellWater),
            (this.cita.tasaMetabolica = infoCita.metabolicRate),
            (this.cita.grasaVisceral = infoCita.visceralFat),
            (this.cita.cintura = infoCita.waist),
            (this.cita.umbilical = infoCita.umbilical),
            (this.cita.cadera = infoCita.hip),
            (this.cita.nota = infoCita.notes);
        })
        .catch((error) => {
          this.$swal("Error", error.response.data.error, "error");
        });
    },
    loadLatestAppointmentData() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const URL =
        helper.baseURL +
        "/nutricion/latestAppointment/" +
        this.$route.params.id;

      axios
        .get(URL)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },
  created() {
    this.updateView();
  },
};
</script>
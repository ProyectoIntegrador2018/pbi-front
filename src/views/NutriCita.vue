<template>
    <div>
        <nutriheader title="Cita de seguimiento" :secondRoute="`/nutricion/pacientes/citas/${this.$route.params.id}`"></nutriheader>

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
                       single-line solo suffix="mts">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Peso: <span class="red--text">*</span>
                    </span>
                    <v-text-field required v-model.number="cita.peso" :rules="numFieldsRules"  single-line solo suffix="kg"></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      IMC: <span class="red--text">*</span>
                    </span>
                    <v-text-field required v-model.number="imc" :rules="numeroRules" single-line solo disabled></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Diagnóstico IMC:<span class="red--text">*</span>
                    </span>
                    <v-text-field required v-model="diagnosis" single-line solo disabled></v-text-field>
                  </v-col>
                </v-row>   

                <v-row justify="center" class="py-0">
                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    <u>Masa muscular:</u>
                  </span>
                  <v-text-field v-model.number="cita.masaMuscular"   single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    <u>Masa grasa:</u>
                  </span>
                  <v-text-field v-model.number="cita.masaGrasa"  single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    <u>% grasa corporal:</u>
                  </span>
                  <v-text-field v-model.number="cita.grasaCorporal"   single-line solo suffix="%"></v-text-field>
                </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Agua corporal total:
                    </span>
                    <v-text-field v-model.number="cita.aguaCorporal"  :rules="numeroRules" single-line solo suffix="Lt."></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Agua intracelular:
                    </span>
                    <v-text-field v-model.number="cita.aguaIntracelular" :rules="numeroRules" single-line solo suffix="Lt."></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Agua extracelular:
                    </span>
                    <v-text-field v-model.number="cita.aguaExtracelular" :rules="numeroRules" single-line solo suffix="Lt."></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Tasa metabolica basal:
                    </span>
                    <v-text-field v-model.number="cita.tasaMetabolica"  :rules="numeroRules" single-line solo suffix="Kcal"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Grasa visceral:
                    </span>
                    <v-text-field v-model.number="cita.grasaVisceral" :rules="numeroRules"  single-line solo></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Cintura:
                    </span>
                    <v-text-field v-model.number="cita.cintura" :rules="numeroRules"  single-line solo suffix="cm"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Umbilical:
                    </span>
                    <v-text-field v-model.number="cita.umbilical" :rules="numeroRules"  single-line solo suffix="cm"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Cadera:
                    </span>
                    <v-text-field v-model.number="cita.cadera" :rules="numeroRules" single-line solo suffix="cm"></v-text-field>
                  </v-col>
                </v-row>

                <v-col cols="12" class="py-0">
                    <span class="subtitle-2">
                      Notas:
                    </span>
                    <v-text-field v-model="cita.nota" single-line solo></v-text-field>
                  </v-col>

                <h2>Plan alimenticio</h2>
                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Frutas:
                      </span>
                      <v-text-field type="number" v-model.number="diet.fruit" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Verduras:
                      </span>
                      <v-text-field type="number" v-model.number="diet.vegetable" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Azúcar:
                      </span>
                      <v-text-field type="number" v-model.number="diet.sugar" :rules="numeroRules" single-line solo />
                    </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Cereal:
                      </span>
                      <v-text-field type="number" v-model.number="diet.cereal" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Leguminosas:
                      </span>
                      <v-text-field type="number" v-model.number="diet.legume" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Grasas:
                      </span>
                      <v-text-field type="number" v-model.number="diet.fat" :rules="numeroRules" single-line solo />
                    </v-col>
                </v-row>
              <h3>Leches</h3>
              <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Entera:
                      </span>
                      <v-text-field type="number" v-model.number="diet.milkWhole" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Semidescremada:
                      </span>
                      <v-text-field type="number" v-model.number="diet.milkSemiSkimmed" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Descremada:
                      </span>
                      <v-text-field type="number" v-model.number="diet.milkSkimmed" :rules="numeroRules" single-line solo />
                    </v-col>
                </v-row>
                <h3>Carnes</h3>
                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Magra:
                      </span>
                      <v-text-field type="number" v-model.number="diet.meatWhole" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Semigrasosa:
                      </span>
                      <v-text-field type="number" v-model.number="diet.meatSemiGreasy" :rules="numeroRules" single-line solo />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Grasosa:
                      </span>
                      <v-text-field type="number" v-model.number="diet.meatGreasy" :rules="numeroRules" single-line solo />
                    </v-col>
                </v-row>
                <h3>Hidratos carbono</h3>
                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Gramos:
                      </span>
                      <v-text-field v-model="gramsCarbs" :rules="numeroRules" single-line solo disabled />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Calorías:
                      </span>
                      <v-text-field v-model="caloriesCarbs" :rules="numeroRules" single-line solo disabled/>
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Porcentaje:
                      </span>
                      <v-text-field v-model="carbsProportion" :rules="numeroRules" single-line solo disabled/>
                    </v-col>
                </v-row>

                <h3>Proteínas</h3>
                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Gramos:
                      </span>
                      <v-text-field v-model="gramsProtein" :rules="numeroRules" single-line solo disabled />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Calorías:
                      </span>
                      <v-text-field v-model="caloriesProtein" :rules="numeroRules" single-line solo disabled/>
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Porcentaje:
                      </span>
                      <v-text-field v-model="proteinProportion" :rules="numeroRules" single-line solo disabled/>
                    </v-col>
                </v-row>

                <h3>Grasa</h3>
                <v-row justify="center" class="py-0">
                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Gramos:
                      </span>
                      <v-text-field v-model="gramsFat" :rules="numeroRules" single-line solo disabled />
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Calorías:
                      </span>
                      <v-text-field v-model="caloriesFat" :rules="numeroRules" single-line solo disabled/>
                    </v-col>

                    <v-col cols="12" sm="4" class="py-0">
                      <span class="subtitle-2">
                        Porcentaje:
                      </span>
                      <v-text-field v-model="fatProportion" :rules="numeroRules" single-line solo disabled/>
                    </v-col>
                </v-row>
              </v-container>
             </v-form>
          </v-card-text>

          <v-card-actions>
                    <v-row>                                    
                        <v-col cols="12" sm="6" class="py-0">
                            <v-btn large block @click="irListaCitas">
                             <v-icon align="center" medium >mdi-arrow-left</v-icon>
                             Regresar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" class="py-0">                           
                            <v-btn :disabled="!valid" large block color="primary" @click="save">
                              <v-icon align="center" medium color="white">mdi-content-save-outline</v-icon>
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
    nutriheader
  },
  data: () => ({
      valid: true,
      willUpdate: false,
      citaID: "",
      numFieldsRules: [v => !! v || 'Campo requerido',v => /^\d+(\.?\d*)?$/.test(v) || "Debe ser número"],
      numeroRules: [v => /^\d+(\.?\d*)?$/.test(v) || "Debe ser número"],
      cita: {
        altura:  0,
        peso:  0,
        masaMuscular:  0,
        masaGrasa:  0,
        grasaCorporal:  0,
        aguaCorporal:  0,
        aguaIntracelular:  0,
        aguaExtracelular:  0,
        tasaMetabolica:  0,
        grasaVisceral:  0,
        cintura:  0,
        umbilical:  0,
        cadera:  0,
        nota: ""
      },
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
      
  }),
  computed: {
    gramsCarbs: function() {
      return ((this.diet.fruit + this.diet.cereal) * 15) + (this.diet.vegetable * 4) + (this.diet.legume * 20) + 
      ((this.diet.milkSkimmed + this.diet.milkSemiSkimmed + this.diet.milkWhole) * 12) + (this.diet.sugar * 10);
    },
    caloriesCarbs: function() {
      return this.gramsCarbs * 4;
    },
    gramsFat: function() {
      return this.diet.meatWhole + this.diet.meatSemiGreasy * 3 + this.diet.meatGreasy * 5 + this.diet.legume + 
      this.diet.milkSkimmed * 2 + this.diet.milkSemiSkimmed * 4 + this.diet.milkWhole * 8 + this.diet.fat * 5;
    },
    caloriesFat: function() {
      return this.gramsFat * 9;
    },
    gramsProtein: function() {
      return (this.diet.cereal + this.diet.vegetable) * 2 + (this.diet.meatWhole + this.diet.meatSemiGreasy + 
      this.diet.meatGreasy) * 7 + this.diet.legume * 8 + (this.diet.milkWhole + this.diet.milkSemiSkimmed + this.diet.milkSkimmed) * 9;
    },
    caloriesProtein: function() {
      return this.gramsProtein * 4;
    },
    totalCalories: function() {
      return this.caloriesCarbs + this.caloriesFat + this.caloriesProtein;
    },
    carbsProportion: function() {
      return this.zeroIfNan(this.caloriesCarbs / this.totalCalories * 100);
    },
    proteinProportion: function() {
      return this.zeroIfNan(this.caloriesProtein / this.totalCalories * 100);
    },
    fatProportion: function() {
      return this.zeroIfNan(this.caloriesFat / this.totalCalories * 100);
    },
    imc: function() {
      let calculatedImc = this.cita.peso / (this.cita.altura * this.cita.altura);
      if (isNaN(calculatedImc)) {
        return "No determinado";
      }
      return calculatedImc.toFixed(2);
    },
    diagnosis: function() {
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
      save(){
        if(this.willUpdate){
          this.editCita()
        }else {
          this.postNuevaCita()
        }
        
      },
      zeroIfNan(x){
        if (isNaN(x)) {
          return 0;
        }
        return x;
      },
      postNuevaCita(){
       if(this.$refs.form.validate()){
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
             diet: this.diet,
           }

           const URL = helper.baseURL + '/nutricion/appointment/' + this.$route.params.id
           axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
           axios
             .post(URL,json_cita)
             .then(() => {
               this.$swal({
               title: "Guardado",
               text:  "Seguimiento guardado",
               type: "success",
               showConfirmButton: false});
               this.irListaCitas()
             })
             .catch(error => {
               this.$swal({
               title: "Error",
               text:  error.response.data.error,
               type: "error",
               showConfirmButton: true});
             })
        }
        else {
          this.load_status = "No están todos los campos";
        }
      },
      editCita(){
        if(this.$refs.form.validate()){
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
             diet: this.diet,
           }

           const URL = helper.baseURL + '/nutricion/appointment/' + this.citaID
           axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
           axios
             .put(URL,json_cita)
             .then(() => {
               this.$swal({
               title: "Actualizado",
               text:  "Seguimiento guardado",
               type: "success",
               showConfirmButton: false});
               this.irListaCitas()
             })
             .catch(error => {
               this.$swal({
               title: "Error",
               text:  error.response.data.error,
               type: "error",
               showConfirmButton: true});
             })
        }
        else {
          this.load_status = "No están todos los campos";
        }
      },
      irListaCitas(){
        var route = '/nutricion/pacientes/citas/'+ this.$route.params.id
        window.open(route, "_self");
      },
      getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        this.citaID = decodeURIComponent(results[2].replace(/\+/g, ' '))
        return this.citaID;
      },
      updateView(){
          if(this.getParameterByName("cid",window.location)===null)
          {
            this.loadLatestAppointmentData();
            this.willUpdate = false
          }else 
          {
            this.willUpdate = true
            this.loadData()
          }
      },
      loadData(){
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        const URL = helper.baseURL + "/nutricion/appointment/"+this.citaID;
        
        axios
        .get(URL)
        .then(response => {
          const infoCita = response.data
          this.cita.altura= infoCita.height,
          this.cita.peso= infoCita.weight,
          this.cita.masaMuscular =  infoCita.muscleMass,
          this.cita.masaGrasa =  infoCita.fatMass,
          this.cita.grasaCorporal =  infoCita.fatMassPct,
          this.cita.aguaCorporal =  infoCita.totalWater
          this.cita.aguaIntracelular =  infoCita.intercellWater,
          this.cita.aguaExtracelular =  infoCita.extracellWater,
          this.cita.tasaMetabolica =  infoCita.metabolicRate,
          this.cita.grasaVisceral =  infoCita.visceralFat,
          this.cita.cintura =  infoCita.waist,
          this.cita.umbilical =  infoCita.umbilical,
          this.cita.cadera =  infoCita.hip,
          this.cita.nota =  infoCita.notes
          this.diet = infoCita.diet
        }).catch(error => {
          this.$swal("Error",error.response.data.error,"error")
        })
      },
      loadLatestAppointmentData() {
        axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
        const URL = helper.baseURL + "/nutricion/latestAppointment/"+this.$route.params.id;

        axios
          .get(URL)
          .then(response => {
            console.log(response);
            this.diet = response.data.diet;
          }).catch(error => {
            console.log(error);
          });
      },
  },  
  created(){
    this.updateView()
  }
};
</script>
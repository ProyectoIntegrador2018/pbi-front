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
             <v-form ref="form" v-model="valid" lazy-validation>
              <v-container>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Altura:
                    </span>
                    <v-text-field 
                      required
                      v-model="cita.altura" 
                      :rules="numFieldsRules"
                       single-line solo suffix="mts">
                    </v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Peso:
                    </span>
                    <v-text-field required v-model="cita.peso" :rules="numFieldsRules"  single-line solo suffix="kg"></v-text-field>
                  </v-col>
                </v-row>
                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      IMC:
                    </span>
                    <v-text-field required v-model="cita.imc"  :rules="[v => !! v || 'Campo requerido. Clic en Calcular']"  single-line solo disabled></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Diagnóstico IMC:
                    </span>
                    <v-text-field required v-model="cita.diag_imc" :rules="[v => !! v || 'Campo requerido. Clic en Calcular']"  single-line solo disabled></v-text-field>
                  </v-col>
                </v-row>   
                <v-row class="py-0">
                  <v-col cols="12" class="pt-0">
                    <v-btn large block color="primary" @click="calcularIMC">
                     <v-icon align="center" medium >mdi-calculator</v-icon>
                     Calcular
                    </v-btn>
                  </v-col>


                </v-row>

                <v-row justify="center" class="py-0">
                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Masa muscular:
                  </span>
                  <v-text-field required v-model="cita.masaMuscular" :rules="numFieldsRules"  single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    Masa grasa:
                  </span>
                  <v-text-field required v-model="cita.masaGrasa" :rules="numFieldsRules"  single-line solo suffix="kg"></v-text-field>
                </v-col>

                <v-col cols="12" sm="4" class="py-0">
                  <span class="subtitle-2">
                    % grasa corporal:
                  </span>
                  <v-text-field v-model="cita.grasaCorporal" :rules="numFieldsRules"  single-line solo suffix="%"></v-text-field>
                </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Agua corporal total:
                    </span>
                    <v-text-field v-model="cita.aguaCorporal"  single-line solo suffix="Lt."></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Agua intracelular:
                    </span>
                    <v-text-field v-model="cita.aguaIntracelular"  single-line solo suffix="Lt."></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Agua extracelular:
                    </span>
                    <v-text-field v-model="cita.aguaExtracelular"  single-line solo suffix="Lt."></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Tasa metabolica basal:
                    </span>
                    <v-text-field v-model="cita.tasaMetabolica"  single-line solo suffix="Kcal"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="6" class="py-0">
                    <span class="subtitle-2">
                      Grasa visceral:
                    </span>
                    <v-text-field v-model="cita.grasaVisceral"  single-line solo></v-text-field>
                  </v-col>
                </v-row>

                <v-row justify="center" class="py-0">
                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Cintura:
                    </span>
                    <v-text-field v-model="cita.cintura"  single-line solo suffix="cm"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Umbilical:
                    </span>
                    <v-text-field v-model="cita.umbilical"  single-line solo suffix="cm"></v-text-field>
                  </v-col>

                  <v-col cols="12" sm="4" class="py-0">
                    <span class="subtitle-2">
                      Cadera:
                    </span>
                    <v-text-field v-model="cita.cadera"  single-line solo suffix="cm"></v-text-field>
                  </v-col>
                </v-row>

                <v-col cols="12" class="py-0">
                    <span class="subtitle-2">
                      Notas:
                    </span>
                    <v-text-field v-model="cita.nota" single-line solo></v-text-field>
                  </v-col>

              </v-container>
             </v-form>
          </v-card-text>

          <v-card-actions>
                    <v-row>                                    
                        <v-col cols="12" sm="6" class="py-0">
                            <v-btn large block href="/nutricion/expedientes">
                             <v-icon align="center" medium >mdi-arrow-left</v-icon>
                             Regresar
                            </v-btn>
                        </v-col>
                        <v-col cols="12" sm="6" class="py-0">                           
                            <v-btn :disabled="!valid" large block color="primary" @click="postNuevaCita">
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
      numFieldsRules: [v => !! v || 'Campo requerido'],
      cita: {
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
      }
      
  }),
  methods: {
      postNuevaCita(){
       if(this.$refs.form.validate()){
          var json_cita = {
             height: this.cita.altura,
             weight: this.cita.peso,
             IMC: this.cita.imc,
             IMCDiagnostic: this.cita.diag_imc,
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
             notes: this.cita.nota
           }

           console.log(json_cita)

           console.log(this.$route.params.id)

           const URL = helper.baseURL + '/nutricion/appointment/' + this.$route.params.id
           console.log(URL)
           axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
           axios
             .post(URL,json_cita)
             .then(() => {
               this.$swal("Guardado", "Seguimiento guardado", "success");
               console.log("hohoj")
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

      calcularIMC(){
        try {
           this.cita.imc = this.cita.peso / (this.cita.altura * this.cita.altura)

          if(this.cita.imc < 18.5){
            this.cita.diag_imc = "Baso peso"
          }else if(this.cita.imc >= 18.5 && this.cita.imc <= 24.9){
            this.cita.diag_imc = "Peso Normal"
          }else if(this.cita.imc >= 25 && this.cita.imc <= 29.9){
            this.cita.diag_imc = "Sobrepeso"
          }else if(this.cita.imc >= 30 && this.cita.imc <= 34.9){
            this.cita.diag_imc = "Obesidad grado I"
          }else if(this.cita.imc >= 35 && this.cita.imc <= 39.9){
            this.cita.diag_imc = "Obesidad grado II"
          }else{
            this.cita.diag_imc = "Obesidad grado III"
          }


           this.cita.imc = this.cita.imc.toFixed(2)
        } catch (error) {
          console.log("error")
        }
        
      }
  }
};
</script>
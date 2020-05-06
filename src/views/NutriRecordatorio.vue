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
                  <v-text-field v-model="comidas[0].fruit" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[0].vegetable" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[0].legume" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[0].cereal" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[0].sugar" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[0].fat" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[0].milkWhole" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[0].milkSemiSkimmed" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[0].milkSkimmed" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[0].meatWhole" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[0].meatSemiGreasy" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[0].meatGreasy" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Comida -->
      <v-col cols="11">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Comida</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                  <v-text-field v-model="comidas[1].fruit" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[1].vegetable" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[1].legume" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[1].cereal" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[1].sugar" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[1].fat" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[1].milkWhole" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[1].milkSemiSkimmed" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[1].milkSkimmed" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[1].meatWhole" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[1].meatSemiGreasy" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[1].meatGreasy" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>

      <!-- Cena -->
      <v-col cols="11">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Cena</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Frutas:
                  </span>
                  <v-text-field v-model="comidas[2].fruit" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[2].vegetable" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[2].legume" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[2].cereal" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[2].sugar" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[2].fat" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[2].milkWhole" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[2].milkSemiSkimmed" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[2].milkSkimmed" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[2].meatWhole" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[2].meatSemiGreasy" label="0" single-line solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[2].meatGreasy" label="0" single-line solo></v-text-field>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>
        </v-card>
      </v-col>
      
      <!-- Totales -->
      <v-col cols="11">
        <v-card class="align-center" color="white">
          <v-card-title>
            <h1 class="headline">Totales</h1>
          </v-card-title>

          <v-card-text>
            <v-container>
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Total Frutas:
                  </span>
                  <v-text-field v-model="comidas[3].fruit" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Total Verduras:
                  </span>
                  <v-text-field v-model="comidas[3].vegetable" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[3].legume" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[3].cereal" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[3].sugar" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[3].fat" label="0" single-line solo disabled></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[3].milkWhole" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[3].milkSemiSkimmed" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[3].milkSkimmed" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[3].meatWhole" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[3].meatSemiGreasy" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[3].meatGreasy" label="0" single-line solo disabled></v-text-field>
                </v-col>
              </v-row>

              
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Hidratos de carbono:
                  </span>
                  <v-text-field v-model="hidratos" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Proteínas:
                  </span>
                  <v-text-field v-model="proteinas" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Grasas:
                  </span>
                  <v-text-field v-model="grasas" label="0" single-line solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Suma de Calorías:
                  </span>
                  <v-text-field v-model="totalCalorias" label="0" single-line solo disabled></v-text-field>
                </v-col>
              </v-row>
              <v-row class="py-0">
                <v-col cols="12" class="py-0">
                    <v-btn color="primary" large block @click="totalPorciones">
                     <v-icon align="center" medium >mdi-calculator</v-icon>
                     Calcular
                    </v-btn>
                </v-col>
                  <v-col cols="12">
                    <v-btn color="primary" large block @click="postRecordatorio">
                     <v-icon align="center" medium >mdi-save</v-icon>
                     Guardar
                    </v-btn>
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
import axios from "axios";
const helper = require("../helper.js");

export default {
  components: {
    nutriheader
  },
  data: () => ({
    hidratos: 0,
    totalCalorias: 0,
    proteinas: 0,
    grasas: 0,
    comidas: [
        {
          fruit:0,
          vegetable:0,
          legume:0,
          cereal:0,
          sugar:0,
          fat:0,
          milkWhole:0,
          milkSemiSkimmed:0,
          milkSkimmed:0,
          meatWhole:0,
          meatSemiGreasy:0,
          meatGreasy:0
        },
        {
          fruit:0,
          vegetable:0,
          legume:0,
          cereal:0,
          sugar:0,
          fat:0,
          milkWhole:0,
          milkSemiSkimmed:0,
          milkSkimmed:0,
          meatWhole:0,
          meatSemiGreasy:0,
          meatGreasy:0
        },
        {
          fruit:0,
          vegetable:0,
          legume:0,
          cereal:0,
          sugar:0,
          fat:0,
          milkWhole:0,
          milkSemiSkimmed:0,
          milkSkimmed:0,
          meatWhole:0,
          meatSemiGreasy:0,
          meatGreasy:0
        },
        {
          fruit:0,
          vegetable:0,
          legume:0,
          cereal:0,
          sugar:0,
          fat:0,
          milkWhole:0,
          milkSemiSkimmed:0,
          milkSkimmed:0,
          meatWhole:0,
          meatSemiGreasy:0,
          meatGreasy:0
        }
      ]
  }),
  methods: {
    totalPorciones() {
      this.comidas[3].fruit = +this.comidas[0].fruit + +this.comidas[1].fruit + +this.comidas[2].fruit
      this.comidas[3].vegetable = +this.comidas[0].vegetable  +  +this.comidas[1].vegetable  +  +this.comidas[2].vegetable
      this.comidas[3].legume = +this.comidas[0].legume  +  +this.comidas[1].legume  +  +this.comidas[2].legume  
      this.comidas[3].cereal = +this.comidas[0].cereal  +  +this.comidas[1].cereal  +  +this.comidas[2].cereal  
      this.comidas[3].sugar = +this.comidas[0].sugar  +  +this.comidas[1].sugar  +  +this.comidas[2].sugar
      this.comidas[3].fat = +this.comidas[0].fat  +  +this.comidas[1].fat  +  +this.comidas[2].fat
      this.comidas[3].milkWhole = +this.comidas[0].milkWhole  +  +this.comidas[1].milkWhole  +  +this.comidas[2].milkWhole
      this.comidas[3].milkSemiSkimmed = +this.comidas[0].milkSemiSkimmed  +  +this.comidas[1].milkSemiSkimmed  +  +this.comidas[2].milkSemiSkimmed
      this.comidas[3].milkSkimmed = +this.comidas[0].milkSkimmed  +  +this.comidas[1].milkSkimmed  +  +this.comidas[2].milkSkimmed
      this.comidas[3].meatWhole = +this.comidas[0].meatWhole  +  +this.comidas[1].meatWhole  +  +this.comidas[2].meatWhole
      this.comidas[3].meatSemiGreasy = +this.comidas[0].meatSemiGreasy  +  +this.comidas[1].meatSemiGreasy  +  +this.comidas[2].meatSemiGreasy
      this.comidas[3].meatGreasy = +this.comidas[0].meatGreasy  +  +this.comidas[1].meatGreasy  +  +this.comidas[2].meatGreasy
    },
    postRecordatorio(){
      const URL = helper.baseURL + '/nutricion/record/reminder/' + this.$route.params.id
      
      var json_comidas = [{
          fruit: this.comidas[0].fruit,
          vegetable: this.comidas[0].vegetable,
          legume: this.comidas[1].legume,
          cereal: this.comidas[3].cereal,
          sugar: this.comidas[3].sugar,
          fat:this.comidas[3].fat,
          milkWhole:this.comidas[3].milkWhole,
          milkSemiSkimmed:this.comidas[3].milkSemiSkimmed,
          milkSkimmed:this.comidas[3].milkSkimmed,
          meatWhole:this.comidas[3].meatWhole,
          meatSemiGreasy:this.comidas[3].meatSemiGreasy,
          meatGreasy: this.comidas[3].meatGreasy
      },{
          fruit: this.comidas[0].fruit,
          vegetable: this.comidas[0].vegetable,
          legume: this.comidas[1].legume,
          cereal: this.comidas[3].cereal,
          sugar: this.comidas[3].sugar,
          fat:this.comidas[3].fat,
          milkWhole:this.comidas[3].milkWhole,
          milkSemiSkimmed:this.comidas[3].milkSemiSkimmed,
          milkSkimmed:this.comidas[3].milkSkimmed,
          meatWhole:this.comidas[3].meatWhole,
          meatSemiGreasy:this.comidas[3].meatSemiGreasy,
          meatGreasy: this.comidas[3].meatGreasy
      }
      ]
      var test = [{

    "fruit": 1,
    "vegetable":2,
    "legume":1,
    "cereal":0,
    "sugar":1,
    "fat": 1,
    "milkWhole":1,
    "milkSemiSkimmed":0,
    "milkSkimmed":0,
    "meatWhole":0,
    "meatSemiGreasy":0,
    "meatGreasy":0
},{
    "fruit": 1,
    "vegetable":2,
    "legume":1,
    "cereal":0,
    "sugar":1,
    "fat": 1,
    "milkWhole":1,
    "milkSemiSkimmed":0,
    "milkSkimmed":0,
    "meatWhole":0,
    "meatSemiGreasy":0,
    "meatGreasy":0
},{
    "fruit": 1,
    "vegetable":2,
    "legume":1,
    "cereal":0,
    "sugar":1,
    "fat": 1,
    "milkWhole":1,
    "milkSemiSkimmed":0,
    "milkSkimmed":0,
    "meatWhole":0,
    "meatSemiGreasy":0,
    "meatGreasy":0
}]
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      axios
             
             .post(URL,test)
             .then(() => {
               this.$swal("Guardado", "Seguimiento guardado", "success");
             })
             .catch(error => {
               this.$swal({
               title: "Error",
               text:  error.response.data.error,
               type: "error",
               showConfirmButton: true});
             })
    }
  }
};
</script>
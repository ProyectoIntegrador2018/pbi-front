<template>
  <div>
    <nutriheader title="Recordatorio 24 hrs" secondRoute="/nutricion/pacientes/"></nutriheader>
    <v-row justify="center">
      <v-form ref="form" v-model="valid" lazy-validation>
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
                  <v-text-field v-model="comidas[0].fruit"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[0].vegetable"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[0].legume"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[0].cereal"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[0].sugar"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[0].fat"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[0].milkWhole"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[0].milkSemiSkimmed"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[0].milkSkimmed"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[0].meatWhole"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[0].meatSemiGreasy"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[0].meatGreasy"  single-line :rules="numberRules" solo></v-text-field>
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
                  <v-text-field v-model="comidas[1].fruit"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[1].vegetable"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[1].legume"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[1].cereal"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[1].sugar"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[1].fat"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[1].milkWhole"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[1].milkSemiSkimmed"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[1].milkSkimmed"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[1].meatWhole"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[1].meatSemiGreasy"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[1].meatGreasy"  single-line :rules="numberRules" solo></v-text-field>
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
                  <v-text-field v-model="comidas[2].fruit"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[2].vegetable"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[2].legume"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[2].cereal"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[2].sugar"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[2].fat"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[2].milkWhole"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[2].milkSemiSkimmed"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[2].milkSkimmed"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[2].meatWhole"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[2].meatSemiGreasy"  single-line :rules="numberRules" solo></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[2].meatGreasy"  single-line :rules="numberRules" solo></v-text-field>
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
                    Frutas:
                  </span>
                  <v-text-field v-model="comidas[3].fruit"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Verduras:
                  </span>
                  <v-text-field v-model="comidas[3].vegetable"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leguminosas:
                  </span>
                  <v-text-field v-model="comidas[3].legume"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Cereal:
                  </span>
                  <v-text-field v-model="comidas[3].cereal"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Azúcar:
                  </span>
                  <v-text-field v-model="comidas[3].sugar"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Grasa:
                  </span>
                  <v-text-field v-model="comidas[3].fat"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">Leche Entera</span>
                  <v-text-field v-model="comidas[3].milkWhole"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Semidescremada:
                  </span>
                  <v-text-field v-model="comidas[3].milkSemiSkimmed"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Leche Descremada:
                  </span>
                  <v-text-field v-model="comidas[3].milkSkimmed"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Entera:
                  </span>
                  <v-text-field v-model="comidas[3].meatWhole"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Semigrasosa:
                  </span>
                  <v-text-field v-model="comidas[3].meatSemiGreasy"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="2" class="py-0">
                  <span class="subtitle-2">
                    Carne Grasosa:
                  </span>
                  <v-text-field v-model="comidas[3].meatGreasy"  single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
              </v-row>

              
              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                   Carbohidratos (g):
                  </span>
                  <v-text-field v-model="hidratos" required single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Proteínas (g):
                  </span>
                  <v-text-field v-model="proteinas" required single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Grasas  (g):
                  </span>
                  <v-text-field v-model="grasas"  required single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    Total Kcal:
                  </span>
                  <v-text-field v-model="totalCalorias"  required single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
              </v-row>

              <v-row justify="center" class="py-0">
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                   % Carbohidratos:
                  </span>
                  <v-text-field v-model="hidratos_percentage" required single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    % Proteínas:
                  </span>
                  <v-text-field v-model="proteinas_percentage" required single-line :rules="numberRules" solo disabled></v-text-field>
                </v-col>
                <v-col cols="12" sm="3" class="py-0">
                  <span class="subtitle-2">
                    % Grasas:
                  </span>
                  <v-text-field v-model="grasas_percentage"  required single-line :rules="numberRules" solo disabled></v-text-field>
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
                    <v-btn color="primary" :disabled="!valid" large block @click="postRecordatorio">
                     <v-icon align="center" medium >mdi-save</v-icon>
                     Guardar y Calcular
                    </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-text>

        </v-card>
      </v-col>
      </v-form>
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
    numberRules: [v => !Number.isNaN(Number(v)) || "Debe ser número"],
    hidratos: 0,
    totalCalorias: 0,
    proteinas: 0,
    grasas: 0,
    grasas_percentage: 0,
    proteinas_percentage: 0,
    hidratos_percentage: 0,
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
  

      this.hidratos = (this.comidas[3].fruit*15) + (this.comidas[3].cereal*15) + (this.comidas[3].vegetable*4)
                      + (this.comidas[3].legume*20)  + (this.comidas[3].milkSkimmed*12)  + (this.comidas[3].milkSemiSkimmed*12)
                      + (this.comidas[3].milkWhole*12) + (this.comidas[3].sugar*10)
                      
      this.totalCalorias = (this.comidas[3].fruit*60) + (this.comidas[3].cereal*70) + (this.comidas[3].vegetable*25) 
                      + (this.comidas[3].meatWhole*40) + (this.comidas[3].meatSemiGreasy*55) + (this.comidas[3].meatGreasy*75)
                      + (this.comidas[3].legume*120)  + (this.comidas[3].milkSkimmed*95)  + (this.comidas[3].milkSemiSkimmed*110)
                      + (this.comidas[3].milkWhole*150) + (this.comidas[3].sugar*40) + (this.comidas[3].fat*45)
      
      this.grasas = (this.comidas[3].meatWhole*1) + (this.comidas[3].meatSemiGreasy*3) + (this.comidas[3].meatGreasy*5)
                      + (this.comidas[3].legume*1)  + (this.comidas[3].milkSkimmed*2)  + (this.comidas[3].milkSemiSkimmed*4)
                      + (this.comidas[3].milkWhole*8) + (this.comidas[3].fat*5)
      
      this.proteinas = (this.comidas[3].cereal*2) + (this.comidas[3].vegetable*2) 
                      + (this.comidas[3].meatWhole*7) + (this.comidas[3].meatSemiGreasy*7) + (this.comidas[3].meatGreasy*7)
                      + (this.comidas[3].legume*8)  + (this.comidas[3].milkSkimmed*9)  + (this.comidas[3].milkSemiSkimmed*9)
                      + (this.comidas[3].milkWhole*9)
                      
      this.hidratos_percentage = Math.round(((this.hidratos*4)*100)/this.totalCalorias)
      this.grasas_percentage  =   Math.round(((this.grasas*9)*100)/this.totalCalorias)
      this.proteinas_percentage = Math.round(((this.proteinas*4)*100)/this.totalCalorias)
    },
    postRecordatorio(){
      this.totalPorciones()
  
      if(this.$refs.form.validate()){
        const URL = helper.baseURL + '/nutricion/record/reminder/' + this.$route.params.id
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios

               .post(URL,this.comidas)
               .then(() => {
                 this.$swal({
                    title: 'Guardado',
                    text: "Seguimiento guardado, ¿Qué quieres hacer ahora?",
                    type: 'success',
                    showCancelButton: true,
                    confirmButtonColor: 'green',
                    cancelButtonColor: '#3085d6',
                    confirmButtonText: 'Crear cita',
                    cancelButtonText: 'Regresar a lista de expedientes'
                 }).then((result)=>{
                   window.console.log(result)
                   
                   if(result.value){
                     window.open("/nutricion/"+this.$route.params.id+"/cita","_self")
                   }else{
                     window.open("/nutricion/pacientes","_self")
                   }
                 })
               })
               .catch(error => {
                 this.$swal({
                 title: "Error",
                 text:  error.response.data.error,
                 type: "error",
                 showConfirmButton: true});
               })
      } else {
        this.load_status = "Revisar errores en campos";
      }
    },
    getRecordatorio(){
      //this.comidas = []
      const URL = helper.baseURL + '/nutricion/records/' + this.$route.params.id;
      axios
        .get(URL)
        .then(response => {
          var reminder = response.data.dayReminder
          if(reminder.length > 0){
            this.comidas = reminder
          }
          
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        })
    }
  },
  created(){
    this.getRecordatorio()
  },
};
</script>
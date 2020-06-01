<template>
  <div>
    <nutriheader title="Indicadores"></nutriheader>
    <v-row align="center" justify="center">
      <v-col class="px-0 py-0" cols="5">            
        <span class="title"> Nutriologo: </span>
        <v-select
            :items="nutritionistsData"
            label="-Selecciona Nutriologo-"
            v-model="nutritionistSelected"
            item-text="display"
            item-value="infocard"
            @change= "validateNutritionist"
            solo                                 
        ></v-select>
        </v-col> 
      </v-col> 
    </v-row>
    <v-container fluid my-0 px-md-6>      
      <v-row align="center" justify="center">        
      <v-card class="d-flex align-center" align="center" color="white">           
          <v-container fluid py-0>
            <v-row align="center" justify="center">
                <v-col cols="3">
                    <h3 align="center">Filtrar Datos</h3>
                </v-col>            
                <v-col align="center" cols="3">                
                  <v-menu
                  ref="menuInitial"                   
                  :close-on-content-click="false"
                  :return-value.sync="filter.initialDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  >
                  <template v-slot:activator="{ on }">
                      <v-text-field
                      v-model="filter.initialDate"                                            
                      required
                      :rules="rules.dobRules" 
                      label="Fecha Inicial"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="filter.initialDate"
                      :max="this.rules.currentDate"
                      no-subtitle-1
                      scrollable                       
                      locale="es"
                  >
                      <div class="flex-grow-1"></div>
                      <v-btn
                      text
                      color="primary"
                      @click="$refs.menuInitial.save(filter.initialDate)"
                      >OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col align="center" cols="3">                
                  <v-menu
                  ref="menuFinal"                   
                  :close-on-content-click="false"
                  :return-value.sync="filter.finalDate"
                  transition="scale-transition"
                  offset-y
                  min-width="290px"
                  >
                  <template v-slot:activator="{ on }">
                      <v-text-field
                      v-model="filter.finalDate"                                            
                      required
                      :rules="rules.dobRules"
                      
                      label="Fecha Final"
                      prepend-icon="event"
                      readonly
                      v-on="on"
                      ></v-text-field>
                  </template>
                  <v-date-picker
                      v-model="filter.finalDate"
                      :max="this.rules.currentDate"
                      :min="this.filter.initialDate"
                      :disabled="!this.filter.initialDate" 
                      no-subtitle-1
                      scrollable                      
                      locale="es"
                  >
                      <div class="flex-grow-1"></div>
                      <v-btn
                      text
                      color="primary"
                      @click="$refs.menuFinal.save(filter.finalDate)"
                      >OK</v-btn>
                  </v-date-picker>
                  </v-menu>
                </v-col>
                <v-col cols="3">                           
                    <v-btn large block 
                      color="primary" 
                      @click="getConsultations"
                      :disabled="(!this.filter.initialDate || !this.filter.finalDate) || (this.filter.initialDate > this.filter.finalDate) || (!this.nutritionistSelected)">
                    <v-icon align="center" medium color="white">mdi-filter-variant</v-icon>
                    Filtrar
                    </v-btn>
                </v-col>
            </v-row>
            </v-container>
      </v-card>
      </v-row>
        
        <v-row>
            <v-col cols="6">
                <v-data-table
                ref="table"
                :headers="headers"
                :items="consultationsData"
                sort-by="name"
                class="elevation-1"
                :footer-props="{
                'items-per-page-options': [100, 500]
                }"
                :hide-default-footer="true"
                :loading="isLoadingData"
                loading-text="Cargando... Favor de esperar"
                >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                    <v-toolbar-title>No. Consultas</v-toolbar-title>
                    </v-toolbar>
                </template>
                
                <template v-slot:item.name="{ item }">
                    {{item.name}} 
                </template>

                <template v-slot:no-data>
                    <v-btn color="primary" :disabled="true">No hay datos</v-btn>
                </template>
                </v-data-table>
            </v-col>

            <v-col cols="6">
                <v-data-table
                ref="table"
                :headers="headers"
                :items="patientsData"
                sort-by="name"
                class="elevation-1"
                :footer-props="{
                'items-per-page-options': [100, 500]
                }"
                :hide-default-footer="true"
                :loading="isLoadingData"
                loading-text="Cargando... Favor de esperar"
                >
                <template v-slot:top>
                    <v-toolbar flat color="white">
                    <v-toolbar-title>No. Pacientes</v-toolbar-title>
                    </v-toolbar>
                </template>
                
                <template v-slot:item.name="{ item }">
                    {{item.name}} 
                </template>

                <template v-slot:no-data>
                    <v-btn color="primary" :disabled="true">No hay datos</v-btn>
                </template>
                </v-data-table>
            </v-col>
        </v-row>
    </v-container>
    <v-container fluid px-0 py-0>        
        <v-row>
        <v-col align="center" cols="12">
        <v-btn color="secondary"
        :disabled="this.consultationsData.length === 0">
          <download-excel
            :data="consultationsData"
            :fields="json_fields"
            :name= "consultationsExcelFileName"
          >Descargar Indicadores Consultas</download-excel>
        </v-btn>
        </v-col>
        <v-col align="center" cols="12">
        <v-btn color="secondary"
        :disabled="this.patientsData.length === 0">
          <download-excel
            :data="patientsData"
            :fields="json_fields"            
            :name= "patientsExcelFileName"
          >Descargar Indicadore Pacientes</download-excel>
        </v-btn>
        </v-col>
        </v-row>
      </v-container>
  </div>
</template>

<script>
import nutriheader from "../components/nutriheader.vue";
const helper = require("../helper.js");
import axios from "axios";


export default {
  components: {
    nutriheader
  },
  data: () => ({
    nutritionistSelected: "",
    nutritionistId: "",
    nutritionistName: "",
    nutritionistsData:[],
    isLoadingNutritionist: true,
    isLoadingData: false,
    patientsExcelFileName: "",
    consultationsExcelFileName: "",
    menuFinal: false,
    menuInitial: false,
    rules: {
        currentDate: "",
        dobRules: [v => !!v || "Fecha requerida"],
    },    
    filter: {
            initialDate:"",
            finalDate:""
    },
    headers: [
      { text: "Programa", align: "left", value: "program"},
      { text: "Mujeres", value: "womenNumber"},
      { text: "Hombres", value: "menNumber"},
      { text: "Otros", value: "otherNumber"},
      { text: "Total", value: "totalNumber"},
      { text: "%", value: "percentage"},      
    ],    
    json_fields: {
      Programa: "program",
      Muejeres: "womenNumber",
      Hombres: "menNumber",
      Otros:"otherNumber",
      Total: "totalNumber",
      Porcentaje: "percentage"
    },
    programOptions: [
        'PBI',
        'CG', 
        'Cortesía', 
        'Clase deportiva', 
        'Intramuros', 
        'Representativos', 
        'Ev. Médica',
        'Líderes',
        'Otro',
        'Total'
    ],
    consultationsData: [],
    patientsData:[],
    tableName : ["citas","pacientes"],
    arrayName : ["consultationsData", "patientsData"]
  }),
  computed: {
    
  },
  
  created() {
     this.getNutritionist();
     this.getCurrentDate();
    
  },
  mounted() {},
  methods: {
    validateNutritionist(){
      var splitString = this.nutritionistSelected.split(" ")
      this.nutritionistId = splitString[splitString.length-1]    
            
      this.nutritionistName = this.nutritionistSelected.substring(0,this.nutritionistSelected.lastIndexOf(" "))  
  
    },
    getNutritionist(){
      
      const URL =  helper.baseURL + "/nutricion/nutritionists" 
      axios
        .get(URL)
        .then(response => {
          response.data.forEach(n => {
            var displayInfo = {display: n.name + ' ' + n.surname + ' ' + n.nomina, infocard: n.name + ' ' + n.surname + ' ' + n.nomina + ' ' + n._id}
            this.nutritionistsData.push(Object.assign(n, displayInfo));  
          })
          this.isLoadingNutritionist = false
        })
        .catch((error) => {
          this.$swal("Error", "No se pudieron cargar los datos", "error");
        });
    },
    getConsultations(){     
      this.consultationsData = []
      this.patientsData = []     
      this.consultationsExcelFileName = "NoConsultas"+"_"+this.nutritionistName+"_"+this.filter.initialDate+"_"+this.filter.finalDate+".xls"
      this.patientsExcelFileName = "NoPacientes"+"_"+this.nutritionistName+"_"+this.filter.initialDate+"_"+this.filter.finalDate+".xls"
   
      this.isLoadingData = true
      const URL =  helper.baseURL + "/nutricion/report/" + this.nutritionistId   
      axios
        .post(URL,{startDate: this.filter.initialDate, endDate: this.filter.finalDate})
        .then(response => {
          this.programOptions.forEach(p => {
            for(var i=0; i<2; i++)
            {
              var row = {
                program: p, 
                womenNumber: response.data[this.tableName[i]].Mujer[p], 
                menNumber: response.data[this.tableName[i]].Hombre[p],  
                otherNumber: response.data[this.tableName[i]].Otro[p], 
                totalNumber: response.data[this.tableName[i]].Mujer[p] + response.data[this.tableName[i]].Hombre[p] + response.data[this.tableName[i]].Otro[p], 
                percentage: ((response.data[this.tableName[i]].Mujer[p] + response.data[this.tableName[i]].Hombre[p] + response.data[this.tableName[i]].Otro[p])
                            /(response.data[this.tableName[i]].Mujer["Total"] + response.data[this.tableName[i]].Hombre["Total"] + response.data[this.tableName[i]].Otro["Total"])
                            *100).toFixed(2)+"%"                       
                }                  
              this[this.arrayName[i]].push(row)
            }            
          })  
          this.isLoadingData = false
        })
        .catch((error) => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
      
    },    
    dateToString(date){
      var dateString = date.toISOString().substr(0, 10)
      return dateString
    },
    getCurrentDate(){
        var today = new Date();
        this.rules.currentDate = this.dateToString(today)
    }    
  }
};
</script>


<style>
</style>
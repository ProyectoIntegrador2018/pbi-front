<template>
  <div>
    <v-data-table
      ref="table"
      :headers="headers"
      :items="closedCourses"
      item-key="_id"
      class="elevation-1"      
      :footer-props="{
     'items-per-page-options': [100, 500]
      }"
      :loading="isLoading"
      loading-text="Cargando... Favor de esperar"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="pl-12 ml-2">Clases Cerradas</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:header.data-table-select="{ on , props }" style = "display:none"></template>

      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay cursos cerrados</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";

export default {
  data: () => ({
    isLoading: true,
    selectedTerm: "",
    headers: [      
      {align: "left", width: "5%" },
      { text: "Nombre", align: "left", value: "name", width: "25%"},
      { text: "Instructor", value: "instructor", width: "20%" },
      { text: "Frecuencia", value: "frequency", width: "10%" },
      { text: "Hora de inicio", value: "startHour", width: "10%" },
      { text: "Hora de fin", value: "endHour",width: "10%" },
      { text: "Salón", value: "classroom", width: "20%" }
    ],
    courses: [],
    closedCourses: []
  }),
  created() {
    this.getTerms();
  },
  mounted() {},
  methods: {  
   
    getCourses(value) {
      if (value == undefined) {
        value = this.selectedTerm;
      } else {
        this.selectedTerm = value;
      }
      this.courses = [];
      const URL = helper.baseURL + "/terms/classes/" + value;
      axios
        .get(URL)
        .then(response => {
          this.courses = response.data;
          this.closedCourses = this.courses.filter(function(course){
              if(course.quota <= course.enrolled.length){
                  return course
              }
          })
          this.isLoading=false
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
    },
    getTerms() {
      const URL = helper.baseURL + "/terms/";
      axios
        .get(URL)
        .then(response => {
          response.data.forEach((periodo)=>{
            if(periodo.flagCurrent){
               this.selectedTerm = periodo._id
            }
          }) 
          this.getCourses(this.selectedTerm);
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
    },
  }
};
</script>


<style>
</style>
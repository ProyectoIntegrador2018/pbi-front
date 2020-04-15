<template>
  <div>
    <v-data-table
      ref="table"
      :headers="headers"
      :items="enrolledCourses"
      item-key="_id"  
      class="elevation-1"
      v-model="selected"
      :loading="isLoading"
      loading-text="Cargando... Favor de esperar"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="pl-12 ml-2">Cursos en los que estás inscrito</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:header.data-table-select="{ on , props }" style = "display:none">
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay cursos</v-btn>
      </template>
    </v-data-table>
    <div class="py-6"></div>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";

export default {
  data: () => ({
    isLoading: true,
    selected: [],
    selectedTerm: "",
    flagAlertSecondClass: false,
    cantEnroll:true,
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
    enrolledCourses: [],
    userID: ""
  }),
  created() {
    axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
    const URL = helper.baseURL + "/user/";
    axios
    .get(URL)
    .then((response)=>{
        this.userID = response.data._id
        this.getTerms();
    }).catch((error)=>{
      this.$swal("Error",error.response.data.error,"error")
    })
   
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
          var myId = this.userID
          this.enrolledCourses = this.courses.filter(function(course){
            if(course.enrolled.includes(myId))
              return course
          }),
          //window.console.log(this.enrolledCourses)
          this.openCourses = this.courses.filter(function(course){
              if(course.quota > course.enrolled.length){
                  return course
              }
          })
          this.isLoading = false
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
    irCursos(){
        window.open("/uclases","_self")
    }
  }
};
</script>


<style>
</style>
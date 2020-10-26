<template>
  <div>
    <v-data-table
      ref="table"
      :headers="headers"
      :items="openCourses"
      item-key="_id"
      item-value="_id"
      show-select = ""
      class="elevation-1"
      v-model="selected"
      @input="selectClasses"      
      :footer-props="{
     'items-per-page-options': [100, 500]
      }"
      :loading="isLoading"
      loading-text="Cargando... Favor de esperar"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title class="pl-12 ml-2">Selecciona la clase deportiva y/o cultural que deseas inscribir</v-toolbar-title>
        </v-toolbar>
      </template>

      <template v-slot:header.data-table-select="{ on , props }" style = "display:none">
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay cursos</v-btn>
      </template>
    </v-data-table>
    <div justify="right" align="right">
      <v-col cols="3" class="px-0">
          <v-btn large block color="primary" :disabled="cantEnroll" class="px-0" @click="confirmarInscripcion">
            <v-icon align="center" medium color="white">mdi-content-save-outline</v-icon>
            Inscribir
          </v-btn>
      </v-col>
    </div>
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
      { text: "Nombre", align: "left", value: "name", width: "25%"},
      { text: "Instructor", value: "instructor", width: "20%" },
      { text: "Frecuencia", value: "frequency", width: "10%" },
      { text: "Hora de inicio", value: "startHour", width: "10%" },
      { text: "Hora de fin", value: "endHour",width: "10%" },
      { text: "Salón", value: "classroom", width: "20%" }
    ],
    courses: [],
    openCourses: [],
    enrolledCourses: [],
    userID: "",
    isFailedInscription: false
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
      this.$swal("Error",errorr.response.data.error,"error")
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
          this.openCourses = this.courses.filter(function(course){
              if(course.quota > course.enrolled.length && !course.enrolled.includes(myId)){
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
    selectClasses(){
      if(this.selected.length == 0){
        this.cantEnroll = true
      }else{
        this.cantEnroll = false
      }
      if(this.selected.length == 2 && this.flagAlertSecondClass == false)
      {
          this.$swal("Segunda Clase ","Inscribir una segunda clase representa un costo extra según tu Departamento, para más información contactar a: 'pbi.mty@servicios.itesm.mx'","info")
          this.flagAlertSecondClass = true 
      }          
    },
    confirmarInscripcion()
    {
        var confirmationCourses = ""

        this.selected.forEach(function(course) {
          confirmationCourses = confirmationCourses.concat(course.name + " Instructor: " + course.instructor + " " + course.frequency + " " + course.startHour + " a " + course.endHour + " Salón: " + course.classroom+"<br>")
        });
        
        this.$swal({
          title:"Confirmar Inscripción",
          type:"info",
          html:"Se realizará la inscripción a: <br>"+confirmationCourses,
          showCancelButton:true,
          cancelButtonText:"Cancelar",
          confirmButtonText:"Confirmar"}).then((result) => {
            if(result.value)
              this.inscribirClase(this.selected)
          })  
    },
    inscribirClase(arrClases){
      if(arrClases.length==0){
        this.getTerms()
        if(!this.isFailedInscription){
          this.$router.push("/uclases")
        }else{
          this.$router.go();
        }
        return
      }else{
        var claseAInscribir = arrClases.pop()
        const URL = helper.baseURL + "/classes/enrollPayroll/user/"+claseAInscribir._id;
        axios
        .put(URL)
        .then((response)=>{
          this.$swal("Inscrito","Te has inscrito a la clase "+ claseAInscribir.name ,"success").then(()=>{
            this.inscribirClase(arrClases)
          })
        }).catch((error)=>{   
          this.$swal("Error!",error.response.data.error,"error").then(()=>{
            this.inscribirClase(arrClases)
            this.isFailedInscription = true
          })
        })
      }
    }
  }
};
</script>


<style>
</style>
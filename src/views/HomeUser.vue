<template>
  <div>

    <v-container fluid my-5  class="my-0 mx-0 px-0 py-0">
      <v-col align="center" justify="center" class="my-0 mx-0 px-0 py-0">
        <v-img src="../assets/pbi.png" max-width="200" max-height="200" my-5></v-img>
      </v-col>
    </v-container>

    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3 align-center">Proceso de Inscripción</h1>
      </v-flex>
    </v-layout>

    <v-row align="center" justify="center">
      <v-col class="px-0 pb-0 mx-0 my-0" cols="10">
            <v-alert
              outlined
              type="info"
              prominent
              border="left"
              class="my-0"
            >Inscripciones para el periodo: <b>{{Periodo}}</b> permitidas del <u>{{momentDatetime(this.start, 'LL')}}</u> a las 12:00 AM al <u>{{momentDatetime(this.close, 'LL')}}</u> hasta las 11:59 PM.</v-alert>
      </v-col>
    </v-row>
    <!--Código para la progress bar -->
    <v-row v-row align="center" justify="center">
      <v-col class="px-0 mx-0 my-0" cols="9">
        <h3>Mi progreso de inscripción:</h3>
      </v-col>

       <v-col class="px-0 pb-0 mx-0 my-0" cols="9">
         <meter :value="progreso" 
                optimum="1"
                low="0.99"
         style="
            width:100%;
            height: 30px;"
            ></meter>
       </v-col>
      
    </v-row>
    <v-row v-row align="center" justify="center">
       <v-col class="px-0 py-0 mx-0 my-0 text-center" cols="3">
         Paso 1
       </v-col>
       <v-col class="px-0 py-0 mx-0 my-0 text-center" cols="3">
         Paso 2
       </v-col>
       <v-col class="px-0 py-0 mx-0 my-0 text-center" cols="3">
         Paso 3
       </v-col>
    </v-row>

    <v-item-group class="fill-height" fluid>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="#73C9D0"
              height="200"
              @click="redirectToUserInfo"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-account-card-details-outline</v-icon>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Paso 1</h2>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Mi información</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="light-green darken-1"
              height="200"
              @click="redirectToMedicalRecord"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-medical-bag</v-icon>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Paso 2</h2>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Mi Historial Médico</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="orange"
              height="200"
              @click="redirectToCourseSignUp"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-file-document-edit-outline</v-icon>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Paso 3</h2>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Inscribir Cursos</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="blue lighten-1"
              height="200"
              @click="redirectToEnrolledCourses"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-football-helmet</v-icon>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Paso 4</h2>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Mis Cursos Inscritos</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="blue lighten-1"
              height="200"
              @click="redirectToLockers"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-locker</v-icon>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Paso 5</h2>
                </v-col>
                <v-col cols="12" class="px-0 py-0">
                  <h2 class="btn" align="center">Mi Locker</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
          
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";

export default {
  data: () => ({
    medRecord: "",
    progreso:0,
    userData: null,
    Periodo: "",
    start: "",
    close: "",
    selectedTerm: null,
    enrolledCourses: [],
    userID:"",
  }),
  created(){
    this.getUserInfo()
    this.getTerms()

  },
  methods: {
    redirectToEnrolledCourses() {
      var route = "/uclases/";
      this.$router.push(route);
    },
    redirectToUserInfo() {
      var route = "/myinfo/";
      this.$router.push(route);
    },
    redirectToCourseSignUp() {
      if(!this.userData){
        this.$swal({
        title: "Falta Información Personal",
        text: "Es requisito para realizar inscripción",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Llenar Información",
        cancelButtonText: "Cancelar"
          }).then(result => {
            if (result.value) {
              this.redirectToUserInfo()
            }
          });
        }
      else if (this.hasMedicalRecord()){
        var route = "/inscribirclase/";
        this.$router.push(route);
      }
      else {        
        this.$swal({
        title: "Falta Historial médico",
        text: "Es requisito para realizar inscripción",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Llenar historial",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.redirectToMedicalRecord()
        }
      });
      }
      
    },
    redirectToMedicalRecord() {
      var route = "/mymedicalrecord/";
      this.$router.push(route);
    },
    redirectToLockers() {
      if(!this.userData){
        this.$swal({
        title: "Falta Información Personal",
        text: "Es requisito para inscribir locker",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Llenar Información",
        cancelButtonText: "Cancelar"
          }).then(result => {
            if (result.value) {
              this.redirectToUserInfo()
            }
          });
        }
      else if (this.hasMedicalRecord()){
        var route = "/selectlocker/";
        this.$router.push(route);
      }
      else {        
        this.$swal({
        title: "Falta Historial médico",
        text: "Es requisito para inscribir locker",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Llenar historial",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.redirectToMedicalRecord()
        }
      });
      }
    },
    getUserInfo() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const URL = helper.baseURL + "/user/";
      axios
        .get(URL)
        .then(response => {
          this.medRecord = response.data.filledRecord;
          this.userData = response.data.rectoria
          this.userID = response.data._id
          //Llena la barra de progreso
          if(this.userData){
            this.progreso+=0.166666
            if(this.medRecord){
              this.progreso+=0.33333
              this.getCourses(this.selectedTerm)
            }
          }
        })
        .catch(error => {
          this.$swal("Error", error.response.data.error, "error");
        });
    },
    hasMedicalRecord(){
      return this.medRecord
    },
    momentDatetime(datetime, datetime_format) {
      return this.$moment.utc(datetime).format(datetime_format);
    },
    getTerms() {
      const URL = helper.baseURL + "/terms/";
      axios
        .get(URL)
        .then(response => {
          response.data.forEach(periodo => {
            if (periodo.flagCurrent) {
              this.selectedTerm = periodo._id
              this.Periodo = periodo.name + " " + periodo.year;
              this.start = periodo.startInscriptions
              this.close = periodo.closeInscriptions
             
            }
          });
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
    },
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

          this.openCourses = this.courses.filter(function(course){
              if(course.quota > course.enrolled.length){
                  return course
              }
          })
          this.isLoading = false
          if(this.enrolledCourses.length){
            this.progreso = 1
          }
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.btn {
  margin: auto;
  color: white;
}
meter {
  /* --background: #dadada; */
  --optimum: rgb(96, 243, 96);
  --sub-optimum: #b3d4fc;
  --sub-sub-optimum: crimson;

  /* The gray background in Firefox */
  background: var(--background);
  display: block;
  margin-bottom: 0;
  width: 100%;
}

/* The gray background in Chrome, etc. */
meter::-webkit-meter-bar {
  background: var(--background);
}

/* The green (optimum) bar in Firefox */
meter:-moz-meter-optimum::-moz-meter-bar {
  background: var(--optimum);
}

/* The green (optimum) bar in Chrome etc. */
meter::-webkit-meter-optimum-value {
  background: var(--optimum);
}

/* The yellow (sub-optimum) bar in Firefox */
meter:-moz-meter-sub-optimum::-moz-meter-bar {
  background: var(--sub-optimum);
}

/* The yellow (sub-optimum) bar in Chrome etc. */
meter::-webkit-meter-suboptimum-value {
  background: var(--sub-optimum);
}

/* The red (even less good) bar in Firefox */
meter:-moz-meter-sub-sub-optimum::-moz-meter-bar {
  background: var(--sub-sub-optimum);
}

/* The red (even less good) bar in Chrome etc. */
meter::-webkit-meter-even-less-good-value {
  background: var(--sub-sub-optimum);
}
</style>

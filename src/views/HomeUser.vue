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

    <v-item-group class="fill-height" fluid>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="3">
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

          <v-col cols="12" md="3">
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

          <v-col cols="12" md="3">
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

          <v-col cols="12" md="3">
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

          <v-col cols="12" md="3">
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
    userData: null,
    Periodo: "",
    start: "",
    close: ""
  }),
  created(){
    this.getUserInfo()
    this.getTerms()
  },
  methods: {
    redirectToEnrolledCourses() {
      var route = "/uclases/";
      window.open(route, "_self");
    },
    redirectToUserInfo() {
      var route = "/myinfo/";
      window.open(route, "_self");
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
        window.open(route, "_self");
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
      window.open(route, "_self");
    },
    redirectToLockers() {
      if(!this.userData){
        this.$swal({
        title: "Falta Información Personal",
        text: "Es requisito para inscribir casillero",
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
        window.open(route, "_self");
      }
      else {        
        this.$swal({
        title: "Falta Historial médico",
        text: "Es requisito para inscribir casillero",
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
              this.Periodo = periodo.name + " " + periodo.year;
              this.start = periodo.startInscriptions
              this.close = periodo.closeInscriptions
            }
          });
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
</style>

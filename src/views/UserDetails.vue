<template>
  <div>
    <v-content>
      <v-container fluid>
        <adminheader :title="user.name" :subtitle="user.surname" secondRoute="/users/" titleStyle='2'></adminheader>
        <h1 align="center" justify="center" class="subtitle-1">{{user.nomina}}</h1>
      </v-container>
      <v-container fluid my-5 px-md-12>
        <v-data-table
          ref="table"
          :headers="headers"
          :items="user.classes"
          sort-by="term"
          class="elevation-1"
          item-key="_id"
          :loading="isLoading"
          loading-text="Cargando... Favor de esperar"
        >
          <template v-slot:top>
            <v-toolbar flat color="white">
              <v-toolbar-title>Clases Inscritas</v-toolbar-title>
            </v-toolbar>
          </template>
          <template v-slot:item.action="{ item }">
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon small class="mr-2" v-on="on" @click="seeCourseDetail(item)">remove_red_eye</v-icon>
              </template>
              <span>Ver curso</span>
            </v-tooltip>
            <v-tooltip top>
              <template v-slot:activator="{ on }">
                <v-icon small class="mr-2" v-on="on" color="error" @click="deleteItem(item)">mdi-close-circle</v-icon>
              </template>
              <span>Desinscribir</span>
            </v-tooltip>
          </template>

          <template v-slot:no-data>
            <v-btn color="primary" :disabled="true">No tiene clases inscritas</v-btn>
          </template>
        </v-data-table>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";
import adminheader from "../components/adminheader.vue";


export default {
  components: {
    adminheader
  },
  data: () => ({
    isLoading: true,
    dialog: false,
    valid: true,
    user: {},
    course: null,
    enrolled: [],
    nomina: "",
    nominaRules: [
      v => !!v || "Nomina requerida",
      v => /^(A|L)\d{8}\b$/.test(v) || "AXXXXXXXX"
    ],
    headers: [
      { text: "Periodo", align: "left", value: "term" },
      { text: "Nombre", align: "left", value: "name" },
      { text: "Instructor", align: "left", value: "instructor" },
      { text: "Frecuencia", align: "left", value: "frequency" },
      { text: "Hora de inicio", value: "startHour" },
      { text: "Hora de fin", value: "endHour" },
      { text: "", value: "action", sortable: false }
    ]
  }),
  methods: {
    getUser() {
      const URL = helper.baseURL + "/users/" + this.$route.params.id;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");

      axios
        .get(URL)
        .then(response => {
          console.log(response.data)
          this.user = response.data;
          this.isLoading = false
        })
        .catch(error => {
          this.$swal({
            title: "Error",
            text: error.response.data.error,
            type: "error",
            showConfirmButton: false
          });
        });
    },
    deleteItem(item) {
      this.$swal({
        title: "¿Estas seguro?",
        text: "No se puede recuperar una vez eliminado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.disenrollUser(item._id);
        }
      });
    },
    seeCourseDetail(item){
      var route = '/courseDetail/';
      route = route.concat(item._id)
      window.open(route,"_blank");

    },
    deleteItem(item) {
      this.$swal({
        title: "¿Estas seguro?",
        text: "No se puede recuperar una vez eliminado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.disenrollUser(this.user._id,item._id);
        }
      });
    },
    disenrollUser(idUser,courseID) {
      const URL = helper.baseURL + "/classes/disenroll/" + courseID;
      const json_id = { userID: idUser };
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");

      axios
        .put(URL,json_id)
        .then(() => {
          this.$swal("Desinscrito", "Usuario desinscrito", "success");
          this.getUser();
        })
        .catch(error => {
          this.$swal({
            title: "Error",
            text: error.response.data.error,
            type: "error",
            showConfirmButton: false
          });
        });
    }
  },
  created() {
    this.getUser();
  }
};
</script>

<template>
  <div>
    <v-content>
      <v-container fluid>
       <h1
          class="display-3"
          align="center"
          style="white-space: normal; word-wrap:break-word"
        >{{title}}</h1>
        <v-row>
          <v-col align="center" justify="center">
            <span>
              <v-chip
                class="ma-2"
                large
                label
                v-if="course.enrolled.length == course.quota"
                color="error"
              >
                <h1 class="d-inline">Cupo: {{course.enrolled.length}} de {{course.quota}}</h1>
              </v-chip>
              <v-chip class="ma-2" large label v-else color="success">
                <h1 class="d-inline">Cupo: {{course.enrolled.length}} de {{course.quota}}</h1>
              </v-chip>
            </span>
            <h2>Horario: {{course.startHour}} a {{course.endHour}}</h2>
            <template v-for="item in course.frequency">
              <v-chip class="ma-2" color="primary">{{item}}</v-chip>
            </template>
            <template v-if="course.instructor != ''">
              <h3>Instructor: {{course.instructor}}</h3>
            </template>
            <template v-else>
              <h3>Instructor: Sin definir</h3>
            </template>
            <template v-if="course.classroom != ''">
              <h3>Lugar: {{course.classroom}}</h3>
            </template>
            <template v-else>
              <h3>Lugar: Sin definir</h3>
            </template>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" large v-on="on">Tomar Lista</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Escribe Nómina de alumno</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field v-model="nomina" :rules="nominaRules" label="Nómina" required></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="grey darken-1" text @click="close()">Cerrar</v-btn>
                <v-btn :disabled="!valid" color="blue darken-1" text @click="submit()">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-row>
      </v-container>

      <v-container fluid my-5 px-md-12>
        <div justify="left" align="left">
          <v-col cols="2" class="px-0">
              <v-btn large block class="px-0" href="/profesor">
                <v-icon align="center" medium >mdi-arrow-left</v-icon>
                Regresar
              </v-btn>
          </v-col>
        </div>
        <v-card>
          <v-card-title>
            Usuarios registrados
            <v-spacer></v-spacer>
            <v-text-field
              v-model="searchPages"
              append-icon="search"
              label="Buscar alumno"
              single-line
              hide-details
            ></v-text-field>
          </v-card-title>
          <v-data-table
            ref="table"
            :headers="headers"
            :items="course.enrolled"
            :search="searchPages"
            sort-by="name"
            class="elevation-1"
            :loading="isLoading"
            loading-text="Cargando... Favor de esperar"
          >
            <template v-slot:no-data>
              <v-btn disabled color="primary">No hay usuarios</v-btn>
            </template>
            <template v-slot:item.action="{ item }">
              <v-btn class="ma-2" small color="" @click="showStudentData(item)">
                <v-icon>mdi-eye</v-icon>&nbsp; Ver
              </v-btn>
            </template>
          </v-data-table>
        </v-card>
      </v-container>

      <v-container fluid my-5 px-md-12>
        <h2 align="center" class="display-1">Descargar Lista Inscritos</h2>
        <v-row>
        <v-col align="center" cols="12">
        <v-btn color="secondary">
          <download-excel
            :data="course.enrolled"
            :fields="json_fields"
            name="ListaInscritos.xls"
          >Lista Inscritos</download-excel>
        </v-btn>
        </v-col>
        <v-col align="center" cols="12">
        <v-btn color="secondary">
          <download-excel
            :data="course.enrolled"
            :fields="inscritos_historial"
            name="InscritosHistorialMedico.xls"
          >Inscritos (Historial Médico)</download-excel>
        </v-btn>
        </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";


export default {
  components:{
    
  },
  data: () => ({
    title:"",
    isLoading: true,
    searchPages: "",
    dialog: false,
    valid: true,
    course: [],
    nomina: "",
    nominaRules: [
      v => !!v || "Nomina requerida",
      v => /^(A|L)\d{8}\b$/.test(v) || "LXXXXXXXX o AXXXXXXXX"
    ],
    headers: [
      { text: "Nombre", align: "left", value: "name" },
      { text: "Apellido", value: "surname" },
      { text: "Nomina", value: "nomina" },
      { text: "Métricas", align: "center", value: "action", sortable: false }
    ],
    json_fields: {
      Nombre: "name",
      Apellido: "surname",
      Nomina: "nomina",
      Email:"email",
      Departamento: "departamento",
      Rectoría: "rectoria"
    },
    inscritos_historial: {
      "Nombre": "name",
      "Apellido": "surname",
      "Nomina": "nomina",
      "Correo": "email",
      "Compañía de seguros": "medicalRecord.insuranceCompany",
      "Número de seguro": "medicalRecord.securityNumber",
      "Hospital": "medicalRecord.hospital",
      "Nombre de contacto": "medicalRecord.contactName",
      "Teléfono de contacto": "medicalRecord.contactPhone",
      "Relación de contacto": "medicalRecord.contactRelationship",
      "Enfermedades": "medicalRecord.illnesses",
      "Lesiones": "medicalRecord.injuryIndication",
      "Toma medicina": "medicalRecord.flagMedicine",
      "Medicina": "medicalRecord.medicineIndication",
      "Condición física": "medicalRecord.physicalCondition"
    }
  }),
  methods: {
    getCourse() {
      const URL = helper.baseURL + "/classes/" + this.$route.params.id;
      axios
        .get(URL)
        .then(response => {
          this.course = response.data;
          this.title = response.data.name
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
    enrollUser() {
      const json_nomina = { nomina: this.nomina.toUpperCase() };
      const URL = helper.baseURL + "/classes/enrollPayroll/" + this.course._id;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      axios
        .put(URL, json_nomina)
        .then(() => {
          this.$swal("Usuario Inscrito", "Se ha inscrito al usuario a la clase", "success");
          this.getCourse();
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
    showStudentData(item){
      var idStudent = item._id
      var route = '/profesor/alumno/'+idStudent+'?idClase='+ this.$route.params.id
      window.open(route, "_self");
    }
    ,
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
    disenrollUser(idUser) {
      const URL = helper.baseURL + "/classes/disenroll/" + this.course._id;
      const json_id = { userID: idUser };
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");

      axios
        .put(URL, json_id)
        .then(() => {
          this.$swal("Desinscrito", "Usuario desinscrito", "success");
          this.getCourse();
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
    close() {
      this.valid = true;
      this.dialog = false;
      this.$refs.form.resetValidation();
      this.nomina = "";
    },
    submit() {
      if (this.$refs.form.validate()) {
        this.snackbar = true;
        this.enrollUser();
        this.close();
      } else {
        this.load_status = "No están todos los campos";
      }
    }
  },
  created() {
    this.getCourse();
  }
};
</script>

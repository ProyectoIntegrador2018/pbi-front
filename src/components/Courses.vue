<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col align="center" cols="6">
          <v-select
            ref="miperiodo"
            v-model="term"
            :items="terms"
            item-text="display"
            item-value="_id"
            label="Periodo"
            @change="getCourses"            
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      ref="table"
      :headers="headers"
      :items="courses"
      :search="searchPages"
      sort-by="name"
      class="elevation-1"
      :footer-props="{
     'items-per-page-options': [100, 500]
      }"
      :loading="isLoading"
      loading-text="Cargando... Favor de esperar"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Clases registradas</v-toolbar-title>
          <v-spacer></v-spacer>
                     <v-text-field
              v-model="searchPages"
              append-icon="search"
              label="Buscar clase"
              single-line
              hide-details
            ></v-text-field>
          <v-spacer></v-spacer> 

          <v-tooltip top>
            <template v-slot:activator="{ on }">
             <v-btn outlined color="primary" v-on="on" dark class="mb-2 mr-3" @click="downloadXls ">
                <v-icon align="center" medium >mdi-file-excel-outline</v-icon>
                <v-icon align="center" medium >mdi-download</v-icon>                  
            </v-btn>
            </template>
            <span>Descargar Lista de Clases en Excel</span>
          </v-tooltip>  

          <v-dialog v-model="uploadDialog" max-width="500px">       
               
            <template v-slot:activator="{ on }">                  
              <v-btn outlined color="primary"  v-on="on" class="mb-2 mr-3" @click="uploadXls">
                  <v-icon align="center" medium >mdi-file-excel-outline</v-icon>
                  <v-icon align="center" medium >mdi-upload</v-icon>                  
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">Subir Excel con Lista de clases</span>
              </v-card-title>

              <v-card-text>
                <template>
                  <div class="container">
                    <div class="large-12 medium-12 small-12 cell">
                      <label>File
                        <input type="file" id="file" ref="file"/>
                      </label>
                        <button :style= "excelButtonStyle"
                                :disabled = "excelSubmissionIsLoading"                                            
                                v-on:click="submitFile()">{{excelButtonText}}</button>
                    </div>
                  </div>                  
                  <p class="pt-5 pb-0 px-5 my-0 caption">Formato de Excel para subir clases:</p>
                  <a class="py-0 px-5 my-0" href="https://drive.google.com/uc?export=download&id=1MCGOzwxftuFGaEcBNBzdkGsryQXlIYbl">Formato_Inscripciones_PBI.xlsx</a>
                  <p class="py-5 px-5 my-0 caption">La siguiente acción adjuntará la lista de clases encontradas al Excel a las clases actuales del Periodo
                </p>
                </template>
              </v-card-text>

              <v-card-actions>
                <div class="flex-grow-1"></div>
                <v-btn color="blue darken-1" text @click="closeUpload">Cerrar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

          <v-dialog v-model="dialog" max-width="500px">           
            <template v-slot:activator="{ on }">    
              <v-btn color="primary" dark class="mb-2" v-on="on">Crear clase</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedItem.name"
                          :rules="[v => !!v || 'Name is required']"
                          label="Nombre"
                          required
                        ></v-text-field>
                      </v-col>
                       <v-col cols="12">
                        <v-text-field 
                          v-model="editedItem.quota" 
                          label="Cupo" 
                          :rules="quotaRules"
                          required
                          ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.instructor" label="Instructor"></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field v-model="editedItem.classroom" label="Salón"></v-text-field>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="6">
                        <v-menu
                          ref="menu"
                          v-model="menuStartTime"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="editedItem.startHour"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.startHour"
                              label="Hora de inicio"
                              prepend-icon="access_time"
                              readonly
                              :rules="[v => !!v || 'Start hour is required']"
                              required
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menuStartTime"
                            v-model="editedItem.startHour"
                            ampm-in-title
                            :allowed-minutes="allowedStep"
                            :max="editedItem.endHour"
                            @click:minute="$refs.menu.save(editedItem.startHour)"
                          ></v-time-picker>
                        </v-menu>
                      </v-col>

                      <v-col cols="6">
                        <v-menu
                          ref="menuEnd"
                          v-model="menuEndTime"
                          :close-on-content-click="false"
                          :nudge-right="40"
                          :return-value.sync="editedItem.endHour"
                          transition="scale-transition"
                          offset-y
                          max-width="290px"
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.endHour"
                              label="Hora de fin"
                              prepend-icon="access_time"
                              readonly
                              :rules="[v => !!v || 'End hour is required']"
                              required
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-time-picker
                            v-if="menuEndTime"
                            v-model="editedItem.endHour"
                            ampm-in-title
                            :allowed-minutes="allowedStep"
                            :min="editedItem.startHour"
                            @click:minute="$refs.menuEnd.save(editedItem.endHour)"
                          ></v-time-picker>
                        </v-menu>
                        <span
                          class="red--text"
                          v-if="errored"
                          align="center"
                        >La fecha de cierre debe ser después que la de inicio</span>
                      </v-col>
                    </v-row>

                    <v-row>
                      <v-col cols="12">
                        <v-select
                          v-model="editedItem.frequency"
                          label="Frecuencia"
                          :items="frecuencia"
                          :rules="rulesFrequency"
                          multiple
                          required
                        ></v-select>
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
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon medium class="mr-2" v-on="on" @click="seeCourseDetail(item)">remove_red_eye</v-icon>
          </template>
          <span>Ver curso</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="editItem(item)">edit</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="deleteItem(item)" color="red darken-4">delete</v-icon>
          </template>
          <span>Borrar</span>
        </v-tooltip>
      </template>
      <template v-slot:item.name="{ item }">
        {{item.name}} 
        <v-chip small class="ma-2" color="red" text-color="white" v-if="item.numEnrolled==item.quota">Cerrada</v-chip>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay cursos</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const helper = require("../helper.js");
const excelConversiones = require("../components/excelConversions.js");
import axios from "axios";


export default {
  data: () => ({
    isLoading: true,
    searchPages: "",
    errored: false,
    dialog: false,
    uploadDialog: false,
    valid: true,
    menuStartTime: false,
    menuEndTime: false,
    excelSubmissionIsLoading: false,
    excelButtonText: "Subir",
    activeButtonStyle: "background-color:#2B81D6; color:white; border:rounded; padding: 5px 5px; text-align: center; display: inline-block;",
    excelButtonStyle: "",    
    rulesFrequency:  [
      (v) => !!v || "Frecuencia requerido",
      (v) => (v && v.length >= 1) || "Frecuencia de mínimo 1 día"
    ],
    quotaRules: [v => !!v || 'Cupo is required',v => /^\d+$/.test(v) || "Debe ser número"],
    headers: [
      { text: "Nombre", align: "left", value: "name" },
      { text: "Cupo", value: "quota"},
      { text: "Inscritos", value: "numEnrolled"},
      { text: "Instructor", value: "instructor" },
      { text: "Frecuencia", value: "frequency" },
      { text: "Hora de inicio", value: "startHour" },
      { text: "Hora de fin", value: "endHour" },
      { text: "Salón", value: "classroom" },
      { text: "Actions", value: "action", sortable: false }
    ],
    terms: [],
    courses: [],
    frecuencia: ["LU", "MA", "MI", "JU", "VI", "SA", "DO","PERSONALIZADO","3 VECES POR SEMANA"],
    editedIndex: -1,
    editedItem: {
      name: "",
      instructor: "",
      frequency: null,
      startHour: "",
      endHour: "",
      classroom: "",
      quota: "",
    },
    defaultItem: {
      name: "",
      instructor: "",
      frequency: null,
      startHour: "",
      endHour: "",
      classroom: "",
      quota: ""
    },
    term: {},
    selectedTerm: ""
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Crear" : "Editar";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getTerms();
    this.excelButtonStyle = this.activeButtonStyle
  },
  mounted() {},
  methods: {
    allowedStep: m => m % 5 === 0,
    hourRange(hourA, hourB) {
      if (hourB > hourA) {
        return true;
      } else {
        this.errored = true;
        return false;
      }
    },
    editItem(item) {
      this.editedIndex = this.courses.indexOf(item);

      const json_item = {
        name: item.name,
        instructor: item.instructor,
        frequency: item.frequency,
        startHour: item.startHour,
        endHour: item.endHour,
        classroom: item.classroom,
        quota: item.quota,
        numEnrolled: 0
      };
      this.editedItem = Object.assign({}, json_item);
      this.dialog = true;
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
          this.deleteCourse(item._id);
        }
      });
    },
    close() {
      this.valid = true;
      this.dialog = false;
      this.errored = false;
      this.editedItem = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.$refs.form.resetValidation();
    },
    submit() {
      if (
        this.$refs.form.validate() &&
        this.hourRange(this.editedItem.startHour, this.editedItem.endHour)
      ) {
        this.snackbar = true;
        const json_term = {
          name: this.editedItem.name,
          instructor: this.editedItem.instructor,
          frequency: this.editedItem.frequency,
          startHour: this.editedItem.startHour,
          endHour: this.editedItem.endHour,
          classroom: this.editedItem.classroom,
          quota: this.editedItem.quota
        };
        if (this.editedIndex > -1) {
          //Edit class
          this.updateCourse(this.courses[this.editedIndex]._id, json_term);
        } else {
          //Create new course
          this.postNewCourse(json_term, this.selectedTerm);
        }
        this.close();
      } else {
        this.load_status = "No están todos los campos";
      }
    },
    postNewCourse(course, termID) {
      if (termID == undefined) {
        termID = this.selectedTerm;
      } else {
        this.selectedTerm = termID;
      }
      const URL = helper.baseURL + "/classes/" + termID;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");

      axios
        .post(URL, course)
        .then(() => {
          //Alert de confirmacion de creacion
          this.$swal("Guardado", "Clase creada", "success");
          this.getCourses(this.selectedTerm);
        })
        .catch(() => {
          this.$swal("Error", "No se pudo crear la clase", "error");
        });
    },
    getCourses(value) {
      this.isLoading = true
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
          response.data.forEach(course =>{
            course.numEnrolled = course.enrolled.length
            this.courses.push(course)
          })
          this.isLoading = false
        })
        .catch((error) => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });

    },
    getTerms() {
      this.terms = [];
      const URL = helper.baseURL + "/terms/";
      axios
        .get(URL)
        .then(response => {
          this.terms = response.data;
          this.terms = this.terms.map(term => ({
            ...term,
            display: term.name + " " + term.year
          }));
          this.terms.forEach(periodo =>{
            if(periodo.flagCurrent)
            {
                this.term = periodo;
                this.selectedTerm = periodo._id;
                this.getCourses(this.selectedTerm);
            }
          })
          
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
    },
    deleteCourse(id) {
      const URL = helper.baseURL + "/classes/" + id +"?term="+this.selectedTerm;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");

      axios
        .delete(URL)
        .then(() => {
          this.$swal("Eliminado", "Clase eliminada", "success");
          this.getCourses(this.selectedTerm);
        })
        .catch(() => {
          this.$swal("Error", "No se pudo eliminar", "error");
        });
    },
    downloadXls(){      
      excelConversiones.jsonToExcel(this.courses,"Lista de clases")
    },
    uploadXls(){      
      this.uploadDialog = true;
    },
    closeUpload(){
      this.uploadDialog = false;
    },    
    updateCourse(id, course) {
      const URL = helper.baseURL + "/classes/" + id;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");

      axios
        .put(URL, course)
        .then(() => {
          this.$swal("Guardado", "Clase actualizada", "success");
          this.getCourses(this.selectedTerm);
        })
        .catch(() => {
          this.$swal("Error", "No se modifico", "error");
        });
    },
    seeCourseDetail(item){
      var route = '/courseDetail/';
      route = route.concat(item._id)
      this.$router.push(route);

    },
    submitFile(){
      
      this.excelSubmissionIsLoading = true
      this.excelButtonText= "Cargando"
      this.excelButtonStyle = "background-color:#808080; color:#D3D3D3; border:rounded; padding: 5px 5px; text-align: center;  display: inline-block;"
      const file =document.getElementById("file").files[0]
      excelConversiones.excelToJson(file).then((cursosCargados)=>
      {
        this.uploadDialog = false;
        cursosCargados.forEach((Curso)=>{
          this.postNewCourse(Curso)
        })
          this.excelSubmissionIsLoading = false
          this.excelButtonText= "Subir"
          this.excelButtonStyle = this.activeButtonStyle        
      }).catch((error)=>{
        this.$swal("Error",error,"error")
        this.excelButtonText= "Subir"
          this.excelButtonStyle = this.activeButtonStyle
          this.excelSubmissionIsLoading = false
      })
    }
  }
};
</script>


<style>
</style>
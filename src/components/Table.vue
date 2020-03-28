<template>
  <div>
    <v-data-table ref="table" :headers="headers" :items="terms" sort-by="name" class="elevation-1">
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Periodos registrados</v-toolbar-title>
          <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark class="mb-2" v-on="on">Crear período</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>

              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="6">
                        <v-select
                          v-model="editedItem.name"
                          :items="['Verano', 'Invierno', 'Agosto-Diciembre', 'Febrero-Junio']"
                          :rules="[v => !!v || 'Name is required']"
                          label="Mes"
                          required
                        ></v-select>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="editedItem.year"
                          :rules="yearRules"
                          label="Año"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.startInscriptions"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.startInscriptions"
                              required
                              :rules="startRules"
                              label="Inicio inscripciones"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.startInscriptions"
                            no-title
                            scrollable
                            locale="es"
                            @change="errored=false"
                          >
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="menu= false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu.save(editedItem.startInscriptions),dateRange(
                                editedItem.startInscriptions,
                                editedItem.closeInscriptions)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <p class="pl-8">Desde las 12:00 AM</p>
                      </v-col>
                      
                      <v-col cols="6">
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :return-value.sync="editedItem.closeInscriptions"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="editedItem.closeInscriptions"
                              required
                              :rules="endRules"
                              label="Cierre inscripciones"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="editedItem.closeInscriptions"
                            no-title
                            scrollable
                            locale="es"
                            @change="errored=false"
                          >
                            <div class="flex-grow-1"></div>
                            <v-btn text color="primary" @click="menu2= false">Cancel</v-btn>
                            <v-btn
                              text
                              color="primary"
                              @click="$refs.menu2.save(editedItem.closeInscriptions),dateRange(
                                editedItem.startInscriptions,
                                editedItem.closeInscriptions)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                        <p class="pl-8">Hasta las 11:59 PM</p>
                      </v-col>
                      <v-col>
                      <span
                        class="red--text"
                        v-if="errored"
                        align="center"
                      >La fecha de cierre debe ser después que la de inicio</span>
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
      <template v-slot:item.name="{ item }">
        {{item.name}} 
        <v-chip small class="ma-2" color="green" text-color="white" v-if="item.flagCurrent==true">Activo</v-chip>
      </template>

      <template v-slot:item.startInscriptions="{ item }">
        <td>{{momentDatetime(item.startInscriptions, 'LL')}}</td>
      </template>
      <template v-slot:item.closeInscriptions="{ item }">
        <td>{{momentDatetime(item.closeInscriptions, 'LL')}}</td>
      </template>
      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon medium class="mr-2" color="green" v-if="item.flagCurrent==true">mdi-toggle-switch</v-icon>
            <v-icon medium class="mr-2" v-on="on" @click="confirmSetActive(item)" v-else>mdi-toggle-switch-off</v-icon>
          </template>
          <span>Activar periodo</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="editItem(item)">edit</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="deleteItem(item)" color="red darken-4" :disabled="item.flagCurrent">delete</v-icon>
          </template>
          <span>Borrar</span>
        </v-tooltip>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="getTerms">Reset</v-btn>
      </template>
    </v-data-table>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";

export default {
  data: () => ({
    errored: false,
    dialog: false,
    valid: true,
    menu: false,
    menu2: false,
    yearRules: [
      v => !!v || "Año requerido",
      v => /^\d+$/.test(v) || "Debe ser número",
      v => /\b(20|21)\d{2}\b/.test(v) || "Año de 4 dígitos"
    ],
    startRules: [v => !!v || "Fecha requerida"],
    endRules: [v => !!v || "Fecha requerida"],
    headers: [
      { text: "Nombre de período", align: "left", value: "name" },
      { text: "Año", value: "year" },
      { text: "Inicio inscripciones", value: "startInscriptions" },
      { text: "Cierre inscripciones", value: "closeInscriptions" },
      { text: "", value: "action", sortable: false },
    ],
    terms: [],
    errors: "",
    editedIndex: -1,
    editedItem: {
      name: "",
      year: "",
      startInscriptions: "",
      closeInscriptions: ""
    },
    defaultItem: {
      name: "",
      year: "",
      startInscriptions: "",
      closeInscriptions: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Nuevo" : "Editar";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getTerms();
  },
  methods: {
    momentDatetime(datetime, datetime_format) {
      return this.$moment.utc(datetime).format(datetime_format);
    },
    dateRange(dateA, dateB) {
      if (dateA == "" || dateB == "") {
        return null;
      }
      if (dateB > dateA) {
        return true;
      } else {
        this.errored = true;
        return false;
      }
    },
    confirmSetActive(item){
        this.$swal({
        title: "¿Estas seguro?",
        text: "Esto cambiará al periodo actual como el activo",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, actualizalo.",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.setAsActive(item._id);
        }
      });

    },
    setAsActive(id){
      const URL = helper.baseURL + "/terms/current/"+id;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      axios
        .put(URL)
        .then(()=>{
          this.$swal("Actualizado", "Periodo activo", "success");
          this.getTerms();
        })
        .catch(()=>{
          this.$swal("Error", "No se modifico", "error");
        })
    },
    editItem(item) {
      this.editedIndex = this.terms.indexOf(item);
      const json_item = {
        name: item.name,
        year: parseInt(item.year),
        startInscriptions: this.$moment(item.startInscriptions)
          .toISOString()
          .substr(0, 10),
        closeInscriptions: this.$moment(item.closeInscriptions)
          .toISOString()
          .substr(0, 10)
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
        confirmButtonText: "Sí, eliminar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          this.deleteTerm(item._id);
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
        this.dateRange(
          this.editedItem.startInscriptions,
          this.editedItem.closeInscriptions
        )
      ) {
        this.snackbar = true;
        const json_term = {
          name: this.editedItem.name,
          year: parseInt(this.editedItem.year),
          startInscriptions: this.editedItem.startInscriptions,
          closeInscriptions: this.editedItem.closeInscriptions+"T23:59:59.000Z"
        };
        if (this.editedIndex > -1) {
          //Edit term
          this.updateTerm(this.terms[this.editedIndex]._id, json_term);
        } else {
          //Create new term
          this.postNewTerm(json_term);
        }
        this.close();
      } else {
        this.load_status = "No están todos los campos";
      }
    },
    postNewTerm(term) {
      const URL = helper.baseURL + "/terms";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");

      axios
        .post(URL, term)
        .then(() => {
          //Alert de confirmacion de creacion
          this.$swal("Guardado", "Periodo creado", "success");
          this.getTerms();
        })
        .catch(() => {
          this.$swal("Error", "No se pudo crear", "error");
        });
    },
    getTerms() {
      this.terms = [];
      const URL = helper.baseURL + "/terms";
      axios
        .get(URL)
        .then(response => {
          this.terms = response.data;
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
        });
    },
    deleteTerm(id) {
      const URL = helper.baseURL + "/terms/" + id;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .delete(URL)
        .then(() => {
          this.$swal("Eliminado", "Periodo eliminado", "success");
          this.getTerms();
        })
        .catch(() => {
          this.$swal("Error", "No se pudo eliminar", "error");
        });
    },
    updateTerm(id, term) {
      const URL = helper.baseURL + "/terms/" + id;
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .put(URL, term)
        .then(() => {
          this.$swal("Guardado", "Periodo actualizado", "success");
          this.getTerms();
        })
        .catch(() => {
          this.$swal("Error", "No se modifico", "error");
        });
    }
  }
};
</script>


<style>
</style>
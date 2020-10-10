<template>
  <div>
    <v-data-table
      ref="table"
      :headers="headers"
      :items="users"
      :search="search"

      :loading="isLoading"
      loading-text="Cargando... Favor de esperar"
      :footer-props="{
    'items-per-page-options': [15, 50, 100, 500]
  }"

      :items-per-page="15"
      sort-by="name"
      class="elevation-1"
      item-key="_id"
    >
      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Usuarios Registrados</v-toolbar-title>
          <v-spacer></v-spacer>

          <v-text-field
            v-model="search"
            append-icon="search"
            label="Buscar"
            single-line
            hide-details
          ></v-text-field>

          <v-dialog v-model="dialog" max-width="500px">
            <v-card>
              <v-card-title>
                <span class="headline">{{formTitle}}</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.name"
                          :rules="[v => !!v || 'Nombre obligatorio']"
                          label="Nombre"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.surname"
                          :rules="[v => !!v || 'Apellido obligatorio']"
                          label="Apellido"
                          required
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="12" md="6">
                        <v-text-field v-model="editedItem.nomina" label="Nómina" disabled></v-text-field>
                      </v-col>
                      <v-col cols="12" md="6">
                        <v-text-field
                          v-model="editedItem.email"
                          label="Correo electrónico"
                          disabled
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-text-field
                          v-model="editedItem.departamento"
                          label="Departamento"
                          required
                          :rules="[v => !!v || 'Departamento obligatorio']"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" md="12">
                        <v-select
                          :items="rectoriasLista"
                          label="-Selecciona Rectoría-"
                          v-model="editedItem.rectoria"
                          required
                          :rules="[v => !!v || 'Rectoría obligatoria']"
                        ></v-select>
                      </v-col>
                      <template v-if="editedItem.rectoria === 'Otro'">
                        <v-col cols="12" md="12">
                          <v-text-field
                            v-model="editedItem.otraRectoria"
                            label="Otra Rectoría"
                            required
                          ></v-text-field>
                        </v-col>
                      </template>
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
            <v-icon Medium class="mr-2" v-on="on" @click="clasesInscritas(item)">mdi-clipboard-check</v-icon>
          </template>
          <span>Clases inscritas</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon Medium class="mr-2" v-on="on" @click="historialMedico(item)">mdi-clipboard-pulse</v-icon>
          </template>
          <span>Historial Médico</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="editItem(item)">edit</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" v-on="on" @click="deleteUser(item)">delete</v-icon>
          </template>
          <span>Delete</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay</v-btn>
      </template>
    </v-data-table>
    <v-container fluid my-2>
      <h2 align="center" class="display-1">Lista de Alumnos en Periodo Actual</h2>
        <v-col align="center" cols="12">
          <v-btn color="secondary">
            <download-excel :data="usersInPeriod" :fields="users_fields" name="UsuariosPeriodo.xls">Descargar Lista</download-excel>
          </v-btn>
        </v-col>
    </v-container>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";

export default {
  data: () => ({
    isLoading: true,
    errored: false,
    dialog: false,
    valid: true,
    menuStartTime: false,
    menuEndTime: false,
    quotaRules: [
      v => !!v || "Cupo is required",
      v => /^\d+$/.test(v) || "Debe ser número"
    ],
    search: "",
    headers: [
      { text: "Nombre", align: "left", value: "name" },
      { text: "Apellido", value: "surname" },
      { text: "Nómina", value: "nomina" },
      { text: "Email", value: "email" },
      { text: "Rectoría", value: "rectoria" },
      { text: "Departamento", value: "departamento" },
      { text: "Inscritas en el periodo", value: "inscritas" },
      { text: "", value: "action", sortable: false }
    ],
    users_fields: {
      Nombre: "name",
      Apellido: "surname",
      Nomina: "nomina",
      Correo: "email",
      Rectoría: "rectoria",
      Departamento: "departamento",
      "Num de clases inscritas en el periodo": "inscritas",
      Clases: "nameClasesInscritas"
    },
    users: [],
    usersInPeriod: [],
    clasesPeriodo: [],
    dictClasesPeriodo: {},
    editedIndex: -1,
    editedItem: {
      id: "",
      name: "",
      surname: "",
      email: "",
      nomina: "",
      rectoria: "",
      departamento: "",
      otraRectoria: "",
      rectoriaToShow: "",
      classes: []
    },
    defaultItem: {
      id: "",
      name: "",
      surname: "",
      email: "",
      nomina: "",
      rectoria: "",
      departamento: "",
      classes: []
    },
    rectoriasLista: [
      "Rectoría Tecnológico Monterrey",
      "Talento y Cultura",
      "Vicepresidencia de Administración y Finanzas",
      "Vicepresidencia del Campus",
      "Vicepresidencia de Relaciones y Desarrollo",
      "Vicepresidencia Región Norte",
      "Vicepresidencia de Transformación, Mercadotecnia y Sorteos",
      "Vicepresidencia de Comunicación e Imagen Instutucional",
      "EGADE",
      "NIC",
      "Programas en línea",
      "Tec Salud",
      "Tecmilenio",
      "Otro"
    ],
    userAccount: {
      id: "",
      email: "",
      name: "",
      surname: "",
      department: "",
      rectoria: "",
      otraRectoria: "",
      nomina: ""
    }
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Crear" : "Editar Usuario";
    }
  },
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
    this.getClasesPeriodo();
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

      this.editedIndex = this.users.indexOf(item);

      var rectoriaToShow;
      var otraRectoriaToShow = "";

      if (this.rectoriasLista.includes(item.rectoria)) {
        rectoriaToShow = item.rectoria;
      } else if (item.rectoria) {
        rectoriaToShow = "Otro";
        otraRectoriaToShow = item.rectoria;
      }

      const json_item = {
        id: item._id,
        name: item.name,
        surname: item.surname,
        nomina: item.nomina,
        email: item.email,
        courses: item.classes,
        rectoria: rectoriaToShow,
        departamento: item.departamento,
        otraRectoria: otraRectoriaToShow
      };
      this.editedItem = Object.assign({}, json_item);
      this.dialog = true;
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
      if (this.$refs.form.validate()) {
        //const token = this.$route.query.token;

        var rectoriaToUpload;

        if (this.editedItem.rectoria === "Otro") {
          rectoriaToUpload = this.editedItem.otraRectoria;
        } else {
          rectoriaToUpload = this.editedItem.rectoria;
        }

        const json_user = {
          name: this.editedItem.name,
          surname: this.editedItem.surname,
          rectoria: rectoriaToUpload,
          departamento: this.editedItem.departamento
        };

        const URL = helper.baseURL + "/admin/users/" + this.editedItem.id;
        axios.defaults.headers.common["Authorization"] =
          "Bearer " + localStorage.getItem("token");

        axios
          .put(URL, json_user)
          .then(response => {
            this.$swal(
              "Información Guardada",
              "Se ha actualizado tu Información",
              "success"
            ).then(_ => {
              this.getUsers();
              this.close();
            });
          })
          .catch(error => {
            this.$swal("Error", error.response.data.error, "error");
          });
      }
    },
    getUsers() {
      this.users = [];
      const URL = helper.baseURL + "/users/";
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      axios
        .get(URL)
        .then(response => {
          response.data.forEach(user => {
            user.inscritas = "-";
            user.nameClasesInscritas = [];
            //No se desplegará en la lista de usuario a sí mismo (Tu propia cuenta no aparecerá para que no puedas borrarla por error)
            if (user.email != "pbi.mty.servicios@gmail.com")
              this.users.push(user);
          });

          this.cargarInscritasEnPeriodo();
        })
        .catch(Error => {
          this.$swal("Error", Error.response.data.error, "error");
        });
    },
    getClasesPeriodo() {
      const URL = helper.baseURL + "/terms/current";
      axios
        .get(URL)
        .then(response => {

          var coursesIDs = response.data.classes;
          coursesIDs.forEach(clase => {
            this.nombresClasesPeriodo(clase);
          });
          this.clasesPeriodo = coursesIDs;
          this.getUsers();
        })
        .catch(Error => {
          this.$swal("Error", Error.response.data.error, "error");
        });
    },
    nombresClasesPeriodo(courseID) {
      const URL = helper.baseURL + "/classes/" + courseID;
      axios
        .get(URL)
        .then(response => {
          this.dictClasesPeriodo[courseID] = response.data.name;
        })
        .catch(Error => {
          this.$swal("Error", Error.response.data.error, "error");
        });
    },
    cargarInscritasEnPeriodo() {
      this.users.forEach(user => {
        var classCounter = 0;
        user.classes.forEach(clase => {
          if (this.clasesPeriodo.includes(clase)) {
            classCounter += 1;
            user.nameClasesInscritas.push(this.dictClasesPeriodo[clase]);
          }
        });
        user.inscritas = classCounter + " clase(s)";
        if(classCounter>0){
          this.usersInPeriod.push(user)
        }
        this.isLoading = false
      });
    },
    historialMedico(item) {
      var route = "/admin/medicalrecord/";
      route = route.concat(item._id);
      this.$router.push(route);
    },
    clasesInscritas(item) {
      var route = "/userdetails/";
      route = route.concat(item._id);
      this.$router.push(route);
    },
    deleteUser(item) {
      this.$swal({
        title: "¿Estas seguro?",
        text: "No se puede recuperar una vez eliminado",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Eliminar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          const URL = helper.baseURL + "/users/" + item._id;
          axios.defaults.headers.common["Authorization"] =
            "Bearer " + localStorage.getItem("token");
          axios
            .delete(URL)
            .then(() => {
              this.$swal("Eliminado", "Usuario eliminado", "success");
              this.getUsers();
            })
            .catch(() => {
              this.$swal("Error", "No se pudo eliminar", "error");
            });
        }
      });
    }
  }
};
</script>


<style>
</style>
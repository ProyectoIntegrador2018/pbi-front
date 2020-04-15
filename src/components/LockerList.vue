<template>
  <div>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col align="center" cols="6">
          <v-select
            ref="miperiodo"
            v-model="currentDresser"
            :items="dressers"
            item-text="display"
            item-value="_id"
            label="Vestidor"
            @change="getLockers"            
          ></v-select>
        </v-col>
      </v-row>
    </v-container>

    <v-data-table
      ref="table"
      :headers="headers"
      :items="lockers"
      :search="searchPages"
      sort-by="number"
      class="elevation-1"
      :footer-props="{
     'items-per-page-options': [200, 500]
      }"
      
    >

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Casilleros</v-toolbar-title>
          <v-spacer></v-spacer>
                     <v-text-field
              v-model="searchPages"
              append-icon="search"
              label="Buscar colaborador"
              single-line
              hide-details
            ></v-text-field>
          <v-spacer></v-spacer> 
          
          <v-tooltip>
            <template v-slot:activator="{ on }">    
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="sendToLockerOffer">Modificar oferta de Casilleros</v-btn>
            </template> 
          </v-tooltip>  
          
          <v-spacer></v-spacer> 

          <v-dialog v-model="dialog" max-width="500px">         
            <v-card>
              <v-card-title>
                <span class="headline">Editar Casillero</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedLocker.nomina"
                          label="Nómina"
                          required
                        ></v-text-field>
                      </v-col>
                       <v-col cols="12">
                        <v-text-field 
                          v-model="editedLocker.status" 
                          label="Estatus" 
                          required
                          ></v-text-field>
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
            <v-icon small class="mr-2" v-on="on" @click="editItem(item)">edit</v-icon>
          </template>
          <span>Editar</span>
        </v-tooltip>
        
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay casilleros</v-btn>
      </template>
    </v-data-table>

     <v-container fluid my-5 px-md-12>
        <h2 align="center" class="display-1">Descargar Lista Casilleros</h2>
        <v-row>
            <v-col align="center" cols="12">
                <v-btn color="secondary">
                    <download-excel
                        :data="lockers"
                        :fields="json_fields"
                        :name= " 'AsignacionCasilleros' + this.currentDresser + '.xls'"
                    >Descargar Lista Casilleros
                    </download-excel>
                </v-btn>
            </v-col>
        </v-row>
      </v-container>

  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";


export default {
  data: () => ({
    searchPages: "",
    headers: [
      { text: "Número", align: "left", value: "number", width: "10%"},
      { text: "Nómina", value: "nomina",width: "15%"},
      { text: "Nombre", value: "name", width: "35%"},
      { text: "Correo", value: "email", width: "15%" },
      { text: "Estatus", value: "status", width: "15%" },
      { text: "Actions", value: "action", sortable: false, width: "10%" }
    ],
    json_fields: {
      Numero: "number",
      Nomina: "nomina",
      Nombre: "name",
      Correo:"email",
      Estatus: "status"
    },
    editedLocker: {
      number: "",
      name: "",
      nomina: "",
      email: "",
      status: ""
    },
    defaultItem: {
      number: "",
      name: "",
      nomina: "",
      email: "",
      status: ""
    },
    valid: true,
    dialog: false,
    editedIndex: -1,
    lockers: [],
    currentDresser: "Hombres",
    dressers: ['Hombres','Mujeres']

  }),
  watch: {
    dialog(val) {
      val || this.close();
    }
  },
  created() {
      this.getLockers();
  },
  
  mounted() {},
  methods: {
    sendToLockerOffer(){
      var route = "/lockeroffer/";
      window.open(route, "_self");
    },
    editItem(item) {
      this.editedIndex = this.lockers.indexOf(item);

      const json_item = {
        number: item.number,
        nomina: item.nomina,
        name: item.name,
        email:item.email,
        status: item.status
      };
      this.editedLocker = Object.assign({}, json_item);
      this.dialog = true;
    },
    close() {
      this.valid = true;
      this.dialog = false;
      this.editedLocker = Object.assign({}, this.defaultItem);
      this.editedIndex = -1;
      this.$refs.form.resetValidation();
    },
    submit() {      
      this.snackbar = true;
        const json_term = {
            number: this.editedLocker.number,
            name: this.editedLocker.name,
            nomina: this.editedLocker.nomina,
            email: this.editedLocker.email,
            status: this.editedLocker.status
        };
      if (this.editedIndex > -1) {
          this.updateLocker(this.lockers[this.editedIndex]._id, json_term);
        this.close();
      } else {
        this.load_status = "No están todos los campos";
      }
    }, 
    updateLocker(id, locker) {
    },
    getLockers(){
        this.lockers = []
        const URL = helper.baseURL + "/lockers/";
        axios
            .get(URL)
            .then(response => {
                response.data.forEach(element =>{
                    if(element.dresser == this.currentDresser)
                    {
                        element.lockers.forEach(locker =>{
                            var lockerInfo = {
                                number: locker.number,
                                nomina: "-",
                                name: "-",
                                email: "-",
                                userId: "",
                                status: locker.status
                            }
                            if(locker.status == "Asignado")
                            {
                                axios.defaults.headers.common["Authorization"] =
                                    "Bearer " + localStorage.getItem("token");
                                const URL = helper.baseURL + "/users/" + locker.assignee;
                                axios
                                    .get(URL)
                                    .then(response => {
                                        lockerInfo.name = response.data.name + " " + response.data.surename,
                                        lockerInfo.nomina = response.data.nomina,
                                        lockerInfo.email = response.data.email
                                        lockerInfo.userId = response.data._id
                                        this.lockers.push(lockerInfo);
                                    })
                                    .catch(error => {
                                    this.$swal("Error", error.response.data.error, "error");
                                    });                                
                            }
                            else{
                                this.lockers.push(lockerInfo);

                            }
                            
                        })
                    }
                })
            })

    }
    
    }
  }
</script>


<style>
</style>
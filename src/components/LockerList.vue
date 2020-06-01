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
      :loading="isLoading"
      loading-text="Cargando... Favor de esperar"
      :footer-props="{
     'items-per-page-options': [200, 500]
      }"      
    >

      <template v-slot:top>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de Lockers</v-toolbar-title>
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
              <v-btn color="primary" dark class="mb-2" v-on="on" @click="sendToLockerOffer">Modificar oferta de Lockers</v-btn>
            </template>             
          </v-tooltip>  
          <v-spacer></v-spacer>
          <v-tooltip>
            <template v-slot:activator="{ on }">    
              <v-btn 
              color="red darken-4" 
              dark class="mb-2" v-on="on"               
              @click="emptyAllLockers">
                <v-icon color="white">mdi-eraser-variant</v-icon>
                Vaciar Lockers
              </v-btn>
            </template>             
          </v-tooltip>  
          
          <v-spacer></v-spacer> 

          <v-dialog v-model="dialog" max-width="500px">         
            <v-card>
              <v-card-title>
                <span class="headline">Editar Locker</span>
              </v-card-title>
              <v-card-text>
                <v-form ref="form" v-model="valid" lazy-validation>
                  <v-container>
                    <v-row>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editedLocker.nomina"
                          label="Nómina (L0 o L00)"
                          @change="validateNomina"
                          :errorMessages="errorMsg.nomina"
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
                <v-btn :disabled="!valid || !editedLocker.nomina" color="blue darken-1" text @click="submit()">Guardar</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>

        </v-toolbar>
      </template>
      <template v-slot:item.number="{ item }">
        {{item.number}}
        <v-chip
          small
          class="ma-2"
          color="red darken-4"
          text-color="white"
          v-if="item.status==='Deshabilitado'"
        >Deshabilitado</v-chip>
      </template>

      <template v-slot:item.action="{ item }">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              medium
              class="mr-2"
              v-on="on" 
              color="green"
              v-if="item.status!='Deshabilitado'"
              @click="disableLocker(item)">
              mdi-toggle-switch
            </v-icon>
            <v-icon
              medium
              v-on="on" 
              class="mr-2"
              color="red darken-4"
              @click="enableLocker(item)"
              v-else
            >mdi-toggle-switch-off</v-icon>
          </template>
          <span>Habilitar/Deshabilitar Locker</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon small class="mr-2" 
              v-on="on" 
              @click="editItem(item)"
              :disabled="item.status!='Disponible'">
              edit
            </v-icon>
          </template>
          <span>Asignar</span>
        </v-tooltip>
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon
              small
              class="mr-2"
              v-on="on"
              @click="emptyLocker(item)"
              color="red darken-4"
              :disabled="item.status!='Asignado'"
            >mdi-eraser-variant</v-icon>
          </template>
          <span>Vaciar</span>
        </v-tooltip>
      </template>

      <template v-slot:no-data>
        <v-btn color="primary" :disabled="true">No hay Lockers</v-btn>
      </template>
    </v-data-table>

     <v-container fluid my-5 px-md-12>
        <h2 align="center" class="display-1">Descargar Lista Lockers</h2>
        <v-row>
            <v-col align="center" cols="12">
                <v-btn color="secondary">
                    <download-excel
                        :data="lockers"
                        :fields="json_fields"
                        :name= " 'AsignacionLockers' + this.currentDresser + '.xls'"
                    >Descargar Lista Lockers
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
axios.defaults.headers.common["Authorization"] = "Bearer " + localStorage.getItem("token");


export default {
  data: () => ({
    searchPages: "",
    headers: [
      { text: "Número", align: "left", value: "number", width: "13%"},
      { text: "Nómina", value: "nomina",width: "12%"},
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
    editedLocker:{
      id: "",
      nomina: ""
    },
    errorMsg:{
      nomina: ""
    },
    valid: true,
    dialog: false,
    editedIndex: -1,
    lockers: [],
    currentDresser: "Hombres",
    currentDresserId: "",
    dressers: ['Hombres','Mujeres'],
    isLoading: true

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
    emptyAllLockers(){
      this.$swal({
        title: "¿Vaciar todos los Lockers?",
        text: "Se borrarán todos los lockers del vestidor de "+this.currentDresser+". Esta acción no se puede revertir.",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar todos",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          const URL = helper.baseURL + "/lockers/empty/"+this.currentDresserId;
          axios
            .put(URL)
            .then(response => {       
              this.$swal("Lockers vaciados", "Se han vaciado todos los lockers del vestidor de "+this.currentDresser, "success").
              then(()=>{this.getLockers()})              
            })
            .catch(error => {
              this.$swal("Error", error.response.data.error, "error");
            });
        }
      });
    },
    emptyLocker(item){
      this.$swal({
        title: "¿Vaciar Locker "+item.number+"?",
        text: "No se puede recuperar una vez eliminado, "+item.name+" perderá su Locker",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, vaciar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          const URL = helper.baseURL + "/lockers/status/"+item._id;
          axios
            .put(URL)
            .then(response => {       
              this.$swal("Locker vaciado", "Se ha eliminado el locker", "success").
              then(()=>{this.getLockers()})              
            })
            .catch(error => {
              this.$swal("Error", error.response.data.error, "error");
            });
        }
      });
    },
    disableLocker(item){
      this.$swal({
        title: "¿Deshabilitar Locker "+item.number+"?",
        text: "Un Locker Deshabilitado no puede ser asignado a un colaborador",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Deshabilitar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        if (result.value) {
          if(item.status==="Asignado"){          
            const URL = helper.baseURL + "/lockers/status/"+item._id;
            axios
              .put(URL)
              .then(response => {       
                const URL = helper.baseURL + "/lockers/status/"+item._id;
                axios
                  .put(URL)
                  .then(response => { 
                    this.$swal("Locker Deshabilitado", "Se ha vaciado y deshabilitado el locker", "success").
                    then(()=>{this.getLockers()}) 
                })
                .catch(error => {
                  this.$swal("Error", error.response.data.error, "error");
                });
              })
              .catch(error => {
                this.$swal("Error", error.response.data.error, "error");
              });
          }
          else if(item.status === "Disponible"){
            const URL = helper.baseURL + "/lockers/status/"+item._id;
            axios
              .put(URL)
              .then(response => {    
                this.$swal("Locker Deshabilitado", "Se ha deshabilitado el locker", "success").
                then(()=>{this.getLockers()})
              })
              .catch(error => {
                this.$swal("Error", error.response.data.error, "error");
              });
          }
        }
      });

    },
    enableLocker(item){
      this.$swal({
        title: "¿Habilitar Locker "+item.number+"?",
        text: "Un Locker habilitado podrá ser asignado a un locker",
        type: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Sí, Habilitar",
        cancelButtonText: "Cancelar"
      }).then(result => {
        const URL = helper.baseURL + "/lockers/status/"+item._id;
        axios
          .put(URL)
          .then(response => { 
            this.$swal("Locker Habilitado", "Se ha habilitado el locker", "success").
            then(()=>{this.getLockers()}) 
        })
        .catch(error => {
          this.$swal("Error", error.response.data.error, "error");
        });
      });
    },
    editItem(item) {
      this.editedLocker.id = item._id;
      this.dialog = true;
    },
    validNomina(nomina) {
      if(nomina.length != 9)
      {
        return false
      }
      var re = /^((N|L|A|n|l|a)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/;
      return re.test(nomina);
    },
    validateNomina() {
      this.editedLocker.nomina = this.editedLocker.nomina.toUpperCase();
      if (!this.editedLocker.nomina) {
        this.errorMsg.nomina = "Campo requerido";
      } else if (!this.validNomina(this.editedLocker.nomina)) {
        this.errorMsg.nomina = "Nómina inválida (LXXXXXXXXX, NXXXXXXXX)";
      } else {
        this.errorMsg.nomina = "";
      }
    },
    close() {
      this.valid = true;
      this.dialog = false;
      this.editedLocker = Object.assign({}, this.defaultLocker);
      this.editedIndex = -1;
      this.$refs.form.resetValidation();      
    },
    submit() {   
      this.snackbar = true;
      this.updateLocker(this.editedLocker.nomina, this.editedLocker.id)
      this.close();     
    },    

    updateLocker(newNomina, lockerId) {
      const URL = helper.baseURL + "/lockers/assign/admin/"+lockerId;
        axios
          .put(URL,{id:newNomina})
          .then(response => {
              this.$swal("Locker Asignado", "Se ha asigando el Locker # a "+newNomina, "success")
              .then(()=>{this.getLockers()});              
         }).catch(error => {
          this.$swal("Error", error.response.data.error, "error");
          });      
    },
    getLockers(){
        this.isLoading = true
        this.lockers = []
        const URL = helper.baseURL + "/lockers/";
        axios
            .get(URL)
            .then(response => {              
                response.data.forEach(element =>{
                    if(element.dresser == this.currentDresser)
                    {
                      this.currentDresserId = element._id
                        element.lockers.forEach(locker =>{
                            var lockerInfo = {
                                number: locker.number,
                                nomina: "",
                                name: "",
                                email: "",
                                userId: "",
                                status: locker.status,
                                _id:locker._id
                            }
                            if(locker.status == "Asignado")
                            {                               
                                const URL = helper.baseURL + "/users/" + locker.assignee;
                                axios
                                    .get(URL)
                                    .then(response => {

                                        lockerInfo.name = response.data.name + " " + response.data.surname,
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
                this.isLoading=false;
            })

    }
    
    }
  }
</script>


<style>
</style>
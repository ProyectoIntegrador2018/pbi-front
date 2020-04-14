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
      class="elevation-1":footer-props="{
     'items-per-page-options': [100, 500]
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
      { text: "Número", align: "left", value: "number" },
      { text: "Nómina", value: "userId"},
      { text: "Nombre", value: "name"},
      { text: "Correo", value: "email" },
      { text: "Estatus", value: "status" },
      { text: "Actions", value: "action", sortable: false }
    ],
    json_fields: {
      Numero: "number",
      Nomina: "userId",
      Nombre: "name",
      Correo:"email",
      Estatus: "status"
    },
    lockers: [],
    currentDresser: "Hombres",
    dressers: ['Hombres','Mujeres']

  }),
  created() {
      this.getLockers();
  },
  mounted() {},
  methods: {
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
                                userId: "-",
                                name: "-",
                                email: "-",
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
                                        lockerInfo.userId = response.data.nomina,
                                        lockerInfo.email = response.data.email
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
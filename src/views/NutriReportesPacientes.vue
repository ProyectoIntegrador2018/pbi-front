<template>
    <div>
        <nutriheader title="Pacientes" secondRoute="/nutricion/pacientes/"></nutriheader>
         <v-container fluid my-5 px-md-12>
          <v-container fluid>
          <v-row align="center" justify="center">
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-row align="center" justify="center">
                      <v-col align="center" cols="6">
                        <v-menu
                          ref="menu"
                          v-model="menu"
                          :close-on-content-click="false"
                          :return-value.sync="fechaA"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="fechaA"
                              required
                              label="Fecha Inicial"
                              :rules="fechaRules"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fechaA"
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
                              @click="$refs.menu.save(fechaA),dateRange(
                                fechaA,
                                fechaB)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>

                      <v-col align="center" cols="6">
                        <v-menu
                          ref="menu2"
                          v-model="menu2"
                          :close-on-content-click="false"
                          :return-value.sync="fechaB"
                          transition="scale-transition"
                          offset-y
                          min-width="290px"
                        >
                          <template v-slot:activator="{ on }">
                            <v-text-field
                              v-model="fechaB"
                              required
                              label="Fecha Final"
                              :rules="fechaRules"
                              prepend-icon="event"
                              readonly
                              v-on="on"
                            ></v-text-field>
                          </template>
                          <v-date-picker
                            v-model="fechaB"
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
                              @click="$refs.menu2.save(fechaB),dateRange(
                                fechaA,
                                fechaB)"
                            >OK</v-btn>
                          </v-date-picker>
                        </v-menu>
                      </v-col>
                </v-row>
                <v-row align="center" justify="center">
                    <v-col align="center">
                        <span
                          class="red--text"
                          v-if="errored"
                          align="center"
                        >La fecha de cierre debe ser después que la de inicio</span>
                      </v-col>
                </v-row>
               <v-row align="center" justify="center">

                    <v-col align="center" cols="12">
                        <v-btn :disabled="!valid" color="blue darken-1" text @click="getAppointments()">Obtener reporte</v-btn>
                    </v-col>
                </v-row>
            </v-form>
          </v-row>   
          </v-container>    
          <v-container v-if="showTable">
            <v-data-table 
              ref="table" 
              :headers="headers" 
              :items="appointments" 
              sort-by="name" 
              class="elevation-1"
              :loading="isLoading"
              :search="search"
              loading-text="Cargando... Favor de esperar"
            >
              <template v-slot:item.date="{ item }">
                <td>{{momentDatetime(item.date, 'LL')}}</td>
              </template>
              <template #item.matricula="{item}">{{item.record.matricula}}</template>
              <template #item.full_name="{item}">{{item.record.name}}  {{item.record.surname}}</template>
              <template #item.nutriinfo="{item}">{{item.nutritionist.name}}</template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar Matrícula/Nómina"
                      single-line
                      hide-details
                    ></v-text-field>
                </v-toolbar>
              </template>
            </v-data-table>
          </v-container>
      </v-container>
      <v-container fluid my-2>
      <h2 align="center" class="display-1">Descargar reporte</h2>
        <v-col align="center" cols="12">
          <v-btn color="secondary">
            <download-excel :data="appointments" :fields="reporte_fields" name="ReportePacientes.xls">Descargar</download-excel>
          </v-btn>
        </v-col>
    </v-container>
    </div>
</template>

<script>
import nutriheader from "../components/nutriheader.vue";
import axios from "axios";
const helper = require("../helper.js");

export default {
    components: {
    nutriheader
  },
  data: () => ({
      search:"",
      showTable: false,
      valid: false,
      isLoading: true,
      appointments: [],
      errored: false,
      fechaA: "",
      fechaB: "",
      menu: false,
      menu2: false,
      fechaRules: [v => !!v || "Fecha requerida"],
      headers: [
          { text: "Fecha", value: "date"},
          { text: "Matrícula/Nómina", value: "matricula"},
          { text: "Nombre", value: "full_name"},
          { text: "Altura", value: "height"},
          { text: "Peso", value: "weight"},
          { text: "Nutriólog@", value: "nutriinfo"}
      ],
      reporte_fields: {
        Fecha: "date",
        Matrícula_Nómina: "record.matricula",
        Nombre: "record.name",
        Apellido: "record.surname",
        Altura: "height",
        Peso: "weight",
        Nutricion: "nutritionist.name"
      }
  }),
  methods: {
      momentDatetime(datetime, datetime_format) {
        return this.$moment.utc(datetime).format(datetime_format);
      },
      getAppointments(){
        if(this.$refs.form.validate() && this.dateRange(this.fechaA,this.fechaB))
        {
            this.showTable = true
            
                this.appointments = []
                axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
                const URL = helper.baseURL  + '/nutricion/appointments/span'
                var dates = {
                  startDate: this.fechaA,
                  endDate: this.fechaB
                }
                console.log(dates)
                axios
                .put(URL,dates)
                .then((response)=> {
                    this.appointments = response.data
                    console.log(response.data)
                    this.isLoading = false
                }).catch((error)=>{
                    this.$swal("Error",error.response.data.error.message,"error")
                })
            
        }else{
            this.$swal("Faltan fechas", "Revisa las fechas", "error");
        }
      },
      dateRange(dateA, dateB, error) {
      if (dateA == "" || dateB == "") {
        return null;
      }
      if (dateB > dateA) {
        return true;
      }else {
          this.errored = true
          return false
      }
    },
  }
}
</script>
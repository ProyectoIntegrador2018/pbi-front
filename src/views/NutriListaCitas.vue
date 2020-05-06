 <template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1 class="display-2 font-weight-bold" align="center">Seguimiento del paciente: {{patient.name}} {{patient.surname}}</h1>
        </v-row>
      </v-container>
      
      <v-container fluid my-5 px-md-12>
        <div justify="left" align="left">
          <v-col cols="2" class="px-0">
              <v-btn large block class="px-0" href="/nutricion/pacientes">
                <v-icon align="center" medium >mdi-arrow-left</v-icon>
                Regresar
              </v-btn>
          </v-col>
        </div>
          <div>
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
              
              <template #item.full_name="{item}">{{item.name}}  {{item.surname}}</template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Citas</v-toolbar-title>
                  <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                  <v-spacer></v-spacer>
                  <!-- <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar Matrícula/Nómina"
                    single-line
                    hide-details
                  ></v-text-field> -->
                  <v-spacer></v-spacer>
                  <v-btn class="blue  darken-3 white--text"   @click="createAppoint()">Nueva cita</v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.record="{ item }">
                <!-- <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">  
                      <v-icon small @click="showReport(item)">search</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver/Editar Expediente</span>
                </v-tooltip> -->
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon small @click="deleteItem(item)">delete</v-icon></v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar Cita</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const helper = require("../helper.js");

import axios from "axios";

export default {
  name: "UserClasses",
  data(){
    return{
      patient:"",
      search:"",
      isLoading: true,
      Periodo: "",
      periodID: "",
      show: true,
      appointments : [],
      headers: [
        { text: "Fecha", value:""},
        { text: "Peso", value: "weight" },
        { text: "Altura", value: "height" },
        { text: "IMC", aign: "left", value: "IMC"},
        { text: "Masa Muscular", align: "left", value: "muscleMass"},
        { text: "Masa de Grasa", align: "left", value: "fatMass"},
        { text: "Agua corporal", value:"totalWater"},
        { text: "Acciones", align: "center", value: "record"}
      ],
    }
  },
  components: {
    
  },
  methods: {
    createAppoint(){
      window.open("/nutricion/"+this.$route.params.id+"/cita")
    },
    deleteItem(item){
      this.$swal({
        title:"Eliminar cita",
        text:"¿Seguro que quieres eliminar esta cita " + ""+"?",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Dar de baja",
        confirmButtonColor: "red",
        cancelButtonColor: "blue"}).then((result)=>{
          if(result.value){
            axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
            const URL = helper.baseURL + "/nutricion/records/"+item._id ;
            axios
            .delete(URL)
            .then(()=>{
              this.$swal("Expediente eliminado","","success")
              this.getItems()
            })
            .catch((error)=>{
              this.$swal("Error",error.Response.data.error,"error")
            })
          }
        })
    },
    getPatient(){
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      const URL = helper.baseURL + "/nutricion/records/"+this.$route.params.id;
      axios
      .get(URL)
      .then((response)=>{
        this.patient = response.data
        this.getItems();
      }).cancelButtonText((error)=>{
        this.$swal("Error",error.response.data.error,"error")
      })
    },
    getItems(){
      this.clases = []
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      const URL = helper.baseURL + "/nutricion/appointments/"+this.$route.params.id;
      
      axios
      .get(URL)
      .then((Response)=>{   
        this.appointments = Response.data
        this.isLoading = false
      })
      .catch((error)=>{
        this.$swal("Error",error.response.data.error,"error")
      })
      
    },
    getStatusFlag(){
      const URL = helper.baseURL + "/terms/status/"+ this.periodID;
      axios
        .get(URL)
        .then(response => {
          this.show = !response.data.status
          console.log(this.show)
          console.log(response.data.status);
          
        })
        .catch(() => {
          this.$swal("Error", "No se pudo cargar periodo", "error");
        });
    }
  },
  created(){
    this.getPatient();
    
  }
  
};
</script>
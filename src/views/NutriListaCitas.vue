 <template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1 class="display-2 font-weight-bold" align="center">Seguimiento del paciente: {{patient.name}} {{patient.surname}}</h1>
        </v-row>
      </v-container>
      <nutriheader title="" secondRoute="/nutricion/pacientes"></nutriheader>
      
      <v-container fluid my-5 px-md-12>
          <div>
            <v-data-table 
              ref="table" 
              :headers="headers" 
              :items="appointments" 
              sort-by="date" 
              sort-desc="true"
              class="elevation-1"
              :loading="isLoading"
              :search="search"
              loading-text="Cargando... Favor de esperar"
            >
              <template #item.formatDate="{item}">{{momentDatetime(item.date,"LL")}}</template>
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
              <template v-slot:item.weight="{ item }">
               {{item.weight}} kg
              </template>
              <template v-slot:item.height="{ item }">
               {{item.height}} mts
              </template>
              <template v-slot:item.muscleMass="{ item }">
               {{item.muscleMass}} Kg
              </template>
              <template v-slot:item.fatMass="{ item }">
               {{item.fatMass}} Kg
              </template>
              <template v-slot:item.muscleMass="{ item }">
               {{item.muscleMass}} Kg
              </template>
              <template v-slot:item.totalWater="{ item }">
               {{item.totalWater}} Lt
              </template>
              <template v-slot:item.fatMassPct="{ item }">
               {{item.fatMassPct}}%
              </template>
              <template v-slot:item.record="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">  
                      <v-icon small @click="verCita(item)">search</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver/Editar Cita</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon small @click="deleteItem(item)">delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar Cita</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>
      </v-container>

      <v-container fluid my-5 px-md-12>
          <div>
            <v-data-table
              ref="diets"
              :headers="dietHeaders"
              :items="diets"
              sort-by="date"
              sort-desc="true"
              class="elevation-1"
              :loading="isLoading"
              loading-text="Cargando... Favor de esperar"
              >
              <template #item.formatDate="{item}">{{momentDatetime(item.date,"LL")}}</template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Plan alimenticio</v-toolbar-title>
                  <v-spacer></v-spacer>
                  <v-spacer></v-spacer>
                  <v-btn class="blue darken-3 white--text" @click="$router.push('/nutricion/plan/' + $route.params.id)">Nuevo plan</v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.dietActions="{item}">
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <v-btn icon v-on="on">
                      <v-icon small @click="openPlan(item)">search</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver/Editar Plan alimenticio</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{on}">
                    <v-btn icon v-on="on">
                      <v-icon small @click="deleteDiet(item)">delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar Plan alimenticio</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>
      </v-container>

      <v-container> 
        <v-col cols="12" class=" text-center caption px-0 py-0">
                <v-btn
                      elevation="2"
                      large class="blue  darken-3 white--text"
                >
                    <vue-excel-xlsx
                      :data="appointments"
                      :columns="columns"
                      :filename="patient.name + ' ' +patient.surname"
                      :sheetname="'sheetname'"
                      >
                      Descargar Excel
                    </vue-excel-xlsx>
                </v-btn>
          </v-col>
      </v-container>


 

    </v-content>
  </div>

</template>

<script>
const helper = require("../helper.js");

import axios from "axios";
import nutriheader from "../components/nutriheader.vue";
import VueExcelXlsx from "vue-excel-xlsx";
import Vue from "vue";

Vue.use(VueExcelXlsx);

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
      diets: [],
      nutritionistName : "",
      headers: [
        { text: "Fecha", value:"formatDate"},
        { text: "Peso", value: "weight" },
        { text: "Altura", value: "height" },
        { text: "IMC", aign: "left", value: "IMC"},
        { text: "Masa Muscular", align: "left", value: "muscleMass"},
        { text: "Masa de Grasa", align: "left", value: "fatMass"},
        { text: "Porcentaje de grasa", align:" ", value: "fatMassPct"},
        { text: "Agua corporal", value:"totalWater"},
        { text: "Atendió", value:"nutritionist.name"},
        { text: "Acciones", align: "center", value: "record"}
      ],
      dietHeaders: [ 
        { text: "Fecha", value:"formatDate"},
        { text: "Frutas", value:"fruit"},
        { text: "Verduras", value:"vegetable"},
        { text: "Leguminosas", value:"legume"},
        { text: "Cereal", value: "cereal"},
        { text: "Azúcar", value: "sugar"},
        { text: "Grasas", value: "fat"},
        { text: "Leche entera", value: "milkWhole"},
        { text: "Leche semidescremada", value: "milkSemiSkimmed"},
        { text: "Leche descremada", value: "milkSkimmed"},
        { text: "Carne magra", value: "meatWhole"},
        { text: "Carne semigrasosa", value: "meatSemiGreasy"},
        { text: "Carne grasosa", value: "meatGreasy"},
        { text: "Accciones", align: "center", value: "dietActions"},
      ],
      columns : [
        {
            label: "Fecha",
            field: "date",
        },
        {
            label: "Peso",
            field: "weight",
        },
        {
            label: "Altura",
            field: "height",
        },
        {
            label: "IMC",
            field: "IMC",
        },
        {
            label: "Masa Muscular",
            field: "muscleMass",
        },
        {
            label: "Masa de grasa",
            field: "fatMass",
        },
        {
            label: "Porcentaje de grasa",
            field: "fatMassPct",
        },
        {
            label: "Agua Corporal",
            field: "totalWater",
        },
        {
            label: "Atendio",
            field: "nutritionistName",
        },
      ]
    }
  },
  components: {
    nutriheader
  },
  updated: function() {
    this.nutritionistName = this.appointments[0].nutritionist.name
  },
  methods: {
    momentDatetime(datetime, datetime_format) {
      return this.$moment.utc(datetime).format(datetime_format);
    },
    dateToString(date){
      date = new Date(date)
      var dateString = date.toISOString().substr(0, 10)
      return dateString
    },
    createAppoint(){
      this.$router.push("/nutricion/"+this.$route.params.id+"/cita")
    },
    deleteItem(item){
      this.$swal({
        title:"Eliminar cita",
        text:"¿Seguro que quieres eliminar esta cita " + ""+"?",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Eliminar",
        confirmButtonColor: "red",
        cancelButtonColor: "blue"}).then((result)=>{
          if(result.value){
            axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
            const URL = helper.baseURL + "/nutricion/appointment/"+item._id ;
            axios
            .delete(URL)
            .then(()=>{
              this.$swal("Cita eliminada","","success")
              this.getItems()
            })
            .catch((error)=>{
              this.$swal("Error",error.Response.data.error,"error")
            })
          }
        })
    },
    deleteDiet(diet) {
      this.$swal({
        title:"Eliminar plan",
        text:"¿Seguro que desea eliminar este plan?",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Eliminar",
        confirmButtonColor:"red",
        cancelButtonColor:"blue",
      }).then(result => {
        if(result.value) {
          axios.defaults.headers.common['Authorization'] = "Bearer " + localStorage.getItem("token");
          const URL = helper.baseURL + "/nutricion/records/diet/"+this.$route.params.id+"/"+diet.id;
          axios.delete(URL).then(response => {
            console.log(response);
            this.$swal("Plan eliminado", "", "success");
            this.getPatient();
          }).catch(error => {
            this.$swal("Error", error.response.data.error, "error");
          });
        }
      })
    },
    openPlan(diet) {
      this.$router.push('/nutricion/plan/' + this.$route.params.id + '/'+diet.id);
    },
    getPatient(){
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      const URL = helper.baseURL + "/nutricion/records/"+this.$route.params.id;
      axios
      .get(URL)
      .then((response)=>{
        this.patient = response.data
        this.diets = response.data.diets;
        this.getItems();
      }).catch((error)=>{
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
        
        for (var i = 0; i < this.appointments.length; i++) {
            this.appointments[i].nutritionistName = this.appointments[i].nutritionist['name']
        }
      })
      .catch((error)=>{
        this.$swal("Error",error.response.data.error,"error")
      })
      
    },
    verCita(item){
      var route = '/nutricion/'+this.$route.params.id+'/cita?cid=' +item._id
      window.open(route,"_self")
    }
  },
  created(){
    this.getPatient();
    
  }
  
};
</script>
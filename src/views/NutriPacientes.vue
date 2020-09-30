 <template>
  <div>
    <v-main>
      <nutriheader title="Pacientes"></nutriheader>
      <v-container fluid my-5 px-md-12>

          <div>
            <v-data-table
              ref="table"
              :headers="headers"
              :items="records"
              sort-by="name"
              class="elevation-1"
              :loading="isLoading"
              :search="search"
              loading-text="Cargando... Favor de esperar"
            >

              <template #item.full_name="{item}">{{item.name}}  {{item.surname}}</template>
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Mis pacientes</v-toolbar-title>
                  <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                  <v-spacer> </v-spacer>
                    <v-text-field
                      v-model="search"
                      append-icon="mdi-magnify"
                      label="Buscar Matrícula/Nómina"
                      single-line
                      hide-details
                    ></v-text-field>
                    <v-spacer> </v-spacer>
                   <v-btn class="blue  darken-3 white--text" href="/nutricion/informacionpersonal" >Nuevo Expediente</v-btn>
                </v-toolbar>
              </template>
              <template v-slot:item.appoint="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon small @click="createAppoint(item)">add</v-icon>
                    </v-btn>
                  </template>
                  <span>Registrar nueva cita</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon small @click="showAppoint(item)">assignment</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver lista de Seguimiento</span>
                </v-tooltip>

              </template>
              <template v-slot:item.record="{ item }">
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon small @click="showReport(item)">search</v-icon>
                    </v-btn>
                  </template>
                  <span>Ver/Editar Expediente</span>
                </v-tooltip>
                <v-tooltip top>
                  <template v-slot:activator="{ on }">
                    <v-btn icon v-on="on">
                      <v-icon small @click="deleteItem(item)">delete</v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar Expediente</span>
                </v-tooltip>
              </template>
            </v-data-table>
          </div>
      </v-container>
      <v-container fluid my-2>
        <v-col align="center" cols="12">
          <v-btn large class="blue  darken-3 white--text" @click="viewReports()">
              Ver reportes de pacientes
          </v-btn>
        </v-col>
    </v-container>
    </v-main>
  </div>
</template>

<script>
const helper = require("../helper.js");

import axios from "axios";
import nutriheader from "../components/nutriheader.vue";

export default {
  name: "UserClasses",
  data(){
    return{
      search:"",
      isLoading: true,
      Periodo: "",
      periodID: "",
      show: true,
      records : [],
      headers: [
        { text: "Matrícula/Nómina", value: "matricula" },
        { text: "Nombre", align: "left", value: "full_name" },
        { text: "E-mail", aign: "left", value: "email"},
        { text: "Seguimiento", align: "center", value: "appoint"},
        { text: "Expediente", align: "center", value: "record"}
      ],
    }
  },
  components: {
    nutriheader
  },
  methods: {
    showAppoint(item){
      window.open("/nutricion/pacientes/citas/"+item._id,"_self")
    },
    showReport(item){
      window.open("/nutricion/informacionpersonal?id="+item._id,"_self")
    },
    createAppoint(item){
      window.open("/nutricion/"+item._id+"/cita","_self")
    },
    redirect() {
      var route = "/clases/";
      window.open(route, "_blank");
    },
    redirectToUserInfo() {
      var route = "/myinfo/";
      window.open(route, "_self");
    },
    viewReports(){
      window.open("/nutricion/pacientes/reportes", "_self");
    },
    deleteItem(item){
      this.$swal({
        title:"Dar de baja al paciente",
        text:"¿Seguro que quieres dar de baja al paciente " + item.name+"?",
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
    getItems(){
      this.clases = []
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      const URL = helper.baseURL + "/nutricion/records";

      axios
      .get(URL)
      .then((Response)=>{
        this.records = Response.data
        this.isLoading = false
      })
      .catch((error)=>{
        this.$swal("Error",error.response.data.error,"error")
      })

    }
  },
  created(){
    this.getItems();
  }

};
</script>
 <template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1 class="display-2 font-weight-bold" align="center">Pacientes</h1>
        </v-row>
      </v-container>
      
      <v-container fluid my-5 px-md-12>
        <div justify="left" align="left">
          <v-col cols="2" class="px-0">
              <v-btn large block class="px-0" href="/nutricion/home">
                <v-icon align="center" medium >mdi-arrow-left</v-icon>
                Regresar
              </v-btn>
          </v-col>
        </div>
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
                  <v-spacer></v-spacer>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Buscar Matrícula/Nómina"
                    single-line
                    hide-details
                  ></v-text-field>
                  <v-spacer></v-spacer>
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
                      <v-icon small @click="deleteItem(item)">delete</v-icon></v-icon>
                    </v-btn>
                  </template>
                  <span>Eliminar Expediente</span>
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
    this.getItems();
  }
  
};
</script>
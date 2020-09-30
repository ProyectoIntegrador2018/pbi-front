 <template>
  <div>
    <v-main>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1 class="display-2 font-weight-bold" align="center">Mis clases {{this.Periodo}}</h1>
        </v-row>
      </v-container>

      <v-container fluid my-5 px-md-12>
        <div justify="left" align="left">
          <v-col cols="2" class="px-0">
              <v-btn large block class="px-0" href="/home">
                <v-icon align="center" medium >mdi-arrow-left</v-icon>
                Regresar
              </v-btn>
          </v-col>
        </div>
          <div>
            <v-data-table
              ref="table"
              :headers="headers"
              :items="clases"
              sort-by="name"
              class="elevation-1"
              :loading="isLoading"
              loading-text="Cargando... Favor de esperar"
              >
              <template v-slot:top>
                <v-toolbar flat color="white">
                  <v-toolbar-title>Clases inscritas</v-toolbar-title>
                  <!-- <v-divider class="mx-4" inset vertical></v-divider> -->
                  <v-spacer></v-spacer>
                </v-toolbar>
              </template>
              <template v-slot:item.action="{ item }">
                <v-icon small @click="deleteItem(item)" :disabled="show">delete</v-icon>
              </template>
            </v-data-table>
          </div>
      </v-container>
    </v-main>
  </div>
</template>

<script>
const helper = require("../helper.js");

import axios from "axios";

export default {
  name: "UserClasses",
  data(){
    return{
      isLoading: true,
      Periodo: "",
      periodID: "",
      show: true,
      clases : [],
      headers: [
        { text: "Nombre", align: "left", value: "name" },
        { text: "Instructor", value: "instructor" },
        { text: "Frecuencia", value: "frequency" },
        { text: "Hora de inicio", value: "startHour" },
        { text: "Hora de fin", value: "endHour" },
        { text: "Salón", value: "classroom" },
        { text: "Actions", value: "action",align:"center", sortable: false }
      ],
    }
  },
  components: {

  },
  methods: {
    getTerms() {
      const URL = helper.baseURL + "/terms/";
      axios
        .get(URL)
        .then(response => {
          response.data.forEach((periodo)=>{
            if(periodo.flagCurrent){
              this.Periodo = periodo.name + " " + periodo.year
              this.periodID = periodo._id
              this.getStatusFlag()
              this.isLoading = false
            }
          })
          if(this.Periodo == ""){
            this.$swal("Error","Actualmente no hay periodo de inscripciones","error")
          }
        })
        .catch((error) => {
          this.$swal("Error", error.response, "error");
        });
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
        title:"Dar de baja la clase",
        text:"¿Seguro que quieres dar de baja la clase "+item.name+"?",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Dar de baja",
        confirmButtonColor: "red",
        cancelButtonColor: "blue"}).then((result)=>{
          if(result.value){
            axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
            const URL = helper.baseURL + "/classes/disenroll/user/"+item._id ;
            axios
            .put(URL,{userID:item._id})
            .then(()=>{
              this.$swal("Clase eliminada","","success")
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
      const URL = helper.baseURL + "/classes/user";

      axios
      .get(URL)
      .then((Response)=>{

        this.clases = Response.data
        this.isLoading = false
      })
      .catch((error)=>{
        this.$swal("Error",error.response.data.error,"error")
      })

    },
    getStatusFlag(){
      const URL = helper.baseURL + "/terms/status/"+ this.periodID +"/false"
      axios
        .get(URL)
        .then(response => {
          this.show = !response.data.status

        })
        .catch(() => {
          this.$swal("Error", "No se pudo cargar periodo", "error");
        });
    }
  },
  created(){
    this.getTerms();
    this.getItems();
  }

};
</script>
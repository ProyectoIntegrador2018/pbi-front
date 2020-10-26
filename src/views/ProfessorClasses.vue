 <template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1 class="display-3 font-weight-bold" align="center">{{this.nombreProfesor}}</h1>  
          <h1 class="display-2 font-weight-bold" align="center">Mis clases {{this.Periodo}}</h1>
        </v-row>
      </v-container>
      
      <v-container fluid my-5 px-md-12>
        
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
                <v-icon small @click="showClass(item)">mdi-clipboard-list-outline</v-icon>
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
      nombreProfesor: "Anastasio Martínez",
      isLoading: true,
      Periodo: "",
      periodID: "",
      show: true,
      clases : [{name:"Yoga",frequency:"Frec",startHour:"0",endHour:"0",classroom:"Gimnasio",_id:"5de6ac4ba0898f0017d19f31"}],
      headers: [
        { text: "Nombre", align: "left", value: "name" },
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
      this.$router.push(route)
    },
    redirectToUserInfo() {
      var route = "/myinfo/";
      this.$router.push(route);
    },
    showClass(item){
      var idClase = item._id
      this.$router.push("/profesor/clase/"+idClase)
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
      //this.clases = []
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      const URL = helper.baseURL + "/classes/user";
      
      axios
      .get(URL)
      .then((Response)=>{
        
        //this.clases = Response.data
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
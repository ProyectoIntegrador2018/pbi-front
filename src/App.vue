<template>
  <div id="app">
    <v-app>
      <v-app-bar color="blue darken-4" app>
        <v-img contain aspect-ratio="1" 
          src="@/assets/LogotipoHorizontalTecBN.png" 
          max-width="200" 
          max-height='90%'
          >
        </v-img>
        <v-toolbar-title class="white--text">Programa de Bienestar Integral</v-toolbar-title>
        <div class="flex-grow-1"></div>
        <v-spacer></v-spacer>
        <a @click="logOut"><v-icon dark>mdi-logout</v-icon></a>
      </v-app-bar>

      <v-content fluid fill-height>
        <router-view />
      </v-content>
      <v-footer padless>        
        <v-col cols="12" class=" text-center caption px-0 py-0">
          Dudas y Apoyo:
          83 58 2000 ext. 3651 |
          <i>pbi.mty@servicios.itesm.mx</i>
        </v-col>
        <v-col class="text-center caption pt-0 px-0" cols="12">
          &copy{{ new Date().getFullYear() }} —
          Tecnológico de Monterrey, Campus Monterrey
        </v-col>
      </v-footer>
    </v-app>
  </div>
</template>

<script>
import axios from "axios";
const helper = require("./helper.js");

export default {
  name: "App",
  components: {},
  data: () => ({
    //
  }),
  methods:{
    logOut(){
      const URL = helper.baseURL + "/logout";
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      axios
      .post(URL)
      .then(()=>{
        this.$swal("Sesión cerrada","Has cerrado sesión","success")
        .then(()=>{
          window.localStorage.removeItem("token")
          window.open("/login","_self") 
        })
      })
      .catch(()=>{
        this.$swal("Error","No se pudo cerrar la sesión","error")
      })
    }
  },
  beforeCreate(){
    
  }
};
</script>

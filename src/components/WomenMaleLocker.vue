<template>
<div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-container class="fill-height d-flex align-center">
                                <v-row align="center" justify="center">
                                    <v-col cols="10" md="5">
                                        <v-card
                                        class="d-flex align-center"
                                        color="#FFAE5C"                                   
                                        @click="maleLockerReservation"
                                        >
                                        <v-row>                                            
                                            <v-col cols="12" justify="center" align="center" class="py-0">
                                              <v-icon align="center" size="200" color="white">mdi-human-male</v-icon>
                                            </v-col>
                                            <v-col cols="12" class="px-0 py-0">
                                              <h2 class="btn" color= "white" align="center">Vestidores Hombres</h2>
                                            </v-col>
                                            <v-col cols="12" class="px-0 py-0">
                                              <h2 class="btn" color= "white" align="center">Costo: ${{maleLockerCost}}</h2>
                                            </v-col>
                                        </v-row>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="10" md="5">
                                        <v-card
                                        class="d-flex align-center"
                                        color="#5DC178"
                                        @click="femaleLockerReservation"
                                        >
                                        <v-row>
                                            
                                            <v-col cols="12" justify="center" align="center" class="py-0">
                                              <v-icon align="center" size="200" color="white">mdi-human-female</v-icon>
                                            </v-col>
                                            <v-col cols="12" class="px-0 py-0">
                                              <h2 class="btn" color= "white" align="center">Vestidores Mujeres</h2>
                                            </v-col>
                                            <v-col cols="12" class="px-0 py-0">
                                              <h2 class="btn" color= "white" align="center">Costo: ${{femaleLockerCost}}</h2>
                                            </v-col>
                                        </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                    </v-row>     
                </v-card>
                </v-col>          
        </v-row>
      </v-container>
  </div>
</template>
<script>
import axios from "axios";
const helper = require("../helper.js");

export default {
  data: () => ({
    femaleDresserId: "" ,
    maleDresserId: "",
    maleLockerCost: "Cargando",
    femaleLockerCost: "Cargando"
  }),
  created() {
    axios.defaults.headers.common["Authorization"] =
    "Bearer " + localStorage.getItem("token");
    const URLH = helper.baseURL + "/lockers/search" + `?campus=Monterrey&dresser=Hombres`;

    axios
      .get(URLH)
      .then(response => {
        this.maleDresserId = response.data._id
        this.maleLockerCost = response.data.cost 
      })
      .catch(error => {
      this.$swal("Error", error.response.data.error, "error");
      });

    const URLM = helper.baseURL + "/lockers/search" + `?campus=Monterrey&dresser=Mujeres`;

    axios
      .get(URLM)
      .then(response => {
        this.femaleDresserId = response.data._id
        this.femaleLockerCost = response.data.cost
      })
      .catch(error => {
      this.$swal("Error", error.response.data.error, "error");
      });

  },
  mounted() {},
  methods: {  
    lockerReservation(lockersId,vestidor) 
    {
        this.$swal({
          title:"Confirmar Reservación",
          type:"info",
          html:`¿Desea Reservar un locker en el Vestidor de ${vestidor}?`,
          showCancelButton:true,
          cancelButtonText:"Cancelar",
          confirmButtonText:"Confirmar"}).
          then((result)=>
          {
            if(result.value)
            {
              axios.defaults.headers.common["Authorization"] =
              "Bearer " + localStorage.getItem("token");
              const URL = helper.baseURL + "/lockers/assign/" + lockersId;

              axios
                .put(URL)
                .then(response => {
                  this.$swal({
                  title:"Locker Reservado",
                  type:"success",
                  html:`Ha reservado un locker en el Vestidor de ${vestidor} con éxito, su número de locker es: ` + response.data.number
                  }).then(()=>{
                    location.reload()
                  })
                })
                .catch(error => {
                this.$swal("Error", error.response.data.error, "error");
                //AQUI SE PREGUNTA SI QUIERE ENTRAR A LA LISTA DE ESPERA 
                });      
            }   
            
          })
    },
    maleLockerReservation() {
      this.lockerReservation(this.maleDresserId,'HOMBRES')
    },
    femaleLockerReservation() {
      this.lockerReservation(this.femaleDresserId,'MUJERES')
    }
   
  }
};
</script>


<style>
</style>
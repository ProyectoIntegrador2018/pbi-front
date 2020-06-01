<template>
<div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        
                        <v-col align="center" class="px-0 headline" cols="9">
                            <p class="my-0">Tu número de casillero asignado es:</p>                
                        </v-col>

                        <v-col cols="10" md="6">
                            <v-card class="d-flex align-center" :color="this.lockerColor">
                                <v-row>
                                    <v-col cols="12" justify="center" align="center" class="py-0">
                                        <h1 class="btn" color= "white" align="center">#{{this.lockerNumber}}</h1>
                                        <template v-if="lockerIcon == 'mdi-loading'">
                                          <v-icon align="center" c size="200" color="white" class="mdi-spin">{{this.lockerIcon}}</v-icon>
                                        </template>                                        
                                        <template v-else>
                                          <v-icon align="center" c size="200" color="white">{{this.lockerIcon}}</v-icon>
                                        </template>
                                    </v-col>
                                    <v-col cols="12" class="px-0 py-0">
                                        <h2 class="btn" color= "white" align="center">Vestidores {{this.lockerDresser}}</h2>
                                    </v-col>
                                    <v-col cols="12" class="px-0 py-0">
                                        <h2 class="btn" color= "white" align="center">Costo ${{this.lockerCost}}</h2>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        
                        <v-col align="center" class="px-0" cols="12" v-if="showButton">
                            <v-row align="center" justify="center">
                                <v-col align="center" class="px-0" cols="3">
                                    <v-btn large block class="px-0" color="red lighten-1" dark @click="removeLockerReservation">
                                        <v-icon align="center" medium left>mdi-cancel</v-icon>Cancelar reservación
                                    </v-btn>  
                                </v-col> 
                            </v-row>      
                        </v-col>  

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
  props: ["showButton"],
  data: () => ({
      lockerNumber: "Cargano",
      lockerDresser: "Cargando",
      lockerCost: "Cargando",
      lockerColor: "#BDBDBD",
      lockerIcon: "mdi-loading",
      idLocker: ""
  }),
  created() {
    this.getUserInfo();
  },
  mounted() {},
  methods: {  
    removeLockerReservation() 
    {
        this.$swal({
        title:"Cancelar Reservación de Casillero",
        text:"¿Estás seguro que deseas cancelar tu reservación de Casillero? Esta acción no se puede revertir y es posible que se agoten los lugares en un futuro",
        type:"warning",
        showCancelButton:true,
        cancelButtonText:"No",
        confirmButtonText:"Cancelar Reservación",
        confirmButtonColor: "#EF5350"}).
          then((result)=>
          {
            if(result.value)
            {
              const URL = helper.baseURL + "/lockers/unassign/"+this.idLocker;
              axios
              .put(URL)
              .then((response)=>{
                this.$swal({
                    title:"Reservación Cancelada",
                    type:"success"
                }).then(()=>{
                    window.location.reload()
                })
              }) .catch(error => {
                this.$swal("Error", error.response.data.error, "error");                 
              });     
            }            
          })
    },
    getUserInfo() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const URL = helper.baseURL + "/user/";
      axios
        .get(URL)
        .then(response => {
          if (response.data.locker){
              this.getLockerInfo(response.data.locker);
          }
        })
        .catch(error => {
          this.$swal("Error", error.response.data.error, "error");
        });
    },
    getLockerInfo(idLocker){
        this.idLocker = idLocker
        const URL = helper.baseURL + "/lockers/locker/"+idLocker
        axios
        .get(URL)
        .then((response)=>{
            this.lockerNumber = response.data.number
            this.lockerDresser = response.data.dresser
            this.lockerCost = response.data.cost
            if(this.lockerDresser == "Mujeres")
            {
                this.lockerColor = "#5DC178" //Color Verde
                this.lockerIcon = "mdi-human-female"
            }else{
                this.lockerColor = "#FFAE5C" //Color Naranja
                this.lockerIcon = "mdi-human-male"
            }
        })
        .catch(error => {
          this.$swal("Error", error.response.data.error, "error");
        });
    } 
   
  }
};
</script>


<style>
</style>
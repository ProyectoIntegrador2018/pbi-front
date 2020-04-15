<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col cols="10">
                            <h1 align="center">Oferta de Casilleros</h1>
                        </v-col>
                        <v-col class="px-0 pt-0" cols="10">
                                <span class="title"> Vestidor Hombres 
                                    <v-icon align="center" size="50" >mdi-human-male</v-icon>
                                </span>   
                        </v-col>
                        <v-col class="px-0 py-0" cols="10">                                           
                                <span class="title"> Costo: </span>
                                <v-text-field
                                v-model="maleDresser.cost"                        
                                label="Costo de Casillero en Vestidor de Hombres"
                                single-line
                                solo
                                @change="this.validateMaleCost"
                                :errorMessages="this.errorMsg.maleCost"
                                ></v-text-field>
                        </v-col>    
                        <v-col class="px-0 py-0" cols="10">       
                                <span class="title"> Número de Casilleros: </span>
                                <v-text-field
                                v-model="maleDresser.count"
                                label="Ejemplo: '100' Creará casilleros 1 - 100"
                                single-line
                                solo
                                @change="this.validateMaleAmount"
                                :errorMessages="this.errorMsg.maleAmount"
                                ></v-text-field>
                        </v-col>      
                        
                        <v-col class="px-0 pt-0" cols="10">
                                <span class="title"> Vestidor Mujeres 
                                    <v-icon align="center" size="50" >mdi-human-female</v-icon>
                                </span>
                        </v-col>   
                        <v-col class="px-0 py-0" cols="10">                                           
                                <span class="title"> Costo: </span>
                                <v-text-field
                                v-model="femaleDresser.cost"                        
                                label="Costo de Casillero en Vestidor de Mujeres"
                                single-line
                                solo
                                @change="this.validateFemaleCost"
                                :errorMessages="this.errorMsg.femaleCost"
                                ></v-text-field>
                        </v-col>    
                        <v-col class="px-0 py-0" cols="10">       
                                <span class="title"> Número de Casilleros: </span>
                                <v-text-field
                                v-model="femaleDresser.count"
                                label="Ejemplo: '100' Creará casilleros 1 - 100"
                                single-line
                                solo
                                @change="this.validateFemaleAmount"
                                :errorMessages="this.errorMsg.femaleAmount"
                                ></v-text-field>
                        </v-col>                               
                        
                        <v-col cols="10" class="px-0 py-0" >
                            <v-row class="d-flex flex-row-reverse mx-6 my-0">                                    
                                <v-col cols="4">
                                    <v-btn large block href="/lockers">
                                     <v-icon align="center" medium >mdi-arrow-left</v-icon>
                                     Regresar
                                    </v-btn>
                                </v-col>
                                <v-col cols="4">                           
                                    <v-btn large block color="primary" @click="saveLockerInfo">
                                      <v-icon align="center" medium color="white">mdi-content-save-outline</v-icon>
                                      Guardar
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
const helper = require("../helper.js");
import axios from "axios";

export default {
  data () {
      return {
        isError: false,
        femaleDresser: {
          cost:"",
          count:""
        },  
        maleDresser: {
          cost:"",
          count:""
        },      
        errorMsg:{
          femaleCost:"",
          femaleAmount:"",
          maleCost:"",
          maleAmount:""
        },
      }
    },
  components: {
    
  },
  methods: {
    validateFemaleAmount(){
        if(!this.femaleDresser["count"]){
          this.isError = true
          this.errorMsg.femaleAmount = "Campo requerido"
        }
        else if(isNaN(this.femaleDresser["count"]))
        {
          this.isError = true
          this.errorMsg.femaleAmount = "Debe ser un número"
        }
        else if(this.femaleDresser["count"] <= 0 || this.femaleDresser["count"] % 1 != 0)
        {
          this.isError = true
          this.errorMsg.femaleAmount = "Número inválido"
        }
        else{
          this.errorMsg.femaleAmount = ""
        }
    },
    validateMaleAmount(){
        if(!this.maleDresser["count"]){
          this.isError = true
          this.errorMsg.maleAmount = "Campo requerido"
        }
        else if(isNaN(this.maleDresser["count"]))
        {
          this.isError = true
          this.errorMsg.maleAmount = "Debe ser un número"
        }
        else if(this.maleDresser["count"] <= 0 || this.maleDresser["count"] % 1 != 0)
        {
          this.isError = true
          this.errorMsg.maleAmount = "Número inválido"
        }
        else{
          this.errorMsg.maleAmount = ""
        }
    },   
    validateMaleCost(){
        if(!this.maleDresser["cost"]){
          this.isError = true
          this.errorMsg.maleCost = "Campo requerido"
        }
        else if(isNaN(this.maleDresser["cost"]))
        {
          this.isError = true
          this.errorMsg.maleCost = "Debe ser un número"
        }
        else if(this.maleDresser["cost"] <= 0 || this.maleDresser["cost"] % 1 != 0)
        {
          this.isError = true
          this.errorMsg.maleCost = "Número inválido"
        }
        else{
          this.errorMsg.maleCost = ""
        }
    },  
    validateFemaleCost(){
        if(!this.femaleDresser["cost"]){
          this.isError = true
          this.errorMsg.femaleCost = "Campo requerido"
        }
        else if(isNaN(this.femaleDresser["cost"]))
        {
          this.isError = true
          this.errorMsg.femaleCost = "Debe ser un número"
        }
        else if(this.femaleDresser["cost"] <= 0 || this.femaleDresser["cost"] % 1 != 0)
        {
          this.isError = true
          this.errorMsg.femaleCost = "Número inválido"
        }
        else{
          this.errorMsg.femaleCost = ""
        }
    },        
    saveLockerInfo()
      {
        this.isError = false
        this.validateFemaleCost()
        this.validateMaleCost()
        this.validateFemaleAmount()
        this.validateMaleAmount()
        if(this.isError){
          return
        }

        //Falta el endpoint para modificar costos

        const URL = helper.baseURL + "/lockers/";
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .post(URL,
        {
            campus:"Monterrey",
            dresser:"Mujeres",
            count:this.femaleDresser.count,
            cost:this.femaleDresser.cost
        })
        .then(response => {
            axios
            .post(URL,
            {
                campus:"Monterrey",
                dresser:"Hombres",
                count:this.maleDresser.count,
                cost:this.maleDresser.cost
            })
            .then(response => {
                this.$swal("Oferta de Casilleros Actualizada","Se ha actualizado la oferta de casilleros","success")
                .then((_) => {
                    window.open("/lockers","_self")
                })
            })                  
        }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })

      },
      getLockerInfo()
      {
        axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
        const URLH = helper.baseURL + "/lockers/search" + `?campus=Monterrey&dresser=Hombres`;

        axios
        .get(URLH)
        .then(response => {
            this.maleDresser.cost = response.data.cost
            this.maleDresser.count = response.data.count
        })
        .catch(error => {
        this.$swal("Error", error.response.data.error, "error");
        });

        const URLM = helper.baseURL + "/lockers/search" + `?campus=Monterrey&dresser=Mujeres`;
        axios
        .get(URLM)
        .then(response => {
            this.femaleDresser.cost = response.data.cost
            this.femaleDresser.count = response.data.count
        })
        .catch(error => {
        this.$swal("Error", error.response.data.error, "error");
        });
        }
  },
    created(){
        this.getLockerInfo()
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col cols="10">
                            <h1 align="center">Oferta de Lockers</h1>
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
                                label="Costo de Lockers en Vestidor de Hombres"
                                single-line
                                solo
                                @change="this.validateMaleCost"
                                :errorMessages="this.errorMsg.maleCost"
                                ></v-text-field>
                        </v-col>    
                        <v-col class="px-0 py-0" cols="10">       
                                <span class="title"> Número de Lockers: </span>
                                <v-text-field
                                v-model="maleDresser.count"
                                label="Ejemplo: '100' Creará Lockers 1 - 100"
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
                                label="Costo de Lockers en Vestidor de Mujeres"
                                single-line
                                solo
                                @change="this.validateFemaleCost"
                                :errorMessages="this.errorMsg.femaleCost"
                                ></v-text-field>
                        </v-col>    
                        <v-col class="px-0 py-0" cols="10">       
                                <span class="title"> Número de Locker: </span>
                                <v-text-field
                                v-model="femaleDresser.count"
                                label="Ejemplo: '100' Creará Lockers 1 - 100"
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
          count:"",
          originalCount: "",
          originalCost: ""

        },  
        maleDresser: {
          cost:"",
          count:"",
          originalCount: "",
          originalCost: "",
          id: "",
        },      
        errorMsg:{
          femaleCost:"",
          femaleAmount:"",
          maleCost:"",
          maleAmount:"",
          id: ""
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
    async saveLockerInfo()
    {        
        this.isError = false
        this.validateFemaleCost()
        this.validateMaleCost()
        this.validateFemaleAmount()
        this.validateMaleAmount()
        if(this.isError){
          return
        }
        
        await this.updateLockerCostFemale()

        if(this.femaleDresser.count > this.femaleDresser.originalCount)
        {
          //Se agregan lockers
          const URL = helper.baseURL + "/lockers/add/" + this.femaleDresser.id;
          axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
          axios
          .put(URL,
          {
            campus:"Monterrey",
            dresser:"Mujeres",
            add:this.femaleDresser.count - this.femaleDresser.originalCount

          })    
          .then((response)=>{
              this.$swal("lockers creados", `Se han agregado ${this.femaleDresser.count - this.femaleDresser.originalCount} lockers nuevos en el vestidor de Mujeres`, "success");  
              this.femaleDresser.originalCount = this.femaleDresser.count 
         })      
          .catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
          })
        }
        else if(this.femaleDresser.count < this.femaleDresser.originalCount)
        {
            //Se restan lockers
            const URL = helper.baseURL + "/lockers/remove/" + this.femaleDresser.id;
            axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
            axios
            .put(URL,
            {
              campus:"Monterrey",
              dresser:"Mujeres",
              substract:this.femaleDresser.originalCount - this.femaleDresser.count
            })
            .then((response)=>{
                this.$swal("lockers eliminados", `Se han eliminado ${this.femaleDresser.originalCount - this.femaleDresser.count} lockers del vestidor de Mujeres`, "success");  
                this.femaleDresser.originalCount = this.femaleDresser.count 
            })
            .catch(error =>{
              this.$swal("Error",error.response.data.error,"error")
            });           
        }
        else if(this.femaleDresser.originalCount == 0 && this.femaleDresser.count > 0)
        {
          //Se crean nuevo lockers
          const URL = helper.baseURL + "/lockers/";
          axios
          .post(URL,{
            campus:"Monterrey",
            dresser:"Mujeres",
            count:this.femaleDresser.count
          })
          .then((response)=>{
              this.$swal("lockers creados", `Se han creado ${this.femaleDresser.count} lockers nuevos en el vestidor de Mujeres`, "success");  
              this.femaleDresser.originalCount = this.femaleDresser.count 
          })
        }

        if(this.maleDresser.originalCount == this.maleDresser.count && this.femaleDresser.originalCount == this.femaleDresser.count
          && this.maleDresser.originalCost==this.maleDresser.cost && this.femaleDresser.originalCost&&this.femaleDresser.cost)
        {
          this.$swal("Sin cambios", "No hay cambios que realizar", "success").then(()=>{
            var route = "/lockers/";
            window.open(route, "_self");
          });  
        }else
          this.saveLockerInfoMale();

    },
    async updateLockerCostFemale(){
      if(this.maleDresser.originalCost!=this.maleDresser.cost){
        this.$swal({
          title: 'Actualizando',
          text: 'Se están modificando los costos de lockers de Mujeres, favor de esperar',
          showCancelButton: false,
          showConfirmButton: false,
          type:"info"
        })
        const URL = helper.baseURL + "/lockers/cost/" + this.femaleDresser.id;
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        var newCost = await axios
        .put(URL,
        {
          cost: this.femaleDresser.cost
        })
        return await this.$swal("Completado","Se ha actualizado el costo de los casilleros de Mujeres","success")
      }
    },
    async updateLockerCostMale(){
      if(this.maleDresser.originalCost!=this.maleDresser.cost){
        this.$swal({
          title: 'Actualizando',
          text: 'Se están modificando los costos de lockers de Hombres, favor de esperar',
          showCancelButton: false,
          showConfirmButton: false,
          type:"info"
        })
        const URL = helper.baseURL + "/lockers/cost/" + this.maleDresser.id;
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        var newCost = await axios
        .put(URL,
        {
          cost: this.maleDresser.cost
        })
        return await  this.$swal("Completado","Se ha actualizado el costo de los casilleros de Hombres","success")
      }
    },
    async saveLockerInfoMale()
    {
       await this.updateLockerCostMale()

       //lockerS HOMBRES
        if(this.maleDresser.count > this.maleDresser.originalCount)
        {
          //Se agregan lockers
          const URL = helper.baseURL + "/lockers/add/" + this.maleDresser.id;
          axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
          axios
          .put(URL,
          {
            campus:"Monterrey",
            dresser:"Hombres",
            add:this.maleDresser.count - this.maleDresser.originalCount
          })    
          .then((response)=>{
              this.$swal("lockers creados", `Se han agregado ${this.maleDresser.count - this.maleDresser.originalCount} lockers nuevos en el vestidor de Hombres`, "success");  
              this.maleDresser.originalCount = this.maleDresser.count 
          })      
          .catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
          })
        }
        else if(this.maleDresser.count < this.maleDresser.originalCount) 
        {
            const URL = helper.baseURL + "/lockers/remove/" + this.maleDresser.id;
            axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
            axios
            .put(URL,
            {
              campus:"Monterrey",
              dresser:"Hombres",
              substract:this.maleDresser.originalCount - this.maleDresser.count
            })
            .then((response)=>{
                this.$swal("lockers eliminados", `Se han eliminado ${this.maleDresser.originalCount - this.maleDresser.count} lockers nuevos en el vestidor de Hombres`, "success");  
                this.maleDresser.originalCount = this.maleDresser.count 
            })
            .catch(error =>{
              this.$swal("Error",error.response.data.error,"error")
            });               
                 
        }
        else if(this.maleDresser.originalCount == 0 && this.maleDresser.count > 0)
        {
          //Se crean nuevo lockers
          const URL = helper.baseURL + "/lockers/";
          axios
          .post(URL,{
            campus:"Monterrey",
            dresser:"Hombres",
            count:this.maleDresser.count
          })
          .then((response)=>{
              this.$swal("lockers creados", `Se han creado ${this.maleDresser.count} lockers nuevos en el vestidor de Hombres`, "success");  
              this.maleDresser.originalCount = this.maleDresser.count  
          })
        }

         

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
            this.maleDresser.originalCount = response.data.count
            this.maleDresser.originalCost = response.data.cost
            this.maleDresser.id = response.data._id

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
            this.femaleDresser.originalCount = response.data.count
            this.femaleDresser.originalCost = response.data.cost
            this.femaleDresser.id = response.data._id
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

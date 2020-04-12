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
                            <v-card class="d-flex align-center" color="#FFAE5C">
                                <v-row>
                                    <v-col cols="12" justify="center" align="center" class="py-0">
                                        <h1 class="btn" color= "white" align="center"># 15</h1>
                                        <v-icon align="center" size="200" color="white">mdi-human-male</v-icon>
                                    </v-col>
                                    <v-col cols="12" class="px-0 py-0">
                                        <h2 class="btn" color= "white" align="center">Vestidores Hombres</h2>
                                    </v-col>
                                </v-row>
                            </v-card>
                        </v-col>
                        
                        <v-col align="center" class="px-0" cols="12">
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
//import axios from "axios";

export default {
  data: () => ({
    
  }),
  created() {
    
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
        confirmButtonColor: "red"}).
          then((result)=>
          {
            if(result.value)
            {
              this.$swal({
              title:"Reservación Cancelada",
              type:"success"
              })
            }            
          })
    }
   
  }
};
</script>


<style>
</style>
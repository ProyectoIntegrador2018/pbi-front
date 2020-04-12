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
//import axios from "axios";

export default {
  data: () => ({
    
  }),
  created() {
    
  },
  mounted() {},
  methods: {  
    maleLockerReservation() 
    {
        this.$swal({
          title:"Confirmar Reservación",
          type:"info",
          html:"¿Desea Reservar un casillero en el Vestidor de HOMBRES?",
          showCancelButton:true,
          cancelButtonText:"Cancelar",
          confirmButtonText:"Confirmar"}).
          then((result)=>
          {
            if(result.value)
            {
              this.$swal({
              title:"Casillero Reservado",
              type:"success",
              html:"Ha reservado un casillero en el Vestidor de HOMBRES con éxito, su número de casillero es: ##"
              })
            }            
          })
    },
    
    femaleLockerReservation() {
        this.$swal({
          title:"Confirmar Reservación",
          type:"info",
          html:"¿Desea Reservar un casillero en el Vestidor de MUJERES?",
          showCancelButton:true,
          cancelButtonText:"Cancelar",
          confirmButtonText:"Confirmar"}).
          then((result)=>
          {
            if(result.value){
              this.$swal({
              title:"Casillero Reservado",
              type:"success",
              html:"Ha reservado un casillero en el Vestidor de MUJERES con éxito, su número de casillero es: ##"
              })
            }            
          })
    }
   
  }
};
</script>


<style>
</style>
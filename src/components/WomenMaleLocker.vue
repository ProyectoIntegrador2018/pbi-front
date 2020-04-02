<template>
    <div class="fill-height">
        <v-container class="fill-height">
            <v-row justify="center">
                    <v-card class="d-flex align-center" color="white" min-width = "1000">
                            <v-container class="fill-height d-flex align-center">
                                <v-row align="center" justify="center">
                                    <v-col cols="12" md="6">
                                        <v-card
                                        class="d-flex align-center"
                                        color="#CFD8DC"
                                        height="300"                                        
                                        @click="maleLockerReservation"
                                        >
                                        <v-row>
                                            <v-col cols="12" justify="center" align="center" class="py-0">
                                            <v-icon align="center" size="200" color="#37474F">mdi-human-male</v-icon>
                                            </v-col>
                                            <v-col cols="12" class="px-0 py-0">
                                            <h2 class="btn" style = "color: #37474F" align="center">Vestidores Hombres</h2>
                                            </v-col>
                                        </v-row>
                                        </v-card>
                                    </v-col>

                                    <v-col cols="12" md="6">
                                        <v-card
                                        class="d-flex align-center"
                                        color="#37474F"
                                        height="300"
                                        @click="femaleLockerReservation"
                                        >
                                        <v-row>
                                            <v-col cols="12" justify="center" align="center" class="py-0">
                                            <v-icon align="center" size="200" color="#CFD8DC">mdi-human-female</v-icon>
                                            </v-col>
                                            <v-col cols="12" class="px-0 py-0">
                                            <h2 class="btn" style = "color: #CFD8DC" align="center">Vestidores Mujeres</h2>
                                            </v-col>
                                        </v-row>
                                        </v-card>
                                    </v-col>
                                </v-row>
                            </v-container>
                    </v-card>       
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
          then(()=>
          {
            this.$swal({
            title:"Casillero Reservado",
            type:"success",
            html:"Ha reservado un casillero en el Vestidor de HOMBRES con éxito, su número de casillero es: ##"
            })
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
          then(()=>
          {
            this.$swal({
            title:"Casillero Reservado",
            type:"success",
            html:"Ha reservado un casillero en el Vestidor de MUJERES con éxito, su número de casillero es: ##"
            })
          })
    }
   
  }
};
</script>


<style>
</style>
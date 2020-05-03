<template>
  <div>

    <v-container fluid my-5>
          <v-col align="center" justify="center">
      <v-img
        src="../assets/tecnutri.png"
        max-width="250"
        max-height="250"
        my-5
      ></v-img>
    </v-col>
      
    </v-container>

    <v-layout text-center wrap>
      <v-flex mb-4>
        <h1 class="display-2 font-weight-bold mb-3 align-center">Funciones del Administrador</h1>
      </v-flex>
    </v-layout>
    <v-item-group class="fill-height" fluid>
      <v-container class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">            
            <v-card class="d-flex align-center" color="light-green darken-1" height="200" @click="redirectToExpediente()">
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-calendar-clock</v-icon>
                </v-col>
                <v-col cols="12">
                  <h2 class="btn" align="center">Expedientes</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="orange"
              height="200"
              @click="redirectToSeguimiento()"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-swim</v-icon>
                </v-col>
                <v-col cols="12">
                  <h2 class="btn" align="center">Seguimiento</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="blue lighten-1"
              height="200"
              @click="redirectToPacientes()"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-account-details</v-icon>
                </v-col>
                <v-col cols="12">
                  <h2 class="btn" align="center">Pacientes</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>
  </div>
</template>

<script>
export default {
  components: {
    
  },
  methods: {
    redirectToExpediente() {
      var route = "/error/";
      window.open(route, "_self");
    },
    redirectToSeguimiento() {
      var route = "/error/";
      window.open(route, "_self");
    },
    redirectToPacientes() {
      var route = "/error/";
      window.open(route, "_self");
    }
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.btn {
  margin: auto;
  color: white;
}
</style>

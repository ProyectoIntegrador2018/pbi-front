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
        <h1 class="display-2 font-weight-bold mb-3 align-center">Nutrición</h1>
      </v-flex>
    </v-layout>
    <v-layout text-center wrap>
      <v-flex mb-4>
        <v-btn class="mb-3 align-center" color="primary" href="https://accounts.google.com/o/oauth2/v2/auth?access_type=offline&scope=https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar%20https%3A%2F%2Fwww.googleapis.com%2Fauth%2Fcalendar.events&response_type=code&client_id=132832930276-gd96bfdf2ib54n475uhpq1sb40qb4eam.apps.googleusercontent.com&redirect_uri=https%3A%2F%2Fpbi-mty.netlify.app%2FoauthCallback">Conectar calendario de Google</v-btn>
      </v-flex>
    </v-layout>
    <v-item-group class="fill-height" fluid>
      <v-container class="fill-height">
        <v-row align="center" justify="center">

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

          <v-col cols="12" md="4">            
            <v-card 
              class="d-flex align-center" 
              color="light-green darken-1" 
              height="200" 
              @click="redirectToAgenda()">

              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-calendar-clock</v-icon>
                </v-col>
                <v-col cols="12">
                  <h2 class="btn" align="center">Agenda</h2>
                </v-col>
              </v-row>
            </v-card>
          </v-col>

          <v-col cols="12" md="4">
            <v-card
              class="d-flex align-center"
              color="orange"
              height="200"
              @click="redirectToReportes()"
            >
              <v-row>
                <v-col cols="12" justify="center" align="center" class="py-0">
                  <v-icon align="center" x-large color="white">mdi-chart-bar</v-icon>
                </v-col>
                <v-col cols="12">
                  <h2 class="btn" align="center">Reportes</h2>
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
    mounted () {
        if (this.$route.query.errorCalendar) {
            this.$swal("Error", "No se pudo conectar el calendario de Google", "error");
        } else if (this.$route.query.sucessCalendar) {
            this.$swal("Conectado", "El calendario de Google ha sido conectado", "success");
        }
    },
  components: {
    
  },
  methods: {
    redirectToAgenda() {
      var route = "/nutricion/agendaPublica";
      window.open(route, "_self");
    },
    redirectToPacientes() {
      var route = "/nutricion/pacientes";
      window.open(route, "_self");
    },
    redirectToReportes() {
      var route = "/nutricion/indicadores";
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

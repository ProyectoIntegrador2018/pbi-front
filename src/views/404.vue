<template>
  <div fluid>
    <v-container fluid>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <v-img src="../assets/404.svg" width="80%" max-width="400"></v-img>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col align="center" justify="center">
          <h1 class="display-1 align-center">Ups, aquí no hay nada</h1>
          <p>Meditar un poco ayuda a enfocar el pensamiento... y a encontrar la página que buscas</p>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-btn outlined fab color="primary" href="/">
          <v-icon>mdi-home</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "HomeAdmin",
  components: {},
  methods: {
    redirect() {
      var route = "/";
      window.open(route, "_self");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>

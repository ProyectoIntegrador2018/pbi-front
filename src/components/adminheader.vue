<template>
  <div>
    <v-row align="center" justify="center">
      <v-col cols="12" md="3" align="center">
        <v-row align="center" justify="center">
          <v-col v-if="secondRoute != null" cols="6">
            <v-btn outlined fab color="primary" @click="go()">
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
          </v-col>
          <v-col cols="6">
            <v-btn outlined fab color="primary" @click="goHome()">
              <v-icon>mdi-home</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="6">
        <h1
          v-if="titleStyle == null"
          class="display-2 font-weight-bold"
          align="center"
          style="white-space: normal; word-wrap:break-word"
        >{{title}}</h1>
        <v-row  v-else-if="titleStyle == '2'">
          <h1 align="center" justify="center" class="display-2" style="white-space: normal; word-wrap:break-word">{{title}}</h1>
          <h1 align="center" justify="center" class="display-1" style="white-space: normal; word-wrap:break-word">{{subtitle}}</h1>
        </v-row>
        <h1
          v-else
          class="display-3"
          align="center"
          style="white-space: normal; word-wrap:break-word"
        >{{title}}</h1>
      </v-col>
      <v-col cols="12" md="3"></v-col>
    </v-row>
  </div>
</template>
<script>
export default {
  props: ["title", "secondRoute", "titleStyle", "subtitle"],

  methods: {
    goHome() {
      window.open("/admin/home/", "_self");
    },
    go() {
      window.open(this.secondRoute, "_self");
    }
  }
};
</script>
<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
          <v-col cols="10" md="10">
            <v-card class="d-flex align-center" color="white">
              <v-row justify="center" class="mb-5">
                <v-col cols="12">
                  <h1 align="center">{{text}}</h1>
                </v-col>
                <v-col align="center" cols="4" class="my-0 pb-0">
                  <v-text-field
                      v-model="usrEmail"
                      label="Correo electrónico"
                      single-line
                      solo
                      :error-messages = "errorMessage"
                      @change= "this.checkEmail"
                      @input="this.emailSet"
                      :style="isDisabledResend"
                      ></v-text-field>
                </v-col>
                <v-col align="center" cols="12" class="my-0">
                  <v-btn :style="isDisabledLog"
                    @click="this.goToLogin"
                  >Iniciar Sesión</v-btn>
                  <v-btn
                    :style="isDisabledResend"
                    :disabled = "isDisabledButton"
                    :rules="[]"
                    @click="this.resendConfirm"
                      >Reenviar correo de confirmacion</v-btn>
                </v-col >
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
  name: "UserConfirm",
  data () {
      return {
        text: "Verificando cuenta...",
        isDisabledLog: "display: none",
        isDisabledResend: "display: none",
        isDisabledButton: true,
        usrEmail: "",
        errorMessage: ""
      }
    },
  components: {

  },
  methods: {
    confirmar(){
      const token = this.$route.query.token
      const URL = helper.baseURL + "/confirm?token="+token;
      axios
      .post(URL)
      .then(response => {
        this.text = "Se ha confirmado tu cuenta, por favor inicia sesión"
        this.isDisabledLog = "display: inline"
      }).catch(error =>{
        this.$swal("Error",error.response.data.error,"error")
        this.text = "No se ha podido confirmar tu cuenta"
        this.isDisabledResend = "display: inline"
      })
    },
    emailSet(){
      if (this.validEmail(this.usrEmail)) {
        this.isDisabledButton = false
        this.errorMessage = ""
      }else{
        this.isDisabledButton = true
      }
    },
    checkEmail(){
      if (this.validEmail(this.usrEmail)) {
        this.errorMessage = ""
      }else{
        this.errorMessage = "Favor de introducir un e-mail válido"
      }
    },
    validEmail(email) {
      var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    resendConfirm(){
      const URL = helper.baseURL + "/confirm/retry";
      axios
      .post(URL,{"email": this.usrEmail})
      .then(response=>{
        this.$swal("Enviado", "Se ha enviado otro correo de confimación, verifica tu bandeja de entrada","warning")
      }).catch(error=>{
        this.$swal("Error",error.response.data.error,"error")
      })
    },
    goToLogin(){
      var route = "/login/";
      window.open(route, "_self");
    }
  },
  created(){
    this.confirmar()
  }

};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  h1{
    width: 100%;
    display: block;
  }
</style>

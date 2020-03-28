<template>
  <div class="fill-height" id="loginBG">
    <v-container class="fill-height">
      <v-row align="center" justify="center">
        <v-col cols="10" md="10">
          <v-card class="d-flex align-center" color="white">
            <v-row class="mx-10 my-10">
              <v-col id="loginSection" cols="12" md="6">
                <h3 class="my-5">Iniciar sesión</h3>
                <v-text-field v-model="userLogin.email" label="Correo electrónico" single-line solo></v-text-field>
                <v-text-field
                  v-model="userLogin.password"
                  :append-icon="show1 ? 'visibility' : 'visibility_off'"
                  :rules="[rules.required]"
                  :type="show1 ? 'text' : 'password'"
                  name="passLogin"
                  label="Contraseña "
                  solo
                  @click:append="show1 = !show1"
                ></v-text-field>
                <h6 align="center" class="mb-2">
                  <a class="caption" href="/resetpassword">
                    <u>Olvidé mi contraseña</u>
                  </a>
                </h6>
                <v-btn
                  large
                  block
                  color="primary"
                  @click="logIn(userLogin.email.toLowerCase(),userLogin.password)"
                >
                  <v-icon align="center" medium color="white">mdi-login</v-icon>
                  Entrar
                </v-btn>
                <v-row>
                  <v-col cols="12">
                    <iframe width="100%" height="100%" frameBorder="0" src="https://drive.google.com/file/d/1T1tTGo80gmK8WkJkjwWNu2t19CopcUee/preview" allowfullscreen></iframe>
                  </v-col>
                </v-row>

              </v-col>
              <v-col cols="12" md="6">
                <h3 class="my-5">Regístrate</h3>
                <v-row>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field 
                    v-model="userSignUp.name" 
                    label="Nombre(s)" 
                    single-line 
                    solo
                    :errorMessages="this.errorMsg.name"
                    @change="this.validateName"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" md="6" class="py-0">
                    <v-text-field 
                    v-model="userSignUp.surename" 
                    label="Apellidos" 
                    single-line 
                    solo                    
                    :errorMessages="this.errorMsg.surname"
                    @change="this.validateSurname"
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-text-field
                  v-model="userSignUp.email"
                  label="Correo electrónico"
                  single-line
                  solo
                  :errorMessages="this.errorMsg.email"
                  @change="this.validateEmail"
                ></v-text-field>
                <v-text-field
                  v-model="userSignUp.nomina"
                  label="Nómina (L0 o L00)"
                  single-line
                  solo
                  :errorMessages="this.errorMsg.nomina"
                  @change="this.validateNomina"
                ></v-text-field>
                <v-text-field
                  v-model="userSignUp.password"
                  type="password"
                  name="passSignIn"
                  label="Contraseña"
                  :rules="[rules.min]"
                  :errorMessages="this.errorMsg.password"
                  solo
                  @change="this.validatePass"
                ></v-text-field>
                <v-text-field
                  v-model="userSignUp.pConfirm"
                  type="password"
                  name="passConfirm"
                  :rules="[rules.min]"
                  label="Confirmar Contraseña"
                  :errorMessages="this.errorMsg.passwordC"
                  solo
                  @change="this.validatePassConfirm"
                ></v-text-field>
                <v-btn large block color="primary" @click="signUp()">
                  <v-icon align="center" medium color="white">mdi-account-plus-outline</v-icon>
                  <v-spacer></v-spacer>
                  Registrarme
                </v-btn>
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
  data() {
    return {
      isError: false,
      userLogin: { email: "", password: "" },
      userSignUp: {
        name: "",
        surename: "",
        email: "",
        password: "",
        pConfirm: "",
        nomina: ""
      },
      errorMsg: {
        name: "",
        surname: "",
        email: "",
        password: "",
        passwordC: "",
        nomina: ""
      },
      show1: false,
      rules: {
        required: value => !!value || "Required.",
        min: v => v.length >= 8 || "Min 8 characters",
        emailMatch: () => "The email and password you entered don't match"
      }
    };
  },
  methods: {
    logIn(correo, pass) {
      correo = correo.toLowerCase()
      var temp = { email: correo, password: pass };
      const URL = helper.baseURL + "/login";
      axios
        .post(URL, temp)
        .then(response => {
          localStorage.token = response.data.token;
          //window.console.log(response.data.token);
          this.redirect();
        })
        .catch(error => {
          const mensaje = error.response.data.error;
          const errorType = error.response.data.type;
          var iconMessage = "";
          var errorTitle = "";
          if (errorType == 1) {
            iconMessage = "error";
            errorTitle = "Error";
            this.$swal(errorTitle, mensaje, iconMessage);
          } else {
            errorTitle = "No has confirmado tu cuenta";
            this.$swal({
              title: errorTitle,
              text: mensaje,
              type: "warning",
              showCancelButton: true,
              cancelButtonText: "Reenviar Correo",
              cancelButtonColor: "green"
            }).then(selection => {
              if (!selection.value) {
                this.resendConfirm();
              }
            });
          }
        });
    },
    signUp() {
      this.isError = false;
      this.validateName();
      this.validateSurname();
      this.validateEmail();
      this.validatePass();
      this.validatePassConfirm();
      this.validateNomina();
      if (this.isError) {
        return;
      }
      var userSignUp = this.userSignUp;
      var email = userSignUp["email"].toLowerCase();
      var temp = {
        name: userSignUp["name"],
        surename: userSignUp["surename"],
        email: email,
        password: userSignUp["password"],
        nomina: userSignUp["nomina"],
        dateBirth: "01-01-2000"
      };
      window.console.log(temp);
      const URL = helper.baseURL + "/users";
      axios
        .post(URL, temp)
        .then(response => {
          //window.console.log(response["token"]);
          this.$swal(
            "Cuenta creada",
            "Ya puedes iniciar sesión con tus credenciales",
            "success"
          );
        }).catch((error)=>{
          this.$swal("No se pudo crear la cuenta",error.response.data.error,"error")
        })
      },
      redirect() {
        var route = "/home/";
        window.open(route, "_self");
      },
      resendConfirm(){
        window.console.log("Reenviando")
        const URL = helper.baseURL + "/confirm/retry";
        axios
        .post(URL,{"email": this.userLogin.email.toLowerCase()})
        .then(response=>{
          this.$swal("Enviado", "Se ha enviado otro correo de confimación, verifica tu bandeja de entrada","warning")
        }).catch(error=>{
          this.$swal("Error",error.response.data.error,"error")
        })
        .catch(error => {
          this.$swal("Error", error.response.data.error, "error");
        });
    },
    validNomina(nomina) {
      var re = /^((N|L|A|n|l|a)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/;
      return re.test(nomina);
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateEmail() {
      if (!this.validEmail(this.userSignUp.email.toLowerCase())) {
        this.isError = true;
        this.errorMsg.email = "Correo inválido";
      } else {
        this.errorMsg.email = "";
      }
    },
    validateName() {
      if (!this.userSignUp["name"]) {
        this.isError = true;
        this.errorMsg.name = "Campo requerido";
      } else {
        this.errorMsg.name = "";
      }
    },
    validateSurname() {
      if (!this.userSignUp["surename"]) {
        this.isError = true;
        this.errorMsg.surname = "Campo requerido";
      } else {
        this.errorMsg.surname = "";
      }
    },
    validatePass() {
      if (!this.userSignUp["password"]) {
        this.isError = true;
        this.errorMsg.password = "Campo requerido";
      } else {
        this.errorMsg.password = "";
      }
    },
    validatePassConfirm() {
      if (!this.userSignUp["pConfirm"]) {
        this.isError = true;
        this.errorMsg.passwordC = "Campo requerido";
      } else if (this.userSignUp.password != this.userSignUp.pConfirm) {
        this.isError = true;
        this.errorMsg.passwordC = "Las contraseñas deben coincidir";
      } else {
        this.errorMsg.passwordC = "";
      }
    },
    validateNomina() {
      this.userSignUp.nomina = this.userSignUp.nomina.toUpperCase();
      if (!this.userSignUp.nomina) {
        this.errorMsg.nomina = "Campo requerido";
      } else if (!this.validNomina(this.userSignUp.nomina)) {
        this.errorMsg.nomina = "Nómina inválida (LXXXXXXXXX, NXXXXXXXX)";
      } else {
        this.errorMsg.nomina = "";
      }
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.customSwalBtn {
  background-color: rgba(214, 130, 47, 1);
  border-left-color: rgba(214, 130, 47, 1);
  border-right-color: rgba(214, 130, 47, 1);
  border: 0;
  border-radius: 3px;
  box-shadow: none;
  color: #fff;
  cursor: pointer;
  font-size: 17px;
  font-weight: 500;
  margin: 30px 5px 0px 5px;
  padding: 10px 32px;
}
h2 {
  color: black;
}
#loginSection {
  border-style: solid;
  border-width: 0px 1px 0px 0px;
  border-color: gray;
}
#loginBG {
  /* background by SVGBackgrounds.com */
    background-color: #6c9c3a;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100%25'%3E%3Cdefs%3E%3ClinearGradient id='a' gradientUnits='userSpaceOnUse' x1='0' x2='0' y1='0' y2='100%25' gradientTransform='rotate(240)'%3E%3Cstop offset='0' stop-color='%237cb342'/%3E%3Cstop offset='1' stop-color='%2342a5f5'/%3E%3C/linearGradient%3E%3Cpattern patternUnits='userSpaceOnUse' id='b' width='540' height='450' x='0' y='0' viewBox='0 0 1080 900'%3E%3Cg fill-opacity='0.1'%3E%3Cpolygon fill='%23444' points='90 150 0 300 180 300'/%3E%3Cpolygon points='90 150 180 0 0 0'/%3E%3Cpolygon fill='%23AAA' points='270 150 360 0 180 0'/%3E%3Cpolygon fill='%23DDD' points='450 150 360 300 540 300'/%3E%3Cpolygon fill='%23999' points='450 150 540 0 360 0'/%3E%3Cpolygon points='630 150 540 300 720 300'/%3E%3Cpolygon fill='%23DDD' points='630 150 720 0 540 0'/%3E%3Cpolygon fill='%23444' points='810 150 720 300 900 300'/%3E%3Cpolygon fill='%23FFF' points='810 150 900 0 720 0'/%3E%3Cpolygon fill='%23DDD' points='990 150 900 300 1080 300'/%3E%3Cpolygon fill='%23444' points='990 150 1080 0 900 0'/%3E%3Cpolygon fill='%23DDD' points='90 450 0 600 180 600'/%3E%3Cpolygon points='90 450 180 300 0 300'/%3E%3Cpolygon fill='%23666' points='270 450 180 600 360 600'/%3E%3Cpolygon fill='%23AAA' points='270 450 360 300 180 300'/%3E%3Cpolygon fill='%23DDD' points='450 450 360 600 540 600'/%3E%3Cpolygon fill='%23999' points='450 450 540 300 360 300'/%3E%3Cpolygon fill='%23999' points='630 450 540 600 720 600'/%3E%3Cpolygon fill='%23FFF' points='630 450 720 300 540 300'/%3E%3Cpolygon points='810 450 720 600 900 600'/%3E%3Cpolygon fill='%23DDD' points='810 450 900 300 720 300'/%3E%3Cpolygon fill='%23AAA' points='990 450 900 600 1080 600'/%3E%3Cpolygon fill='%23444' points='990 450 1080 300 900 300'/%3E%3Cpolygon fill='%23222' points='90 750 0 900 180 900'/%3E%3Cpolygon points='270 750 180 900 360 900'/%3E%3Cpolygon fill='%23DDD' points='270 750 360 600 180 600'/%3E%3Cpolygon points='450 750 540 600 360 600'/%3E%3Cpolygon points='630 750 540 900 720 900'/%3E%3Cpolygon fill='%23444' points='630 750 720 600 540 600'/%3E%3Cpolygon fill='%23AAA' points='810 750 720 900 900 900'/%3E%3Cpolygon fill='%23666' points='810 750 900 600 720 600'/%3E%3Cpolygon fill='%23999' points='990 750 900 900 1080 900'/%3E%3Cpolygon fill='%23999' points='180 0 90 150 270 150'/%3E%3Cpolygon fill='%23444' points='360 0 270 150 450 150'/%3E%3Cpolygon fill='%23FFF' points='540 0 450 150 630 150'/%3E%3Cpolygon points='900 0 810 150 990 150'/%3E%3Cpolygon fill='%23222' points='0 300 -90 450 90 450'/%3E%3Cpolygon fill='%23FFF' points='0 300 90 150 -90 150'/%3E%3Cpolygon fill='%23FFF' points='180 300 90 450 270 450'/%3E%3Cpolygon fill='%23666' points='180 300 270 150 90 150'/%3E%3Cpolygon fill='%23222' points='360 300 270 450 450 450'/%3E%3Cpolygon fill='%23FFF' points='360 300 450 150 270 150'/%3E%3Cpolygon fill='%23444' points='540 300 450 450 630 450'/%3E%3Cpolygon fill='%23222' points='540 300 630 150 450 150'/%3E%3Cpolygon fill='%23AAA' points='720 300 630 450 810 450'/%3E%3Cpolygon fill='%23666' points='720 300 810 150 630 150'/%3E%3Cpolygon fill='%23FFF' points='900 300 810 450 990 450'/%3E%3Cpolygon fill='%23999' points='900 300 990 150 810 150'/%3E%3Cpolygon points='0 600 -90 750 90 750'/%3E%3Cpolygon fill='%23666' points='0 600 90 450 -90 450'/%3E%3Cpolygon fill='%23AAA' points='180 600 90 750 270 750'/%3E%3Cpolygon fill='%23444' points='180 600 270 450 90 450'/%3E%3Cpolygon fill='%23444' points='360 600 270 750 450 750'/%3E%3Cpolygon fill='%23999' points='360 600 450 450 270 450'/%3E%3Cpolygon fill='%23666' points='540 600 630 450 450 450'/%3E%3Cpolygon fill='%23222' points='720 600 630 750 810 750'/%3E%3Cpolygon fill='%23FFF' points='900 600 810 750 990 750'/%3E%3Cpolygon fill='%23222' points='900 600 990 450 810 450'/%3E%3Cpolygon fill='%23DDD' points='0 900 90 750 -90 750'/%3E%3Cpolygon fill='%23444' points='180 900 270 750 90 750'/%3E%3Cpolygon fill='%23FFF' points='360 900 450 750 270 750'/%3E%3Cpolygon fill='%23AAA' points='540 900 630 750 450 750'/%3E%3Cpolygon fill='%23FFF' points='720 900 810 750 630 750'/%3E%3Cpolygon fill='%23222' points='900 900 990 750 810 750'/%3E%3Cpolygon fill='%23222' points='1080 300 990 450 1170 450'/%3E%3Cpolygon fill='%23FFF' points='1080 300 1170 150 990 150'/%3E%3Cpolygon points='1080 600 990 750 1170 750'/%3E%3Cpolygon fill='%23666' points='1080 600 1170 450 990 450'/%3E%3Cpolygon fill='%23DDD' points='1080 900 1170 750 990 750'/%3E%3C/g%3E%3C/pattern%3E%3C/defs%3E%3Crect x='0' y='0' fill='url(%23a)' width='100%25' height='100%25'/%3E%3Crect x='0' y='0' fill='url(%23b)' width='100%25' height='100%25'/%3E%3C/svg%3E");
    background-attachment: fixed;
    background-size: cover;
}
</style>

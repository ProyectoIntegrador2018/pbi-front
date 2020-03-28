<template>
   <div class="fill-height" id="loginBG">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="10" md="8">
                <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col cols="12">
                            <h1 align="center">Restablecer Contraseña</h1>
                        </v-col>
                        <v-col align="left" class="px-0 py-0" cols="9">
                            <p class="my-0">Si has olvidado la contraseña de una cuenta existente, favor de introducir   
                            el correo electrónico asociado a la cuenta y dar clic en 'Recuperar'</p>                
                        </v-col>
                        <v-col cols="9" class="px-0 py-0">
                            <v-row>
                                <v-col cols="7">
                                <v-text-field
                                v-model="userAccount.email"
                                @input="this.emailSet"
                                label="Correo electrónico"
                                single-line
                                solo
                                ></v-text-field>
                                </v-col>
                            </v-row>
                        </v-col>                        
                        <v-col cols="12" class="px-0 py-0" >
                            <v-row class="d-flex flex-row-reverse mx-6 my-0">                                    
                                <v-col cols="4">
                                    <v-btn large block href="/login">
                                        <v-icon align="center" medium >mdi-arrow-left</v-icon>
                                        Cancelar
                                    </v-btn>
                                </v-col>
                                <v-col cols="4">
                                    <v-btn large block color="primary" :disabled="isDisabledButton" @click="this.changePassword">
                                        <v-icon align="center" medium color="white">mdi-email-edit-outline</v-icon>
                                        Recuperar
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
  name: "UserConfirm",
  data () {
      return {
        userAccount: {email:""},
        isDisabledButton: true
      }
    },
  components: {
    
  },
  methods: {
    changePassword(){
        const URL = helper.baseURL + "/requestreset";
        axios
        .post(URL, {"email":this.userAccount.email.toLowerCase()})
        .then(response => {
            this.$swal("Siguiente paso",
            "Revisa tu correo electrónico para actualizar tu contraseña. Remitente: 'pbi.mty.servicios@gmail.com' (En caso de no encontrar el correo, buscar en carpeta de 'Correo no deseado' o 'Junk')",
            "success")
            .then(() => {window.open("/", "_self");})
        }).catch(error=>{  
            this.$swal("Error",error.response.data.error,"error")
        })
        },
    emailSet(){
        if (this.validEmail(this.userAccount.email)) {
        this.isDisabledButton = false
        }else{
        this.isDisabledButton = true
        }
    },
    validEmail(email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }
    
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>
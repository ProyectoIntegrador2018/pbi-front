<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row align="center" justify="center">
            <v-col cols="10" md="8">
                <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col cols="12">
                            <h1 align="center">Cambiar Contraseña</h1>
                        </v-col>
                        <v-col class="px-0 py-0" cols="10">
                                <span class="title"> Correo: </span>
                                <i>{{this.userAccount.email}}</i>
                        </v-col>                        
                        <v-col class="px-0 py-0" cols="10">            
                                <span class="title"> Nómina: </span>
                                <i>{{this.userAccount.nomina}}</i>
                        </v-col>
                        <v-col align="left" class="px-0" cols="10">
                            <p class="my-0 font-weight-light">Introducir nueva contraseña</p>                
                        </v-col>
                        <v-col cols="10" class="px-0 py-0">
                            <v-row justify="center">
                                <v-col cols="7" class="py-0">
                                    <v-text-field
                                        v-model="userAccount.password"
                                        name="passSignIn"
                                        label="Contraseña"
                                        :rules="[rules.min]"
                                        :append-icon="show1 ? 'visibility' : 'visibility_off'"
                                        :type="show1 ? 'text' : 'password'"
                                        @click:append="show1 = !show1"
                                        solo
                                    ></v-text-field>
                                </v-col>
                            </v-row>
                            <v-row justify="center">
                                <v-col cols="7" class="py-0">
                                    <v-text-field
                                        v-model="userAccount.pConfirm"
                                        name="passConfirm"
                                        :rules="[rules.min]"
                                        label="Confirmar Contraseña"
                                        :error-messages = "errorMessage"
                                        :append-icon="show2 ? 'visibility' : 'visibility_off'"
                                        :type="show2 ? 'text' : 'password'"
                                        @click:append="show2 = !show2"
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
                                    <v-btn large block color="primary" @click="this.changePassword">
                                        <v-icon align="center" medium color="white">mdi-content-save-outline</v-icon>
                                        Cambiar
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
        userAccount: {
          email:"",
          password:"",
          pConfirm:"",
          nomina: ""
        },
        rules: {
          required: value => !!value || 'Required.',
          min: v => v.length >= 8 || 'Min 8 characters',},
        errorMessage: "",
        show1: false,
        show2: false,
      }
      
    },
  components: {
    
  },
  methods: {
      changePassword(){
        if (this.userAccount.password != this.userAccount.pConfirm) {
        this.errorMessage = "Las contraseñas deben coincidir"
        return
        }
        const token = this.$route.query.token
        const URL = helper.baseURL + "/resetpassword?token="+token;
        axios
        .post(URL,{token:token,password:this.userAccount.password})
        .then(response => {
            this.$swal("Contraseña restablecida","Se ha modificado tu contraseña","success")
            .then((_) => {
                this.$router.push("/login/")
            })
        }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })
      },
      confirmar(){
        const token = this.$route.query.token
        const URL = helper.baseURL + "/resetpassword?token="+token;
        axios
        .get(URL)
        .then(response => {
            this.userAccount.email = response.data.email
            this.userAccount.nomina = response.data.nomina
        }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })
      }    
    
  },
    created(){
    this.confirmar()
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

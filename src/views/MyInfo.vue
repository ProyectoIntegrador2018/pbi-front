<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col cols="10">
                            <h1 align="center">Mi Información</h1>
                        </v-col>
                                <v-col class="px-0 pt-0" cols="10">
                                <span class="title"> Correo: </span>                     
                                <i>{{this.userAccount.email}}</i>
                        </v-col>      
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Nómina: </span>
                                <i>{{this.userAccount.nomina}}</i>
                        </v-col>         
                        <v-col class="px-0 py-0" cols="10">                                           
                                <span class="title"> Nombre(s): </span>
                                <v-text-field
                                v-model="userAccount.name"                        
                                label="Nombre(s)"
                                single-line
                                solo
                                @change="this.validateName"
                                :errorMessages="this.errorMsg.name"
                                ></v-text-field>
                        </v-col>    
                        <v-col class="px-0 py-0" cols="10">    
                                <!-- {{this.userAccount.surname}}--->       
                                <span class="title"> Apellidos: </span>
                                <v-text-field
                                v-model="userAccount.surname"
                                label="Apellidos"
                                single-line
                                solo
                                @change="this.validateSurname"
                                :errorMessages="this.errorMsg.surname"
                                ></v-text-field>
                        </v-col>                                 
                        <v-col class="px-0 py-0" cols="10">            
                                <span class="title"> Departamento: </span>
                                <v-text-field
                                v-model="userAccount.department"       
                                label="Departamento"
                                single-line
                                solo
                                @change="this.validateDeparment"
                                :errorMessages="this.errorMsg.department"
                                ></v-text-field>
                        </v-col>     
                        <v-col class="px-0 py-0" cols="10">            
                                <span class="title"> Rectoría: </span>
                                <v-select
                                    :items="rectoriasLista"
                                    label="-Selecciona Rectoría-"
                                    v-model="userAccount.rectoria"     
                                    solo
                                    @change="rectoriaSelected" 
                                    :errorMessages="this.errorMsg.rectoria"                                   
                                ></v-select>
                        </v-col>  
                        <v-col class="px-0 py-0" cols="10" >       
                                <span class="title" :style = "rectoriasOtroIsHidden"> Otra Rectoría: </span>
                                <v-text-field
                                v-model="userAccount.otraRectoria"  
                                label="Escribir Rectoria"
                                single-line
                                solo                  
                                :style = "rectoriasOtroIsHidden"      
                                @change="this.validateOtherRectoria"
                                :errorMessages="this.errorMsg.otraRectoria"        
                                ></v-text-field>
                        </v-col>                              
                        <v-col cols="10" class="px-0 py-0" >
                            <v-row class="d-flex flex-row-reverse mx-6 my-0">                                    
                                <v-col cols="4">
                                    <v-btn large block href="/home">
                                     <v-icon align="center" medium >mdi-arrow-left</v-icon>
                                     Regresar
                                    </v-btn>
                                </v-col>
                                <v-col cols="4">                           
                                    <v-btn large block color="primary" @click="saveMyInfo">
                                      <v-icon align="center" medium color="white">mdi-content-save-outline</v-icon>
                                      Guardar
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
        isError: false,
        userAccount: {
          email:"",
          name:"",
          surname:"",
          department:"",
          rectoria:"",
          otraRectoria:"",
          rectoriaToUpload:"",
          nomina: ""
        },        
        errorMsg:{
          name:"",
          surname:"",
          department:"",
          rectoria:"",
          otraRectoria:""
        },
        rectoriasLista: ['Rectoría Tecnológico Monterrey',
                            'Talento y Cultura',
                            'Vicepresidencia de Administración y Finanzas',
                            'Vicepresidencia del Campus',
                            'Vicepresidencia de Relaciones y Desarrollo',
                            'Vicepresidencia Región Norte',
                            'Vicepresidencia de Transformación, Mercadotecnia y Sorteos',
                            'Vicepresidencia de Comunicación e Imagen Instutucional',
                            'EGADE',
                            'NIC',
                            'Programas en línea',
                            'Tec Salud',
                            'Tecmilenio',
                            'Otro'],
        rectoriasOtroIsHidden: "display:none"
      }
    },
  components: {
    
  },
  methods: {
    validateName(){
        if(!this.userAccount["name"]){
          this.isError = true
          this.errorMsg.name = "Campo requerido"
        }else{
          this.errorMsg.name = ""
        }
    },
    validateSurname(){
        if(!this.userAccount["surname"]){
          this.isError = true
          this.errorMsg.surname = "Campo requerido"
        }else{
          this.errorMsg.surname = ""
        }
    },
    validateDeparment(){
        if(!this.userAccount["department"]){
          this.isError = true
          this.errorMsg.department = "Campo requerido"
        }else{
          this.errorMsg.department = ""
        }
    },
    validateRectoria(){
        if(!this.userAccount["rectoria"]){
          this.isError = true
          this.errorMsg.rectoria = "Campo requerido"
        }else{
          this.errorMsg.rectoria = ""
        }
    },
    validateOtherRectoria(){
        if(this.rectoriasOtroIsHidden == "display:flex" && !this.userAccount["otraRectoria"]){
          this.isError = true
          this.errorMsg.otraRectoria = "Campo requerido"
        }else{
          this.errorMsg.otraRectoria = ""
        }
    },
    rectoriaSelected(){
        if (this.userAccount.rectoria == "Otro")
        {
            this.rectoriasOtroIsHidden = "display:flex"
            this.userAccount.rectoriaToUpload = this.userAccount.otraRectoria
        }
        else{
            this.rectoriasOtroIsHidden = "display:none"
            this.userAccount.rectoriaToUpload = this.userAccount.rectoria
        }
        this.validateRectoria      

    },
    confirmar(){
        const token = this.$route.query.token
        const URL = helper.baseURL + "/user";
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .get(URL)
        .then(response => {
            this.userAccount.email = response.data.email
            this.userAccount.nomina = response.data.nomina
            this.userAccount.name = response.data.name
            this.userAccount.surname = response.data.surename            
            this.userAccount.department = response.data.departamento   
            var rectoriaExistsInList = this.rectoriasLista.includes(response.data.rectoria);
            if(rectoriaExistsInList == true)
            {
              this.userAccount.rectoria = response.data.rectoria
            }
            else if(response.data.rectoria)
            {
              this.userAccount.rectoria = "Otro"
              this.rectoriasOtroIsHidden = "display:flex"
              this.userAccount.otraRectoria = response.data.rectoria
            }

        }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })
      },
      saveMyInfo()
      {
        //window.console.log("Entre")
        this.isError = false
        this.validateName()
        this.validateSurname()
        this.validateDeparment()
        this.validateRectoria()
        this.validateOtherRectoria()
        this.rectoriaSelected()
        if(this.isError){
          return
        }
  
        const token = this.$route.query.token
        const URL = helper.baseURL + "/user";
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .put(URL,{token:token,name:this.userAccount.name,surename:this.userAccount.surname,departamento:this.userAccount.department,rectoria:this.userAccount.rectoriaToUpload})
        .then(response => {
            this.$swal("Información Guardada","Se ha actualizado tu Información","success")
            .then((_) => {
                window.open("/home","_self")
            })
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

<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <h1 align="center">Nuevo Expediente Nutricional</h1>
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col class="px-0" cols="10">
                            <h2 align="left">Datos del Paciente</h2>
                        </v-col>
                        <v-col cols="5">
                            <v-row class="px-5">
                                <v-col class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Matrícula/Nómina: </span>
                                        <v-text-field
                                        v-model="patientInfo.nomina"                        
                                        label="L0XXXXXXX / A0XXXXXXX"
                                        single-line
                                        solo
                                        @change="this.validateNomina"
                                        :errorMessages="this.errorPatientInfo.nomina"
                                        ></v-text-field>
                                </v-col> 
                                <v-col class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Nombre(s): </span>
                                        <v-text-field
                                        v-model="patientInfo.name"                        
                                        label="Nombre(s)"
                                        single-line
                                        solo
                                        @change="this.validateName"
                                        :errorMessages="this.errorPatientInfo.name"
                                        ></v-text-field>
                                </v-col>    
                                <v-col class="px-0 py-0" cols="12">    
                                        <!-- {{this.patientInfo.surname}}--->       
                                        <span class="subtitle-1"> Apellidos: </span>
                                        <v-text-field
                                        v-model="patientInfo.surname"
                                        label="Apellidos"
                                        single-line
                                        solo
                                        @change="this.validateSurname"
                                        :errorMessages="this.errorPatientInfo.surname"
                                        ></v-text-field>
                                </v-col>      
                                <v-col class="px-0 py-0" cols="12">
                                        <span class="subtitle-1"> Fecha de Nacimiento: </span> 
                                        <v-menu
                                        ref="menu"
                                        v-model="menu"                                        
                                        :close-on-content-click="false"
                                        :return-value.sync="patientInfo.dateOfBirth"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="patientInfo.dateOfBirth"                                            
                                            required
                                            :rules="dobRules"
                                            label="Fecha de Nacimiento"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="patientInfo.dateOfBirth"
                                            :max="this.currentDate"
                                            no-subtitle-1
                                            scrollable
                                            locale="es"
                                            @change="this.validateDateOfBirth"
                                        >
                                            <div class="flex-grow-1"></div>
                                            <v-btn text color="primary" @click="menu= false">Cancel</v-btn>
                                            <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menu.save(patientInfo.dateOfBirth)"
                                            >OK</v-btn>
                                        </v-date-picker>
                                        </v-menu>
                                </v-col> 
                                <v-col class="px-0 pt-0" cols="10">            
                                    <span class="subtitle-1"> Edad: </span>
                                    {{this.patientInfo.age}}
                                </v-col>
                                <v-col class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Correo: </span>
                                        <v-text-field
                                        v-model="patientInfo.email"                        
                                        label="ejemplo@ejemplo.com"
                                        single-line
                                        solo
                                        @change="this.validateEmail"
                                        :errorMessages="this.errorPatientInfo.email"
                                        ></v-text-field>
                                </v-col>                            
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Carrera / Departamento: </span>
                                        <v-text-field
                                        v-model="patientInfo.department"       
                                        label="Carrera / Departamento"
                                        single-line
                                        solo
                                        @change="this.validateDepartment"
                                        :errorMessages="this.errorPatientInfo.department"
                                        ></v-text-field>
                                </v-col>     
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Género: </span>
                                        <v-select
                                            :items="genderOptions"
                                            label="-Selecciona Género-"
                                            v-model="patientInfo.gender"     
                                            solo
                                            @change="this.validateGender" 
                                            :errorMessages="this.errorPatientInfo.gender"                                   
                                        ></v-select>
                                </v-col>  
                            </v-row>
                        </v-col>
                        <v-col cols="5">
                            <v-row class="px-5">                                
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Tipo de Paciente: </span>
                                        <v-select
                                            :items="patientTypeOptions"
                                            label="-Selecciona Tipo-"
                                            v-model="patientInfo.patientType"     
                                            solo
                                            @change="this.validatePatientType" 
                                            :errorMessages="this.errorPatientInfo.patientType"                                   
                                        ></v-select>
                                </v-col> 
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Clase: </span>
                                        <v-select
                                            :items="courseOptions"
                                            label="-Selecciona Clase-"
                                            v-model="patientInfo.course"     
                                            solo
                                            @change="this.validateCourse" 
                                            :errorMessages="this.errorPatientInfo.course"                                   
                                        ></v-select>
                                </v-col>     
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Objetivo: </span>
                                        <v-select
                                            :items="goalsOptions"
                                            label="-Selecciona Objetivo-"
                                            v-model="patientInfo.goal"     
                                            solo
                                            @change="this.validateGoal" 
                                            :errorMessages="this.errorPatientInfo.goal"                                   
                                        ></v-select>
                                </v-col>
                                <v-col v-if="patientInfo.goal === 'Otro'" class="px-0 pl-10 py-0" cols="12">            
                                        <span class="subtitle-1"> Otro Objetivo: </span>
                                        <v-text-field
                                        v-model="patientInfo.otherGoal"                        
                                        label="Objetivo"
                                        single-line
                                        solo
                                        @change="this.validateOtherGoal"
                                        :errorMessages="this.errorPatientInfo.otherGoal"
                                        ></v-text-field>
                                </v-col>                      
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Programa: </span>
                                        <v-select
                                            :items="programOptions"
                                            label="-Selecciona Programa-"
                                            v-model="patientInfo.program"     
                                            solo
                                            @change="this.validateProgram" 
                                            :errorMessages="this.errorPatientInfo.program"                                   
                                        ></v-select>
                                </v-col>  
                                <v-col v-if="patientInfo.program === 'Otro'" class="px-0 pl-10 py-0" cols="12">            
                                        <span class="subtitle-1"> Otro Programa: </span>
                                        <v-text-field
                                        v-model="patientInfo.otherProgram"                        
                                        label="Programa"
                                        single-line
                                        solo
                                        @change="this.validateOtherProgram"
                                        :errorMessages="this.errorPatientInfo.otherProgram"
                                        ></v-text-field>
                                </v-col>  
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Talla: </span>
                                        <v-text-field
                                        v-model="patientInfo.size"       
                                        label="Talla"
                                        single-line
                                        solo
                                        @change="this.validateSize"
                                        :errorMessages="this.errorPatientInfo.size"
                                        ></v-text-field>
                                </v-col>   
                            </v-row>
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
        menu: false,
        currentDate: "",
        dobRules: [v => !!v || "Fecha requerida"],
        patientInfo: {
            nomina:"",
            name:"",
            surname:"",
            dateOfBirth:"",
            age:"",
            email:"",
            department:"",
            gender:"",
            patientType:"",
            course:"",
            goal:"",
            otherGoal:"",
            program:"",
            otherProgram:"",
            size:""
        },        
        errorPatientInfo:{
            nomina:"",
            name:"",
            surname:"",
            email:"",
            gender:"",
            course:"",
            patientType:"",
            goal:"",
            otherGoal:"",
            program:"",
            otherProgram:"",
            size:""
        },
        genderOptions: [
            'Hombre',
            'Mujer',
            'Otro'
        ],        
        patientTypeOptions: [
            'Colaborador',
            'Alumnos'
        ],
        courseOptions: [
            'AFG', 
            'AFP', 
            'Body Sculpt', 
            'Fitness',
            'Tenis',
            'Yoga',
            'Zumba', 
            'Prosalud', 
            'Box',
            'Natación', 
            'Baloncesto', 
            'Cicismo/Fitness', 
            'Cicilismo',
            'Escalada',
            'Evaluaciones Médicas', 
            'Líderes',
            'Consulta en lína', 
            'Karate',
            'Cupón',
            'Análisis Corporal'            
        ],
        goalsOptions: [
            'Bajar de Peso', 
            'Subir Masa Muscular', 
            'Cambio de hábitos',
            'Control de Embarazo', 
            'Bajar % grasa',
            'Subir de peso',
            'Otro'
        ],
        programOptions: [
            'PBI',
            'CG', 
            'Cortesía', 
            'Clase deportiva', 
            'Intramuros', 
            'Representativos', 
            'Ev. Médica',
            'Líderes',
            'Otro'
        ]
      }
    },
  components: {
    
  },
  methods: {
    getCurrentDate(){
        var today = new Date();
        this.currentDate= today.toISOString().substr(0, 10)
    },
    dateStringToDate(date) {
        var parts =date.split('-');
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
        return mydate;
    },
    validNomina(nomina) {
      var re = /^((N|L|A|n|l|a)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/;
      return re.test(nomina);
    },
    validateNomina(){
      this.patientInfo.nomina = this.patientInfo.nomina.toUpperCase();
      if (!this.patientInfo.nomina) {
        this.errorPatientInfo.nomina = "Campo requerido";
      } else if (!this.validNomina(this.patientInfo.nomina)) {
        this.errorPatientInfo.nomina = "Nómina inválida (LXXXXXXXXX, AXXXXXXXX)";
      } else {
        this.errorPatientInfo.nomina = "";
      }
    },
    validateName(){
        if(!this.patientInfo["name"]){
          this.isError = true
          this.errorPatientInfo.name = "Campo requerido"
        }else{
          this.errorPatientInfo.name = ""
        }
    },
    validateSurname(){
        if(!this.patientInfo["surname"]){
          this.isError = true
          this.errorPatientInfo.surname = "Campo requerido"
        }else{
          this.errorPatientInfo.surname = ""
        }
    },
    calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    validateDateOfBirth(){
        if(!this.patientInfo["dateOfBirth"]){
          this.isError = true
        }
        else{
            this.patientInfo.age = this.calculateAge(this.dateStringToDate(this.patientInfo.dateOfBirth))
        }
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateEmail(){
        if (!this.validEmail(this.patientInfo.email.toLowerCase())) {
        this.isError = true;
        this.errorPatientInfo.email = "Correo inválido";
      } else {
        this.errorPatientInfo.email = "";
      }
    },
    validateDepartment(){
        if(!this.patientInfo["department"]){
          this.isError = true
          this.errorPatientInfo.department = "Campo requerido"
        }else{
          this.errorPatientInfo.department = ""
        }
    },
    validateGender(){
        if(!this.patientInfo["gender"]){
          this.isError = true
          this.errorPatientInfo.gender = "Campo requerido"
        }else{
          this.errorPatientInfo.gender = ""
        }
    },    
    validatePatientType(){
        if(!this.patientInfo["patientType"]){
          this.isError = true
          this.errorPatientInfo.patientType = "Campo requerido"
        }else{
          this.errorPatientInfo.patientType = ""
        }
    },
    validateCourse(){
        if(!this.patientInfo["course"]){
          this.isError = true
          this.errorPatientInfo.course = "Campo requerido"
        }else{
          this.errorPatientInfo.course = ""
        }
    },
    validateGoal(){
        if(!this.patientInfo["goal"]){
          this.isError = true
          this.errorPatientInfo.goal = "Campo requerido"
        }else{
          this.errorPatientInfo.goal = ""
        }
    },    
    validateOtherGoal(){
        if(this.patientInfo.goal === "Otro" && !this.patientInfo.otherGoal){
          this.isError = true
          this.errorPatientInfo.otherGoal = "Campo requerido"
        }else{
          this.errorPatientInfo.otherGoal = ""
        }
    },
    validateProgram(){
        if(!this.patientInfo["program"]){
          this.isError = true
          this.errorPatientInfo.program = "Campo requerido"
        }else{
          this.errorPatientInfo.program = ""
        }
    },
    validateOtherProgram(){
        if(this.patientInfo.program === "Otro" && !this.patientInfo.otherProgram){
          this.isError = true
          this.errorPatientInfo.otherProgram = "Campo requerido"
        }else{
          this.errorPatientInfo.otherProgram = ""
        }
    },
    validateSize(){
        if(!this.patientInfo["size"]){
          this.isError = true
          this.errorPatientInfo.size = "Campo requerido"
        }else{
          this.errorPatientInfo.size = ""
        }
    },
    confirmar(){
      },
      saveMyInfo()
      {
      }
  },
    created(){
    this.confirmar()
    this.getCurrentDate()
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

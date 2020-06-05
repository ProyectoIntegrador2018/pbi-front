<template>
   <div>
     <nutriheader title="Expediente Nutricional" secondRoute="/nutricion/pacientes"></nutriheader>
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col class="px-0" cols="10">
                            <h2 align="left">Datos del Paciente</h2>
                        </v-col>
                        <v-col cols="5">
                            <v-row class="px-5">
                                <v-col class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Matrícula/Nómina: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.nomina"                        
                                        label="L0XXXXXXX / A0XXXXXXX"
                                        single-line
                                        solo
                                        :disabled="this.willUpdateInfo"
                                        @change="this.validateNomina"
                                        :errorMessages="this.errorPatient.nomina"
                                        ></v-text-field>
                                </v-col> 
                                <v-col v-if="!willUpdateInfo" class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Confirmar Matrícula/Nómina: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.confirmNomina"                        
                                        label="L0XXXXXXX / A0XXXXXXX"
                                        single-line
                                        solo
                                        @change="this.validateConfirmNomina"
                                        :errorMessages="this.errorPatient.confirmNomina"
                                        ></v-text-field>
                                </v-col>
                                <v-col class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Nombre(s): <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.name"                        
                                        label="Nombre(s)"
                                        single-line
                                        solo
                                        @change="this.validateName"
                                        :errorMessages="this.errorPatient.name"
                                        ></v-text-field>
                                </v-col>    
                                <v-col class="px-0 py-0" cols="12">    
                                        <!-- {{this.patient.surname}}--->       
                                        <span class="subtitle-1"> Apellidos: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.surname"
                                        label="Apellidos"
                                        single-line
                                        solo
                                        @change="this.validateSurname"
                                        :errorMessages="this.errorPatient.surname"
                                        ></v-text-field>
                                </v-col>      
                                <v-col class="px-0 py-0" cols="12">
                                        <span class="subtitle-1"> Fecha de Nacimiento: <span class="red--text">*</span></span> 
                                        <v-menu
                                        ref="menu"                                                          
                                        :close-on-content-click="false"
                                        :return-value.sync="patient.dateOfBirth"
                                        transition="scale-transition"
                                        offset-y
                                        min-width="290px"
                                        >
                                        <template v-slot:activator="{ on }">
                                            <v-text-field
                                            v-model="patient.dateOfBirth"                                            
                                            required
                                            :rules="dobRules"         
                                            label="Fecha de Nacimiento"
                                            prepend-icon="event"
                                            readonly
                                            v-on="on"
                                            ></v-text-field>
                                        </template>
                                        <v-date-picker
                                            v-model="patient.dateOfBirth"
                                            :max="this.currentDate"
                                            no-subtitle-1
                                            scrollable                                            
                                            @change="this.validateDateOfBirth"
                                            locale="es"
                                        >
                                            <div class="flex-grow-1"></div>
                                            <v-btn text color="primary" @click="menu= false">Cancel</v-btn>
                                            <v-btn
                                            text
                                            color="primary"
                                            @click="$refs.menu.save(patient.dateOfBirth)"
                                            >OK</v-btn>
                                        </v-date-picker>
                                        </v-menu>
                                </v-col> 
                                <v-col class="px-0 pt-0" cols="12">  
                                  <span class="subtitle-1"> Edad: </span>
                                        <v-text-field
                                        v-model="this.patient.age"                        
                                        label="-"
                                        single-line
                                        solo
                                        disabled
                                        :errorMessages="this.errorPatient.age"
                                        ></v-text-field>                                              
                                </v-col>
                                <v-col class="px-0 py-0" cols="12">                                           
                                        <span class="subtitle-1"> Correo: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.email"                        
                                        label="ejemplo@ejemplo.com"
                                        single-line
                                        solo
                                        @change="this.validateEmail"
                                        :errorMessages="this.errorPatient.email"
                                        ></v-text-field>
                                </v-col>                            
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Carrera / Departamento: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.department"       
                                        label="Carrera / Departamento"
                                        single-line
                                        solo
                                        @change="this.validateDepartment"
                                        :errorMessages="this.errorPatient.department"
                                        ></v-text-field>
                                </v-col>     
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Género: <span class="red--text">*</span></span>
                                        <v-select
                                            :items="genderOptions"
                                            label="-Selecciona Género-"
                                            v-model="patient.gender"     
                                            solo
                                            @change="this.validateGender" 
                                            :errorMessages="this.errorPatient.gender"                                   
                                        ></v-select>
                                </v-col>  
                            </v-row>
                        </v-col>
                        <v-col cols="5">
                            <v-row class="px-5">                                
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Tipo de Paciente: <span class="red--text">*</span></span>
                                        <v-select
                                            :items="patientTypeOptions"
                                            label="-Selecciona Tipo-"
                                            v-model="patient.patientType"     
                                            solo
                                            @change="this.validatePatientType" 
                                            :errorMessages="this.errorPatient.patientType"                                   
                                        ></v-select>
                                </v-col> 
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Clase: <span class="red--text">*</span></span>
                                        <v-select
                                            :items="courseOptions"
                                            label="-Selecciona Clase-"
                                            v-model="patient.course"     
                                            solo
                                            @change="this.validateCourse" 
                                            :errorMessages="this.errorPatient.course"                                   
                                        ></v-select>
                                </v-col> 
                                <v-col v-if="patient.course === 'Otro'" class="px-0 pl-10 py-0" cols="12">            
                                        <span class="subtitle-1"> Otra Clase: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.otherCourse"                        
                                        label="Clase"
                                        single-line
                                        solo
                                        @change="this.validateOtherCourse"
                                        :errorMessages="this.errorPatient.otherCourse"
                                        ></v-text-field>
                                </v-col>    
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Objetivo: <span class="red--text">*</span></span>
                                        <v-select
                                            :items="goalsOptions"
                                            label="-Selecciona Objetivo-"
                                            v-model="patient.goal"     
                                            solo
                                            @change="this.validateGoal" 
                                            :errorMessages="this.errorPatient.goal"                                   
                                        ></v-select>
                                </v-col>
                                <v-col v-if="patient.goal === 'Otro'" class="px-0 pl-10 py-0" cols="12">            
                                        <span class="subtitle-1"> Otro Objetivo: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.otherGoal"                        
                                        label="Objetivo"
                                        single-line
                                        solo
                                        @change="this.validateOtherGoal"
                                        :errorMessages="this.errorPatient.otherGoal"
                                        ></v-text-field>
                                </v-col>                      
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Programa: <span class="red--text">*</span></span>
                                        <v-select
                                            :items="programOptions"
                                            label="-Selecciona Programa-"
                                            v-model="patient.program"     
                                            solo
                                            @change="this.validateProgram" 
                                            :errorMessages="this.errorPatient.program"                                   
                                        ></v-select>
                                </v-col>  
                                <v-col v-if="patient.program === 'Otro'" class="px-0 pl-10 py-0" cols="12">            
                                        <span class="subtitle-1"> Otro Programa: <span class="red--text">*</span></span>
                                        <v-text-field
                                        v-model="patient.otherProgram"                        
                                        label="Programa"
                                        single-line
                                        solo
                                        @change="this.validateOtherProgram"
                                        :errorMessages="this.errorPatient.otherProgram"
                                        ></v-text-field>
                                </v-col>  
                                <v-col class="px-0 py-0" cols="12">            
                                        <span class="subtitle-1"> Talla: </span>
                                        <v-text-field
                                        v-model="patient.size"       
                                        label="Talla"
                                        single-line
                                        solo
                                        :errorMessages="this.errorPatient.size"
                                        ></v-text-field>
                                </v-col>   
                            </v-row>
                        </v-col>  
                        <v-col cols="10" class="px-0 py-0" >
                            <v-row class="d-flex flex-row-reverse mx-6 my-0">                                
                                <v-col cols="7">                           
                                    <v-btn large block color="primary" @click="saveMyInfo">
                                    <v-icon align="center" medium color="white">mdi-content-save-outline</v-icon>
                                    Guardar e ir a Antecedentes Médicos
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
import nutriheader from "../components/nutriheader.vue";
const helper = require("../helper.js");
import axios from "axios";

export default {
  name: "UserConfirm",
  components: {
    nutriheader
  },
  data () {
      return {
        isError: false,
        menu: false,
        currentDate: "",
        dobRules: [v => !!v || "Fecha requerida"],
        willUpdateInfo: false,   
        userId: "",             
        patient: {
            nomina:"",
            confirmNomina:"",
            name:"",
            surname:"",
            dateOfBirth:"",
            age:"",
            email:"",
            department:"",
            gender:"",
            patientType:"",
            course:"",
            otherCourse:"",
            courseToUpload:"",
            goal:"",
            otherGoal:"",
            goalToUpload:"",
            program:"",
            otherProgram:"",
            programToUpload:"",
            size:""
        },        
        errorPatient:{
            nomina:"",
            confirmNomina:"",
            name:"",
            surname:"",
            age:"",
            email:"",
            gender:"",
            course:"",
            otherCourse:"",
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
            'Acondicionamiento Fisico General',
            'Basquetbol mixto',
            'Body Sculpt',
            'Box',
            'Ciclismo Indoor',
            'Escalada',
            'Fight Do',
            'Fit & Dance',
            'Futbol Soccer varonil',
            'Natación principiante',
            'Natación intermedio',
            'Tenis principiante',
            'Tenis intermedio',
            'Personalizado',
            'Prosalud',
            'Gimnasio libre acceso',
            'Voleibol mixto',
            'Yoga',
            'Zumba', 
            'Otro'            
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
  methods: {
    dateToString(date){
      var dateString = date.toISOString().substr(0, 10)
      return dateString
    },
    getCurrentDate(){
        var today = new Date();
        this.currentDate = this.dateToString(today)
    },    
    dateStringToDate(date) {
        var parts =date.split('-');
        var mydate = new Date(parts[0], parts[1] - 1, parts[2]); 
        return mydate;
    },
    validNomina(nomina) {
      if(nomina.length != 9)
      {
        return false
      }
      var re = /^((N|L|A|n|l|a)[0-9][0-9][0-9][0-9][0-9][0-9][0-9][0-9])/;
      return re.test(nomina);
    },
    validateNomina(){
      this.patient.nomina = this.patient.nomina.toUpperCase();
      if (!this.patient["nomina"]) {
        this.errorPatient.nomina = "Campo requerido";
        this.isError = true
      } else if (!this.validNomina(this.patient.nomina)) {
        this.errorPatient.nomina = "Nómina inválida (LXXXXXXXXX, AXXXXXXXX)";
        this.isError = true
      } else {
        this.errorPatient.nomina = "";
      }
      this.validateConfirmNomina()
    },
    validateConfirmNomina(){
      if(!this.willUpdateInfo){
        if (!this.patient["confirmNomina"]) {
          this.isError = true;
          this.errorPatient.confirmNomina = "Campo requerido";
        } else if (this.patient["nomina"] != this.patient["confirmNomina"]) {
          this.isError = true;
          this.errorPatient.confirmNomina = "Las nóminas deben coincidir";
        } else {
          this.errorPatient.confirmNomina = "";
        }
      }
    },
    validateName(){
        if(!this.patient["name"]){  
          this.isError = true
          this.errorPatient.name = "Campo requerido"
        }else{
          this.errorPatient.name = ""
        }
    },
    validateSurname(){
        if(!this.patient["surname"]){
          this.isError = true
          this.errorPatient.surname = "Campo requerido"
        }else{
          this.errorPatient.surname = ""
        }
    },
    calculateAge(birthday) { // birthday is a date
        var ageDifMs = Date.now() - birthday.getTime();
        var ageDate = new Date(ageDifMs); 
        return Math.abs(ageDate.getUTCFullYear() - 1970);
    },
    validateDateOfBirth(){
        if(!this.patient["dateOfBirth"]){
          this.isError = true
          this.errorPatient.age = "Campo requerido"
        }
        else{
            this.patient.age = this.calculateAge(this.dateStringToDate(this.patient.dateOfBirth))
        }
    },
    validEmail(email) {
      var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return re.test(email);
    },
    validateEmail(){
        if (!this.validEmail(this.patient.email.toLowerCase())) {
        this.isError = true;
        this.errorPatient.email = "Correo inválido";
      } else {
        this.errorPatient.email = "";
      }
    },
    validateDepartment(){
        if(!this.patient["department"]){
          this.isError = true
          this.errorPatient.department = "Campo requerido"
        }else{
          this.errorPatient.department = ""
        }
    },
    validateGender(){
        if(!this.patient["gender"]){
          this.isError = true
          this.errorPatient.gender = "Campo requerido"
        }else{
          this.errorPatient.gender = ""
        }
    },    
    validatePatientType(){
        if(!this.patient["patientType"]){
          this.isError = true
          this.errorPatient.patientType = "Campo requerido"
        }else{
          this.errorPatient.patientType = ""
        }
    },
    validateCourse(){
        if(!this.patient["course"]){
          this.isError = true
          this.errorPatient.course = "Campo requerido"
        }else{
          this.errorPatient.course = ""
          if(this.patient["course"] != "Otro"){
            this.patient["courseToUpload"] = this.patient["course"] 
          }          
        }
    },
    validateOtherCourse(){
        if(this.patient["course"] === "Otro" && !this.patient.otherCourse){
          this.isError = true
          this.errorPatient.otherCourse = "Campo requerido"
        }else{
          this.errorPatient.otherCourse = ""
          if(this.patient["course"] === "Otro"){
            this.patient["courseToUpload"] = this.patient["otherCourse"]  
          }
        }        
    },
    validateGoal(){
        if(!this.patient["goal"]){
          this.isError = true
          this.errorPatient.goal = "Campo requerido"
        }else{
          this.errorPatient.goal = ""
          if(this.patient["goal"] != "Otro"){
            this.patient["goalToUpload"] = this.patient["goal"] 
          }          
        }
    },    
    validateOtherGoal(){
        if(this.patient["goal"] === "Otro" && !this.patient.otherGoal){
          this.isError = true
          this.errorPatient.otherGoal = "Campo requerido"
        }else{
          this.errorPatient.otherGoal = ""
          if(this.patient["goal"] === "Otro"){
            this.patient["goalToUpload"] = this.patient["otherGoal"]  
          }
        }
        
    },
    validateProgram(){
        if(!this.patient["program"]){
          this.isError = true
          this.errorPatient.program = "Campo requerido"
        }else{
          this.errorPatient.program = ""
          if(this.patient["program"] != "Otro"){
            this.patient["programToUpload"] = this.patient["program"]
          }          
        }
    },
    validateOtherProgram(){
        if(this.patient["program"] === "Otro" && !this.patient.otherProgram){
          this.isError = true
          this.errorPatient.otherProgram = "Campo requerido"
        }else{
          this.errorPatient.otherProgram = ""
          if(this.patient["program"] === "Otro"){
            this.patient["programToUpload"] = this.patient["otherProgram"]
          }
        }
    },
    getParameterByName(name, url) {
      if (!url) url = window.location.href;
      name = name.replace(/[\[\]]/g, '\\$&');
      var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
          results = regex.exec(url);
      if (!results) return null;
      if (!results[2]) return '';
      return decodeURIComponent(results[2].replace(/\+/g, ' '));
    },
    updateView(){
      if(this.getParameterByName("id", window.location)===null)
      {
          this.willUpdateInfo = false;          
      }
      else{
        this.willUpdateInfo = true; 
        this.userId = this.getParameterByName("id", window.location);     
        this.loadInfo()
      }
    },
    loadInfo(){
      const token = this.$route.query.token
        const URL = helper.baseURL + "/nutricion/records/"+this.userId;
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .get(URL)
        .then(response => {
          const history = response.data
            this.patient.nomina = history.matricula
            this.patient.name = history.name
            this.patient.surname = history.surname
            this.patient.dateOfBirth = history.birthdate.substr(0, 10)
            this.patient.age = this.calculateAge(this.dateStringToDate(this.patient.dateOfBirth))            
            this.patient.email = history.email
            this.patient.department = history.mayorArea
            this.patient.gender = history.gender
            this.patient.patientType = history.patientType
            
            var courseExistsInList = this.courseOptions.includes(history.class);
            if(courseExistsInList == true)
            {
              this.patient.course = history.class
            }
            else if(history.class)
            {
              this.patient.course = "Otro"
              this.patient.otherCourse = history.class
            }

            var goalExistsInList = this.goalsOptions.includes(history.goal);
            if(goalExistsInList == true)
            {
              this.patient.goal = history.goal
            }
            else if(history.goal)
            {
              this.patient.goal = "Otro"
              this.patient.otherGoal = history.goal
            }

            var programExistsInList = this.programOptions.includes(history.program);
            if(programExistsInList == true)
            {
              this.patient.program = history.program
            }
            else if(history.program)
            {
              this.patient.program = "Otro"
              this.patient.otherProgram = history.program
            }
            this.patient.size = history.size
          
      }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })
    },
    saveMyInfo(){
      if(this.willUpdateInfo){
        this.saveMyInfoUpdate()
      }
      else{
        this.saveMyInfoCreateNew()
      }
    },
    saveMyInfoUpdate(){      
      this.isError = false
      this.validateNomina()
      this.validateName()
      this.validateSurname()
      this.validateDateOfBirth()
      this.validateEmail()
      this.validateDepartment()
      this.validateGender()
      this.validatePatientType()
      this.validateCourse()
      this.validateOtherCourse()
      this.validateGoal()
      this.validateOtherGoal()
      this.validateOtherProgram()      
      this.validateProgram()
      this.validateOtherProgram()
      if(this.isError){
        this.$swal("Error","Favor de verificar todos los campos","error")
        return
      }
      const URL = helper.baseURL + "/nutricion/records/"+this.userId;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      axios
      .put(URL,
        {
        matricula: this.patient.nomina.toLowerCase(),
        name: this.patient.name,
        surname: this.patient.surname,
        birthdate: this.patient.dateOfBirth,
        email: this.patient.email.toLowerCase(),
        mayorArea: this.patient.department,
        gender: this.patient.gender,
        patientType: this.patient.patientType,
        class: this.patient["courseToUpload"],
        goal: this.patient["goalToUpload"],
        program: this.patient["programToUpload"],
        size: this.patient.size
        }
      )
      .then(response => {
          var userId = response.data._id
          this.$swal("Información Guardada","Se ha actualizado la Información del Paciente","success")
          .then((_) => {
              window.open("./expedientemedico?id="+userId,"_self")
          })
      }).catch(error =>{
          this.$swal("Error",error.response.data.error,"error")
      })
    },
    saveMyInfoCreateNew()
    {      
      this.isError = false
      this.validateNomina()
      this.validateName()
      this.validateSurname()
      this.validateDateOfBirth()
      this.validateEmail()
      this.validateDepartment()
      this.validateGender()
      this.validatePatientType()
      this.validateCourse()
      this.validateOtherCourse()
      this.validateGoal()
      this.validateOtherGoal()
      this.validateOtherProgram()      
      this.validateProgram()
      this.validateOtherProgram()
      if(this.isError){
        this.$swal("Error","Favor de verificar todos los campos","error")
        return
      }
      const URL = helper.baseURL + "/nutricion/records";
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      axios
      .post(URL,
        {
        matricula: this.patient.nomina.toLowerCase(),
        name: this.patient.name,
        surname: this.patient.surname,
        birthdate: this.patient.dateOfBirth,
        email: this.patient.email.toLowerCase(),
        mayorArea: this.patient.department,
        gender: this.patient.gender,
        patientType: this.patient.patientType,
        class: this.patient["courseToUpload"],
        goal: this.patient["goalToUpload"],
        program: this.patient["programToUpload"],
        size: this.patient.size
        }
      )
      .then(response => {
          var newUserId = response.data._id
          this.$swal("Información Guardada","Se ha registrado la Información del Paciente","success")
          .then((_) => {
              window.open("./expedientemedico?id="+newUserId,"_self")
          })
      }).catch(error =>{
          this.$swal("Error",error.response.data.error,"error")
      })
    }
  },
    created(){    
    this.updateView()
    this.getCurrentDate()
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

<template>
   <div>
     <nutriheader title="Expediente Médico" :secondRoute="this.routePatientData"></nutriheader>
      <v-container class="fill-height">        
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col class="px-0" cols="10">
                            <h2 align="left">Antecedentes Médicos</h2>
                        </v-col>
                            <v-col class="px-0 pt-0" cols="10">  
                                <span class="subtitle-1"> Antecedentes patológicos familiares </span>
                                <v-row>
                                    <v-col cols="4" >
                                        <v-checkbox v-for="item in BackgroundListCol1" :key="item" class ="my-0" v-model=patient.familyBackground :label="item" :value="item"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4" >
                                        <v-checkbox v-for="item in BackgroundListCol2" :key="item" class ="my-0" v-model=patient.familyBackground :label="item" :value="item"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox v-for="item in BackgroundListCol3" :key="item" class ="my-0" v-model=patient.familyBackground :label="item" :value="item"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.otherFamilyBackgroundChecked label="Otro" value="Otro"></v-checkbox>
                                        <template v-if="patient.otherFamilyBackgroundChecked === 'Otro'" >
                                            <v-text-field
                                            v-model="patient.otherFamilyBackground"                                    
                                            label="Otro Antecedente"
                                            @change="this.validateOtherFamilyBackground"
                                            :errorMessages="this.errorPatient.otherFamilyBackground"
                                            single-line
                                            solo             
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-col>
                                </v-row>  
                                <v-divider class="py-2"></v-divider>      
                            </v-col>  
                            
                            <v-col class="px-0 pt-0" cols="10">  
                                <span class="subtitle-1"> Antecedentes patológicos personales </span>
                                <v-row>
                                    <v-col cols="4">
                                        <v-checkbox v-for="item in BackgroundListCol1" :key="item" class ="my-0" v-model=patient.personalBackground :label="item" :value="item"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox v-for="item in BackgroundListCol2" :key="item" class ="my-0" v-model=patient.personalBackground :label="item" :value="item"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox v-for="item in BackgroundListCol3" :key="item" class ="my-0" v-model=patient.personalBackground :label="item" :value="item"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.otherPersonalBackgroundChecked label="Otro" value="Otro"></v-checkbox>
                                        <template v-if="patient.otherPersonalBackgroundChecked === 'Otro'" >
                                            <v-text-field
                                            v-model="patient.otherPersonalBackground"                                    
                                            label="Otro Antecedente"                                            
                                            @change="this.validateOtherPersonalBackground"
                                            :errorMessages="this.errorPatient.otherPersonalBackground"
                                            single-line
                                            solo             
                                            >
                                            </v-text-field>
                                        </template>
                                    </v-col>
                                </v-row>  
                                <v-divider class="py-2"></v-divider>      
                            </v-col> 
                            <v-col class="px-0" cols="10">
                                <h2 align="left">Estilo de vida </h2>
                            </v-col>
                            <v-col class="px-0 py-0" cols="10">                                           
                                <span class="subtitle-1"> Actividad Física: <span class="red--text">*</span></span>
                                <v-textarea
                                    solo
                                    name="input-7-4"
                                    label="Actividad Física"
                                    v-model="patient.physicalActivity"  
                                    @change="this.validatePhysicalActivity"
                                    :errorMessages="this.errorPatient.physicalActivity" 
                                ></v-textarea>                                        
                            </v-col>
                            <v-col class="py-0" cols="10">
                              <v-row>
                                <v-col class="px-0 py-0" cols="6">
                                    <span class="subtitle-1"> ¿Cuántos días a la semana?: <span class="red--text">*</span></span>
                                     <v-text-field
                                      v-model="patient.activityFrequency"
                                      label="Frecuencia"
                                      single-line
                                      solo
                                      @change="this.validateActivityFrequency"
                                      :errorMessages="this.errorPatient.activityFrequency"
                                      ></v-text-field>
                                </v-col>
                                <v-col class="py-0" cols="6">
                                    <span class="subtitle-1"> Duración: <span class="red--text">*</span></span>
                                    <v-row>
                                      <v-col class="pr-0 py-0" cols="5">
                                        <v-text-field
                                        v-model="patient.durationHours"
                                        label="Horas"
                                        single-line
                                        solo
                                        @change="this.validateDurationHours"
                                        :errorMessages="this.errorPatient.durationHours"
                                        ></v-text-field>                                           
                                      </v-col>
                                      <v-col class="py-0 caption" align="center" cols="1">
                                        :                                      
                                      </v-col>                                      
                                      <v-col class="pl-0 py-0" cols="5">                             
                                        <v-text-field
                                        v-model="patient.durationMinutes"
                                        label="Minutos"
                                        single-line
                                        solo
                                        @change="this.validateDurationMinutes"
                                        :errorMessages="this.errorPatient.durationMinutes"
                                        ></v-text-field>
                                      </v-col>
                                      <v-col class="px-0 py-0 caption" align="center" cols="1">
                                        Hrs                                  
                                      </v-col>
                                    </v-row>
                                </v-col>
                              </v-row>
                              <v-divider class="py-2"></v-divider>
                            </v-col>
                            <v-col class="py-0" cols="10">
                              <v-row>
                                <v-col class="px-0 py-0" cols="6">
                                <span class="subtitle-1"> ¿Cuántas horas duermes?: <span class="red--text">*</span></span>
                                <v-text-field
                                  v-model="patient.sleepQuantity"
                                  label="Cantidad"
                                  single-line
                                  solo
                                  @change="this.validateSleepQuantity"
                                  :errorMessages="this.errorPatient.sleepQuantity"
                                  ></v-text-field>
                                </v-col>
                              </v-row>
                              <v-divider class="py-2"></v-divider> 
                            </v-col> 
                            <v-col class="px-0 pt-0" cols="10">  
                                <span class="subtitle-1"> ¿Fumas? <span class="red--text">*</span></span>   
                                    <v-radio-group row v-model="patient.isSmoker">
                                      <v-radio label="No" :value="false"></v-radio>
                                      <v-radio label="Sí" :value="true"></v-radio>
                                    </v-radio-group>    
                                    <v-divider class="py-2"></v-divider>     
                            </v-col> 
                            <v-col class="py-0" cols="10">
                              <v-row>
                                <v-col class="pl-0 py-0" cols="6">  
                                    <span class="subtitle-1"> ¿Consumes bebidas alcohólicas? <span class="red--text">*</span></span>   
                                        <v-radio-group v-model="patient.isDrinker" row>
                                          <v-radio label="No" :value="false"></v-radio>
                                          <v-radio label="Sí" :value="true"></v-radio>
                                        </v-radio-group>        
                                </v-col> 
                                <template v-if="patient.isDrinker === true" >
                                  <v-col class="px-0 py-0" cols="6">
                                      <span class="subtitle-1"> ¿Cuántas?: <span class="red--text">*</span></span>
                                      <v-text-field
                                      v-model="patient.drinksQuantity"
                                      label="Cantidad"
                                      single-line
                                      solo
                                      @change="this.validateDrinksQuantity"
                                      :errorMessages="this.errorPatient.drinksQuantity"
                                      ></v-text-field>
                                  </v-col>   
                                </template>                                 
                              </v-row>
                            </v-col>      
                            <template v-if="patient.isDrinker === true" >  
                              <v-col class="py-0" cols="10">
                                <v-row>                               
                                  <v-col class="pl-0 py-0" cols="6">
                                      <span class="subtitle-1"> ¿Con qué frecuencia?: <span class="red--text">*</span></span>
                                      <v-select
                                          :items="drinksFrequencyOptions"
                                          label="-Selecciona Frecuencia-"
                                          v-model="patient.drinksFrequency"     
                                          solo
                                          @change="this.validateDrinksFrequency" 
                                          :errorMessages="this.errorPatient.drinksFrequency"                                   
                                      ></v-select>
                                  </v-col>  
                                  <v-col class="px-0 py-0 " cols="6">                                           
                                    <span class="subtitle-1"> Tipo de bebidas <span class="red--text">*</span></span>
                                    <v-textarea
                                        solo
                                        name="input-7-4"
                                        v-model="patient.drinksType"  
                                        label="Tipo de bebidas alcohólicas"
                                        @change="this.validateDrinksType"
                                        :errorMessages="this.errorPatient.drinksType"  
                                    ></v-textarea>                                        
                                  </v-col>  
                                </v-row>
                              </v-col>   
                            </template>
                        <v-col class="px-0" cols="10">
                          <v-divider class="py-2"></v-divider>
                            <h2 align="left">Datos Dietéticos</h2>
                        </v-col>              
                        <v-col class="py-0" cols="10">                          
                          <v-row>
                            <v-col class="pl-0 py-0" cols="6">  
                                <span class="subtitle-1"> ¿Consume algun suplemento nutricional (vitaminas,minerales,proteína)? <span class="red--text">*</span></span>   
                                    <v-radio-group v-model="patient.supplement" row>
                                      <v-radio label="No" :value="false"></v-radio>
                                      <v-radio label="Sí" :value="true"></v-radio>
                                    </v-radio-group>                                        
                            </v-col>                          
                            <template v-if="patient.supplement === true" >   
                              <v-col class="pl-0 py-0" cols="6">  
                                  <span class="subtitle-1"> Nombre <span class="red--text">*</span></span>                                   
                                    <v-text-field
                                    v-model="patient.supplementName"      
                                    @change="this.validateSupplementName"
                                    :errorMessages="this.errorPatient.supplementName"                              
                                    label="Nombre de Suplemento"
                                    single-line
                                    solo             
                                    >
                                    </v-text-field>                                
                              </v-col> 
                            </template>
                          </v-row>
                          <v-divider class="py-2"></v-divider>     
                        </v-col> 
                        <v-col class="px-0" cols="10">
                            <h2 align="left">Datos Bioquímicos</h2>
                        </v-col>
                        <v-col class="py-0" cols="10">
                          <v-row>
                            <v-col class="pl-0 py-0" cols="4">
                              <span class="subtitle-1"> Colesterol (menor a 220 mg/dl) </span>
                              <v-text-field
                              v-model="patient.cholesterol"
                              label="Colesterol"
                              single-line
                              solo
                              @change="this.validateCholesterol"
                              :errorMessages="this.errorPatient.cholesterol"
                              ></v-text-field>                                           
                            </v-col>
                            <v-col class="py-0" cols="4">
                              <span class="subtitle-1"> Triglicéridos (menor a 220 mg/dl) </span>
                              <v-text-field
                              v-model="patient.triglycerides"
                              label="Triglicéridos"
                              single-line
                              solo
                              @change="this.validateTriglycerides"
                              :errorMessages="this.errorPatient.triglycerides"
                              ></v-text-field>                                           
                            </v-col>
                            <v-col class="pr-0 py-0" cols="4">
                              <span class="subtitle-1"> Glucosa (60-110 mg/dl) </span>
                              <v-text-field
                              v-model=" patient.glucose"
                              label="Glucosa"
                              single-line
                              solo
                              @change="this.validateGlucose"
                              :errorMessages="this.errorPatient.glucose"
                              ></v-text-field>                                           
                            </v-col>
                          </v-row>
                        </v-col>

                        <v-col class="px-0 py-0" cols="10">                                           
                                <span class="subtitle-1"> Comentarios: </span>
                                <v-textarea
                                    solo
                                    name="input-7-4"
                                    v-model="patient.comments"                   
                                label="Comentarios"
                                ></v-textarea>                                        
                            </v-col>
                        <v-col cols="10" class="px-0 py-0" >
                            <v-row class="d-flex flex-row-reverse mx-6 my-0"> 
                                <v-col cols="7">    
                                    <v-btn large block color="primary" @click="saveMyInfo">
                                    <v-icon align="center" medium color="white" >mdi-content-save-outline</v-icon>
                                    Guardar e ir a Recordatorio de 24 Hrs
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
  components: {
    nutriheader
  },
  data () {
      return {          
        isError: false,
        userId:"",
        routePatientData:"",
        patient: {
            familyBackground:[],
            otherFamilyBackgroundChecked: "",
            otherFamilyBackground:"",
            personalBackground:[],
            otherPersonalBackgroundChecked: "",
            otherPersonalBackground:"", 
            physicalActivity:"",
            activityFrequency:"",
            durationHours:"",
            durationMinutes:"",
            sleepQuantity:"",
            isSmoker: false,
            isDrinker: false,
            drinksQuantity:"",            
            drinksFrequency:"",
            drinksType:"",    
            supplement: false,
            supplementName:"",
            cholesterol:"",
            triglycerides:"",
            glucose:"",
            comments:"" 
        },        
        errorPatient:{
            otherFamilyBackground:"",
            otherPersonalBackground:"",
            physicalActivity:"",
            activityFrequency:"",
            durationHours:"",
            durationMinutes:"",
            sleepQuantity:"",
            drinksQuantity:"",            
            drinksFrequency:"",
            drinksType:"",
            supplementName:"",            
            cholesterol:"",
            triglycerides:"",
            glucose:"",
            comments:""
        },
        drinksFrequencyOptions: [
          'Semanal', 
          'Quincenal', 
          'Fines de semana', 
          'Mensual', 
          'Anual'], 
        BackgroundListCol1 : [
          'Hipertensión Arterial',
          'Diabetes',
          'Colesterol elevado'],
        BackgroundListCol2 : [
          'Triglicéridos elevados',
          'Cáncer',
          'Estreñimiento'],
        BackgroundListCol3 : [
          'Gastritis',
          'Colitis']
      }
    },
  methods: {
    validateOtherFamilyBackground(){
      if(this.patient["otherFamilyBackgroundChecked"] === "Otro" && !this.patient.otherFamilyBackground){  
          this.isError = true
          this.errorPatient.otherFamilyBackground = "Campo requerido"
        }else{
          this.errorPatient.otherFamilyBackground = ""
        }
    },
    validateOtherPersonalBackground(){
      if(this.patient["otherPersonalBackgroundChecked"] === "Otro" && !this.patient["otherPersonalBackground"]){  
          this.isError = true
          this.errorPatient.otherPersonalBackground = "Campo requerido"
        }else{
          this.errorPatient.otherPersonalBackground = ""
        }
    },
    validatePhysicalActivity(){
       if(!this.patient["physicalActivity"]){  
          this.isError = true
          this.errorPatient.physicalActivity = "Campo requerido"
        }else{
          this.errorPatient.physicalActivity = ""
        }
    },
    validateActivityFrequency(){
      if(!this.patient["activityFrequency"]){  
          this.isError = true
          this.errorPatient.activityFrequency = "Campo requerido"
        }
      else if(Number.isNaN(Number(this.patient["activityFrequency"]))){
          this.isError = true
          this.errorPatient.activityFrequency = "Debe ser un número"
      }
      else if(this.patient["activityFrequency"] % 1 !=0 || this.patient["activityFrequency"] < 0){
          this.isError = true
          this.errorPatient.activityFrequency = "Número inválido"
      }
      else{
          this.errorPatient.activityFrequency = ""
      }
    },
    validateDurationHours(){
      if(!this.patient["durationHours"]){  
          this.isError = true
          this.errorPatient.durationHours = "Campo requerido"
        }
      else if(Number.isNaN(Number(this.patient["durationHours"]))){
          this.isError = true
          this.errorPatient.durationHours = "Debe ser un número"
      }
      else if(this.patient["durationHours"] % 1 !=0 || this.patient["durationHours"] < 0){
          this.isError = true
          this.errorPatient.durationHours = "Número inválido"
      }
      else{
          this.errorPatient.durationHours = ""
        }
    },
    validateDurationMinutes(){
      if(Number.isNaN(Number(this.patient["durationMinutes"]))){
          this.isError = true
          this.errorPatient.durationMinutes = "Debe ser un número"
      }
      else if(this.patient["durationMinutes"] % 1 !=0 || this.patient["durationMinutes"] < 0 || this.patient["durationMinutes"] > 59){
          this.isError = true
          this.errorPatient.durationMinutes = "Número inválido"
      }
      else{
          this.errorPatient.durationMinutes = ""
        }
    },
    validateSleepQuantity(){
      if(!this.patient["sleepQuantity"]){  
          this.isError = true
          this.errorPatient.sleepQuantity = "Campo requerido"
        }
      else if(Number.isNaN(Number(this.patient["sleepQuantity"]))){
          this.isError = true
          this.errorPatient.sleepQuantity = "Debe ser un número"
      }
      else if(this.patient["sleepQuantity"] % 1 !=0 || this.patient["sleepQuantity"] < 0){
          this.isError = true
          this.errorPatient.sleepQuantity = "Número inválido"
      }
      else{
          this.errorPatient.sleepQuantity = ""
        }
    },
    validateDrinksQuantity(){
      if(this.patient["isDrinker"] === true && !this.patient["drinksQuantity"]){  
          this.isError = true
          this.errorPatient.drinksQuantity = "Campo requerido"
        }
      else if(Number.isNaN(Number(this.patient["drinksQuantity"]))){
          this.isError = true
          this.errorPatient.drinksQuantity = "Debe ser un número"
      }
      else if(this.patient["drinksQuantity"] % 1 !=0 || this.patient["drinksQuantity"] < 0){
          this.isError = true
          this.errorPatient.drinksQuantity = "Número inválido"
      }
      else{
          this.errorPatient.drinksQuantity = ""
      }
    },
    validateDrinksFrequency(){      
      if(this.patient["isDrinker"] === true && !this.patient["drinksFrequency"]){  
          this.isError = true
          this.errorPatient.drinksFrequency = "Campo requerido"
        }else{
          this.errorPatient.drinksFrequency = ""
        }
    },
    validateDrinksType(){
      if(this.patient["isDrinker"] === true && !this.patient["drinksType"]){  
          this.isError = true
          this.errorPatient.drinksType = "Campo requerido"
        }else{
          this.errorPatient.drinksType = ""
        }
    },
    validateSupplementName(){      
      if(this.patient["supplement"] === true && !this.patient["supplementName"]){  
          this.isError = true
          this.errorPatient.supplementName = "Campo requerido"
        }else{
          this.errorPatient.supplementName = ""
        }
    },    
    validateCholesterol(){
      if(Number.isNaN(Number(this.patient["cholesterol"]))){
          this.isError = true
          this.errorPatient.cholesterol = "Debe ser un número"
      }
      else if(this.patient["cholesterol"] < 0){
          this.isError = true
          this.errorPatient.cholesterol = "Número inválido"
      }
      else{
          this.errorPatient.cholesterol = ""
        }
    },
    validateTriglycerides(){
      if(Number.isNaN(Number(this.patient["triglycerides"]))){
          this.isError = true
          this.errorPatient.triglycerides = "Debe ser un número"
      }
      else if(this.patient["triglycerides"] < 0){
          this.isError = true
          this.errorPatient.triglycerides = "Número inválido"
      }
      else{
          this.errorPatient.triglycerides = ""
        }
    },
    validateGlucose(){
      if(Number.isNaN(Number(this.patient["glucose"]))){
          this.isError = true
          this.errorPatient.glucose = "Debe ser un número"
      }
      else if(this.patient["glucose"] < 0){
          this.isError = true
          this.errorPatient.glucose = "Número inválido"
      }
      else{
          this.errorPatient.glucose = ""
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
    saveMyInfo(){
      this.isError = false
      this.validateOtherFamilyBackground()
      this.validateOtherPersonalBackground()
      this.validatePhysicalActivity()
      this.validateActivityFrequency()
      this.validateDurationHours()
      this.validateDurationMinutes()
      this.validateSleepQuantity()
      this.validateDrinksQuantity()
      this.validateDrinksFrequency()
      this.validateDrinksType()
      this.validateSupplementName()
      this.validateCholesterol()
      this.validateTriglycerides()
      this.validateGlucose()
      
      if(this.isError){
        this.$swal("Error","Favor de verificar todos los campos","error")
        return
      }

      if(this.patient.otherFamilyBackgroundChecked === 'Otro' &&
        this.patient.familyBackground[this.patient.familyBackground.length-1]!=this.patient.otherFamilyBackground)
      {
        this.patient.familyBackground.push(this.patient.otherFamilyBackground);
      }
      if(this.patient.otherPersonalBackgroundChecked === 'Otro' &&
          this.patient.personalBackground[this.patient.personalBackground.length-1]!=this.patient.otherPersonalBackground)
      {
        this.patient.personalBackground.push(this.patient.otherPersonalBackground);
      }   
      if(!this.patient.durationMinutes){
        this.patient.durationMinutes = 0
      } 
      
      const URL = helper.baseURL + "/nutricion/records/history/"+this.userId;
      axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
      axios
      .post(URL,
        {
          familyBackground: this.patient.familyBackground,
          personalBackground: this.patient.personalBackground,
          lifestyle:{
            physicalActivity: this.patient.physicalActivity,
            duration: (Number(this.patient.durationHours)*60+(Number(this.patient.durationMinutes))),
            frequency: (Number(this.patient.activityFrequency)),
            sleepHours: (Number(this.patient.sleepQuantity)),
            smoker: this.patient.isSmoker,
            drinker: this.patient.isDrinker,
            drinkType: this.patient.drinksType,
            drinkQuantity: (Number(this.patient.drinksQuantity)),
            drinkFrequency: this.patient.drinksFrequency
          },
          diet:{
            supplementConsumer: this.patient.supplement,
            supplementName: this.patient.supplementName,
            controlledMethod: "" //QUITAR DESPUES DE QUE SE ACTUALICE LA BASE DE DATOS
          },      
          comments: this.patient.comments,
          biochemical:{
            cholesterol: this.patient.cholesterol,
            triglycerides: this.patient.triglycerides,
            glucose: this.patient.glucose
          }
        }
      )
      .then(response => {
          this.$swal("Información Guardada","Se ha actualizado la Información del Paciente","success")
          .then((_) => {
              window.open("./"+this.userId+"/recordatorio","_self")
          })
      }).catch(error =>{
          this.$swal("Error",error.response.data.error,"error")
      })

    },
    loadInfo(){
      this.userId= this.getParameterByName("id", window.location);
      this.routePatientData = "./informacionpersonal?id="+this.userId

      if(this.userId === null)
      {
        this.$swal("Error","El usuario no existe","error")
        window.open("./informacionpersonal","_self")        
      }

      const token = this.$route.query.token
        const URL = helper.baseURL + "/nutricion/records/"+this.userId;
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .get(URL)
        .then(response => {
          const history = response.data.history

          for(var iK=0; iK<history.familyBackground.length; iK++)
          {
              if(this.BackgroundListCol1.includes(history.familyBackground[iK]) ||
                this.BackgroundListCol2.includes(history.familyBackground[iK]) ||
                this.BackgroundListCol3.includes(history.familyBackground[iK]))
              {
                  this.patient.familyBackground.push(history.familyBackground[iK])                    
              }
              else
              {                
                  this.patient.otherFamilyBackgroundChecked = "Otro"  
                  this.patient.otherFamilyBackground = history.familyBackground[iK]
              }
          }
          for(var iK=0; iK<history.personalBackground.length; iK++)
          {
              if(this.BackgroundListCol1.includes(history.personalBackground[iK]) ||
                this.BackgroundListCol2.includes(history.personalBackground[iK]) ||
                this.BackgroundListCol3.includes(history.personalBackground[iK]))
              {
                  this.patient.personalBackground.push(history.personalBackground[iK])                    
              }
              else
              {                
                  this.patient.otherPersonalBackgroundChecked = "Otro"  
                  this.patient.otherPersonalBackground = history.personalBackground[iK]
              }
          }
          this.patient.physicalActivity = history.lifestyle.physicalActivity
          this.patient.activityFrequency = history.lifestyle.frequency
          this.patient.durationHours = Math.floor(history.lifestyle.duration/60)
          this.patient.durationMinutes = history.lifestyle.duration - (Math.floor(history.lifestyle.duration/60))*60
          this.patient.sleepQuantity = history.lifestyle.sleepHours

          if(history.lifestyle.smoker)
          {
            this.patient.isSmoker = true
          }else{
            this.patient.isSmoker = false
          }
          if(history.lifestyle.drinker)
          {
            this.patient.isDrinker = true
          }else{
            this.patient.isSmoker = false
          }
          this.patient.drinksQuantity = history.lifestyle.drinkQuantity
          this.patient.drinksType = history.lifestyle.drinkType
          this.patient.drinksFrequency = history.lifestyle.drinkFrequency
          if(history.diet.supplementConsumer)
          {
            this.patient.supplement = true
          }else{
            this.patient.supplement = false
          }     
          this.patient.supplementName = history.diet.supplementName        
          this.patient.cholesterol = history.biochemical.cholesterol
          this.patient.triglycerides = history.biochemical.triglycerides
          this.patient.glucose = history.biochemical.glucose
          this.patient.comments = history.comments    
      }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })
    } 
  },
    created(){
      this.loadInfo()
  },
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

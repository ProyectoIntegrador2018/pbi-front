<template>
   <div class="fill-height">
      <v-container class="fill-height">
        <v-row justify="center">
            <v-col cols="10">
            <h1 align="center">Nuevo Expediente Nutricional</h1>
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col class="px-0" cols="10">
                            <h2 align="left">Antecedentes Médicos</h2>
                        </v-col>
                            <v-col class="px-0 pt-0" cols="10">  
                                <span class="subtitle-1"> Antecedentes patológicos familiares </span>
                                <v-row>
                                    <v-col cols="4">
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Hipertensión Arterial" value="Hipertensión Arterial"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Diabetes" value="Diabetes"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Colesterol elevado" value="Colesterol elevado"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Triglicéridos elevados" value="Triglicéridos elevados"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Cáncer" value="Cáncer"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Estreñimiento" value="Estreñimiento"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Gastritis " value="Gastritis"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.familyBackground label="Colitis" value="Colitis"></v-checkbox>
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
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Hipertensión Arterial" value="Hipertensión Arterial"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Diabetes" value="Diabetes"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Colesterol elevado" value="Colesterol elevado"></v-checkbox>
                                        </v-col>
                                    <v-col cols="4">
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Triglicéridos elevados" value="Triglicéridos elevados"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Cáncer" value="Cáncer"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Estreñimiento" value="Estreñimiento"></v-checkbox>
                                    </v-col>
                                    <v-col cols="4">
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Gastritis " value="Gastritis"></v-checkbox>
                                        <v-checkbox class ="my-0" v-model=patient.personalBackground label="Colitis" value="Colitis"></v-checkbox>
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
                                <span class="subtitle-1"> Actividad Física: </span>
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
                                    <span class="subtitle-1"> ¿Cuántos días a la semana?: </span>
                                    <v-select
                                        :items="activityFrequencyOptions"
                                        label="-Selecciona Frecuencia-"
                                        v-model="patient.activityFrequency"     
                                        solo
                                        @change="this.validateActivityFrequency" 
                                        :errorMessages="this.errorPatient.activityFrequency"                                   
                                    ></v-select>
                                </v-col>
                                <v-col class="py-0" cols="6">
                                    <span class="subtitle-1"> Duración: </span>
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
                                <span class="subtitle-1"> ¿Cuántas horas duermes?: </span>
                                <v-select
                                    :items="sleepQuantityOptions"
                                    label="-Selecciona Cantidad-"
                                    v-model="patient.sleepQuantity"     
                                    solo
                                    @change="this.validateSleepQuantity" 
                                    :errorMessages="this.errorPatient.sleepQuantity"                                   
                                ></v-select>
                                </v-col>
                              </v-row>
                              <v-divider class="py-2"></v-divider> 
                            </v-col> 
                            <v-col class="px-0 pt-0" cols="10">  
                                <span class="subtitle-1"> ¿Fumas? </span>   
                                    <v-radio-group row v-model="patient.isSmoker">
                                      <v-radio label="No" :value="false"></v-radio>
                                      <v-radio label="Sí" :value="true"></v-radio>
                                    </v-radio-group>    
                                    <v-divider class="py-2"></v-divider>     
                            </v-col> 
                            <v-col class="py-0" cols="10">
                              <v-row>
                                <v-col class="pl-0 py-0" cols="6">  
                                    <span class="subtitle-1"> ¿Consumes bebidas alcohólicas? </span>   
                                        <v-radio-group v-model="patient.isDrinker" row>
                                          <v-radio label="No" :value="false"></v-radio>
                                          <v-radio label="Sí" :value="true"></v-radio>
                                        </v-radio-group>        
                                </v-col> 
                                <template v-if="patient.isDrinker === true" >
                                  <v-col class="px-0 py-0" cols="6">
                                      <span class="subtitle-1"> ¿Cuántas?: </span>
                                      <v-select
                                          :items="drinksQuantityOptions"
                                          label="-Selecciona Cantidad-"
                                          v-model="patient.drinksQuantity"     
                                          solo
                                          @change="this.validateDrinksQuantity" 
                                          :errorMessages="this.errorPatient.drinksQuantity"                                   
                                      ></v-select>
                                  </v-col>   
                                </template>                                 
                              </v-row>
                            </v-col>      
                            <template v-if="patient.isDrinker === true" >  
                              <v-col class="py-0" cols="10">
                                <v-row>                               
                                  <v-col class="pl-0 py-0" cols="6">
                                      <span class="subtitle-1"> ¿Con qué frecuencia?: </span>
                                      <v-select
                                          :items="drinksFrequencyOptions"
                                          label="-Selecciona Cantidad-"
                                          v-model="patient.drinksFrequency"     
                                          solo
                                          @change="this.validateDrinksFrequency" 
                                          :errorMessages="this.errorPatient.drinksFrequency"                                   
                                      ></v-select>
                                  </v-col>  
                                  <v-col class="px-0 py-0 " cols="6">                                           
                                    <span class="subtitle-1"> Tipo de bebidas </span>
                                    <v-textarea
                                        solo
                                        name="input-7-4"
                                        v-model="patient.drinksType"  
                                        label="Actividad Física"
                                        @change="this.validateDrinksType"
                                        :errorMessages="this.errorPatient.drinksType"  
                                    ></v-textarea>                                        
                                  </v-col>  
                                </v-row>
                                <v-divider class="py-2"></v-divider> 
                              </v-col>   
                            </template>
                        <v-col class="px-0" cols="10">
                            <h2 align="left">Datos Dietéticos</h2>
                        </v-col>              
                        <v-col class="py-0" cols="10">
                          <v-row>
                            <v-col class="pl-0 py-0" cols="6">  
                                <span class="subtitle-1"> ¿Consume algun suplemento nutricional (vitaminas,minerales,proteína)? </span>   
                                    <v-radio-group v-model="patient.supplement" row>
                                      <v-radio label="No" :value="false"></v-radio>
                                      <v-radio label="Sí" :value="true"></v-radio>
                                    </v-radio-group>                                        
                            </v-col>                          
                            <template v-if="patient.supplement === true" >   
                              <v-col class="pl-0 py-0" cols="6">  
                                  <span class="subtitle-1"> Nombre </span>                                   
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
                        <v-col class="px-0 pt-0" cols="10">  
                            <span class="subtitle-1"> ¿Ha empleado algún método para cuidar su peso? </span>
                            <v-row>
                                <v-col cols="4">
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Solo Dieta" value="Solo Dieta"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Solo entrenamiento" value="Solo entrenamiento"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="No comer nada" value="No comer nada"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Omitir alguna comida" value="Omitir alguna comida"></v-checkbox>
                                 </v-col>
                                <v-col cols="4">
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Dieta-entrenamiento" value="Dieta-entrenamiento"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Diuréticos" value="Diuréticos"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Sauna" value="Sauna"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Vómitos" value="Vómitos"></v-checkbox>                                    
                                  </v-col>
                                <v-col cols="4">
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Laxante" value="Laxante"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.controlledMethod label="Entrenamiento con ropa para sudar" value="Entrenamiento con ropa para sudar"></v-checkbox>
                                    <v-checkbox class ="my-0" v-model=patient.otherControlledMethodChecked label="Otro" value="Otro"></v-checkbox>
                                    <template v-if="patient.otherControlledMethodChecked === 'Otro'" >
                                        <v-text-field
                                        v-model="patient.otherControlledMethod"                                    
                                        label="Otro Antecedente"
                                        @change="this.validateOtherControlledMethod"
                                        :errorMessages="this.errorPatient.otherControlledMethod"
                                        single-line
                                        solo             
                                        >
                                        </v-text-field>
                                    </template>
                                </v-col>
                            </v-row>  
                            <v-divider class="py-2"></v-divider>      
                        </v-col> 
                        <v-col class="px-0 py-0" cols="10">                                           
                                <span class="subtitle-1"> Comentarios: </span>
                                <v-textarea
                                    solo
                                    name="input-7-4"
                                    v-model="patient.comments"  
                                    @change="this.validateComments"
                                    :errorMessages="this.errorPatient.comments"                      
                                label="Comentarios"
                                ></v-textarea>                                        
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
                                    <v-btn large block color="primary" >
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
            controlledMethod:[],
            otherControlledMethodChecked:"",
            otherControlledMethod:"", 
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
            otherControlledMethod:"",
            comments:""
        },
        activityFrequencyOptions: ['1','2','3','4','5','6','7'],
        drinksQuantityOptions: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14','15'],      
        sleepQuantityOptions: ['1','2','3','4','5','6','7','8','9','10','11','12','13','14'],     
        drinksFrequencyOptions: ['Semanal', 'Quincenal', 'Fines de semana', 'Mensual', 'Anual'],       
      }
    },
  components: {
    
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
        }else{
          this.errorPatient.activityFrequency = ""
        }
    },
    validateDurationHours(){
      if(!this.patient["durationHours"]){  
          this.isError = true
          this.errorPatient.durationHours = "Campo requerido"
        }
      else if(this.patient["durationHours"].isNaN ){
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
      if(!this.patient["durationMinutes"]){  
          this.isError = true
          this.errorPatient.durationMinutes = "Campo requerido"
        }
      else if(this.patient["durationMinutes"].isNaN ){
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
        }else{
          this.errorPatient.sleepQuantity = ""
        }
    },
    validateDrinksQuantity(){
       if(this.patient["isDrinker"] === true && !this.patient["drinksQuantity"]){  
          this.isError = true
          this.errorPatient.drinksQuantity = "Campo requerido"
        }else{
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
    validateOtherControlledMethod(){
      if(this.patient["otherControlledMethodChecked"] === "Otro" && !this.patient["otherControlledMethod"]){  
          this.isError = true
          this.errorPatient.otherControlledMethod = "Campo requerido"
        }else{
          this.errorPatient.otherControlledMethod = ""
        }

    },
    validateComments(){
    }
    
  },
    created(){
  }
};
</script>


<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>

</style>

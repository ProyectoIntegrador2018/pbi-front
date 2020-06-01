<template>
   <div>
    <v-content>
    <adminheader title="Historial Médico"></adminheader>
      <v-container>
        <v-row justify="center">
            <v-col cols="10">
            <v-card class="d-flex align-center" color="white">
                    <v-row justify="center" class="mb-5">
                        <v-col cols="10">
                            <h1 align="center">{{userAccount.name}} {{userAccount.surname}}</h1>
                        </v-col>
                        <v-col cols="10">
                            <h3 align="center">{{userAccount.payroll}}</h3>
                        </v-col>
                                <v-col class="px-0 pt-0" cols="10">
                                <span class="title"> Edad: <span class="red--text">*</span> </span>    
                                <v-text-field
                                v-model="userAccount.age"       
                                label="Edad"
                                single-line
                                solo
                                @change="this.validateAge"
                                :errorMessages="this.errorMsg.age"
                                ></v-text-field>
                        </v-col>      
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Compañía de Seguro: <span class="red--text">*</span></span>
                                <v-text-field
                                v-model="userAccount.insuranceCompany"       
                                label="Compañía de Seguro"
                                single-line
                                solo
                                @change="this.validateinsuranceCompany"
                                :errorMessages="this.errorMsg.insuranceCompany"
                                ></v-text-field>
                        </v-col>       
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> No. Póliza o No.IMSS: <span class="red--text">*</span></span>
                                <v-text-field
                                v-model="userAccount.securityNumber"       
                                label="No. Póliza o No.IMSS"
                                single-line
                                solo
                                @change="this.validatesecurityNumber"
                                :errorMessages="this.errorMsg.securityNumber"
                                ></v-text-field>
                        </v-col>    
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Institución médica a donde dirigirlo en caso de requerirse: </span>
                                <v-text-field
                                v-model="userAccount.hospital"       
                                label="Institución médica"
                                single-line
                                solo
                                ></v-text-field>
                        </v-col>  
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Nombre de la persona a contactar en caso de urgencia: <span class="red--text">*</span></span>
                                <v-text-field
                                v-model="userAccount.contactName"       
                                label="Nombre de contacto"
                                single-line
                                solo
                                @change="this.validateContactName"
                                :errorMessages="this.errorMsg.contactName"
                                ></v-text-field>
                        </v-col>   
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Teléfono del contacto: <span class="red--text">*</span></span>
                                <v-text-field
                                v-model="userAccount.contactPhone"       
                                label="Teléfono de Contacto"
                                single-line
                                solo
                                @change="this.validateContactPhone"
                                :errorMessages="this.errorMsg.contactPhone"
                                ></v-text-field>
                        </v-col>   
                        <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Parentesco del contacto: <span class="red--text">*</span></span>
                                <v-text-field
                                v-model="userAccount.contactRelationship"       
                                label="Parentesco del contacto"
                                single-line
                                solo
                                @change="this.validateContactRelationship"
                                :errorMessages="this.errorMsg.contactRelationship"
                                ></v-text-field>
                        </v-col>   
                        <v-col class="px-0 pt-0" cols="10">  
                            <span class="title"> Selecciona cualquier enfermedad que padezca o haya padecido, en caso de que aplique: </span>
                            <v-container fluid>
                                <v-checkbox class ="my-0" v-model=illnesses label="Enfermedades del corazón y/o arterias" value="Enfermedades del corazón y/o arterias"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Diabetes" value="Diabetes"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Epilepsia" value="Epilepsia"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Problemas ortopédicos o musculares" value="Problemas ortopédicos o musculares"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Operaciones y/o cirugías" value="Operaciones y/o cirugías"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Asma" value="Asma"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Enfermedades del pulmón" value="Enfermedades del pulmón"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Alergias" value="Alergias"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=illnesses label="Enfermedades en la sangre" value="Enfermedades en la sangre"></v-checkbox>
                                <v-checkbox class ="my-0" v-model=otherIllnessChecked label="Otra" value="Otro"></v-checkbox>
                                <template v-if="otherIllnessChecked[0] === 'Otro'">
                                     <v-text-field
                                    v-model="otherIllnessValue"                                    
                                    label="Otra Enfermedad"
                                    single-line
                                    solo             
                                    >
                                    </v-text-field>
                                </template>
                            </v-container>
   
                        </v-col>               
                        <v-col class="px-0 py-0" cols="10">     
                            <span class="title"> ¿Ha tenido alguna lesión en los últimos 2 años? <span class="red--text">*</span></span>
                            <v-radio-group 
                            v-model="userAccount.flagRecentInjury" 
                            :mandatory="true"
                            :errorMessages="this.errorMsg.flagRecentInjury"  
                            @click="this.validateflagRecentInjury">
                                <v-radio value="Sí">
                                    <template v-slot:label>
                                        <div>Sí</div>
                                    </template>
                                </v-radio>
                                <v-radio value="No">
                                    <template v-slot:label>
                                        <div>No</div>
                                    </template>
                                </v-radio>
                            </v-radio-group>
                        </v-col>   
                        <template v-if="this.userAccount.flagRecentInjury === 'Sí'">
                            <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Si su respuesta anterior fue afirmativa, mencione las indicaciones que el médico le hizo en cuanto a la práctica de la actividad física. </span>
                                <v-text-field
                                v-model="userAccount.injuryIndication"       
                                label="Indicaciones"
                                single-line
                                solo
                                :errorMessages="this.errorMsg.injuryIndication"
                                ></v-text-field>
                            </v-col> 
                        </template>
                        <v-col class="px-0 py-0" cols="10">     
                            <span class="title"> ¿Actualmente toma algún medicamento? <span class="red--text">*</span></span>
                            <v-radio-group 
                            v-model="userAccount.flagMedicine" 
                            :mandatory="true"
                            :errorMessages="this.errorMsg.flagMedicine"  
                            @click="this.validateflagMedicine">
                                <v-radio value="Sí">
                                    <template v-slot:label>
                                        <div>Sí</div>
                                    </template>
                                </v-radio>
                                <v-radio value="No">
                                    <template v-slot:label>
                                        <div>No</div>
                                    </template>
                                </v-radio>
                            </v-radio-group>
                        </v-col>
                        <template v-if="this.userAccount.flagMedicine === 'Sí'">
                            <v-col class="px-0 pt-0" cols="10">            
                                <span class="title"> Si su respuesta anterior fue afirmativa, indique el nombre del medicamento, dosis y razón por la que lo toma. </span>
                                <v-text-field
                                v-model="userAccount.medicineIndication"       
                                label="Indicaciones"
                                single-line
                                solo
                                :errorMessages="this.errorMsg.medicineIndication"
                                ></v-text-field>
                            </v-col> 
                        </template>
                        <v-col class="px-0 py-0" cols="10">     
                            <span class="title"> ¿Cuál es la mejor forma en que describe su nivel de condición física en las últimas 4 semanas? <span class="red--text">*</span></span>
                            <v-radio-group 
                            v-model="userAccount.physicalCondition" 
                            :mandatory="true"
                            :errorMessages="this.errorMsg.physicalCondition"  
                            @click="this.validatePhysicalCondition">
                                <v-radio value="Inactiva: no realiza ningún tipo de actividad física.">
                                    <template v-slot:label>
                                        <div>Inactiva: no realiza ningún tipo de actividad física.</div>
                                    </template>
                                </v-radio>
                                <v-radio value="Ocasionalmente activa: 1 o 2 veces por semana.">
                                    <template v-slot:label>
                                        <div>Ocasionalmente activa: 1 o 2 veces por semana.</div>
                                    </template>
                                </v-radio>
                                <v-radio value="Moderadamente activa: 3 veces por semana.">
                                    <template v-slot:label>
                                        <div>Moderadamente activa: 3 veces por semana.</div>
                                    </template>
                                </v-radio>
                                <v-radio value="Muy activa: seis veces por semana.">
                                    <template v-slot:label>
                                        <div>Muy activa: seis veces por semana.</div>
                                    </template>
                                </v-radio>
                            </v-radio-group>
                        </v-col>

                        <v-col cols="10" class="px-0 py-0" >
                            <v-row class="d-flex flex-row-reverse mx-6 my-0">                                    
                                <v-col cols="4">
                                    <v-btn large block href="/users/">
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
    </v-content>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";
import adminheader from "../components/adminheader.vue";

export default {
  name: "UserConfirm",
  data () {
      return {        
        isError: false,        
        otherIllnessChecked: [],    
        otherIllnessValue: "", 
        illnesses:[],        
        userAccount: {
          name: "",
          surname: "",
          payroll: "",
          age:"",
          insuranceCompany:"",
          securityNumber:"",
          hospital:"",
          contactName:"",
          contactPhone:"",
          contactRelationship:"",
          flagRecentInjury:"",
          injuryIndication:"",
          flagMedicine:"",
          medicineIndication:"",
          physicalCondition:"" 
        },        
        errorMsg:{
          age:"",
          insuranceCompany:"",
          securityNumber:"",
          hospital:"",
          contactName:"",
          contactPhone:"",
          contactRelationship:"",
          flagRecentInjury:"",
          flagMedicine:"",
          physicalCondition:""
        },
        illnessList: ['Enfermedades del corazón y/o arterias',
                        'Diabetes',
                        'Epilepsia',
                        'Problemas ortopédicos o musculares',
                        'Operaciones y/o cirugías',
                        'Asma',
                        'Enfermedades del pulmón',
                        'Alergias',
                        'Enfermedades en la sangre']
      }
    },
  components: {
    adminheader
  },
  methods: {
    validateAge(){
        if(!this.userAccount["age"]){
          this.isError = true
          this.errorMsg.age = "Campo requerido"
        }
        else if(isNaN(this.userAccount["age"])){
            this.isError = true
            this.errorMsg.age = "Debe ser un número"
        }
        else{
          this.errorMsg.age = ""
        }
    },
    validateinsuranceCompany(){
        if(!this.userAccount["insuranceCompany"]){
          this.isError = true
          this.errorMsg.insuranceCompany = "Campo requerido"
        }
        else{
          this.errorMsg.insuranceCompany = ""
        }
    },
    validatesecurityNumber(){
        if(!this.userAccount["securityNumber"]){
          this.isError = true
          this.errorMsg.securityNumber = "Campo requerido"
        }
        else{
          this.errorMsg.securityNumber = ""
        }
    },
    validateContactName(){
        if(!this.userAccount["contactName"]){
          this.isError = true
          this.errorMsg.contactName = "Campo requerido"
        }
        else{
          this.errorMsg.contactName = ""
        }
    },
    validateContactPhone(){
        if(!this.userAccount["contactPhone"]){
          this.isError = true
          this.errorMsg.contactPhone = "Campo requerido"
        }
        else if(isNaN(this.userAccount["contactPhone"])){
            this.isError = true
            this.errorMsg.contactPhone = "Debe ser un número"
        }
        else{
          this.errorMsg.contactPhone = ""
        }
    },
    validateContactRelationship(){
        if(!this.userAccount["contactRelationship"]){
          this.isError = true
          this.errorMsg.contactRelationship = "Campo requerido"
        }
        else{
          this.errorMsg.contactRelationship = ""
        }
    },
    addOtherIllness(){
        if(this.otherIllnessChecked && this.otherIllnessValue)
        {
            this.illnesses.push(this.otherIllnessValue)  
            
        }              
    },
    validateflagRecentInjury(){
        if(!this.userAccount["flagRecentInjury"])
        {
            this.isError = true
            this.errorMsg.flagRecentInjury = "Campo requerido"
        }
        else{
            this.errorMsg.flagRecentInjury = ""
        }
    },
    validateflagMedicine()
    {
        if(!this.userAccount["flagMedicine"])
        {
            this.isError = true
            this.errorMsg.flagMedicine = "Campo requerido"
        }
        else{
            this.errorMsg.flagMedicine = ""
        }
    },    
    validatePhysicalCondition()
    {
        if(!this.userAccount["physicalCondition"])
        {
            this.isError = true
            this.errorMsg.physicalCondition = "Campo requerido"
        }
        else{
            this.errorMsg.physicalCondition = ""
        }
    },
    confirmar(){
        const URL = helper.baseURL + "/users/" + this.$route.params.id;
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .get(URL)
        .then(response => {
            
            const medicalR = response.data.medicalRecord

            this.userAccount.name = response.data.name
            this.userAccount.surname = response.data.surname
            this.userAccount.payroll = response.data.nomina
            
            if(medicalR.age == 0)
            {
                this.userAccount.age = ""
            }
            else{
                this.userAccount.age = medicalR.age
            }
            this.userAccount.insuranceCompany = medicalR.insuranceCompany
            this.userAccount.securityNumber = medicalR.securityNumber
            this.userAccount.hospital = medicalR.hospital       
            this.userAccount.contactName = medicalR.contactName
            if(medicalR.contactPhone == 0)
            {
                this.userAccount.contactPhone = ""
            }
            else{
                this.userAccount.contactPhone = medicalR.contactPhone
            }

            this.userAccount.contactRelationship = medicalR.contactRelationship      
            
            for(var iK=0; iK<medicalR.illnesses.length; iK++)
            {
                if(this.illnessList.includes(medicalR.illnesses[iK]))
                {
                    this.illnesses.push(medicalR.illnesses[iK])                    
                }
                else
                {                    
                    this.otherIllnessChecked.push("Otro")
                    this.otherIllnessValue = medicalR.illnesses[iK]
                }
            }            

            if(medicalR.flagRecentInjury == true)
            {
                this.userAccount.flagRecentInjury = "Sí"
            }
            else{
                this.userAccount.flagRecentInjury = "No"
            } 

            this.userAccount.injuryIndication = medicalR.injuryIndication        
            if(medicalR.flagMedicine == true)
            {
                this.userAccount.flagMedicine = "Sí"
            }
            else{
                this.userAccount.flagMedicine = "No"
            }           
            this.userAccount.medicineIndication = medicalR.medicineIndication           
            this.userAccount.physicalCondition = medicalR.physicalCondition         

        }).catch(error =>{
            this.$swal("Error",error.response.data.error,"error")
        })
      },
      saveMyInfo()
      {
        this.isError = false
        this.validateAge()
        this.validateinsuranceCompany()
        this.validatesecurityNumber()
        this.validateContactName()
        this.validateContactPhone()
        this.validateContactRelationship()     
        this.validateflagRecentInjury()
        this.validateflagMedicine()
        this.validatePhysicalCondition()

        if(this.isError){
          this.$swal("Error","Favor de verificar todos los campos","error")
          return          
        }

        if(this.otherIllnessChecked[0] == "Otro" && this.otherIllnessValue)
        {
            this.addOtherIllness()
        }


        if(this.userAccount.flagMedicine == "Sí")
        {
            var flagMedicineToUpload = true
            var medicineIndicationToUpload = this.userAccount.medicineIndication        
        }
        else
        {
            var flagMedicineToUpload = false
            var medicineIndicationToUpload = ""
            
        }
        if(this.userAccount.flagRecentInjury == "Sí")
        {
            var flagRecentInjuryToUpload = true
            var injuryIndicationToUpload = this.userAccount.injuryIndication            
        }
        else{
            var flagRecentInjuryToUpload = false
            var injuryIndicationToUpload = ""
        }

        const token = this.$route.query.token
        const URL = helper.baseURL + "/admin/users/medicalRecord/" + this.$route.params.id;
        axios.defaults.headers.common['Authorization'] = "Bearer "+ localStorage.getItem("token");
        axios
        .put(URL,{               
            age:this.userAccount.age,
            securityNumber: this.userAccount.securityNumber,
            insuranceCompany: this.userAccount.insuranceCompany,
            hospital: this.userAccount.hospital,
            contactName: this.userAccount.contactName,
            contactPhone: this.userAccount.contactPhone,
            contactRelationship: this.userAccount.contactRelationship,
            illnesses: this.illnesses,
            flagRecentInjury: flagRecentInjuryToUpload,
            injuryIndication: injuryIndicationToUpload,
            flagMedicine: flagMedicineToUpload,
            medicineIndication: medicineIndicationToUpload,
            physicalCondition: this.userAccount.physicalCondition
            })
        .then(response => {
            this.$swal("Información Guardada","Se ha actualizado tu Historial Clínico","success")
            .then((_) => {
                window.open("/users","_self")
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

 <template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1
            class="display-2 font-weight-bold"
            align="center"
          >Inscribir Clases para {{this.Periodo}}</h1>
        </v-row>
      </v-container>
      <v-container fluid my-0 px-md-12 py-0>
        <div justify="left" align="left">
          <v-col cols="2" class="px-0">
            <v-btn large block class="px-0" href="/home">
              <v-icon align="center" medium>mdi-arrow-left</v-icon>Regresar
            </v-btn>
          </v-col>
        </div>

        <template v-if="show">
          <EnrolledCourses></EnrolledCourses>
          <SignToCourse></SignToCourse>
          <ClosedCourses></ClosedCourses>
        </template>
        <template v-else>
          <v-alert
            outlined
            type="warning"
            prominent
            border="left"
          >Inscripciones permitidas del {{momentDatetime(this.start, 'LL')}} a las 12:00 AM al {{momentDatetime(this.close, 'LL')}} hasta las 11:59 PM.</v-alert>
        </template>

        <p class="py-5 px-5 my-0 caption">
          Por este conducto hago constar que mi participación en esta clase es por voluntad propia y que estoy de acuerdo con las políticas y lineamientos del ITESM para la realización del mismo. Es por ello que de antemano excluyo de toda responsabilidad al ITESM, sus funcionarios y empleados de cualquier contratiempo o incidente que llegara a presentarse durante el desarrollo de la clase.
          Así mismo, manifiesto que soy beneficiario de un seguro de vida y de un seguro de gastos médicos mayores, los cuales se harán responsables en caso de que sucediera cualquier imprevisto. En caso de no contar con seguro alguno, acepto mi responsabilidad y estoy consciente que cualquier incidente que en algún momento se presentara durante la clase, correrá por mi exclusiva cuenta y no por la del ITESM.
          Es de mi conocimiento, el profesionalismo con el que se desempeñan tanto los profesores, como los organizadores y todo el personal encargado de la clase en cuestión, a quienes también excluyo de toda responsabilidad.
          Aviso de privacidad colaboradores
          <a
            href="https://tec.mx/es/aviso-de-privacidad-empleados"
          >https://tec.mx/es/aviso-de-privacidad-empleados</a> Atentamente,
          Coordinación del Programa de Bienestar Integral
        </p>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";
import SignToCourse from "../components/SignToCourse.vue";
import ClosedCourses from "../components/ClosedCourses.vue";
import EnrolledCourses from "../components/EnrolledCourses.vue";

export default {
  components: {
    SignToCourse,
    ClosedCourses,
    EnrolledCourses
  },
  data: () => ({
    Periodo: "",
    medRecord: "",
    periodID:"",
    show: false,
    start: "",
    close: ""
  }),
  created() {
    this.getUserInfo();
  },
  mounted() {
  },
  methods: {
    momentDatetime(datetime, datetime_format) {
      return this.$moment.utc(datetime).format(datetime_format);
    },
    getTerms() {
      const URL = helper.baseURL + "/terms/";
      axios
        .get(URL)
        .then(response => {
          response.data.forEach(periodo => {
            if (periodo.flagCurrent) {
              this.Periodo = periodo.name + " " + periodo.year;
              this.start = periodo.startInscriptions
              this.close = periodo.closeInscriptions
              this.periodID = periodo._id
              this.getStatusFlag()
            }
          });
        })
        .catch(() => {
          this.$swal("Error", "No se pudieron cargar", "error");
          
        });
    },
    getUserInfo() {
      axios.defaults.headers.common["Authorization"] =
        "Bearer " + localStorage.getItem("token");
      const URL = helper.baseURL + "/user/";
      axios
        .get(URL)
        .then(response => {
          this.medRecord = response.data.filledRecord;
          if (this.hasMedicalRecord()) {
            this.getTerms();
          } else {
            var route = "/mymedicalrecord/";
            this.$router.push(route);
          }
        })
        .catch(error => {
          this.$swal("Error", error.response.data.error, "error");
        });
    },
    hasMedicalRecord() {
      return this.medRecord;
    },
    getStatusFlag(){
      const URL = helper.baseURL + "/terms/status/"+ this.periodID +"/false"
      axios
        .get(URL)
        .then(response => {
          this.show = response.data.status
        })
        .catch(() => {
          this.$swal("Error", "No se pudo cargar periodo", "error");
        });
    }
  }
};
</script>
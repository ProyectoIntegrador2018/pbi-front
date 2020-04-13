 <template>
  <div>
    <v-content>
      <v-container fluid>
        <v-row align="center" justify="center">
          <h1
            class="display-2 font-weight-bold"
            align="center"
          >Inscribir Casillero para {{this.Periodo}}</h1>
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

        <template v-if="hasLocker">
          <MyLocker></MyLocker>
        </template>
        
        <template v-else>
            <template v-if="showInscription">
              <WomenMaleLocker></WomenMaleLocker>
            </template>
            <template v-else>        
              <v-alert
                outlined
                type="warning"
                prominent
                border="left"
              >Inscripciones a casilleros permitidas del {{momentDatetime(this.start, 'LL')}} a las 12:00 AM al {{momentDatetime(this.close, 'LL')}} hasta las 11:59 PM.</v-alert>
            </template>
        </template>

        <p class="py-5 px-5 my-0 caption">
          [AVISO DE PRIVACIDAD DE CASILLEROS TEMPORAL]Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet dapibus magna, eget suscipit enim hendrerit id. Praesent scelerisque mauris ut nisl ultrices pretium. Praesent at volutpat tellus. Sed posuere scelerisque odio, sit amet faucibus enim consequat id. Cras finibus eros id accumsan luctus. Suspendisse potenti. Nunc id diam quis tortor facilisis efficitur non quis ex.
          Atentamente,
          Coordinación del Programa de Bienestar Integral
        </p>
      </v-container>
    </v-content>
  </div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";
import WomenMaleLocker from "../components/WomenMaleLocker.vue";
import MyLocker from "../components/MyLocker.vue"

export default {
  components: {
    WomenMaleLocker,
    MyLocker
  },
  data: () => ({
    Periodo: "",
    medRecord: "",
    periodID:"",
    showInscription: false, //Es true si la fecha actual se encuentra dentro del periodo de inscripción de casilleros
    hasLocker: false, //Verifica si el usuario ya tiene un locker asignado
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
            window.open(route, "_self");
          }

          if (response.data.locker){
            this.hasLocker = true;
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
      const URL = helper.baseURL + "/terms/status/"+ this.periodID;
      axios
        .get(URL)
        .then(response => {
          this.showInscription = response.data.status
        })
        .catch(() => {
          this.$swal("Error", "No se pudo cargar periodo", "error");
        });
    }
  }
};
</script>
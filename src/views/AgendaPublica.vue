<template>
	<div>
		<v-content v-if="!loading && !error" style="text-align: center">
			<h1>Calendario de nutrióloga {{ nutriName }}</h1>
                        <v-btn @click="selectNutriDialog = true">Cambiar de nutrióloga</v-btn>
			<v-row>
				<v-col justify="center" align="center">
					<v-btn class="mx-2" fab dark small color="primary" @click="subWeek">
						<v-icon dark>
							mdi-less-than
						</v-icon>
					</v-btn>
					<h1 style="display: inline">{{ currentDate.format("MMMM") }}</h1>
					<v-btn @click="addWeek" class="mx-2" fab dark small color="primary">
						<v-icon dark>
							mdi-greater-than
						</v-icon>
					</v-btn>
				</v-col>
			</v-row>                


			<v-container class="grey lighten-5">
				<v-row
					no-gutters
					style="height: 150px; text-align: center"
					class="justify-center"
				>
					<v-col v-for="(day, i) in days" :key="day">
						<v-card class="pa-2" outlined tile>
							{{ day }} {{ currentDate.day(i + 1).date() }}
						</v-card>
						<v-card
							class="pa-2"
							outlined
							tile
							v-for="hour in hours"
							:key="hour"
						>
							<v-btn
								elevation="2"
								:disabled="
									bookedTimes.some((x) => isBetween(i, hour, x.start, x.end))
								"
								@click.stop="
									selectedDate = moment(
										`${currentDate.day(i + 1).year()} ${currentDate
											.day(i + 1)
											.dayOfYear()} ${hour}`,
										'YYYY DDD k:mm'
									);
									bookingDialog = true;
								"
								>{{ hour }}</v-btn
							>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
		<div class="text-center">
			<v-progress-circular
				:size="70"
				:width="7"
				color="primary"
				indeterminate
				v-if="loading"
			></v-progress-circular>
			<div v-if="error">
				<h2>{{ errorText }}</h2>
			</div>
		</div>
		<v-row justify="center">
			<v-dialog v-model="bookingDialog" max-width="500">
				<v-card>
					<div v-if="loadingSave">
						<v-progress-circular
							:size="70"
							:width="7"
							color="primary"
							indeterminate
						></v-progress-circular>
					</div>
					<div v-show="!loadingSave">
						<v-card-title class="headline">
							Nueva cita con {{ nutriName }}
						</v-card-title>

						<v-card-text>
							Se está creando una cita el día {{ selectedDate.date() }} de
							{{ selectedDate.format("MMMM") }} a las
							{{ selectedDate.format("k:mm") }}
						</v-card-text>
						<v-col cols="12">
							<!-- <v-text-field
                label="Nombre"
            ></v-text-field> -->
                            <p>¡Hola! ¿Como estas?</p>
                            <p>Te explico lo que vamos a necesitar para la consulta:</p>

                            <ul>
                                <li>Bascula y/o cinta de medir.</li>
                                <li>Cuaderno para anotaciones.</li>
                                <li>Zoom: se envía el día de la consulta al correo.</li>
                                <li>Ser muy puntual, ya que las consultas tiene una duración de 30 minutos.</li>
                            </ul>
                            <p>En caso de tener que cancelar la consulta, favor de avisar lo antes posible.</p>
                            <br>

                            <p>Por el momento, las consultas en linea no tienen un costo.</p>

                            <br>
                            <p>¡Muchas gracias por la confianza!</p>
							<v-text-field
								label="Correo"
								v-model="patientMail"
								:rules="[rules.required, rules.email]"
							></v-text-field>
							<v-text-field
								label="Nombre"
								v-model="patientName"
								:rules="[rules.required]"
							></v-text-field>
						</v-col>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn
								color="green darken-1"
								text
								@click.stop="
									patientMail = '';
									patientName = '';
									bookingDialog = false;
								"
							>
								Cancelar
							</v-btn>

							<v-btn
								color="green darken-1"
								text
								@click.stop="saveBooking"
								:disabled="!(testEmail(patientMail) && patientName)"
							>
								Guardar cita
							</v-btn>
						</v-card-actions>
					</div>
				</v-card>
			</v-dialog>
			<v-dialog v-model="selectNutriDialog" max-width="500">
				<v-card>
					<v-card-title class="headline">
						Escoge la nutrióloga con la que quieres generar cita:
					</v-card-title>
					<v-col cols="12">
						<!-- <v-text-field
                label="Nombre"
            ></v-text-field> -->
						<v-select
							:items="nutris"
							item-text="name"
							item-value="nomina"
							label="Nutrióloga"
							v-model="selectedNutri"
						></v-select>
					</v-col>
					<v-card-actions>
						<v-spacer></v-spacer>
						<v-btn
							color="green darken-1"
							text
							@click.stop="selectNutritionist(selectedNutri)"
							:disabled="!selectedNutri"
						>
							Escoger
						</v-btn>
					</v-card-actions>
				</v-card>
			</v-dialog>
		</v-row>
	</div>
</template>

<script>
const helper = require("../helper.js");
import axios from "axios";
import moment from "moment";

moment.locale("es");

export default {
	name: "publicAgenda",
	data: () => ({
		days: ["Lunes", "Martes", "Miercoles", "Jueves", "Viernes"],
		hours: [
			"8:00",
			"8:30",
			"9:00",
			"9:30",
			"10:00",
			"10:30",
			"11:00",
			"11:30",
			"12:00",
			"12:30",
			"13:00",
			"13:30",
			"14:00",
			"14:30",
			"15:00",
			"15:30",
			"16:00",
			"16:30",
		],
		// bookingTimes: [[], [], [], [], []],
		bookedTimes: [[], [], [], [], []],
		selectedDate: moment(),
		loading: true,
		error: false,
		errorText: "",
		currentDate: moment(),
		bookingDialog: false,
		nutriName: "",
		moment,
		patientMail: "",
		patientName: "",
		nutris: [],
		selectNutriDialog: false,
		selectedNutri: "",
		rules: {
			required: (value) => !!value || "Required.",
			email: (value) => {
				const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				return pattern.test(value) || "Invalid e-mail.";
			},
		},
		testEmail: (value) => {
			const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			return pattern.test(value);
		},
		loadingSave: false,
	}),
	mounted: async function() {
		let { data: nutris } = await axios.get(
			helper.baseURL + "/bookings/getNutris"
		);
		console.log(nutris);
		this.nutris = nutris;
		if (!this.$route.query.nomina) {
			this.selectNutriDialog = true;
		} else {
			this.selectNutritionist(this.$route.query.nomina);
		}
	},
	methods: {
		async selectNutritionist(nomina) {
			this.selectNutriDialog = false;
			if (!nomina) {
				(this.error = true), (this.loading = false);
				this.errorText = "No hay nómina para buscar";
				return;
			}
			this.$router.push({ path: this.$router.path, query: { nomina } });

			this.nutriName = this.nutris.find((x) => x.nomina == nomina).name;

			await this.getBooked();

			this.loading = false;
		},
		async subWeek() {
			this.loading = true;
			this.currentDate.subtract(1, "week");
			await this.getBooked();
			this.loading = false;
			this.$forceUpdate();
		},
		async addWeek() {
			this.loading = true;
			this.currentDate.add(1, "week");

			await this.getBooked();
			this.loading = false;
			this.$forceUpdate();
		},
		async getBooked() {
			let nomina = this.$route.query.nomina;
			if (!nomina) {
				(this.error = true), (this.loading = false);
				this.errorText = "No hay nómina para buscar";
				return;
			}

			const URL = helper.baseURL + "/bookings/getBookings";

			try {
				let { data: booked } = await axios.get(URL, {
					params: {
						nomina,
						week: this.currentDate.format(),
					},
				});

				this.bookedTimes = booked;
			} catch (e) {
				console.log(e);
				(this.error = true), (this.loading = false);
				this.errorText = "Hubo un error";
				return;
			}
		},
		async saveBooking() {
			if (!this.patientMail || !this.patientName) {
				// handle error
				return;
			}
			this.loadingSave = true;
			let nomina = this.$route.query.nomina;
			try {
				await axios.post(helper.baseURL + "/bookings/addBooking", {
					nomina,
					booking: {
						startTime: this.selectedDate.toDate(),
						patientMail: this.patientMail,
						patientName: this.patientName,
					},
				});

				this.$swal("Guardado", "Periodo creado", "success");
			} catch (e) {
				this.$swal("Error", "No se pudo crear el evento", "error");
			}

			this.loadingSave = false;
		},
		isBetween(date, hour, start, end) {
			let newDate = moment(hour, "k:mm")
				.date(this.currentDate.date())
				.year(this.currentDate.year())
				.month(this.currentDate.month())
				.day(date + 1);
			if (newDate.isSameOrAfter(start) && newDate.isBefore(end))
				console.log(
					moment(hour, "k:mm")
						.date(this.currentDate.date())
						.year(this.currentDate.year())
						.month(this.currentDate.month())
						.day(date + 1)
						.format()
				);
			return newDate.isSameOrAfter(start) && newDate.isBefore(end);
		},
	},
};
</script>

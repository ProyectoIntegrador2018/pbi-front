<template>
	<div>
		<v-content v-if="!loading && !error" style="text-align: center">
			<h1>Calendario de espacios disponibles</h1>
            <p>Los espacios en blanco no son disponibles. Para cambiar de estatus, solo picar botón</p>
				
			<v-container class="grey lighten-5">
				<v-row
					no-gutters
					style="height: 150px; text-align: center"
					class="justify-center"
				>
					<v-col v-for="(day, i) in days" :key="day">
						<v-card class="pa-2" outlined tile>
							{{ day }}
						</v-card>
						<v-card
							class="pa-2"
							outlined
							tile
							v-for="hour in hours"
							:key="hour"
						>
                            <v-checkbox
                                v-model="checkbox"
                                :label="hour"
                            ></v-checkbox>
						</v-card>
					</v-col>
				</v-row>
			</v-container>
		</v-content>
	</div>
</template>

<script>
import nutriheader from "../components/nutriheader.vue";

export default {
	name: "UserClasses",
	data: () => ({
        days:['Lunes','Martes', 'Miercoles','Jueves', 'Viernes'],
        hours:['8:00','8:30','9:00','9:30','10:00','10:30','11:00','11:30','12:00','12:30','13:00','13:30','14:00','14:30','15:00','15:30','16:00','16:30','17:00','17:30','18:00'],        bookingTimes: [[], [], [], [], []],
        loading: false,
        error: ""
	}),
	components: {
		nutriheader,
	},
	methods: {},
};
</script>

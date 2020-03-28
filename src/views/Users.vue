 <template>
  <div>
    <v-content>
    <adminheader title="Administrar Usuarios"></adminheader>

      <v-container fluid my-5 px-md-12>
        <v-row>
          <v-col cols="12" md="12">
            <Users></Users>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </div>
</template>

<script>
import Users from "../components/Users.vue";
import adminheader from "../components/adminheader.vue";
export default {
  components: {
    Users,
    adminheader
  }
};
</script>
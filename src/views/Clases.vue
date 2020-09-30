 <template>
  <div>
    <v-main>
      <adminheader title="Administrar Clases"></adminheader>
      <v-container fluid my-5 px-md-12>
        <Courses></Courses>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Courses from "../components/Courses.vue";
import adminheader from "../components/adminheader.vue";
export default {
  components: {
    Courses,
    adminheader
  }
};
</script>
 <template>
  <div>
    <v-main>
      <adminheader title="Asignación de Lockers"></adminheader>
      <v-container fluid my-5 px-md-12>
        <LockerList></LockerList>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import LockerList from "../components/LockerList.vue";
import adminheader from "../components/adminheader.vue";
export default {
  components: {
    LockerList,
    adminheader
  }
};
</script>
 <template>
  <div>
    <v-main>
    <adminheader title="Administrar Periodos"></adminheader>

      <v-container fluid my-5 px-md-12>
        <Table></Table>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import Table from "../components/Table.vue";
import adminheader from "../components/adminheader.vue";
export default {
  components: {
    Table,
    adminheader,
  }
};
</script>
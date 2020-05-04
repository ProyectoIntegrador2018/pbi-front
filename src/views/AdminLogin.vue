 <template>
    <Login userType="Administrador" redirectRoute="/admin/home"></Login>
</template>

<script>
import Login from "../components/Login.vue";
export default {
  components: {
    Login
  }
};
</script>
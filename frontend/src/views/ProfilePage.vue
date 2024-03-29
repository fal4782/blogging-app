<template>
  <div>
    <NavBar />
    <div class="col-6 ml-auto mr-auto">
      <b-input-group prepend="Username" class="mt-3">
        <b-form-input></b-form-input>
        <b-input-group-append>
          <b-button class="border btn-light">Update</b-button>
        </b-input-group-append>
      </b-input-group>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
export default {
  components: { NavBar },
  data() {
    return {};
  },
  methods: {
    signOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
    fetchUsername() {
      const username = localStorage.getItem("username");
      console.log(username);
      return username;
    },
  },
  created() {
    this.fetchUsername();
  },
};
</script>

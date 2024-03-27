<template>
  <div class="mx-5">
    <NavBar />
    <div class="container">
      <div v-if="blogs.length === 0" class="text-center mt-5">
        <h4>No blogs available</h4>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { mapActions } from "vuex";

export default {
  components: { NavBar },
  data() {
    return {
      blogs: [],
      users: [],
    };
  },
  created() {
    this.fetchUserAndStore();
  },
  methods: {
    ...mapActions(["fetchUserByEmail"]),
    async fetchUserAndStore() {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("Email not found in local storage");
        }
        const user = await this.fetchUserByEmail(email);
        localStorage.setItem("userId", user.id);
        localStorage.setItem("username", user.username);
        console.log("succesfully fetched the signed in user");
      } catch (error) {
        // console.log(
        //   "Error fetching and storing user in homepage:",
        //   error.message
        // );
        window.alert(error.message);
      }
    },
  },
};
</script>
<style scoped>
.container {
  max-width: 800px;
  margin: auto;
}

.rounded-circle {
  border-radius: 50%;
}
</style>

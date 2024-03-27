<template>
  <div
    class="parent d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="card py-3 px-2">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">Login</h5>
        <b-form @submit="onSubmit" class="p-fluid">
          <div class="mb-3">
            <b-form-input
              id="input-1"
              v-model="email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
          </div>
          <div class="mb-3">
            <b-form-input
              id="input-2"
              v-model="password"
              type="password"
              placeholder="Password"
              required
            ></b-form-input>
          </div>
          <div class="text-center">
            <b-button type="submit" variant="primary">Submit</b-button>
          </div>
          <p class="mt-2 mb-0 text-center">
            Not registered yet? <router-link to="/signup">Sign up</router-link>.
          </p>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["login"]), // Map the 'login' action from Vuex store

    async onSubmit(event) {
      event.preventDefault();
      try {
        const response = await this.login({
          email: this.email,
          password: this.password,
        });

        localStorage.setItem("email", response.email);
        localStorage.setItem("token", response.token);

        this.$router.push("/posts");
        // console.log("Login successful:", response);
      } catch (error) {
        // console.error("Error logging in:", error);
        window.alert(error.error);
      }
    },
  },
};
</script>
<style scoped>
.parent {
  background-image: url("../assets/seemless-bg1.svg");
  background-size: 600px;
}

.card {
  background-color: rgba(255, 255, 255, 0.9);
  border: 0;
  box-shadow: 5px 5px 4px rgba(0, 0, 0, 0.3);
  width: 70%; /* Default width for smaller screens */
}

/* Media query for larger screens */
@media screen and (min-width: 768px) {
  .card {
    width: 40%; /* Adjust the width for larger screens */
  }
}

/* Media query for extra-large screens */
@media screen and (min-width: 1200px) {
  .card {
    width: 20%; /* Further adjust the width for extra-large screens */
  }
}
</style>

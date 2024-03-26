<template>
  <div
    class="parent d-flex justify-content-center align-items-center"
    style="height: 100vh"
  >
    <div class="card py-3 px-2">
      <div class="card-body">
        <h5 class="card-title text-center mb-4">Sign Up</h5>
        <b-form @submit="onSubmit" class="p-fluid">
          <div class="mb-3">
            <b-form-input
              id="input-1"
              v-model="name"
              placeholder="Username"
              required
            ></b-form-input>
          </div>
          <div class="mb-3">
            <b-form-input
              id="input-2"
              v-model="email"
              type="email"
              placeholder="Email"
              required
            ></b-form-input>
          </div>
          <div class="mb-3">
            <b-form-input
              id="input-3"
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
            Already a user? <router-link to="/login">Log in</router-link>.
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
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    ...mapActions(["signup"]), // Map the 'signup' action from Vuex store

    async onSubmit(event) {
      event.preventDefault();
      try {
        console.log();
        const response = await this.signup({
          username: this.name,
          email: this.email,
          password: this.password,
        }); // Dispatch the 'signup' action with form data
        console.log("Signup successful:", response);
      } catch (error) {
        // console.error("Error signing up:", error);
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

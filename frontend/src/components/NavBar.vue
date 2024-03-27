<template>
  <div>
    <b-navbar toggleable="sm" type="light" variant="light">
      <router-link to="/posts" class="text-decoration-none">
        <b-navbar-brand>Blogging App</b-navbar-brand>
      </router-link>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ms-auto">
          <b-button size="sm" class="my-2 my-sm-0 me-3" @click="createPost">
            New Post
          </b-button>
          <b-nav-item-dropdown :text="userInitial" drop-left>
            <b-dropdown-item href="#">Profile</b-dropdown-item>
            <b-dropdown-item @click="signOut">Sign Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>

<script>
export default {
  computed: {
    userInitial() {
      const email = localStorage.getItem("email");
      const capitalizedInitial = email?.charAt(0).toUpperCase();
      return capitalizedInitial;
    },
  },
  methods: {
    createPost() {
      this.$router.push("/publish");
    },
    signOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

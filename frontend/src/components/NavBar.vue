<template>
  <div>
    <b-navbar toggleable="sm" class="border-bottom px-xs px-3 px-sm-5">
      <router-link to="/posts" class="text-decoration-none">
        <b-navbar-brand>Blogging App</b-navbar-brand>
      </router-link>

      <!-- <b-navbar-toggle target="nav-collapse"></b-navbar-toggle> -->

      <!-- <b-collapse id="nav-collapse" is-nav> -->
      <b-navbar-nav class="ml-auto d-flex flex-row align-items-center">
        <b-button
          size="md"
          class="my-2 my-sm-0 mr-3 fit-content-height py-2"
          @click="createPost"
        >
          New Post
        </b-button>
        <router-link to="/profile" class="text-decoration-none">
          <b-nav-item
            href="/profile"
            class="bg-grey rounded-circle px-4 px-sm-3 py-2"
            >{{ userInitial }}</b-nav-item
          >
        </router-link>
      </b-navbar-nav>
      <!-- </b-collapse> -->
    </b-navbar>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userInitial: "Rec",
    };
  },
  methods: {
    createPost() {
      this.$router.push({ name: "publish" });
    },

    fetchUserInitial() {
      const username = localStorage.getItem("username");
      this.userInitial = username?.charAt(0).toUpperCase();
    //   console.log("fetching from navbar", this.userInitial);
    },
  },
  mounted() {
    this.fetchUserInitial();
  },
};
</script>

<style scoped>
.fit-content-height {
  height: fit-content;
}

@media (min-width: 0px) {
  .px-xs {
    padding-left: 0%;
    padding-right: 0%;
  }
}
</style>

<template>
  <div class="">
    <NavBar />
    <div class="mt-4 mx-2 mx-md-5 row">
      <div
        id="post-details"
        class="col-lg-9 pr-4 pb-5 pb-lg-0 border-bottom border-0-md"
      >
        <h1 class="mb-0">{{ post.title }}</h1>
        <p class="text-muted font-smaller">
          {{ formatDateTime(post.created_at) }}
        </p>
        <p class="fs-6">{{ post.content }}</p>
        <p v-if="post.updated_at" class="text-secondary">
          Edited on
          <span class="text-muted font-smaller">{{
            formattedUpdatedDateTime
          }}</span>
        </p>
      </div>

      <div
        id="author-details"
        class="col-lg-3 border-left-md pt-1 pt-lg-0 ps-md-4 mt-3 mt-md-1 mb-4"
      >
        <div class="fs-5 text-secondary">Author</div>
        <div class="d-flex pt-1 align-items-center">
          <div class="d-flex">
            <div
              class="rounded-circle bg-grey text-center"
              style="width: 56px; height: 56px; line-height: 56px"
            >
              <span class="font-weight-light text-dark">{{ userInitial }}</span>
            </div>
          </div>
          <div class="pt-1 ml-2">
            <div class="font-weight-bold fs-4">
              {{ convertToPascalCase(username) }}
            </div>
            <!-- <div class="pt-1 text-secondary">Trying to catch up</div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { mapActions } from "vuex";
export default {
  components: { NavBar },
  props: {
    // Receive the post ID from the route params
    id: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      post: null,
      userInitial: "",
      username: "",
    };
  },
  methods: {
    ...mapActions(["fetchPostById"]),

    async fetchPostDetails() {
      try {
        this.post = await this.fetchPostById(this.id);
        // console.log("post details in frontend: ", this.post);
        console.log("successfully fetched post details");
      } catch (error) {
        window.alert(error.message);
        console.log("Error fetching post details: ", error.message);
      }
    },

    formatDateTime(timestamp) {
      const dateObject = new Date(timestamp);
      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };
      return dateObject.toLocaleString("en-US", options);
    },
    convertToPascalCase(str) {
      return str
        ?.split(" ")
        .map(
          (word) => word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    },
    fetchUser() {
      this.username = localStorage.getItem("username");
      this.userInitial = this.username?.charAt(0).toUpperCase();
      //   console.log(this.userInitial);
    },
  },
  created() {
    this.fetchPostDetails();
    this.fetchUser()
  },
  computed: {
    formattedUpdatedDateTime() {
      return this.formatDateTime(this.post.updated_at);
    },
  },
};
</script>

<style scoped>
/* Add CSS styles for post details page if needed */
</style>

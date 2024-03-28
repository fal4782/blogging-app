<template>
  <div class="mx-5">
    <NavBar />
    <div class="post-details">
      <h2>{{ post.title }}</h2>
      <p>{{ post.content }}</p>
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
  },
  created() {
    this.fetchPostDetails();
  },
};
</script>

<style scoped>
/* Add CSS styles for post details page if needed */
</style>

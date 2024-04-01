<template>
  <div class="">
    <NavBar v-if="user" />
    <div class="container">
      <div v-if="posts.length === 0" class="text-center mt-5">
        <h4 class="text-muted">No posts available</h4>
      </div>
      <div v-else>
        <div v-for="post in posts" :key="post.id" class="my-3">
          <PostCard :post="post" :showActions="false" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import PostCard from "../components/PostCard.vue";
import { mapActions } from "vuex";

export default {
  components: { NavBar, PostCard },
  data() {
    return {
      posts: [],
      users: [],
      user: "",
    };
  },
  async created() {
    await this.fetchUserAndStore();
    this.fetchPosts();
  },
  methods: {
    ...mapActions(["fetchUserByEmail", "fetchAllPosts"]),
    async fetchUserAndStore() {
      try {
        const email = localStorage.getItem("email");
        if (!email) {
          throw new Error("Email not found in local storage");
        }
        this.user = await this.fetchUserByEmail(email);
        localStorage.setItem("userId", this.user.id);
        localStorage.setItem("username", this.user.username);
        console.log("succesfully fetched the signed in user");
      } catch (error) {
        window.alert(error.message);
      }
    },
    async fetchPosts() {
      try {
        this.posts = await this.fetchAllPosts();
        // console.log("posts in homepage: ", this.posts);
        console.log("successfully fetched all the posts");
      } catch (error) {
        console.error("Error fetching posts:", error.message);
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

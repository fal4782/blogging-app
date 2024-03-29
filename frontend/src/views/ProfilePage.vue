<template>
  <div>
    <NavBar />
    <div class="d-flex flex-column align-items-center">
      <div class="col-12 col-md-6">
        <b-input-group prepend="Username" class="my-5">
          <b-form-input></b-form-input>
          <b-input-group-append>
            <b-button class="border btn-light">Update</b-button>
          </b-input-group-append>
        </b-input-group>
      </div>
      <b-button variant="danger" size="md" @click="signOut">Sign Out</b-button>
    </div>
    <hr class="my-5" />
    <div class="mx-2 mx-md-5">
      <h3 class="text-center">My Posts</h3>
      <div class="container">
        <div v-if="posts.length === 0" class="text-center mt-5">
          <h4 class="text-muted">No posts available</h4>
        </div>
        <div v-else>
          <div v-for="post in posts" :key="post.id" class="my-3">
            <PostCard :post="post" />
          </div>
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
    };
  },

  methods: {
    ...mapActions(["fetchAllPostsByUserId"]),

    fetchUsername() {
      const username = localStorage.getItem("username");
    //   console.log(username);
      return username;
    },
    async fetchPosts() {
      try {
        const userId = localStorage.getItem("userId");
        console.log(userId);
        this.posts = await this.fetchAllPostsByUserId(userId);
        // console.log("posts in profile page: ", this.posts);
        console.log("successfully fetched all the posts");
      } catch (error) {
        console.error("Error fetching posts: ", error.message);
      }
    },
    signOut() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
  created() {
    this.fetchUsername();
    this.fetchPosts();
  },
};
</script>

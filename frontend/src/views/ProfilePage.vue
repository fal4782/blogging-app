<template>
  <div>
    <NavBar />
    <div class="d-flex flex-column align-items-center">
      <div class="col-12 col-md-6">
        <b-input-group prepend="Username" class="my-5">
          <b-form-input v-model="username"></b-form-input>
          <b-input-group-append>
            <b-button class="border btn-light" @click="updateUser">
              Update
            </b-button>
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
            <PostCard
              :post="post"
              :showActions="true"
              @delete-post="handleDeletePost"
            />
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
      username: "",
    };
  },

  methods: {
    ...mapActions(["fetchAllPostsByUserId", "updateUsername"]),

    fetchUsername() {
      const username = localStorage.getItem("username");
      console.log(username);
      this.username = this.convertToPascalCase(username);
    },

    convertToPascalCase(str) {
      return str
        ?.split(" ")
        .map(
          (word) => word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    },
    async updateUser() {
      try {
        // console.log("clicked on update");
        await this.updateUsername(this.username);
        this.fetchPosts(); // Fetch posts again after updating username
        localStorage.setItem("username", this.username);
        console.log("Username updated successfully");
      } catch (error) {
        console.error("Error updating username:", error);
      }
    },
    async fetchPosts() {
      try {
        const userId = localStorage.getItem("userId");
        this.posts = await this.fetchAllPostsByUserId(userId);
        console.log("successfully fetched all the posts");
      } catch (error) {
        console.log("Error fetching posts: ", error.error);
        this.posts = []; //when no posts then set posts to empty [] so this can be fetched
      }
    },

    handleDeletePost() {
      console.log("fetching again");
      // Call fetchPosts method to fetch posts again after a post is deleted
      this.fetchPosts();
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

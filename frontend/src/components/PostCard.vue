<template>
  <div class="border-bottom rounded-0 text-dark">
    <div class="card-body">
      <div class="d-flex mb-2 align-items-baseline">
        <div
          class="text-center bg-grey rounded-circle mr-2"
          style="width: 24px; height: 24px; line-height: 24px"
        >
          <span class="lighter-text">{{ userInitial }}</span>
        </div>
        <div class="lighter-text mr-2">
          {{ convertToPascalCase(post.username) }}
        </div>
        <div class="text-muted font-smaller">
          {{ formatDateTime(post.created_at) }}
        </div>
        <div v-if="showActions" class="ml-auto">
          <b-button class="mr-1" variant="light"
            ><img
              width="24"
              height="24"
              src="https://img.icons8.com/badges/48/edit.png"
              alt="edit"
          /></b-button>
          <b-button @click="handleDeletePost" variant="danger"
            ><img
              width="24"
              height="24"
              src="https://img.icons8.com/badges/48/delete-forever.png"
              alt="delete-forever"
            />
          </b-button>
        </div>
      </div>
      <router-link :to="'/post/' + post.id" class="card-link text-dark">
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text line-clamp-2">{{ post.content }}</p>
      </router-link>
      <div class="text-muted font-smaller">{{ readTime }}</div>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
    showActions: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapActions(["deletePost"]),
    convertToPascalCase(str) {
      return str
        ?.split(" ")
        .map(
          (word) => word?.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    },
    calculateReadTime(content) {
      const wordsPerMinute = 200;
      const wordCount = content?.split(/\s+/).length;
      const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
      return readingTimeMinutes;
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
    async handleDeletePost() {
      try {
        console.log("in try");
        console.log(this.post.id);
        const res = await this.deletePost(this.post.id);
        console.log("res from delete post api call in postcard func: ", res);
        console.log("Successfully deleted post");
        this.$emit("delete-post");
      } catch (error) {
        console.log("error deleting post: ", error.message);
        // window.alert(error.message);
      }
    },
  },
  computed: {
    userInitial() {
      return this.post.username?.charAt(0).toUpperCase();
    },
    readTime() {
      return this.calculateReadTime(this.post.content) + " minute(s)";
    },
  },
  created() {
    // console.log(this.post);
  },
};
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  -webkit-line-clamp: 2;
}
</style>

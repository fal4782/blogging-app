<template>
  <router-link :to="'/post/' + post.id" class="card-link text-decoration-none">
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
        </div>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text line-clamp-2">{{ post.content }}</p>
        <div class="text-muted font-smaller">{{ readTime }}</div>
      </div>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
  methods: {
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
    console.log(this.post);
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

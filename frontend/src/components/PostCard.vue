<template>
  <a :href="'/post/' + post.id" class="card-link text-decoration-none">
    <div class="card border-0 border-bottom">
      <div class="card-body">
        <div class="d-flex gap-2 mb-2 align-items-baseline">
          <div
            class="text-center bg-grey rounded-circle"
            style="width: 24px; height: 24px; line-height: 24px"
          >
            <span class="lighter-text">{{ userInitial }}</span>
          </div>
          <div class="lighter-text">
            {{ convertToPascalCase(post.username) }}
          </div>
          <div class="text-muted font-smaller">
            {{ formattedDateTime }}
          </div>
        </div>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text line-clamp-2">{{ post.content }}</p>
        <div class="text-muted font-smaller">{{ readTime }}</div>
      </div>
    </div>
  </a>
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
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join("");
    },
    calculateReadTime(content) {
      const wordsPerMinute = 200;
      const wordCount = content.split(/\s+/).length;
      const readingTimeMinutes = Math.ceil(wordCount / wordsPerMinute);
      return readingTimeMinutes;
    },
  },
  computed: {
    userInitial() {
      return this.post.username.charAt(0).toUpperCase();
    },
    formattedDateTime() {
      const dateTimeString = this.post.updated_at;
      const dateObject = new Date(dateTimeString);

      const options = {
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
        hour12: true,
      };

      const formattedDateTime = dateObject.toLocaleString("en-US", options);
      return formattedDateTime;
    },
    readTime() {
      return this.calculateReadTime(this.post.content) + " minute(s)";
    },
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
.lighter-text {
  font-weight: 300;
}
.text-muted {
  font-weight: lighter;
}

.font-smaller {
  font-size: 15px;
}

.bg-grey {
  background-color: #f3f4f6;
}
</style>

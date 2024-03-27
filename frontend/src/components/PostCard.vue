<template>
  <a :href="'/post/' + post.id" class="card-link text-decoration-none">
    <div class="card border-0 border-bottom">
      <div class="card-body">
        <div class="d-flex gap-1 mb-2">
          <div
            class="text-center bg-light rounded-circle"
            style="width: 24px; height: 24px; line-height: 24px"
          >
            <span class="font-weight-light text-dark">{{
              post.authorInitial
            }}</span>
          </div>
          <div class="font-weight-light">{{ post.user_id }}</div>
          <div class="font-weight-light text-muted">{{ post.created_at }}</div>
        </div>
        <h5 class="card-title">{{ post.title }}</h5>
        <p class="card-text line-clamp-2">{{ post.content }}</p>
        <!-- <div class="text-muted">{{ post.timeAgo }}</div> -->
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
};
</script>

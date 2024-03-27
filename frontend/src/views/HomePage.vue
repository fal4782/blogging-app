<template>
  <div class="mx-5">
    <NavBar />
    <div class="container">
      <div v-if="blogs.length === 0" class="text-center mt-5">
        <h4>No blogs available</h4>
      </div>
      <div v-else>
        <div v-for="(blog, index) in blogs" :key="index" class="my-4">
          <div class="d-flex align-items-center">
            <img
              :src="blog.userIcon"
              alt="User Icon"
              class="rounded-circle mr-3"
              style="width: 50px; height: 50px"
            />
            <div>
              <h3>{{ blog.title }}</h3>
              <p>{{ blog.content }}</p>
            </div>
          </div>
          <router-link :to="'/blog/' + blog.id" class="btn btn-primary mt-2"
            >Read More</router-link
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";

export default {
  components: { NavBar },
  data() {
    return {
      blogs: [
        // {
        //   id: 1,
        //   userIcon: "user1.png",
        //   title: "First Blog Title",
        //   content: "This is the content of the first blog.",
        // },
        // {
        //   id: 2,
        //   userIcon: "user2.png",
        //   title: "Second Blog Title",
        //   content: "This is the content of the second blog.",
        // },
        // Add more blog objects as needed
      ],
    };
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

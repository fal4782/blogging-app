<template>
  <div class="">
    <NavBar />

    <div class="container-fluid mt-5 col-12 col-sm-10 col-lg-8 col-xl-6">
      <b-form @submit="onSubmit" class="p-fluid">
        <div class="mb-2">
          <b-form-input
            id="input-1"
            v-model="title"
            placeholder="Title"
            required
            autofocus
          ></b-form-input>
        </div>
        <div class="border p-1">
          <div class="mb-2">
            <b-form-textarea
              id="textarea"
              v-model="content"
              placeholder="Enter something..."
              rows="3"
              max-rows="6"
            ></b-form-textarea>
          </div>
          <b-button type="submit" variant="primary">Publish Post</b-button>
        </div>
      </b-form>
    </div>
  </div>
</template>

<script>
import NavBar from "../components/NavBar.vue";
import { mapActions } from "vuex";

export default {
  components: { NavBar },
  data() {
    return {
      title: "",
      content: "",
    };
  },
  methods: {
    ...mapActions(["createPost"]),

    async onSubmit(event) {
      try {
        event.preventDefault();
        const postData = {
          title: this.title,
          content: this.content,
        };
        await this.createPost(postData);

        console.log("Post created successfully!");

        this.$router.push({ name: "home" });
      } catch (error) {
        console.log("Error creating post:", error);
        window.alert(error.error);
      }
    },
  },
};
</script>

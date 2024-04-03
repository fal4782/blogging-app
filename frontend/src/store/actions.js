import axios from "axios";

const actions = {
  async signup(context, userData) {
    try {
      const response = await axios.post(
        "http://localhost:3000/signup",
        userData
      );
      return response.data;
    } catch (error) {
      //   console.log("error sign up in actions: ", error);
      throw error.response.data;
    }
  },
  async login(context, userData) {
    try {
      //   console.log("user data in login action: ", userData);
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      //   console.log("login response:", response);
      return response.data;
    } catch (error) {
      //   console.log("error logging in:", error);
      throw error.response.data;
    }
  },
  async fetchUserByEmail(context, email) {
    try {
      const response = await axios.get(`http://localhost:3000/user/${email}`);
      return response.data;
    } catch (error) {
      //   console.log("Error fetching user in actions:", error.response.data.message);
      throw error.response.data;
    }
  },
  async createPost(context, postData) {
    try {
      const userId = localStorage.getItem("userId");
      postData.userId = userId;
      const response = await axios.post(
        "http://localhost:3000/publish",
        postData
      );
      //   console.log(response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
      throw error.response.data;
    }
  },
  async fetchAllPosts(context) {
    try {
      const response = await axios.get("http://localhost:3000/posts");
      //   console.log("posts in action: ", response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async fetchPostById(context, id) {
    try {
      const response = await axios.get(`http://localhost:3000/post/${id}`);
      //   console.log("post in actions: ", response.data);
      return response.data;
    } catch (error) {
      console.log(error.response.data);
    }
  },
  async fetchAllPostsByUserId(context, user_id) {
    try {
      const response = await axios.get(
        `http://localhost:3000/posts/${user_id}`
      );
      //   console.log("posts in action: ", response.data);
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
  async deletePost(context, id) {
    try {
      const response = await axios.delete(`http://localhost:3000/post/${id}`);
      return response.data;
    } catch (error) {
      console.log("error in deleting post in actions: ", error.response.data);
      throw error.response.data;
    }
  },
  async updateUsername(context, username) {
    try {
      const userId = localStorage.getItem("userId");
      console.log("user id in actions: ", userId);
      const response = await axios.put(`http://localhost:3000/user/${userId}`, {
        username,
      });
      //   console.log("updating username in actions: ", response.data);
      return response.data;
    } catch (error) {
      console.log("Error updating username:", error.response.data);
      //   throw error.response.data;
    }
  },
};

export default actions;

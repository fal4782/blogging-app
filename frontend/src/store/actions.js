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
      console.log("user data in login action: ", userData);
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      //   console.log("login response:", response);
      return response.data;
    } catch (error) {
      console.log("error logging in:", error);
      //   throw error.response.data;
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
      return response.data;
    } catch (error) {
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
};

export default actions;

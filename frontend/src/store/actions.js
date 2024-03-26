import axios from "axios";

const actions = {
  async signup({ commit }, userData) {
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
  async login({ commit }, userData) {
    try {
      console.log("user data in login action: ", userData);
      const response = await axios.post(
        "http://localhost:3000/login",
        userData
      );
      console.log("login response:", response);
      return response.data;
    } catch (error) {
      console.log("error logging in:", error);
      throw error.response.data;
    }
  },
};

export default actions;

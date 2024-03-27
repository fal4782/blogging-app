import Vue from "vue";
import Router from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import HomePage from "../views/HomePage.vue";
import CreatePost from "../views/CreatePost.vue";

const router = new Router({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/posts",
      name: "home",
      component: HomePage,
    },
    {
      path: "/login",
      name: "login",
      component: LoginPage,
    },
    {
      path: "/signup",
      name: "singup",
      component: SignupPage,
    },
    {
      path: "/publish",
      name: "publish",
      component: CreatePost,
    },
  ],
});

Vue.use(Router);

export default router;

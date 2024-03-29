import Vue from "vue";
import Router from "vue-router";
import LoginPage from "../views/LoginPage.vue";
import SignupPage from "../views/SignupPage.vue";
import HomePage from "../views/HomePage.vue";
import CreatePost from "../views/CreatePost.vue";
import requireAuth from "../api/authGuard";
import PostDetails from "../views/PostDetails.vue";
import ProfilePage from "../views/ProfilePage.vue";

const router = new Router({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
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
      path: "/posts",
      name: "home",
      component: HomePage,
      beforeEnter: requireAuth,
    },
    {
      path: "/post/:id",
      name: "PostDetails",
      component: PostDetails,
      props: true,
      beforeEnter: requireAuth,
    },
    {
      path: "/publish",
      name: "publish",
      component: CreatePost,
      beforeEnter: requireAuth,
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfilePage,
      beforeEnter: requireAuth,
    },
  ],
});

Vue.use(Router);

export default router;

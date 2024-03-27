const requireAuth = (to, from, next) => {
  const userAccessToken = localStorage.getItem("token");

  if (userAccessToken) {
    next();
  } else {
    next("/login");
  }
};

export default requireAuth;

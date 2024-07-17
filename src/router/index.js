import { createRouter, createWebHistory } from "vue-router";
import { setupLayouts } from "virtual:generated-layouts";
import generatedRoutes from "virtual:generated-pages";
import Cookies from "js-cookie";
import { loginStore } from "@/stores/login.js";
import { loadingStore } from "@/stores/loading.js";

const routes = setupLayouts(generatedRoutes);
const router = createRouter({
  // history: createWebHistory("/EC_Back/"),
  history: createWebHashHistory("/ecbotemp/"),
  routes,
});

router.beforeEach((to, from, next) => {
  const token = Cookies.get("ECBO_token");
  const role = Cookies.get("ECBO_role");

  if (to.matched.length === 0) {
    // 如果目标路由不存在，重定向到首頁
    const loading = loadingStore();
    // 判斷用戶權限用户，重定向到根路径
    loading.ShowAlertText="頁面不存在";
    loading.ShowAlertIcon="bi-exclamation-circle";
    loading.ShowAlert = true;
    setTimeout(() => {
      loading.ShowAlert = false;
    }, 2000);
    next('/');
  } 

  if (typeof token === "undefined" || token==="" || token === null || typeof role === "undefined" ) {
    // 如果用户未登录或Token不存在，则执行相应的处理，例如重定向到登录页
    if ((to.path !== "/" && typeof token === "undefined") ||
    (to.path !== "/" && token === null)) {
      const store = loginStore()
      store.userLogout();
      next("/");
    }else if((to.path !== "/" && typeof role === "undefined") ||
    (to.path !== "/" && !role)
    ){
      const store = loginStore()
      store.userLogout();
      next("/");
    } else {
      next();
    }
  } else if (
    (  (!role.includes("Read") &&
      !role.includes("SuperAdmin") &&
      to.path.startsWith("/info"))) ||
    (  (!role.includes("Admin") &&
      !role.includes("SuperAdmin") &&
      to.path.startsWith("/system"))) ||
    (  (!role.includes("Admin") &&
      !role.includes("SuperAdmin") &&
      to.path.startsWith("/coupon")))
  )  {
const loading = loadingStore();
    // 判斷用戶權限用户，重定向到根路径
    loading.ShowAlertText="使用者權限不足";
    loading.ShowAlertIcon="bi-exclamation-circle";
    loading.ShowAlert = true;
    setTimeout(() => {
      loading.ShowAlert = false;
    }, 2000);
    // next("/permissionDeny");
  } else {
    // 用户已登录或访问的是根路径，允许继续访问
    next();
  }
});

export default router;

<script setup>
import { loginStore } from "@/stores/login.js";
import { loadingStore } from "@/stores/loading.js";
import { onMounted } from "vue";
const login = loginStore();
const loading = loadingStore();

</script>
<template>
  <div
    class="noLogin d-flex justify-content-center align-items-center"
    v-if="!login.IsLogin && $route.path == '/' "
  >
    <Login />
  </div>
  <div class="wrapper" v-else>
    <SideBar />
    <div class="wrapper-content">
      <FullPageLoading v-if="loading.IsLoading" />
      <Header />
      <div class="page-content position-relative">
        <Breadcrumb v-if="$route.path !== '/'" />
        <Alert v-if="loading.ShowAlert"
      :AlertText="loading.ShowAlertText"
      :Icon="loading.ShowAlertIcon"/>
        <RouterView />
      </div>
    </div>
  </div>
</template>
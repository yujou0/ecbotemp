<script setup>
import { loginStore } from "@/stores/login.js";
const login = loginStore();
const isHideBoxVisible = ref(false);
const toggleHideBox = () => {
  isHideBoxVisible.value = !isHideBoxVisible.value;
};
</script>
<template>
  <nav id="header" class="navbar bg-white">
    <div class="container-fluid justify-content-end p-0">
      <a class="m-0 pt-0" href="javascript:;" @click="toggleHideBox">
        <img src="../assets/svg/avatar.svg" alt="avatar" />
      </a>
      <div class="hide-box" v-if="isHideBoxVisible">
        <div
          class="d-flex justify-content-center flex-column align-items-center imgandnamebox"
        >
          <img
            style="width: 56px; height: 56px"
            src="../assets/svg/avatar.svg"
            alt="avatar"
          />
          <span class="showName">{{ login.userAccount }}</span>
        </div>
        <div class="buttons">
          <!-- <button class="btn border-0 btn-lg">動作1</button>
          <button class="btn border-0">動作2</button> -->
          <div class="custom-hr"></div>
          <button class="btn border-0 logout" @click="login.userLogout">
            <i class="bi bi-box-arrow-right"></i>登出
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

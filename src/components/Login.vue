<script setup>
import { loginStore } from "@/stores/login.js";
const login = loginStore();
const isAccountFocused = ref(false);
const isPasswordFocused = ref(false);
const getReturnData = (value) => {
  login.user.account = value; // 更新 login.user.account 的值
};
</script>
<template>
  <main>
    <div id="login">
      <form
        @submit.prevent="login.userLogin"
        class="text-center d-flex flex-column justify-content-between"
      >
        <div>
          <h2>歡迎使用</h2>
          <h2>EC管理後台</h2>
          <div v-if="login.ErrorCode == -1" class="awarning">
            <i class="bi bi-exclamation-triangle-fill"></i>{{ login.ErrorMsg }}
          </div>
          <!-- 帳號輸入框的使用範例 -->
          <InputOneGroupBox
            iconClass="bi bi-person-fill"
            inputType="text"
            inputId="login-account"
            inputName="login-account"
            :data-value="login.user.account"
            :value="login.user.account"
            :isFocused="isAccountFocused"
            :label="'帳號'"
            :errorMessage="
              login.ErrorCode === -5 || login.ErrorCode === -1001
                ? login.ErrorMsg
                : ''
            "
            :tabIndex="1"
            @update:modelValue="login.user.account = $event"
            @getReturnData="getReturnData"
          />
          <div class="inputOnegroupBox">
            <div
              class="inputOnegroup d-flex justify-content-between"
              :class="[{ 'error-state': login.ErrorCode !== '' }]"
            >
              <div class="d-flex w-100">
                <span class="input-group-left d-flex align-items-center">
                  <i class="bi bi-lock-fill"></i>
                </span>
                <div class="group">
                  <input
                    type="password"
                    id="login-password"
                    name="login-password"
                    class="inputOne"
                    :data-value="login.user.password"
                    v-model="login.user.password"
                    @focus="isPasswordFocused = true"
                    @blur="isPasswordFocused = false"
                    tabindex="2"
                    autocomplete="false"
                    readonly
                    onfocus="this.removeAttribute('readonly');"
                  />
                  <label for="login-password">密碼</label>
                </div>
              </div>
              <span class="input-group-right d-flex align-items-center"
                ><button
                  v-if="login.user.password != '' || isPasswordFocused"
                  type="button"
                  class="border-0 btn p-0"
                  @click="login.user.password = ''"
                >
                  <i 
                    class="bi bi-x-circle"
                    :class="[{ 'error-state': login.ErrorCode !== '' }]"
                  ></i></button
              ></span>
            </div>
            <div
              class="d-flex"
              v-if="login.ErrorCode == -5 || login.ErrorCode == -1001"
            >
              <span class="error">{{ login.ErrorMsg }}</span>
            </div>
          </div>
        </div>
        <button
          type="submit"
          :disabled="login.IsLogin"
          class="btn btn-lg btn-primary loginBtn d-flex justify-content-center align-items-center"
        >
          <span v-if="!login.loading">登入</span>
          <div style="width: 20px;height: 20px;" v-else class="spinner-border text-light" role="status">
            <span class="sr-only"></span>
          </div>
        </button>
      </form>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, defineProps, watch, defineEmits } from "vue";

const props = defineProps([
  "inputType",
  "inputId",
  "inputName",
  "value",
  "label",
  "errorMessage",
  "tabIndex",
]);
const emits = defineEmits(["getReturnData"]); // 定義 emit 函數，用於發送事件
const inputValue = ref(props.value);
const isFocused = ref(false);
const showError = computed(() => {
  if(typeof(props.errorMessage) ==="undefined") return false;
   else return props.errorMessage !== "";
});

const clearValue = () => {
  inputValue.value = "";
  emitUpdateValue(inputValue.value); // 使用 emitUpdateValue 來發送事件
};

// 監聽 value 的變化，並更新 inputValue
watch(
  () => props.value,
  (newValue) => {
    inputValue.value = newValue;
  emitUpdateValue(inputValue.value); // 使用 emitUpdateValue 來發送事件
  }
);

// 更新 inputValue 的方法
const updateInputValue = (event) => {
  inputValue.value = event.target.value;
  emitUpdateValue(inputValue.value); // 使用 emitUpdateValue 來發送事件
};
/*
emits
*/
// 定義發送事件的方法
const emitUpdateValue = (value) => {
  emits("getReturnData", value);
};
</script>

<template>
  <div class="inputTwogroupBox">
    <div
      class="inputTwogroup d-flex justify-content-between"
     
    >
      <div class="d-flex position-relative w-100">
        <div class="group">
          <input
            :type="inputType"
            :id="inputId"
            :name="inputName"
            :value="inputValue"
            v-model="inputValue"
            @input="updateInputValue"
            :data-value="inputValue"
            @focus="isFocused = true"
            @blur="isFocused = false"
            :tabindex="tabIndex"
            autocomplete="off"
            :class="{ 'error-state': showError }"
          />
          <label :for="inputId">{{ label }}</label>
        </div>
        <span
          class="input-group-right d-flex align-items-center "
        >
          <button
            v-if="
              isFocused ||
              (typeof inputValue !== 'undefined' && inputValue !== '' && inputValue)
            "
            type="button"
            class="border-0 btn p-0"
            @click="clearValue"
          >
            <i class="bi bi-x-circle" :class="{ 'error-state': showError }"></i>
          </button>
        </span>
      </div>
    </div>
    <div class="d-flex" v-if="showError">
      <span class="error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

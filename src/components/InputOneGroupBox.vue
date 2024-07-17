
<script setup>
import { ref, computed, defineProps, watch, defineEmits } from "vue";

const props = defineProps(["iconClass", "inputType", "inputId", "inputName", "value", "label", "errorMessage", "tabIndex"]);
const  emits  = defineEmits(['getReturnData']); // 定義 emit 函數，用於發送事件
const inputValue = ref(props.value);
const isFocused = ref(false);
const showError = computed(() => {
  return props.errorMessage !== "";
});

const clearValue = () => {
  inputValue.value = "";
  emitUpdateValue(inputValue.value); // 使用 emitUpdateValue 來發送事件
};

// 監聽 value 的變化，並更新 inputValue
watch(() => props.value, (newValue) => {
  inputValue.value = newValue;
});

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
  emits('getReturnData', value);
};
</script>

<template>
    <div class="inputOnegroupBox">
    <div class="inputOnegroup d-flex justify-content-between" 
    :class="{ 'error-state': showError  }">
      <div class="d-flex w-100">
        <span class="input-group-left d-flex align-items-center">
          <i :class="iconClass"></i>
        </span>
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
            autocomplete="false" 
          />
          <label :for="inputId">{{ label }}</label>
        </div>
      </div>
      <span class="input-group-right d-flex align-items-center">
        <button
          v-if="isFocused || (typeof(inputValue) !== 'undefined' && inputValue !== '')"
          type="button"
          class="border-0 btn p-0"
          @click="clearValue"
        >
          <i class="bi bi-x-circle" :class="{ 'error-state': showError }"></i>
        </button>
      </span>
    </div>
    <div class="d-flex" v-if="showError">
      <span class="error">{{ errorMessage }}</span>
    </div>
  </div>
  </template>
  

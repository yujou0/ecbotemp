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
  "options",
  "disabledChoice",
]);
const isSelectOpen = ref(false);
const emits = defineEmits(["getReturnData"]); // 定義 emit 函數，用於發送事件
const inputValue = ref(props.value);
const showError = computed(() => {
  return props.errorMessage !== "";
});
const toggleSelect = (bool) => {
  if(typeof(bool) ==='undefined') isSelectOpen.value = !isSelectOpen.value;
  else  isSelectOpen.value = bool;
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

// 定義發送事件的方法
const emitUpdateValue = (value) => {
  emits("getReturnData", value);
};
</script>

<template>
  <div class="SelectTwoGroupBox">
    <div
      class="Selectgroup d-flex justify-content-between"
      :class="{ 'error-state': showError }"
    >
      <div class="select-box " :class="{ 'isSelectOpen': isSelectOpen ,[inputId]:true}"
         >
        <div class="select-box__current" tabindex="1" @blur="toggleSelect(false)" @click="toggleSelect()"
        >
          <label :for="inputId">{{ label }}</label>
          <div
            v-for="(option, index) in options"
            :key="option"
            :value="option"
            class="select-box__value"
          >
            <input
              class="select-box__input"
              type="radio"
              :id="option + inputId"
              :value="option"
              :name="inputId"
              :checked="index === 0"
              @change="updateInputValue"
            />
            <p
              class="select-box__input-text"
              :style="
                index === 0 ? { color: '#6C757D', 'font-weight': '400' } : {}
              "
            >
              {{ option }}
            </p>
          </div>
          <img
            class="select-box__icon"
            src="http://cdn.onlinewebfonts.com/svg/img_295694.svg"
            alt="Arrow Icon"
            aria-hidden="true"
          />
        </div>
        <div class="select-box__list">
          <ul class="">
            <li
              v-for="(option, index) in options"
              :key="option"
              :style="index === 0 ? { 'pointer-events': 'none' } : {}"
            >
              <label
                class="select-box__option"
                :for="option+ inputId"
                @click="toggleSelect()"
                aria-hidden="aria-hidden"
                :style="index === 0 ? { color: '#ADB5BD' } : {}"
                >{{ option }}</label
              >
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="d-flex" v-if="showError">
      <span class="error">{{ errorMessage }}</span>
    </div>
  </div>
</template>

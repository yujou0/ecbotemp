<script setup>
const props = defineProps({
  Icon: String,
  AlertText: String,
});

const { AlertText,Icon } = toRefs(props);
// 將外部傳遞的  轉換為響應式數據
const reactiveAlertText = ref(AlertText.value);
const reactiveIcon = ref(Icon.value);


// 當外部變化時，同步更新響應式 同时监视变化
watch([AlertText,Icon], ([ newAlertText,newAlertIcon]) => {
    reactiveAlertText.value = newAlertText;
    reactiveIcon.value= newAlertIcon;
});
</script>
<template>
          <div  class="alert alert-primary" role="alert">
            <i :class="['bi', reactiveIcon]"></i>
            {{reactiveAlertText}}
          </div>
</template>

<script setup>
const props = defineProps({
    searchLoading: Boolean,
});

const { searchLoading } = toRefs(props);
// 將外部傳遞的  轉換為響應式數據
const reactiveSearchLoading = ref(searchLoading.value);

// 當外部變化時，同步更新響應式 同时监视变化
watch([searchLoading], ([ newSearchLoading]) => {
    reactiveSearchLoading.value = newSearchLoading;
});
</script>
<template>
  <button
    type="submit"
    class="btn btn-primary mediumbtn d-flex justify-content-center align-items-center"
    :disabled="searchLoading"
    >
    <span v-if="!searchLoading"> 搜尋</span>
    <div
      style="width: 20px; height: 20px"
      v-else
      class="spinner-border text-light"
      role="status"
    >
      <span class="sr-only"></span>
    </div>
  </button>
</template>

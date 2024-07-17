<script setup>
import { loadingStore } from "@/stores/loading.js";
const loading = loadingStore();
const props = defineProps({
  currentPage: Number,
  pageCount: Number,
  searchFun: Function,
});
const callParentFunction = (reactiveCurrentPage) => {
  if(props.searchFun) props.searchFun(reactiveCurrentPage);
};
const { currentPage, pageCount } = toRefs(props);
// 將外部傳遞的 pageCount 轉換為響應式數據
const reactivePageCount = ref(pageCount.value);
const reactiveCurrentPage = ref(currentPage.value);
const currentPageInput = ref("");

// 當外部變化時，同步更新響應式的 reactivePageCount
// 同时监视currentPage和pageCount的变化
watch([currentPage, pageCount], ([newCurrentPage, newPageCount]) => {
  reactivePageCount.value = newPageCount;
  reactiveCurrentPage.value = newCurrentPage;
  currentPageInput.value = newCurrentPage;
});
// 跳转到第一页
const goToFirstPage = () => {
  currentPage.value = 1;
  currentPageInput.value = 1;
  reactiveCurrentPage.value = 1;
  loading.IsLoading = true;
  props.currentPage = 1;
  callParentFunction(reactiveCurrentPage.value);
};

// 跳转到最后一页
const goToLastPage = () => {
  reactiveCurrentPage.value = reactivePageCount.value;
  currentPageInput.value = reactiveCurrentPage.value;
  loading.IsLoading = true;
  callParentFunction(reactiveCurrentPage.value);
};

// 跳转到上一页
const goToPrevPage = () => {
  if (reactiveCurrentPage.value > 1) {
    reactiveCurrentPage.value -= 1;
    currentPageInput.value = reactiveCurrentPage.value;
    loading.IsLoading = true;
    callParentFunction(reactiveCurrentPage.value);
  }
};

// 跳转到下一页
const goToNextPage = () => {
  if (reactiveCurrentPage.value < reactivePageCount.value) {
    reactiveCurrentPage.value += 1;
    currentPageInput.value = reactiveCurrentPage.value;
    loading.IsLoading = true;
    callParentFunction(reactiveCurrentPage.value);
  }
};

const wrongPageNum = ref(false);

// 定义跳转到新分页的函数
const jumpToPage = () => {
  if (
    currentPageInput.value === "" ||
    currentPageInput.value < 1 ||
    currentPageInput.value > reactivePageCount.value
  ) {
    wrongPageNum.value = true;
    return;
  } else wrongPageNum.value = false;
  const newPage = parseInt(currentPageInput.value);
  if (newPage >= 1 && newPage <= reactivePageCount.value) {
    reactiveCurrentPage.value = newPage;
    loading.IsLoading = true;
    callParentFunction(reactiveCurrentPage.value);
  }
};
</script>

<template>
  <div class="d-flex justify-content-center">
    <div class="pagenation d-flex align-items-center">
      <button
        @click="goToFirstPage"
        :class="{
          btn: true,
          'link-primary':
            currentPageInput !== 1 &&
            currentPageInput > 0 &&
            currentPageInput <= reactivePageCount,
          disabled:
            currentPageInput === 1 ||
            currentPageInput <= 0 ||
            currentPageInput === '' ||
            currentPageInput > reactivePageCount || wrongPageNum,
        }"
      >
        <i class="bi bi-chevron-double-left"></i>
      </button>
      <butto
        @click="goToPrevPage"
        :class="{
          btn: true,
          disabled:
            currentPageInput === 1 ||
            currentPageInput <= 0 ||
            currentPageInput === '' ||
            currentPageInput > reactivePageCount || wrongPageNum,
          'link-primary':
            currentPageInput !== 1 &&
            currentPageInput > 0 &&
            currentPageInput <= reactivePageCount,
        }"
      >
        <i class="bi bi-chevron-left"></i>
      </butto>
      <div
        class="d-flex pagenation-content align-items-center justify-content-between"
      >
        <input
          type="number"
          v-model="currentPageInput"
          @keyup.enter="jumpToPage"
          class="pageInput"
          :style="{ 'border-color': wrongPageNum ? '#DC3545' : '' }"
        />
        <div>/</div>
        <div>{{ reactivePageCount }} 頁</div>
      </div>
      <button
        @click="goToNextPage"
        :class="{
          btn: true,
          disabled:
            currentPageInput === reactivePageCount ||
            currentPageInput <= 0 ||
            currentPageInput === '' ||
            currentPageInput > reactivePageCount ||
            wrongPageNum,
          'link-primary':
            currentPageInput !== reactivePageCount &&
            currentPageInput > 0 &&
            currentPageInput <= reactivePageCount,
        }"
      >
        <i class="bi bi-chevron-right"></i>
      </button>
      <button
        @click="goToLastPage"
        :class="{
          btn: true,
          disabled:
            currentPageInput === reactivePageCount ||
            currentPageInput <= 0 ||
            currentPageInput === '' ||
            currentPageInput > reactivePageCount || wrongPageNum,
          'link-primary':
            currentPageInput !== reactivePageCount &&
            currentPageInput > 0 &&
            currentPageInput <= reactivePageCount,
        }"
      >
        <i class="bi bi-chevron-double-right"></i>
      </button>
    </div>
    <!-- 其他分页内容... -->
  </div>
</template>
<style scoped></style>

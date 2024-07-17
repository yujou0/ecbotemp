<script setup>
const props = defineProps({
  currentPage: Number,
  pageSize: Number,
  searchedData: Array,
  totalCount: Number,
});

const { currentPage, pageSize, searchedData, totalCount } = toRefs(props);
// 將外部傳遞的 pageCount 轉換為響應式數據
const reactiveCurrentPage = ref(currentPage.value);
const reactivePageSize = ref(pageSize.value);
const reactivesearchedData = ref(searchedData.value);
const reactiveTotalCount = ref(totalCount.value);

// 將要觀察的變數放入 watch 的陣列中
watch(
  [currentPage, pageSize, searchedData, totalCount],
  ([newCurrentPage, newPageSize, newSearchedData, newTotalCount]) => {
    reactiveCurrentPage.value = newCurrentPage;
    reactivePageSize.value = newPageSize;
    reactivesearchedData.value = newSearchedData;
    reactiveTotalCount.value = newTotalCount;
  }
);
</script>
<template>

  <div class="showCurrentPageCount">
    第
    {{
      reactiveTotalCount === 0
        ? 0
        : (reactiveCurrentPage - 1) * reactivePageSize + 1
    }}
    筆 ～ 第
    {{
      (reactiveCurrentPage - 1) * reactivePageSize +
      Math.min(
        reactiveCurrentPage * reactivePageSize,
        reactivesearchedData.length
      )
    }}
    筆， 共 {{ reactiveTotalCount }} 筆
  </div>
</template>
<style scoped></style>

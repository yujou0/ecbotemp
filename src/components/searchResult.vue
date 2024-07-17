<script setup>
const props = defineProps({
    notSearchYet: Boolean,
    searchedData: Array,
});

const { notSearchYet, searchedData } = toRefs(props);
// 將外部傳遞的 pageCount 轉換為響應式數據
const reactiveNotSearchYet = ref(notSearchYet.value);
const reactiveSearchedData = ref(searchedData.value);

// 當外部變化時，同步更新響應式的 reactivePageCount
// 同时监视currentPage和pageCount的变化
watch([notSearchYet, searchedData], ([newNotSearchYet, newSearchedData]) => {
    reactiveNotSearchYet.value = newNotSearchYet;
    reactiveSearchedData.value = newSearchedData;
});

</script>
<template>
    <div class="searchResult">
      <h4>搜尋結果</h4>
      <slot name="header"></slot>
      <div
        class="searchResult-content d-flex justify-content-center align-items-center"
      >
      <slot  name="content">        
        </slot>
        <div v-show="!reactiveNotSearchYet">
          <div class="noResult">
            <i class="bi bi-file-text-fill custom-icon"></i>
            <p>請輸入或設定需要的條件後按下搜尋按鈕</p>
            <p>將在此為您顯示搜尋結果</p>
          </div>
        </div>
        <div v-show="reactiveSearchedData.length == 0 && reactiveNotSearchYet">
          <div class="noResult">
            <i class="bi bi-clipboard2-x-fill custom-icon"></i>
            <p>找不到符合條件的資料</p>
          </div>
        </div>
      </div>
    </div>
</template>
<script setup>
import { ref, reactive, onMounted, onBeforeUnmount } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { useApiStore } from "@/stores/commandApiSearch.js";
import { loadingStore } from "@/stores/loading.js";
import { loginStore } from "@/stores/login.js";
import { useGlobalFunctionsStore } from "@/stores/globalFunctions.js";

const globalFunctions = useGlobalFunctionsStore();
const login = loginStore();
const apiStore = useApiStore();
const currentPage = ref(1);
const date = ref([]);
const endDate = new Date();
const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
const loading = loadingStore();
const notSearchYet = ref(false);

onMounted(() => {
  date.value = [startDate, endDate];
  searchForm.StartDate = date.value[0];
  searchForm.EndDate = date.value[1];
});

onBeforeUnmount(() => {
  loading.IsLoading = false;
});

const isSkuFocused = ref(false);
const isProductNameFocused = ref(false);

// 定义搜索表单数据
const searchForm = reactive({
  Sku: "",
  ProductName: "",
});

// 定义搜索表单error数据
const searchFormError = reactive({
  Sku: "",
  ProductName: "",
});

// 定义分页相关数据
const pageSize = 20; // 每页显示的数据量
const pageCount = ref(0); // 总页数
const totalCount = ref(0); // 总筆数
const searchedData = ref([]);
const searchLoading = ref(false);

// Mock data
const mockData = [
  {
    Id: 1,
    Sku: "SKU123456",
    ProductName: "Product 1",
    Quantity: 100,
    Price: 1000,
    PriceSale: 900,
    Cost: 700,
    UnlimitedQuantity: false,
  },
  {
    Id: 2,
    Sku: "SKU123457",
    ProductName: "Product 2",
    Quantity: 200,
    Price: 2000,
    PriceSale: 1800,
    Cost: 1500,
    UnlimitedQuantity: true,
  },
];

// 定义搜索函数
const search = async (currentPageData) => {
  searchLoading.value = true;
  if (typeof currentPageData !== "number") currentPageData = currentPage.value;
  else currentPage.value = currentPageData;

  try {
    if (searchForm.Sku === "" && searchForm.ProductName === "") {
      searchFormError.Sku = "請輸入至少一項搜尋條件";
      searchFormError.ProductName = "請輸入至少一項搜尋條件";
      searchLoading.value = false;
      loading.IsLoading = false;
      return;
    }

    searchFormError.Sku = globalFunctions.isValidSku(searchForm.Sku).errorMessage;
    searchFormError.ProductName = globalFunctions.isValidProductName(searchForm.ProductName).errorMessage;

    if (!globalFunctions.isValidSku(searchForm.Sku).isValid || !globalFunctions.isValidProductName(searchForm.ProductName).isValid) {
      searchLoading.value = false;
      loading.IsLoading = false;
      notSearchYet.value = true;
      return;
    }

    // 根据搜索条件过滤数据
    const filteredData = mockData.filter((item) => {
      const skuMatch = searchForm.Sku === "" || item.Sku.includes(searchForm.Sku);
      const productNameMatch = searchForm.ProductName === "" || item.ProductName.includes(searchForm.ProductName);
      return skuMatch && productNameMatch;
    });

    const startIndex = (currentPageData - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    const paginatedData = filteredData.slice(startIndex, endIndex);

    searchedData.value = paginatedData;
    pageCount.value = Math.ceil(filteredData.length / pageSize);
    totalCount.value = filteredData.length;
    notSearchYet.value = true;
    searchLoading.value = false;
    loading.IsLoading = false;
  } catch (error) {
    console.error("Error:", error);
    if (error.response.request.status === 401) login.userLogout();
  }
};

const getSkuData = (value) => {
  searchForm.Sku = value.trim();
};

const getProductNameData = (value) => {
  searchForm.ProductName = value.trim();
};
</script>

<template>
  <div class="productSearch">
    <div class="searchSetion">
      <!-- 搜尋表單 -->
      <form @submit.prevent="search(1)">
        <div class="d-flex">
          <div class="d-flex col-6">
            <InputTwoGroupBox
              inputType="text"
              inputId="searchForm.Sku"
              inputName="searchForm.Sku"
              :data-value="searchForm.Sku"
              :value="searchForm.Sku"
              :isFocused="isSkuFocused"
              :label="'商品貨號'"
              :tabIndex="0"
              :errorMessage="searchFormError.Sku"
              @update:modelValue="searchForm.Sku = $event"
              @getReturnData="getSkuData"
            />
            <InputTwoGroupBox
              inputType="text"
              inputId="searchForm.ProductName"
              inputName="searchForm.ProductName"
              :data-value="searchForm.ProductName"
              :value="searchForm.ProductName"
              :isFocused="isProductNameFocused"
              :label="'商品名稱'"
              :tabIndex="1"
              :errorMessage="searchFormError.ProductName"
              @update:modelValue="searchForm.ProductName = $event"
              @getReturnData="getProductNameData"
            />
          </div>
          <div class="d-flex col-6 justify-content-end">
            <SearchBtn :searchLoading="searchLoading" />
          </div>
        </div>
      </form>
    </div>
    <SearchResult :searchedData="searchedData" :notSearchYet="notSearchYet">
      <template v-slot:content>
        <div v-show="searchedData.length > 0 && notSearchYet" class="Result">
          <showCurrentPageCount
            class="mt-0"
            :currentPage="currentPage"
            :pageSize="pageSize"
            :searchedData="searchedData"
            :totalCount="totalCount"
          />
          <DriggingContainer>
            <table class="table table-hover m-0">
              <thead>
                <tr>
                  <th>#</th>
                  <th>商品貨號</th>
                  <th>商品名稱</th>
                  <th>庫存/數量</th>
                  <th>商品原價</th>
                  <th>商品特價</th>
                  <th>商品成本</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in searchedData" :key="item.Id" class="">
                  <td>{{ item.Id }}</td>
                  <td>{{ item.Sku ? item.Sku : "--" }}</td>
                  <td>{{ item.ProductName ? item.ProductName : "--" }}</td>
                  <td>
                    {{
                      item.UnlimitedQuantity === true
                        ? "無上限"
                        : item.Quantity
                        ? item.Quantity
                        : "--"
                    }}
                  </td>
                  <td>{{ item.Price ? item.Price : "--" }}</td>
                  <td>{{ item.PriceSale ? item.PriceSale : "--" }}</td>
                  <td>{{ item.Cost ? item.Cost : "--" }}</td>
                </tr>
              </tbody>
            </table>
          </DriggingContainer>
          <showCurrentPageCount
            :currentPage="currentPage"
            :pageSize="pageSize"
            :searchedData="searchedData"
            :totalCount="totalCount"
          />
          <div>
            <!-- 分頁功能 -->
            <Pagination
              :searchFun="search"
              :currentPage="currentPage"
              :pageCount="pageCount"
            />
          </div>
        </div>
      </template>
    </SearchResult>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>

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
const totalCount = ref(0); //總筆數
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

  const ProductNameStr =
    searchForm.ProductName === ""
      ? ""
      : `ProductName=${encodeURIComponent(searchForm.ProductName)}`;

  const SkuStr = searchForm.Sku === "" ? "" : `Sku=${encodeURIComponent(searchForm.Sku)}`;

  try {
    if (searchForm.Sku === "" && searchForm.ProductName === "") {
      searchFormError.Sku = "請輸入至少一項搜尋條件";
      searchFormError.ProductName = "請輸入至少一項搜尋條件";
      searchLoading.value = false;
      loading.IsLoading = false;
      return;
    }
    searchFormError.Sku = globalFunctions.isValidSku(
      searchForm.Sku
    ).errorMessage;
    searchFormError.ProductName = globalFunctions.isValidProductName(
      searchForm.ProductName
    ).errorMessage;
    if (
      !globalFunctions.isValidSku(searchForm.Sku).isValid ||
      !globalFunctions.isValidProductName(searchForm.ProductName).isValid
    ) {
      searchLoading.value = false;
      loading.IsLoading = false;
      notSearchYet.value = true;
      return;
    }

    // Use mock data
    const result = {
      State: 0,
      Data: {
        Data: mockData,
        PageCount: 1,
        TotalCount: mockData.length,
      },
    };

    if (result.State === 0) {
      searchedData.value = result.Data.Data;
      pageCount.value = result.Data.PageCount;
      totalCount.value = result.Data.TotalCount;
    } else {
      searchedData.value = [];
    }

    notSearchYet.value = true;
    searchLoading.value = false;
    loading.IsLoading = false;
  } catch (error) {
    console.error("Error sending POST request:", error);
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
  <div class="orderSearch">
    <div class="searchSetion">
      <!-- 搜尋表單 -->
      <form @submit.prevent="search(1)">
        <div class="d-flex">
          <div class="d-flex col-6">
            <InputTwoGroupBox
              inputType="text"
              inputId="searchForm.OrderNumber"
              inputName="searchForm.OrderNumber"
              :data-value="searchForm.OrderNumber"
              :value="searchForm.OrderNumber"
              :isFocused="isOrderNumberFocused"
              :label="'訂單編號'"
              :tabIndex="1"
              @update:modelValue="searchForm.OrderNumber = $event"
              @getReturnData="getOrderNumberData"
            />
            <InputTwoGroupBox
              inputType="phone"
              inputId="searchForm.RegisterPhone"
              inputName="searchForm.RegisterPhone"
              :data-value="searchForm.RegisterPhone"
              :value="searchForm.RegisterPhone"
              :isFocused="isPhoneFocused"
              :label="'註冊門號'"
              :tabIndex="1"
              :errorMessage="searchFormError.RegisterPhone"
              @update:modelValue="searchForm.RegisterPhone = $event"
              @getReturnData="getPhoneData"
            />
          </div>
          <div class="col-6">
            <custom-date-picker
              v-model:selectedValue="selectedDates"
              :datepicketStatus="datepicketStatus"
              :label="'訂單建立時間 (限搜尋 92 天內區間)'"
              @getReturnData="getDateData"
            />
          </div>
        </div>
        <p class="advancedTitle">進階搜尋條件</p>
        <div class="d-flex">
          <div class="d-flex w-100 justify-content-between">
            <div class="advancedTitle-content d-flex align-items-center">
              <SelectThreeGroupBox
                :options="[
                  '請選擇狀態',
                  '全部',
                  '處理中',
                  '已刪除',
                  '已確認',
                  '已完成',
                  '已取消',
                ]"
                inputType="text"
                inputId="searchForm.orderStatus"
                inputName="searchForm.orderStatus"
                :data-value="searchForm.orderStatus"
                :value="searchForm.orderStatus"
                label="訂單狀態"
                disabledChoice="請選擇狀態"
                errorMessage=""
                tabIndex="1"
                @getReturnData="getorderStatusData"
              />
              <SelectThreeGroupBox
                :options="[
                  '請選擇狀態',
                  '全部',
                  '備貨中',
                  '發貨中',
                  '已發貨',
                  '已到達',
                  '已取貨',
                  '退貨中',
                  '已退貨',
                ]"
                inputType="text"
                inputId="searchForm.DeliveryStatus"
                inputName="searchForm.DeliveryStatus"
                :data-value="searchForm.DeliveryStatus"
                :value="searchForm.DeliveryStatus"
                label="出貨狀態"
                disabledChoice="請選擇狀態"
                errorMessage=""
                tabIndex="1"
                @getReturnData="getDeliveryStatusData"
              />
              <SelectThreeGroupBox
                :options="[
                  '請選擇狀態',
                  '全部',
                  '未付款',
                  '已付款',
                  '退款中',
                  '已退款',
                  '已部分退款',
                ]"
                inputType="text"
                inputId="searchForm.PaymentStatus"
                inputName="searchForm.PaymentStatus"
                :data-value="searchForm.PaymentStatus"
                :value="searchForm.PaymentStatus"
                label="付款狀態"
                disabledChoice="請選擇狀態"
                errorMessage=""
                tabIndex="1"
                @getReturnData="getPaymentStatusData"
              />
            </div>
            <SearchBtn :searchLoading="searchLoading" />
          </div>
        </div>
      </form>
      <!-- 其他內容略 -->
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
                  <th>訂單編號</th>
                  <th>訂單內容</th>
                  <th>訂單建立時間</th>
                  <th>訂單狀態</th>
                  <th>付款狀態</th>
                  <th>出貨狀態</th>
                  <th>訂單金額</th>
                  <th>訂購人</th>
                  <th>搭車金狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="item in showData"
                  :key="item.ID"
                  :class="{ trIsChild: item.isChild }"
                >
                  <td>
                    <span v-if="!item.isChild">{{ item.Id }}</span>
                  </td>
                  <td>
                    <div
                      class="d-flex align-items-center"
                      :class="{
                        trIsFirstChild: item.isFirstChild,
                        trIsLastChild: item.isLastChild,
                        trIsMiddleChild:
                          !item.isFirstChild && !item.isLastChild,
                      }"
                    >
                      <button
                        class="d-flex justify-content-center align-items-center"
                        :class="[
                          { 'order-expand-btn': !item.showDetails },
                          { 'order-expanded-btn': item.showDetails },
                        ]"
                        @click="toggleDetails(item, item.Id)"
                        v-if="item.hasList"
                      >
                        <i
                          :class="[
                            { 'bi-plus': !item.showDetails },
                            { 'bi bi-dash': item.showDetails },
                            { 'rotate-90': !item.showDetails },
                            { 'rotate-180': item.showDetails },
                          ]"
                        ></i>
                      </button>
                      <div class="ListOrderNumber">
                        {{ item["OrderNumber"] ? item["OrderNumber"] : "--" }}
                      </div>
                    </div>
                  </td>
                  <td>
                    {{ item["OrderContent"] ? item["OrderContent"] : "--" }}
                  </td>
                  <td>
                    {{
                      item["OrderCreateTime"]
                        ? globalFunctions.formatDate(item["OrderCreateTime"])
                        : "--"
                    }}
                  </td>
                  <td>
                    {{
                      item.OrderStatus
                        ? globalFunctions.OrderStatusMap[item.OrderStatus]
                        : "--"
                    }}
                  </td>
                  <td>
                    {{
                      item.PaymentStatus
                        ? globalFunctions.PaymentStatusMap[item.PaymentStatus]
                        : "--"
                    }}
                  </td>
                  <td>
                    {{
                      item["DeliveryStatus"] ? globalFunctions.DeliveryStatusMap[item["DeliveryStatus"]] : "--"
                    }}
                  </td>
                  <td>
                    {{ item["OrderTotalSum"] ? item["OrderTotalSum"] : "--" }}
                  </td>
                  <td>
                    {{ item["OrderPlacer"] ? item["OrderPlacer"] : "--" }}
                  </td>

                  <td >
                    {{ item["HasTicket"] ? "" : "--" }}
                    <div v-if="!item.hasList && item['List'] && item['List'].length == 1 && item['List'][0].TicketInsertInfo.length > 0">
                      <div  v-for="ListItem in item['List']" :key="ListItem">
                        <p  v-for="(Ticket) in ListItem.TicketInsertInfo" :key="Ticket">
                            {{ Ticket.AID }} /
                            {{ globalFunctions.TicketStatusMap[globalFunctions.NumericStatusMap[Ticket.Status]] }}
                        </p>
                      </div>
                    </div>
                    <div v-else>
                      <!-- {{ item.TicketInsertInfo }} -->
                      <p v-for="Ticket in item.TicketInsertInfo" :key="Ticket">
                            {{ Ticket.AID }} /
                            {{ globalFunctions.TicketStatusMap[globalFunctions.NumericStatusMap[Ticket.Status]] }}
                          </p>
                    </div>
                  </td>
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
<style></style>

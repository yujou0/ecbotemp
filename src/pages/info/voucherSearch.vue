<script setup>
import { ref, reactive, onMounted } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { useApiStore } from "@/stores/commandApiSearch.js";
import { loadingStore } from "@/stores/loading.js";
import { loginStore } from "@/stores/login.js";
import CustomDatePicker from "@/components/CustomDatePicker.vue";
import { useGlobalFunctionsStore } from "@/stores/globalFunctions.js";
const login = loginStore();
const globalFunctions = useGlobalFunctionsStore();
const apiStore = useApiStore();
const currentPage = ref(1);
const date = ref([]);
const endDate = new Date();
const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
const loading = loadingStore();
const notSearchYet = ref(false);
onMounted(() => {
  date.value = [startDate, endDate];
  searchForm.StartDate = date.value[0]; // 给註冊時間Start 设置值
  searchForm.EndDate = date.value[1];
});
// 在组件卸载之前执行操作
onBeforeUnmount(() => {
  loading.IsLoading = false;
});

// 定义搜索表单数据
const searchForm = reactive({
  TicketInsertStatus: "",
  StartDate: "",
  EndDate: "",
});

// 定义分页相关数据
const pageSize = 20; // 每页显示的数据量
const pageCount = ref(0); // 总页数
const totalCount = ref(0); //總筆數
const searchedData = ref([]);
const searchLoading = ref(false);
const dateError = ref("");

// 定义搜索函数
const search = async (currentPageData) => {
  searchLoading.value = true;
  if (typeof currentPageData !== "number") currentPageData = currentPage.value;
  else currentPage.value = currentPageData;
  
  if (searchForm.TicketInsertStatus) {
    if (searchForm.TicketInsertStatus === "全部") {
      searchForm.TicketInsertStatus = "";
    } else {
      for (const key in globalFunctions.TicketStatusMap) {
        if (
          globalFunctions.TicketStatusMap[key] === searchForm.TicketInsertStatus
        ) {
          searchForm.TicketInsertStatus = key;
          break;
        }
      }
    }
  }

  const url = `/Order/TicketInsert?StartDate=${globalFunctions.formatDateToYYYYMMDD(
    searchForm.StartDate
  )}&EndDate=${globalFunctions.formatDateToYYYYMMDD(
    searchForm.EndDate
  )}&TicketInsertStatus=${
    searchForm.TicketInsertStatus
  }&Page=${currentPageData}&PageSize=20`;

  try {
    if (searchForm.StartDate === "" && searchForm.EndDate === "") {
      searchLoading.value = false;
      loading.IsLoading = false;
      notSearchYet.value = true;
      return;
    }
    if (!globalFunctions.isValidDate(dateError.value)) {
      searchLoading.value = false;
      loading.IsLoading = false;
      notSearchYet.value = true;
      return;
    }

    const result = await apiStore.getData(url);
    if (result.State === 0) {
      searchedData.value = [];
      searchedData.value = result.Data.Data;
      pageCount.value = result.Data.PageCount;
      totalCount.value = result.Data.TotalCount;
    } else searchedData.value = [];

    notSearchYet.value = true;
    searchLoading.value = false;
    loading.IsLoading = false;
  } catch (error) {
    console.error("Error sending POST request:", error);
    if (error.response.request.status === 401) login.userLogout();
  }
};
const getDateData = (value) => {
  dateError.value = value.value2;
  const startDate = new Date(value.value1[0]);
  const endDate = new Date(value.value1[1]);
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  searchForm.StartDate = startDate;
  searchForm.EndDate = endDate;
};

const getTicketInsertStatusData = (value) => {
  searchForm.TicketInsertStatus = value.trim();
};
</script>
<template>
  <div class="voucherSearch">
    <div class="searchSetion">
      <!-- 搜尋表單 -->
      <form @submit.prevent="search(1)">
        <div class="d-flex justify-content-between">
          <div class="d-flex col-6">
            <SelectTwoGroupBox
                :options="[
                  '請選擇搭車金匯入狀態',
                  '全部',
                  '已發放',
                  '待發放',
                  '處理中',
                  '失敗',
                ]"
                inputType="text"
                inputId="searchForm.TicketInsertStatus"
                inputName="searchForm.TicketInsertStatus"
                :data-value="searchForm.TicketInsertStatus"
                :value="searchForm.TicketInsertStatus"
                label="搭車金"
                disabledChoice="請選擇搭車金匯入狀況"
                errorMessage=""
                tabIndex="1"
                @getReturnData="getTicketInsertStatusData"
              />
            <custom-date-picker
              v-model:selectedValue="selectedDates"
              :datepicketStatus="datepicketStatus"
              @getReturnData="getDateData"
              :label="'訂單建立時間 (限搜尋 92 天內區間)'"
            />

          </div>
            <SearchBtn :searchLoading="searchLoading" />
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
                  <th>訂單編號</th>
                  <th>訂單金額</th>
                  <th>訂單建立時間</th>
                  <th>搭車金匯入狀態</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in searchedData" :key="item.Id" class="">
                  <td>{{ item.Id }}</td>
                  <td>
                    {{ item["OrderNumber"] ? item["OrderNumber"] : "--" }}
                  </td>
                  <td>
                    {{ item["OrderTotalSum"] ? item["OrderTotalSum"] : "--" }}
                  </td>
                  <td>
                    {{
                      item["OrderCreateTime"]
                        ? globalFunctions.formatDate(item["OrderCreateTime"])
                        : "--"
                    }}
                  </td>
                  <td>
                      <p
                        v-for="Ticket in item['TicketInsertInfo']"
                        :key="Ticket"
                      >
                        {{ Ticket.AID }} /
                        {{
                          globalFunctions.TicketStatusMap[
                            globalFunctions.NumericStatusMap[Ticket.Status]
                          ]
                        }} 
                        {{  Ticket.Msg ? '/ '+Ticket.Msg : "" }}
                      </p>
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

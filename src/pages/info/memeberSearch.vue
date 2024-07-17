<script setup>
import { ref, reactive, onMounted, watch, onBeforeUnmount } from "vue";
import "@vuepic/vue-datepicker/dist/main.css";
import { useApiStore } from "@/stores/commandApiSearch.js";
import { loadingStore } from "@/stores/loading.js";
import CustomDatePicker from "@/components/CustomDatePicker.vue";
import { useGlobalFunctionsStore } from '@/stores/globalFunctions.js';
const globalFunctions = useGlobalFunctionsStore();
const selectedDates = ref([]);
const datepicketStatus = ref("");
const apiStore = useApiStore();
const currentPage = ref(1);
const date = ref([]);
const endDate = new Date();
const startDate = new Date(new Date().setDate(endDate.getDate() - 7));
const loading = loadingStore();
const notSearchYet = ref(false);
const isPhoneFocused = ref(false);
const isCAIDFocused = ref(false);
const isCustomerNameFocused = ref(false);
const selectedOption = ref("phone");
const searchForm = reactive({
  RegisterPhone: "",
  CAID: "",
  StartDate: "",
  EndDate: "",
  CustomerName: "",
  MemberTierValue: "",
});
const searchFormError = reactive({
  RegisterPhone: "",
  CAID: "",
  StartDate: "",
  EndDate: "",
  CustomerName: "",
  MemberTierValue: "",
});
// 定义分页相关数据
const pageSize = 20; // 每页显示的数据量
const pageCount = ref(0); // 总页数
const totalCount = ref(0); //總筆數
// 定义搜索结果数据
const searchedData = ref([]);
const searchLoading = ref(false);
const dateError = ref("");

const mockApiData = {
  State: 0,
  Data: {
    Data: [
      { Id: 1, RegisterPhone: "0912345678", Name: "John Doe", MemberTierValue: "Small", OrderCount: 5, OrdersTotalSum: 10000, RegisterTime: "2023-07-10T10:00:00", 最後登入時間: "2023-07-15T10:00:00" },
      { Id: 2, RegisterPhone: "0987654321", Name: "Jane Smith", MemberTierValue: "Silver", OrderCount: 3, OrdersTotalSum: 5000, RegisterTime: "2023-07-12T11:00:00", 最後登入時間: "2023-07-16T11:00:00" },
      { Id: 3, RegisterPhone: "0985557891", Name: "Corey Lin", MemberTierValue: "Silver", OrderCount: 3, OrdersTotalSum: 5000, RegisterTime: "2024-07-12T11:00:00", 最後登入時間: "2024-07-16T11:00:00" },
      
      // 更多假資料...
    ],
    PageCount: 1,
    TotalCount: 2
  }
};

onMounted(() => {
  date.value = [startDate, endDate];
  startDate.setHours(0, 0, 0, 0);
  endDate.setHours(23, 59, 59, 999);
  searchForm.StartDate = date.value[0];
  searchForm.EndDate = date.value[1];
});
// 监听 selectedOption 的变化
watch(selectedOption, (newVal) => {
  if (newVal === "phone") {
    searchForm.CAID = "";
  } else if (newVal === "caid") {
    searchForm.RegisterPhone = "";
    searchFormError.CAID = "";
  }
  if (newVal === "phone" || newVal === "caid") {
    searchFormError.RegisterPhone = "";
    searchFormError.CAID = "";
  }
});
// 在组件卸载之前执行操作
onBeforeUnmount(() => {
  loading.IsLoading = false;
});

// 定义搜索函数
const search = async (currentPageData) => {
  if (typeof currentPageData !== "number") currentPageData = currentPage.value;
  else currentPage.value = currentPageData;
  searchLoading.value = true;
  // 替換搜索表單的值為英文
  if (searchForm.MemberTierValue) {
    if (searchForm.MemberTierValue === "全部") {
      searchForm.MemberTierValue = "";
    } else {
      for (const key in globalFunctions.MemberTierValueMap) {
        if (globalFunctions.MemberTierValueMap[key] === searchForm.MemberTierValue) {
          searchForm.MemberTierValue = key;
          break;
        }
      }
    }
  }
  const RegisterPhoneStr = searchForm.RegisterPhone === "" ? ""  : `RegisterPhone=${encodeURIComponent(searchForm.RegisterPhone)}`;
  const CAIDStr = searchForm.CAID === "" ? "" : `CAID=${encodeURIComponent(searchForm.CAID)}`;
  const CustomerNameStr = searchForm.CustomerName === "" ? "" : `CustomerName=${encodeURIComponent(searchForm.CustomerName)}`;
  const url = `/Customer/Information?${RegisterPhoneStr}&${CAIDStr}&StartDate=${globalFunctions.formatDateToYYYYMMDD(
    searchForm.StartDate
  )}&EndDate=${globalFunctions.formatDateToYYYYMMDD(
    searchForm.EndDate
  )}&${CustomerNameStr}&MemberTierValue=${
    searchForm.MemberTierValue
  }&Page=${currentPageData}&PageSize=20`;

  try {
    if (
      searchForm.RegisterPhone === "" &&
      searchForm.CAID === "" &&
      searchForm.StartDate === "" &&
      searchForm.EndDate === ""
    ) {
      searchLoading.value = false;
      notSearchYet.value = true;
      return;
    }
    searchFormError.RegisterPhone = globalFunctions.isValidPhone(searchForm.RegisterPhone).errorMessage;

    if (
      !globalFunctions.isValidPhone(searchForm.RegisterPhone).isValid ||
      !globalFunctions.isValidDate(dateError.value)
    ) {
      searchLoading.value = false;
      loading.IsLoading = false;
      notSearchYet.value = true;
      return;
    }

    // 模擬 API 回應並篩選數據
    const result = mockApiData;
    const filteredData = result.Data.Data.filter(item => {
      return (
        (!searchForm.RegisterPhone || item.RegisterPhone.includes(searchForm.RegisterPhone)) &&
        (!searchForm.CAID || item.CAID === searchForm.CAID) &&
        (!searchForm.CustomerName || item.Name.includes(searchForm.CustomerName)) &&
        (!searchForm.MemberTierValue || item.MemberTierValue === searchForm.MemberTierValue) &&
        new Date(item.RegisterTime) >= searchForm.StartDate &&
        new Date(item.RegisterTime) <= searchForm.EndDate
      );
    });

    if (result.State === 0) {
      const startIndex = (currentPage.value - 1) * pageSize;
      const endIndex = startIndex + pageSize;
      searchedData.value = filteredData.slice(startIndex, endIndex);
      pageCount.value = Math.ceil(filteredData.length / pageSize);
      totalCount.value = filteredData.length;
    } else {
      searchedData.value = [];
    }
    notSearchYet.value = true;
    searchLoading.value = false;
    loading.IsLoading = false;
  } catch (error) {
    console.error("Error sending POST request:", error);
  }
};

const getPhoneData = (value) => {
  searchForm.RegisterPhone = value.trim();
};
const getCAIDData = (value) => {
  searchForm.CAID = value.trim();
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

const getCustomerNameData = (value) => {
  searchForm.CustomerName = value.trim();
};

const getMemberTierValueData = (value) => {
  searchForm.MemberTierValue = value.trim();
};

</script>

<template>
  <div class="memberSearch">
    <div class="searchSetion">
      <form @submit.prevent="search(1)">
        <div class="d-flex col-6">
          <div class="input-group">
            <div class="input-group-prepend">
              <span
                class="input-group-text d-flex flex-column align-items-start"
                :class="{
                  error:
                    searchFormError.CAID !== '' ||
                    searchFormError.RegisterPhone !== '',
                }"
              >
                <label for="radio1" class="d-flex align-items-center">
                  <input
                    type="radio"
                    id="radio1"
                    name="radioGroup"
                    v-model="selectedOption"
                    value="phone"
                  />
                  <span>門號</span>
                </label>
                <label for="radio2" class="d-flex align-items-center">
                  <input
                    type="radio"
                    id="radio2"
                    name="radioGroup"
                    v-model="selectedOption"
                    value="caid"
                  /><span>CAID</span>
                </label>
              </span>
            </div>
            <InputTwoGroupBox
              v-if="selectedOption === 'phone'"
              inputType="phone"
              inputId="RegisterPhone"
              inputName="RegisterPhone"
              :data-value="searchForm.RegisterPhone"
              :value="
                selectedOption === 'phone' ? searchForm.RegisterPhone : ''
              "
              :isFocused="isPhoneFocused"
              :label="'註冊門號'"
              :errorMessage="searchFormError.RegisterPhone"
              @update:modelValue="searchForm.RegisterPhone = $event"
              @getReturnData="getPhoneData"
            />
            <InputTwoGroupBox
              v-if="selectedOption === 'caid'"
              inputType="text"
              inputId="CAID"
              inputName="CAID"
              :data-value="searchForm.CAID"
              :value="selectedOption === 'caid' ? searchForm.CAID : ''"
              :isFocused="isCAIDFocused"
              :label="'CAID'"
              :errorMessage="searchFormError.CAID"
              @update:modelValue="searchForm.CAID = $event"
              @getReturnData="getCAIDData"
            />
          </div>
          <div class="col-6">
            <custom-date-picker
              :label="'註冊時間 (限搜尋 92 天內區間)'"
              v-model:selectedValue="selectedDates"
              :datepicketStatus="datepicketStatus"
              @getReturnData="getDateData"
            />
          </div>
        </div>
        <p class="advancedTitle">進階搜尋條件</p>
        <div class="d-flex">
          <div class="d-flex w-100 justify-content-between">
            <div class="advancedTitle-content d-flex align-items-center">
              <InputThreeGroupBox
                inputType="text"
                inputId="searchForm.CustomerName"
                inputName="searchForm.CustomerName"
                :data-value="searchForm.CustomerName"
                :value="searchForm.CustomerName"
                :isFocused="isCustomerNameFocused"
                :label="'會員姓名'"
                :tabIndex="1"
                @update:modelValue="searchForm.CustomerName = $event"
                @getReturnData="getCustomerNameData"
              />
              <SelectThreeGroupBox
                :options="[
                  '請選擇會員等級',
                  '全部',
                  '小熊',
                  '黑熊',
                  '銀熊',
                  '金熊',
                  '鑽石熊',
                ]"
                inputType="text"
                inputId="searchForm.MemberTierValue"
                inputName="searchForm.MemberTierValue"
                :data-value="searchForm.MemberTierValue"
                :value="searchForm.MemberTierValue"
                label="熊籍"
                disabledChoice="請選擇會員等級"
                errorMessage=""
                tabIndex="1"
                @getReturnData="getMemberTierValueData"
              />
            </div>
            <SearchBtn :searchLoading="searchLoading" />
          </div>
        </div>
      </form>
    </div>
    <div class="searchResult">
      <h4>搜尋結果</h4>
      <div
        class="searchResult-content d-flex justify-content-center align-items-center"
      >
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
                  <th>註冊門號</th>
                  <th>姓名</th>
                  <th>熊籍</th>
                  <th>累積訂單數</th>
                  <th>累積訂單金額</th>
                  <th>註冊時間</th>
                  <th>最後登入時間</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in searchedData" :key="item.CAID" class="">
                  <td>{{ item.Id }}</td>
                  <td>
                    {{ item["RegisterPhone"] ? item["RegisterPhone"] : "--" }}
                  </td>
                  <td>{{ item["Name"] ? item["Name"] : "--" }}</td>
                  <td>
                    {{
                      item["MemberTierValue"]
                        ? globalFunctions.MemberTierValueMap[item["MemberTierValue"]]
                        : "--"
                    }}
                  </td>
                  <td>{{ item["OrderCount"] ? item["OrderCount"] : "0" }}</td>
                  <td>
                    {{ item["OrdersTotalSum"] ? item["OrdersTotalSum"] : "--" }}
                  </td>
                  <td>
                    {{
                      item["RegisterTime"]
                        ? globalFunctions.formatDate(item["RegisterTime"])
                        : "--"
                    }}
                  </td>
                  <td>
                    {{ item["最後登入時間"] ? item["最後登入時間"] : "--" }}
                  </td>
                </tr>
              </tbody>
            </table></DriggingContainer
          >
          <showCurrentPageCount
            :currentPage="currentPage"
            :pageSize="pageSize"
            :searchedData="searchedData"
            :totalCount="totalCount"
          />
          <div>
            <Pagination
              :searchFun="search"
              :currentPage="currentPage"
              :pageCount="pageCount"
            />
          </div>
        </div>
        <div v-show="!notSearchYet">
          <div class="noResult">
            <i class="bi bi-file-text-fill custom-icon"></i>
            <p>請輸入或設定需要的條件後按下搜尋按鈕</p>
            <p>將在此為您顯示搜尋結果</p>
          </div>
        </div>
        <div v-show="searchedData.length == 0 && notSearchYet">
          <div class="noResult">
            <i class="bi bi-clipboard2-x-fill custom-icon"></i>
            <p>找不到符合條件的資料</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

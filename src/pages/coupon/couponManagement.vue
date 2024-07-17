<script setup>
import { reactive, ref } from "vue";
import { useApiStore } from "@/stores/commandApiSearch.js";
import { loadingStore } from "@/stores/loading.js";
import { useGlobalFunctionsStore } from "@/stores/globalFunctions.js";
const globalFunctions = useGlobalFunctionsStore();
const addMode = ref(false);
const editMode = ref(false);
const isProductNumberFocused = ref(false);
const isAIDFocused = ref(false);
const isDaysUntilTicketReleaseFocused = ref(false);
const editIndex = ref(null);
const currentPage = ref(1);
const pageSize = 20; // 每页显示的数据量
const pageCount = ref(null); // 总页数
const totalCount = ref(null); //總筆數
const activeTab = ref("tab1");
const disabledTab = ref("");
const apiStore = useApiStore();
const loading = loadingStore();
const notSearchYet = ref(false);
const mapingUrl = ref("/Product/AidMapping");
const selectedMemberTierValue = ref("Small");
const selectAll = ref(false);
const tabs = reactive([
  { label: "小熊", key: "Small" },
  { label: "黑熊", key: "Black" },
  { label: "銀熊", key: "Silver" },
  { label: "金熊", key: "Golden" },
  { label: "鑽石熊", key: "Diamond" },
]);
const activeTabIndex = ref(0);

const setActiveTab = (index) => {
  activeTabIndex.value = index;
  selectedMemberTierValue.value = tabs[index].key;
};
const errorMsg = reactive({
  addRow: "",
  editRow: "",
  deleteRow: "",
});
// 根据英文键查找对应的中文标签
function findBearChineseLabel(key) {
  const tab = tabs.find((tab) => tab.key === key);
  return tab ? tab.label : "";
}

const findBearKeyByChineseName = (chineseName) => {
  return Object.keys(bearText).find((key) => bearText[key] === chineseName);
};
const editedItem = reactive({
  MappingCode: "",
  IsEnabled: null,
  AIDSettings: [
    {
      MemberTierValue: "-",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Small",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Black",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Silver",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Golden",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Diamond",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
  ],
});
const isMappingCodeFocused = ref(false);
const isSearchAIDFocused = ref(false);
// 定义搜索表单数据
const searchForm = reactive({
  TicketInsertStatus: "",
  MappingCode: "",
  AID: "",
});
// 使用 shallowRef 来声明 copiedSearchForm，确保它是非响应式的
const copiedSearchForm = shallowRef({
  MappingCode: "",
  AID: "",
});
// 定义搜索表单error数据
const searchFormError = reactive({
  MappingCode: "",
  AID: "",
});
// 定义新增表单error数据
const addFormError = reactive({
  MappingCode: "",
  AID: "",
  DaysUntilTicketRelease: "",
});
const searchedData = ref([]);
const searchLoading = ref(false);
const addLoading = ref(false);
const editLoading = ref(false);
const changedItems = reactive({
  DaysUntilTicketRelease: false,
  MemberTierValueList: [],
});
const isValidMappingCode = (MappingCode) => {
  if (MappingCode === "" || MappingCode) {
    searchFormError.MappingCode = "";
    return true;
  } else {
    return false;
  }
};
const isValidAID = (AID) => {
  if (AID === "" || AID) {
    searchFormError.AID = "";
    return true;
  } else {
    return false;
  }
};
// 定义搜索函数
const search = async (currentPageData) => {
  searchLoading.value = true;
  if (typeof currentPageData !== "number") currentPageData = currentPage.value;
  else currentPage.value = currentPageData;

  let IsEnabledStr;
  if (
    searchForm.TicketInsertStatus === "" ||
    searchForm.TicketInsertStatus === "全部"
  )
    IsEnabledStr = "";
  else
    IsEnabledStr =
      searchForm.TicketInsertStatus === "已發放" ? "Enabled" : "Disabled";
  const url = `${
    mapingUrl.value
  }List?Page=${currentPageData}&PageSize=20&MappingCode=${encodeURIComponent(
    searchForm.MappingCode
  )}&AID=${encodeURIComponent(
    searchForm.AID
  )}&FeatureEnableStatus=${IsEnabledStr}`;
  try {
    if (searchForm.MappingCode === "" && searchForm.AID === "") {
      searchFormError.MappingCode = "請輸入至少一項搜尋條件";
      searchFormError.AID = "請輸入至少一項搜尋條件";
      searchLoading.value = false;
      loading.IsLoading = false;
      return;
    } else {
      searchFormError.MappingCode = "";
      searchFormError.AID = "";
    }
    if (
      !isValidMappingCode(searchForm.MappingCode) ||
      !isValidAID(searchForm.AID)
    ) {
      searchLoading.value = false;
      loading.IsLoading = false;
      notSearchYet.value = true;
      return;
    }
    const result = await apiStore.getData(url);
    if (result.State === 0) {
      copiedSearchForm.value = { ...searchForm };
      searchedData.value = [];
      searchedData.value = result.Data.Data;
      // 假设 searchedData 是一个数组，包含多个项目
      searchedData.value = result.Data.Data.map((item) => ({
        ...item,
        isSelected: false,
      }));

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
  }
};
const getMappingCodeData = (value) => {
  if (typeof value !== "undefined") {
    editedItem.MappingCode = value.trim();
  }
};

const getSearchAIDData = (value) => {
  if (typeof value !== "undefined") {
    searchForm.AID = value.trim();
  }
};
const getSearchMappingCodeData = (value) => {
  if (typeof value !== "undefined") {
    searchForm.MappingCode = value.trim();
  }
};
const getDaysUntilTicketReleaseData = (value) => {
  if (value == "" && value !== 0) {
    editedItem.AIDSettings.forEach((setting) => {
      setting["DaysUntilTicketRelease"] = "";
    });
  } else if (typeof value !== "undefined") {
    editedItem.AIDSettings.forEach((setting) => {
      setting["DaysUntilTicketRelease"] = Number(value);
      changedItems.DaysUntilTicketRelease = true;
    });
  }
};

const getAIDData = (value, type, index) => {
  if (typeof value !== "undefined") {
    editedItem.AIDSettings.forEach((setting) => {
      if (setting.MemberTierValue === type) {
        setting["AIDList"][index] = value.trim();

        // 检查 MemberTierValue 是否已经在 MemberTierValueList 中
        if (!changedItems.MemberTierValueList.includes(type)) {
          changedItems.MemberTierValueList.push(type);
        }
      }
    });
  }
};
const filterEmptyAIDSettings = (item) => {
  if (activeTab.value == "tab1") {
    return item.AIDList.every(
      (AID) => AID !== "" && item.MemberTierValue === "-"
    );
  } else {
    return item.AIDList.every(
      (AID) => AID !== "" && item.MemberTierValue !== "-"
    );
  }
};
const filterNullDaysUntilTicketRelease = (item) => {
  return item.DaysUntilTicketRelease !== null;
};

const addAndEditFlag = () => {
  // 過濾空的 AIDSettings
  const filteredAIDSettings = editedItem.AIDSettings.filter(
    filterEmptyAIDSettings
  );
  // 過濾為 null 的 DaysUntilTicketRelease
  const filteredDaysUntilTicketRelease = editedItem.AIDSettings.filter(
    filterNullDaysUntilTicketRelease
  );
  if (
    (activeTab.value == "tab1" && filteredAIDSettings.length !== 1) ||
    (activeTab.value !== "tab1" && filteredAIDSettings.length !== 5)
  ) {
    addFormError.AID = "請填寫所有熊級AID欄位，不可為空。";
  } else {
    addFormError.AID = "";
  }
  if (editedItem.MappingCode.length === 0)
    addFormError.MappingCode = "請輸入商品貨號";
  else addFormError.MappingCode = "";

  addFormError.DaysUntilTicketRelease = globalFunctions.isValidDayRealease(
    editedItem.AIDSettings[0].DaysUntilTicketRelease
  ).errorMessage;
  // 檢查是否符合日期發放條件
  if (
    (activeTab.value == "tab1" && filteredAIDSettings.length !== 1) ||
    (activeTab.value !== "tab1" && filteredAIDSettings.length !== 5) ||
    editedItem.MappingCode.length === 0 ||
    filteredDaysUntilTicketRelease.length === 0 ||
    !globalFunctions.isValidDayRealease(
      editedItem.AIDSettings[0].DaysUntilTicketRelease
    ).isValid
  ) {
    addLoading.value = false;
    editLoading.value = false;
    loading.IsLoading = false;
    return false;
  } else return true;
};
const addRow = async () => {
  const copiedItem = JSON.parse(JSON.stringify(editedItem));
  try {
    if (!addAndEditFlag()) return;
    addLoading.value = true;
    if (activeTab.value == "tab1") {
      editedItem.AIDSettings = editedItem.AIDSettings.filter(
        (setting) => setting.MemberTierValue === "-"
      );
    } else {
      editedItem.AIDSettings = editedItem.AIDSettings.filter(
        (setting) => setting.MemberTierValue !== "-"
      );
    }
    // 呼叫後端 API 進行新增操作
    const result = await apiStore.postData(editedItem, mapingUrl.value);
    if (result.State === 0) {
      searchedData.value = [];
      searchedData.value.push(JSON.parse(JSON.stringify(editedItem)));
      totalCount.value = 1;
      currentPage.value = 1;
      pageCount.value = 1;
      closeEditArea();
    } else {
      // 操作失敗，顯示錯誤訊息，並將 editedItem 還原為之前的狀態
      errorMsg.addRow = result.Msg;
      Object.assign(editedItem, copiedItem);
      editedItem.AIDSettings.forEach((setting) => {
        if (setting.AIDList.length === 0) {
          setting.AIDList.push("");
        }
      });
    }
    notSearchYet.value = true;
    addLoading.value = false;
    editLoading.value = false;
    loading.IsLoading = false;
  } catch (e) {
    console.error(e.message);
    addLoading.value = false;
    Object.assign(editedItem, copiedItem);
  }
};

const editRow = (index) => {
  OpenEditMode();

  const AllBear = editedItem.AIDSettings.find(
    (setting) => setting.MemberTierValue === "-"
  );
  editedItem.MappingCode = searchedData.value[index].MappingCode;
  editedItem.IsEnabled = searchedData.value[index].IsEnabled;
  for (let j = 0; j < searchedData.value[index].AIDSettings.length; j++) {
    const Setting = editedItem.AIDSettings.find(
      (setting) =>
        setting.MemberTierValue ===
        searchedData.value[index].AIDSettings[j].MemberTierValue
    );
    const DaysUntilTicketRelease = JSON.parse(
      JSON.stringify(
        searchedData.value[index].AIDSettings[j].DaysUntilTicketRelease
      )
    );
    const AIDList = JSON.parse(
      JSON.stringify(searchedData.value[index].AIDSettings[j].AIDList)
    );

    editedItem.AIDSettings.forEach((setting) => {
      setting.DaysUntilTicketRelease = DaysUntilTicketRelease;
    });
    if (Setting) Setting.AIDList = AIDList;
  }
  if (AllBear.AIDList[0] !== "") activateTab("tab1");
  else activateTab("tab2");
};

const updateRow = async () => {
  try {
    if (!addAndEditFlag()) return;
    editLoading.value = true;

    const EnabledData = {
      [editedItem.IsEnabled ? "enabled" : "disabled"]: [editedItem.MappingCode],
    };

    const newDataMap = new Map();
    const editedItemAIDSettings =
      activeTab.value === "tab1"
        ? editedItem.AIDSettings.filter(
            (setting) => setting.MemberTierValue === "-"
          )
        : editedItem.AIDSettings.filter(
            (setting) => setting.MemberTierValue !== "-"
          );

    // 第一个循环：构建 newDataMap
    for (const setting of editedItemAIDSettings) {
      const existingData = newDataMap.get(setting.MemberTierValue);
      if (existingData) {
        existingData.AIDList.push(...setting.AIDList);
      } else {
        newDataMap.set(setting.MemberTierValue, {
          MappingCode: editedItem.MappingCode,
          MemberTierValue: setting.MemberTierValue,
          AIDList: [...setting.AIDList],
          DaysUntilTicketRelease: setting.DaysUntilTicketRelease,
        });
      }
    }
    const apiRequests = [];
    //值有改變才打api，沒改變不回寫
    // 如果 changedItems.DaysUntilTicketRelease 为 true，则对每个设置都执行 API 请求
    if (changedItems.DaysUntilTicketRelease) {
      for (const newData of newDataMap.values()) {
        apiRequests.push(apiStore.putData(newData, mapingUrl.value));
      }
    } else {
      // 否则，只对 MemberTierValue 与 MemberTierValueList 中的值相符的项执行 API 请求
      for (const newData of newDataMap.values()) {
        if (
          changedItems.MemberTierValueList.includes(newData.MemberTierValue)
        ) {
          apiRequests.push(apiStore.putData(newData, mapingUrl.value));
        }
      }
    }
    const apiResults = await Promise.all(apiRequests);
    // 第二个循环：更新 searchedData.value 数组中的数据
    for (const [key, value] of newDataMap) {
      const allStatesAreZero = apiResults.every((result) => result.State === 0);

      const allPromises = [];
      if (allStatesAreZero) {
        searchedData.value.forEach((item) => {
          item.AIDSettings.forEach((itemSetting) => {
            if (
              item.MappingCode === value.MappingCode &&
              itemSetting.MemberTierValue === value.MemberTierValue
            ) {
              itemSetting.AIDList = value.AIDList;
              itemSetting.DaysUntilTicketRelease = value.DaysUntilTicketRelease;
            }
          });
        });
      } else {
        errorMsg.editRow = apiResults[0].Msg;
        editLoading.value = false;
        return;
      }

      // 创建一个 Promise 来执行 editEnabledResult
      const editEnabledPromise = apiStore.patchData(
        EnabledData,
        "/Product/EnableAidMapping"
      );

      // 将 editEnabledPromise 加入 allPromises 数组
      allPromises.push(editEnabledPromise);

      // 使用 Promise.all 等待所有异步操作完成
      Promise.all(allPromises)
        .then((results) => {
          searchedData.value.forEach((item) => {
          item.AIDSettings.forEach((itemSetting) => {
            if (
              item.MappingCode === value.MappingCode 
            ) {
              item.IsEnabled = editedItem.IsEnabled;
            }
          });
        });
        })
        .catch((error) => {
          console.error("啟用修改失敗:", error);
        });
    }
    // 等待所有 API 请求完成后再关闭编辑区域
    if (apiResults.every((result) => result.State === 0)) {
      closeEditArea();
    }
    editLoading.value = false;
  } catch (e) {
    console.error(e.message);
    editLoading.value = false;
  }
};

const deleteRow = async (index) => {
  let deleteConfirmation = confirm("確定要刪除嗎?");
  if (deleteConfirmation) {
    const url = `${mapingUrl.value}?mappingCode=${searchedData.value[index].MappingCode}`;
    const result = await apiStore.deleteData(url);
    if (result.State === 0) {
      clearEdit();
      totalCount.value--;
      const targetMappingCode = searchedData.value[index].MappingCode;
      const filteredData = searchedData.value.filter(
        (item) => item.MappingCode !== targetMappingCode
      );
      searchedData.value = filteredData;
      // 重新排序并更新 ID
      const sortedData = filteredData.map((item, index) => ({
        ...item,
        Id: index + 1, // 更新 ID 从 1 开始
      }));
      // 更新 searchedData.value 数组为重新排序后的数组
      searchedData.value = sortedData;
      closeEditArea();
    } else {
      errorMsg.deleteRow = result.Msg;
    }
  }
};

const clearEdit = () => {
  editIndex.value = null;
  editedItem.MappingCode = "";
  editedItem.IsEnabled = false;
  editedItem.AIDSettings = [
    {
      MemberTierValue: "-",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Small",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Black",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Silver",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Golden",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
    {
      MemberTierValue: "Diamond",
      AIDList: [""],
      DaysUntilTicketRelease: null,
    },
  ];
  activateTab.value = "";
};

const closeEditArea = () => {
  addMode.value = false;
  editMode.value = false;
  BulkEditMode.value = false;
};

const clearForm = () => {
  clearEdit();
  activeTabIndex.value = 0;
  selectedMemberTierValue.value = "Small";
  Object.keys(addFormError).forEach((key) => {
    addFormError[key] = "";
  });
  errorMsg.addRow = "";
  errorMsg.editRow = "";
  errorMsg.deleteRow = "";
};

const OpenAddMode = () => {
  clearForm();
  addMode.value = true;
  editMode.value = false;
  activateTab("tab1");
};

const OpenEditMode = () => {
  clearForm();
  changedItems.DaysUntilTicketRelease = false;
  changedItems.MemberTierValueList.length = 0;
  editMode.value = true;
  addMode.value = false;
};

const addAIDInput = (type) => {
  const maxAIDListLength = 10;
  if (type === "-") {
    const AIDList = editedItem.AIDSettings[0]["AIDList"];
    if (AIDList.length < maxAIDListLength) AIDList.push("");
  } else {
    const MemberTierValueItem = editedItem.AIDSettings.find(
      (item) => item.MemberTierValue === type
    );
    if (MemberTierValueItem) {
      const AIDList = MemberTierValueItem["AIDList"];
      if (AIDList.length < maxAIDListLength) AIDList.push("");
    }
  }
};

const removeSelectAIDInput = (type, index) => {
  const MemberTierValueItem = editedItem.AIDSettings.find(
    (item) => item.MemberTierValue === type
  );
  if (MemberTierValueItem["AIDList"].length > 1) {
    if (MemberTierValueItem) MemberTierValueItem["AIDList"].splice(index, 1);
    if (!changedItems.MemberTierValueList.includes(type)) {
      changedItems.MemberTierValueList.push(type);
    }
  }
};
const activateTab = (tab) => {
  if (!addMode.value) disabledTab.value = tab;
  else disabledTab.value = "";
  activeTab.value = tab;
  Object.keys(addFormError).forEach((key) => {
    addFormError[key] = "";
  });
};
const getTicketInsertStatusData = (value) => {
  searchForm.TicketInsertStatus = value;
};
const selectedMappingCodes = ref([]);
const BulkEditMode = ref(false);
const isBulkChecked = ref(false);
const showBulkEditError = ref(false);
const BulkEdit = async () => {
  try {
    const EnabledData = {
      [isBulkChecked.value ? "enabled" : "disabled"]:
        selectedMappingCodes.value,
    };
    const editEnabledResult = await apiStore.patchData(
      EnabledData,
      "/Product/EnableAidMapping"
    );
    if (selectedMappingCodes.value.length === 0) {
      showBulkEditError.value = true;
      return;
    }
    if (editEnabledResult.State === 0) {
      // 更新searchedData中的isEnable
      searchedData.value.forEach((item) => {
        if (
          selectedMappingCodes.value.some((code) => code === item.MappingCode)
        )
          item.IsEnabled = isBulkChecked.value ? true : false;
      });
      searchedData.value.forEach((item) => {
        item.isSelected = false;
      });
      selectAll.value = false;
      selectedMappingCodes.value = [];
      isBulkChecked.value = false;
      BulkEditMode.value = false;
      loading.ShowAlertText = "批次修改成功";
      loading.ShowAlertIcon = "bi-check-circle";
      loading.ShowAlert = true;
      setTimeout(() => {
        loading.ShowAlert = false;
      }, 1000);
    } else {
      loading.ShowAlertText = "批次修改失敗";
      loading.ShowAlertIcon = "bi-exclamation-circle";
      loading.ShowAlert = true;
      setTimeout(() => {
        loading.ShowAlert = false;
      }, 1000);
      console.error("批次修改失敗" + editEnabledResult);
    }
  } catch (e) {
    console.error("批次修改失敗" + e.message);
    loading.ShowAlertText = "批次修改失敗";
    loading.ShowAlertIcon = "bi-exclamation-circle";
    loading.ShowAlert = true;
    setTimeout(() => {
      loading.ShowAlert = false;
    }, 1000);
  }
};
const itemChanged = (mappingCode, isChecked) => {
  if (isChecked) {
    selectedMappingCodes.value.push(mappingCode);
  } else {
    const index = selectedMappingCodes.value.indexOf(mappingCode);
    if (index !== -1) {
      selectedMappingCodes.value.splice(index, 1);
    }
  }
};

const toggleAllItems = () => {
  // 点击全选复选框时，切换所有项目的 isSelected 属性
  searchedData.value.forEach((item) => {
    item.isSelected = selectAll.value;
  });
  if (selectAll.value) {
    selectedMappingCodes.value = searchedData.value.map(
      (item) => item.MappingCode
    );
  } else {
    selectedMappingCodes.value = [];
  }
};
</script>
<template>
  <div class="couponManagement">
    <div class="searchSetion">
      <!-- 搜尋表單 -->
      <form @submit.prevent="search(1)">
        <div class="d-flex">
          <div class="d-flex col-6">
            <InputTwoGroupBox
              inputType="text"
              inputId="searchForm.MappingCode"
              inputName="searchForm.MappingCode"
              :data-value="searchForm.MappingCode"
              :value="searchForm.MappingCode"
              :isFocused="isMappingCodeFocused"
              :label="'商品貨號'"
              :tabIndex="0"
              :errorMessage="searchFormError.MappingCode"
              @update:modelValue="searchForm.MappingCode = $event"
              @getReturnData="getSearchMappingCodeData"
            />
            <InputTwoGroupBox
              inputType="text"
              inputId="searchForm.AID"
              inputName="searchForm.AID"
              :data-value="searchForm.AID"
              :value="searchForm.AID"
              :isFocused="isSearchAIDFocused"
              :label="'AID'"
              :tabIndex="1"
              :errorMessage="searchFormError.AID"
              @update:modelValue="searchForm.AID = $event"
              @getReturnData="getSearchAIDData"
            />
          </div>
          <div class="d-flex col-6 justify-content-between">
            <div class="col-6">
              <SelectTwoGroupBox
                :options="['請選擇搭車金發放狀態', '全部', '已發放', '未發放']"
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
            </div>
            <SearchBtn :searchLoading="searchLoading" />
          </div>
        </div>
      </form>
      <!-- 其他內容略 -->
    </div>
    <div class="searchResult">
      <h4 class="mt-0">搜尋結果</h4>
      <div
        class="d-flex justify-content-end"
        style="margin-right: 16px; margin-bottom: 16px"
      >
        <button
          type="button"
          @click="OpenAddMode()"
          class="btn btn-primary mediumbtn d-flex justify-content-center align-items-center"
          :disabled="addLoading"
        >
          <span v-if="!addLoading"> 新增</span>
          <div
            style="width: 20px; height: 20px"
            v-else
            class="spinner-border text-light"
            role="status"
          >
            <span class="sr-only"></span>
          </div>
        </button>
      </div>
      <div
        class="searchResult-content d-flex flex-column justify-content-center"
      >
        <div v-show="searchedData.length > 0 && notSearchYet" class="Result">
          <!-- 新增按鈕 -->
          <div class="d-flex flex-column justify-content-center">
            <div class="d-flex justify-content-between">
              <showCurrentPageCount
                :currentPage="currentPage"
                :pageSize="pageSize"
                :searchedData="searchedData"
                :totalCount="totalCount"
              />
              <button
                class="btn btn-primary mediumbtn"
                @click="
                  BulkEditMode = true;
                  showBulkEditError = false;
                "
              >
                批次編輯
              </button>
            </div>
            <DriggingContainer>
              <table class="table table-hover m-0">
                <thead>
                  <tr>
                    <th>
                      <input
                        type="checkbox"
                        v-model="selectAll"
                        @change="toggleAllItems"
                      />
                    </th>
                    <th>#</th>
                    <th>商品貨號</th>
                    <th>熊級</th>
                    <th style="width: 80px; min-width: 80px">發放機制</th>
                    <th>全熊AID</th>
                    <th>小熊AID</th>
                    <th>黑熊AID</th>
                    <th>銀熊AID</th>
                    <th>金熊AID</th>
                    <th>鑽石熊AID</th>
                    <th style="width: 80px; min-width: 80px">啟用搭車金發放</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <!-- 使用 v-for 來動態生成資料列 -->
                  <tr v-for="(item, index) in searchedData" :key="index">
                    <td>
                      <!-- <input
                        type="checkbox"
                        :checked="selectAll"
                        :value="item.MappingCode"
                        @change="
                          itemChanged(item.MappingCode, $event.target.checked)
                        "
                      /> -->
                      <input
                        type="checkbox"
                        v-model="item.isSelected"
                        @change="
                          itemChanged(item.MappingCode, $event.target.checked)
                        "
                      />
                    </td>
                    <td>{{ item.Id }}</td>
                    <td>{{ item.MappingCode }}</td>
                    <td>
                      {{
                        findBearChineseLabel(
                          item.AIDSettings[0].MemberTierValue
                        )
                          ? `小熊/黑熊/銀熊/金熊/鑽石熊`
                          : "全熊"
                      }}
                    </td>
                    <td style="width: 80px; min-width: 80px">
                      {{ item.AIDSettings[0].DaysUntilTicketRelease }}天
                    </td>
                    <td class="no-wrap-text">
                      <div v-if="item.AIDSettings[0].MemberTierValue == '-'">
                        <div
                          v-for="(AIDItem, AIDIndex) in item.AIDSettings"
                          :key="AIDIndex"
                        >
                          <p v-for="AID in AIDItem.AIDList" :key="AID">
                            {{ AID }}
                          </p>
                        </div>
                      </div>
                      <span v-else>--</span>
                    </td>
                    <td class="no-wrap-text">
                      <div
                        v-if="
                          findBearChineseLabel(
                            item.AIDSettings[0].MemberTierValue
                          )
                        "
                      >
                        <div
                          v-for="(AIDItem, AIDIndex) in item.AIDSettings"
                          :key="AIDIndex"
                        >
                          <div
                            v-if="
                              AIDItem.MemberTierValue == 'Small' &&
                              AIDItem.AIDList.length > 0
                            "
                          >
                            <p v-for="AID in AIDItem.AIDList" :key="AID">
                              {{ AID }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span v-else>--</span>
                    </td>
                    <td class="no-wrap-text">
                      <div
                        v-if="
                          findBearChineseLabel(
                            item.AIDSettings[0].MemberTierValue
                          )
                        "
                      >
                        <div
                          v-for="(AIDItem, AIDIndex) in item.AIDSettings"
                          :key="AIDIndex"
                        >
                          <div
                            v-if="
                              AIDItem.MemberTierValue == 'Black' &&
                              AIDItem.AIDList.length > 0
                            "
                          >
                            <p v-for="AID in AIDItem.AIDList" :key="AID">
                              {{ AID }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span v-else>--</span>
                    </td>
                    <td class="no-wrap-text">
                      <div
                        v-if="
                          findBearChineseLabel(
                            item.AIDSettings[0].MemberTierValue
                          )
                        "
                      >
                        <div
                          v-for="(AIDItem, AIDIndex) in item.AIDSettings"
                          :key="AIDIndex"
                        >
                          <div v-if="AIDItem.MemberTierValue == 'Silver'">
                            <p v-for="AID in AIDItem.AIDList" :key="AID">
                              {{ AID }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span v-else>--</span>
                    </td>
                    <td class="no-wrap-text">
                      <div
                        v-if="
                          findBearChineseLabel(
                            item.AIDSettings[0].MemberTierValue
                          )
                        "
                      >
                        <div
                          v-for="(AIDItem, AIDIndex) in item.AIDSettings"
                          :key="AIDIndex"
                        >
                          <div v-if="AIDItem.MemberTierValue == 'Golden'">
                            <p v-for="AID in AIDItem.AIDList" :key="AID">
                              {{ AID }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span v-else>--</span>
                    </td>
                    <td class="no-wrap-text">
                      <div
                        v-if="
                          findBearChineseLabel(
                            item.AIDSettings[0].MemberTierValue
                          )
                        "
                      >
                        <div
                          v-for="(AIDItem, AIDIndex) in item.AIDSettings"
                          :key="AIDIndex"
                        >
                          <div v-if="AIDItem.MemberTierValue == 'Diamond'">
                            <p v-for="AID in AIDItem.AIDList" :key="AID">
                              {{ AID }}
                            </p>
                          </div>
                        </div>
                      </div>
                      <span v-else>--</span>
                    </td>
                    <td style="min-width: 80px">
                      {{ item.IsEnabled ? "是" : "否" }}
                    </td>

                    <td style="width: 150px; min-width: 150px">
                      <div class="d-flex justify-content-between">
                        <button
                          @click="editRow(index)"
                          class="btn border"
                          style="margin-right: 6px"
                        >
                          編輯
                        </button>
                        <button @click="deleteRow(index)" class="btn border">
                          刪除
                        </button>
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
            <!-- 分頁功能 -->
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
        <!-- overlay -->
        <div
          class="overlay"
          v-if="editMode || addMode || BulkEditMode"
          @click="closeEditArea()"
        ></div>
        <!-- 編輯框 -->
        <div class="customModal" v-if="editMode || addMode">
          <h4 class="mt-0">
            <span v-if="addMode">新增</span> <span v-else>編輯</span>資料
          </h4>
          <button class="close btn" @click="closeEditArea()">
            <i class="bi bi-x-lg"></i>
          </button>
          <div class="customModal-body">
            <div class="d-flex">
              <div class="tab-container col-2">
                <div
                  class="tab"
                  :class="{
                    active: activeTab === 'tab1',
                    disabled: disabledTab !== 'tab1' && disabledTab !== '',
                  }"
                  @click="activateTab('tab1')"
                >
                  全熊
                </div>
                <div
                  class="tab"
                  :class="{
                    active: activeTab === 'tab2',
                    disabled: disabledTab !== 'tab2' && disabledTab !== '',
                  }"
                  @click="activateTab('tab2')"
                >
                  小熊/黑熊/銀熊/金熊/鑽石熊
                </div>
              </div>
              <div class="tab-content col-10">
                <div class="col-10">
                  <h6>基本資料</h6>
                  <InputTwoGroupBox
                    inputType="text"
                    inputId="editedItem.MappingCode"
                    inputName="editedItem.MappingCode"
                    :data-value="editedItem.MappingCode"
                    :value="editedItem.MappingCode"
                    :isFocused="isProductNumberFocused"
                    :label="'商品貨號'"
                    :tabIndex="1"
                    :errorMessage="addFormError.MappingCode"
                    :class="{ disabled: editMode }"
                    class="mb-3"
                    @update:modelValue="editedItem.MappingCode = $event"
                    @getReturnData="getMappingCodeData"
                  />
                  <InputTwoGroupBox
                    inputType="number"
                    inputId="editedItem.AIDSettings[0].DaysUntilTicketRelease"
                    inputName="editedItem.AIDSettings[0].DaysUntilTicketRelease"
                    :data-value="
                      editedItem.AIDSettings[0].DaysUntilTicketRelease
                    "
                    :value="editedItem.AIDSettings[0].DaysUntilTicketRelease"
                    :isFocused="isDaysUntilTicketReleaseFocused"
                    :label="'發放機制(天數)'"
                    :errorMessage="addFormError.DaysUntilTicketRelease"
                    :tabIndex="2"
                    class="mb-3"
                    @update:modelValue="
                      editedItem.AIDSettings[0].DaysUntilTicketRelease = $event
                    "
                    @getReturnData="getDaysUntilTicketReleaseData"
                  />
                  <div class="toggle-switch d-flex align-items-center">
                    <input
                      type="checkbox"
                      id="togle-swith"
                      :checked="editedItem.IsEnabled"
                      v-model="editedItem.IsEnabled"
                    />
                    <label for="togle-swith"></label>
                    <span class="mx-3">啟用搭車金發放</span>
                  </div>
                </div>
                <hr />
                <h6>AID</h6>
                {{ MemberTierValue }}
                <div v-for="(item, index) in editedItem" :key="index">
                  <div v-for="(AIDSetting, AIDIndex) in item" :key="AIDIndex">
                    <div
                      v-if="
                        activeTab === 'tab1' &&
                        AIDSetting.MemberTierValue === '-'
                      "
                    >
                      <div
                        class="d-flex flex-column"
                        v-for="(AID, AIDItemIndex) in AIDSetting.AIDList"
                        :key="AIDItemIndex"
                      >
                        <div class="d-flex">
                          <button
                            v-if="AIDItemIndex === 0"
                            class="mb-2 addAIDBtn"
                            @click="addAIDInput(AIDSetting.MemberTierValue)"
                          >
                            <i class="bi bi-plus-circle-dotted"></i>
                            <span class="mx-2">新增一筆AID</span>
                          </button>
                        </div>
                        <div class="d-flex">
                          <div class="col-10">
                            <InputTwoGroupBox
                              inputType="text"
                              :inputId="AIDSetting.MemberTierValue + AIDIndex"
                              :inputName="AIDSetting.MemberTierValue + AIDIndex"
                              :data-value="AID"
                              :value="AID"
                              :isFocused="isAIDFocused"
                              :label="
                                'AID' +
                                (AIDSetting.MemberTierValue +
                                  (AIDItemIndex + 1))
                              "
                              :tabIndex="AIDIndex + 2"
                              class="mb-3"
                              @update:modelValue="
                                AID.AIDList[' + AIDIndex + '] = $event
                              "
                              :errorMessage="addFormError.AID"
                              @getReturnData="
                                (newValue) =>
                                  getAIDData(
                                    newValue,
                                    AIDSetting.MemberTierValue,
                                    AIDItemIndex
                                  )
                              "
                            />
                          </div>
                          <button
                            class="btn trashcanBtn d-flex justify-content-center align-items-center"
                            @click="
                              removeSelectAIDInput(
                                AIDSetting.MemberTierValue,
                                AIDItemIndex
                              )
                            "
                          >
                            <i class="bi bi-trash"></i>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div>
                      <div
                        v-if="
                          activeTab === 'tab2' &&
                          AIDSetting.MemberTierValue !== '-' &&
                          AIDSetting.MemberTierValue === selectedMemberTierValue
                        "
                      >
                        <!-- 选项卡导航 -->
                        <ul class="nav nav-tabs" role="tablist">
                          <li
                            class="nav-item"
                            v-for="(tab, index) in tabs"
                            :key="index"
                          >
                            <a
                              class="nav-link"
                              :class="{ active: activeTabIndex === index }"
                              @click="setActiveTab(index)"
                              href="javascript:void(0);"
                            >
                              {{ tab.label }}
                            </a>
                          </li>
                        </ul>
                        <!-- 选项卡内容 -->
                        <div class="tab-content">
                          <div
                            v-for="(tab, index) in tabs"
                            :key="index"
                            class="tab-pane"
                            :class="{ active: activeTabIndex === index }"
                          >
                            <div
                              v-for="(item, index) in editedItem"
                              :key="index"
                            >
                              <div
                                v-for="(AIDSetting, AIDIndex) in item"
                                :key="AIDIndex"
                              >
                                <div
                                  class="d-flex flex-column"
                                  v-for="(
                                    AID, AIDItemIndex
                                  ) in AIDSetting.AIDList"
                                  :key="AIDItemIndex"
                                >
                                  <div
                                    v-if="
                                      AIDSetting.MemberTierValue ===
                                      selectedMemberTierValue
                                    "
                                  >
                                    <button
                                      v-if="AIDItemIndex === 0"
                                      class="mb-2 addAIDBtn"
                                      @click="
                                        addAIDInput(AIDSetting.MemberTierValue)
                                      "
                                    >
                                      <i class="bi bi-plus-circle-dotted"></i>
                                      <span class="mx-2">新增一筆AID</span>
                                    </button>
                                    <div class="d-flex">
                                      <div class="col-10">
                                        <InputTwoGroupBox
                                          inputType="text"
                                          :inputId="
                                            AIDSetting.MemberTierValue +
                                            AIDIndex
                                          "
                                          :inputName="
                                            AIDSetting.MemberTierValue +
                                            AIDIndex
                                          "
                                          :data-value="AID"
                                          :value="AID"
                                          :isFocused="isAIDFocused"
                                          :label="
                                            findBearChineseLabel(
                                              AIDSetting.MemberTierValue
                                            ) +
                                            'AID' +
                                            (AIDItemIndex + 1)
                                          "
                                          :tabIndex="AIDIndex + 2"
                                          class="mb-3"
                                          @update:modelValue="
                                            AID.AIDList[' + AIDIndex + '] =
                                              $event
                                          "
                                          :errorMessage="addFormError.AID"
                                          @getReturnData="
                                            (newValue) =>
                                              getAIDData(
                                                newValue,
                                                AIDSetting.MemberTierValue,
                                                AIDItemIndex
                                              )
                                          "
                                        />
                                      </div>
                                      <button
                                        class="btn trashcanBtn d-flex justify-content-center align-items-center"
                                        @click="
                                          removeSelectAIDInput(
                                            AIDSetting.MemberTierValue,
                                            AIDItemIndex
                                          )
                                        "
                                      >
                                        <i class="bi bi-trash"></i>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer pt-3">
            <div class="d-flex justify-content-between col-10">
              <div
                class="d-flex justify-content-center text-danger align-items-center"
              >
                <span v-show="errorMsg.addRow !== ''">
                  新增失敗，{{ errorMsg.addRow }}</span
                >
                <span v-show="errorMsg.editRow !== ''">
                  編輯失敗，{{ errorMsg.editRow }}</span
                >
                <span v-show="errorMsg.deleteRow !== ''">
                  刪除失敗，{{ errorMsg.deleteRow }}</span
                >
              </div>
              <div>
                <button
                  v-if="addMode"
                  @click="addRow"
                  class="btn border btn-primary mx-1"
                  :disabled="addLoading"
                >
                  <span v-if="!addLoading"> 儲存</span>
                  <div
                    style="width: 20px; height: 20px"
                    v-else
                    class="spinner-border text-light"
                    role="status"
                  ></div>
                </button>
                <button
                  v-else
                  @click="updateRow"
                  class="btn border btn-primary mx-1"
                  :disabled="editLoading"
                >
                  <span v-if="!editLoading"> 儲存</span>
                  <div
                    style="width: 20px; height: 20px"
                    v-else
                    class="spinner-border text-light"
                    role="status"
                  ></div>
                </button>
                <button @click="closeEditArea" class="btn border">關閉</button>
              </div>
            </div>
          </div>
        </div>
        <!-- 批次編輯框 -->
        <div class="customModal" v-if="BulkEditMode">
          <h4 class="mt-0">批次編輯</h4>
          <button class="close btn" @click="BulkEditMode = false">
            <i class="bi bi-x-lg"></i>
          </button>
          <div class="">
            <div style="min-height: 80px" class="d-flex align-items-center">
              <div class="toggle-switch d-flex align-items-center">
                <input
                  type="checkbox"
                  id="togle-swith"
                  v-model="isBulkChecked"
                />
                <label for="togle-swith"></label>
                <span style="font-size: 18px" class="mx-3">啟用搭車金發放</span>
              </div>
            </div>
            <p v-if="showBulkEditError" class="text-danger">
              <i class="bi bi-exclamation-circle"></i> 尚未選取任何項目
            </p>
          </div>
          <div class="modal-footer pt-3">
            <div class="d-flex justify-content-between col-10">
              <div
                class="d-flex justify-content-center text-danger align-items-center"
              ></div>
              <div>
                <button @click="BulkEdit" class="btn border btn-primary mx-1">
                  確認修改
                </button>
                <button @click="BulkEditMode = false" class="btn border">
                  關閉
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

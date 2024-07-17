<script setup>
import Cookies from "js-cookie";
import { onMounted, watch, ref } from "vue";
import { loadingStore } from "@/stores/loading.js";
import { useGlobalFunctionsStore } from "@/stores/globalFunctions.js";
import { loginStore } from "@/stores/login.js";
const login = loginStore();
const globalFunctions = useGlobalFunctionsStore();
const role = Cookies.get("ECBO_role");
const currentPage = ref(1);
const pageSize = 20;
const pageCount = ref(0);
const totalCount = ref(0);
const searchedData = ref([]);
const showData = ref([]);
const searchLoading = ref(false);
const loading = loadingStore();
const notSearchYet = ref(false);
const userRole = ref(role);
const AccountRoleApiUrl = ref("/System/AccountRole");

const mockApiData = {
  State: 0,
  Data: {
    Data: [
      { Id: 1, Account: "user1", Role: ["Read"], Updator: "admin", UpdateTime: "2023-07-16T10:00:00" },
      { Id: 2, Account: "user2", Role: ["Admin"], Updator: "admin", UpdateTime: "2023-07-16T11:00:00" },
      // 更多假資料...
    ],
    PageCount: 1,
    TotalCount: 2
  }
};

const mockEditApiResponse = {
  State: 0,
  Msg: "成功"
};

onMounted(() => {
  if (showData.value.length == 0) {
    loading.IsLoading = true;
    search();
  }
  if (typeof role === "undefined") login.userLogout();
});

const hasPermission = (permission) => {
  return (
    userRole.value.includes("SuperAdmin") ||
    (userRole.value.includes("Admin") && permission === "Read")
  );
};

const findRoleChanges = (oldData, newData) => {
  return oldData.filter((oldItem) => {
    const newItem = newData.find((item) => item.Account === oldItem.Account);
    return (
      newItem && JSON.stringify(oldItem.Role) !== JSON.stringify(newItem.Role)
    );
  });
};

const search = async (currentPageData) => {
  try {
    if (typeof currentPageData !== "number") currentPageData = currentPage.value;
    else currentPage.value = currentPageData;

    // 模擬 API 回傳的假資料
    const result = mockApiData;

    if (result.State === 0) {
      searchedData.value = result.Data.Data;
      pageCount.value = result.Data.PageCount;
      totalCount.value = result.Data.TotalCount;
      showData.value = JSON.parse(JSON.stringify(searchedData.value));
    } else {
      searchedData.value = [];
      showData.value = [];
    }
    notSearchYet.value = true;
    loading.IsLoading = false;
  } catch (error) {
    console.error(error);
    loading.IsLoading = false;
  }
};

const editUserRole = async () => {
  searchLoading.value = true;
  try {
    const changedData = findRoleChanges(showData.value, searchedData.value);
    if (changedData.length == 0) {
      searchLoading.value = false;
      return;
    }

    // 模擬編輯 API 回傳的假回應
    const res = mockEditApiResponse;

    if (res.State === 0) {
      notSearchYet.value = true;
      searchLoading.value = false;
      loading.IsLoading = false;
      loading.ShowAlertText = "已儲存";
      loading.ShowAlertIcon = "bi-check-circle";
      loading.ShowAlert = true;
      // 直接將 showData 的變更更新到 searchedData 中，模擬儲存效果
      searchedData.value = JSON.parse(JSON.stringify(showData.value));
      setTimeout(() => {
        loading.ShowAlert = false;
      }, 1000);
    } else {
      searchLoading.value = false;
      loading.IsLoading = false;
      loading.ShowAlertText = "修改失敗" + res.Msg;
      loading.ShowAlertIcon = "bi bi-x-circle";
      loading.ShowAlert = true;
      setTimeout(() => {
        loading.ShowAlert = false;
      }, 1000);
    }
  } catch (error) {
    console.error(error);
  }
};
</script>

<template>
  <div class="userAcount position-relative">
    <div class="searchResult">
      <h4 class="mt-0">帳號管理</h4>
      <div class="searchResult-content">
        <div class="Result">
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
                  <th>帳號</th>
                  <th>查詢</th>
                  <th>管理</th>
                  <th>修改人員</th>
                  <th>上次修改時間</th>
                </tr>
              </thead>
              <tbody v-if="showData.length > 0">
                <tr v-for="(item, index) in showData" :key="item.Id" class="">
                  <td>{{ index + 1 }}</td>
                  <td>{{ item.Account + "@55688.com.tw" }}</td>
                  <td>
                    <input
                      type="checkbox"
                      :value="'Read'"
                      v-model="showData[index].Role"
                      :checked="showData[index].Role.includes('Read')"
                      :disabled="!hasPermission('Read')"
                    />
                  </td>
                  <td>
                    <input
                      type="checkbox"
                      :value="'Admin'"
                      v-model="showData[index].Role"
                      :checked="
                        showData[index].Role.includes('SuperAdmin') ||
                        showData[index].Role.includes('Admin')
                      "
                      :disabled="!hasPermission('Admin')"
                    />
                  </td>
                  <td style="width: 150px;">{{ item.Updator ? item.Updator : "--" }}</td>
                  <td style="width: 150px;">
                    {{
                      globalFunctions.formatDateToYYYYMMDD(item.UpdateTime)
                        ? globalFunctions.formatDateToYYYYMMDD(item.UpdateTime)
                        : "--"
                    }}
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
          <div class="d-flex justify-content-end">
            <button
              type="submit"
              @click="editUserRole()"
              class="btn btn-primary mediumbtn d-flex justify-content-center align-items-center"
            >
              <span v-if="!searchLoading">儲存</span>
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
          <div>
            <Pagination
              :searchFun="search"
              :currentPage="currentPage"
              :pageCount="pageCount"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

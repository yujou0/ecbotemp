import { defineStore } from "pinia";
import axios from "axios";
import axiosRetry from "axios-retry";
import Cookies from "js-cookie";
import { loginStore } from "@/stores/login.js";
const login = loginStore();
// 添加axios重试配置
axiosRetry(axios, { retries: 1 }); // 1次重试

// 提取重复的配置部分
function createAxiosInstance() {
  const token = Cookies.get("ECBO_token");
  return axios.create({
    baseURL: login.apiUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
}

export const useApiStore = defineStore("api", {
  state: () => ({
    data: null,
  }),
  actions: {
    async callApi(method, url, payload = null) {
      try {    
        const token = Cookies.get("ECBO_token"); // 将 token 定义在这里
        const apiEcbo = createAxiosInstance();
        const config = {
          headers: { Authorization: `Bearer ${token}` },
        };
    
        let response;
        switch (method) {
          case "GET":
            response = await apiEcbo.get(url, config);
            break;
          case "POST":
            response = await apiEcbo.post(url, payload, config);
            break;
          case "PATCH":
              response = await apiEcbo.patch(url, payload, config);
              break;
          case "PUT":
            response = await apiEcbo.put(url, payload, config);
            break;
          case "DELETE":
            response = await apiEcbo.delete(url, payload, config);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }
    
        this.data = response.data;
        // 换发TOKEN
        const availableJwt = response.headers["x-available-jwt"];
        if (typeof availableJwt !== "undefined") Cookies.set("ECBO_token", availableJwt, { expires: 1 });
        return this.data; // 返回结果
      } catch (error) {
        console.error(`Error sending ${method} request:`, error);
        if (error.response.request.status === 401) {
          login.userLogout();
        }
        throw error; // 抛出错误
      }
    },
    
    async getData(url) {
      return this.callApi("GET", url);
    },

    async postData(payload, url) {
      return this.callApi("POST", url, payload);
    },

    async putData(payload, url) {
      return this.callApi("PUT", url, payload);
    },

    async patchData(payload, url) {
      return this.callApi("PATCH", url, payload);
    },

    async deleteData( url) {
      return this.callApi("DELETE", url);
    },
  },
});

import { defineStore } from "pinia";
import axios from "axios";
import Cookies from "js-cookie";
import JSEncrypt from "jsencrypt";
import jwtDecode from "jwt-decode";
export const loginStore = defineStore("login", () => {
  const loading = ref(false);
  const user = reactive({ account: "", password: "", sub: "", role: [] });
  const userAccount = ref("");
  const currentHostname = window.location.hostname;
  const apiUrl = ref(``);
  const router = useRouter();
  const IsLogin = ref(false);
  const ErrorCode = ref("");
  const ErrorMsg = ref("");
  const token = Cookies.get("ECBO_token");
  const Account = Cookies.get("ECBO_userAccount");
  const siteTitle =ref("");
  // if (currentHostname === "localhost" || currentHostname.includes('test')) {
  //   apiUrl.value = `https://ecboapitest.55688.com.tw/api`;
  //   siteTitle.value="EC 管理後台(測試)";
  // } else {
  //   apiUrl.value = `https://ecboapi.55688.com.tw/api`;
  //   siteTitle.value="EC 管理後台";
  // }

  if (typeof token === "undefined" || token === null || !token) {
    IsLogin.value = false;
  } else IsLogin.value = true;

  if (Account) userAccount.value = Account;
  // 創建 RSA 密鑰對象
  const rsa = new JSEncrypt();
  // 新增函數來獲取後端的公鑰
  const fetchPublicKey = async () => {
    try {
      const publicKeyResponse = await axios.get(
        apiUrl.value + "/system/publicKey"
      );
      return publicKeyResponse.data.Data.PublicKey;
    } catch (error) {
      console.error("獲取後端公鑰時出錯:", error);
      return null;
    }
  };

  const userLogin = async () => {
    try {
      loading.value = true; // 將 loading 設置為 true，表示正在進行登入動作
  
      if (user.account === "" || user.password === "") {
        IsLogin.value = false;
        ErrorCode.value = -1001;
        ErrorMsg.value = "參數錯誤";
        return;
      }
  
      // 簡單檢查帳號和密碼
      if (user.account === "admin" && user.password === "123456") {
        loading.value = false;
        // 登录成功
        IsLogin.value = true;
        ErrorCode.value = "";
        ErrorMsg.value = "";
        const token = "dummy-token"; // 使用假設的 token
        const decodedToken = { sub: "admin", role: "admin" }; // 使用假設的解碼 token
        Cookies.set("ECBO_token", token, { expires: 1 });
        Cookies.set("ECBO_userAccount", decodedToken.sub, { expires: 1 });
        // Cookies.set("ECBO_role", decodedToken.role, { expires: 1 });
        Cookies.set("ECBO_role", 'SuperAdmin', { expires: 1 });
        userAccount.value = decodedToken.sub;
  
        // 導航到首頁
        router.push("/");
        return;
      } else {
        // 登录失败
        IsLogin.value = false;
        ErrorCode.value = -1002; // 自訂錯誤碼
        ErrorMsg.value = "帳號或密碼錯誤";
        loading.value = false;
        userAccount.value = "";
        return;
      }
    } catch (error) {
      console.error("登入錯誤:", error);
      IsLogin.value = false;
      userAccount.value = "";
    } finally {
      loading.value = false;
    }
  };
  

  const userLogout = () => {
    Cookies.remove("ECBO_userAccount");
    Cookies.remove("ECBO_role");
    Cookies.remove("ECBO_token");
    IsLogin.value = false;
    user.account = Cookies.get("ECBO_userAccount");
    user.password = "";
    userAccount.value = "";
    router.push("/");
  };

  // Route guard to protect routes that require authentication
  const isAuthenticated = () => {
    return IsLogin.value || Cookies.get("ECBO_token");
  };

  return {
    user,
    userLogin,
    userLogout,
    IsLogin,
    ErrorCode,
    ErrorMsg,
    isAuthenticated,
    loading,
    userAccount,
    apiUrl,
    siteTitle
  };
});

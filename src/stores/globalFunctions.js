import { defineStore } from "pinia";

export const useGlobalFunctionsStore = defineStore("globalFunctions", {
  state: () => ({
    OrderStatusMap: {
      pending: "處理中",
      cancelled: "已取消",
      removed: "已刪除",
      confirmed: "已確認",
      completed: "已完成",
    },
    PaymentStatusMap: {
      pending: "未付款",
      failed: "付款失敗",
      expired: "超過付款時間",
      completed: "已付款",
      refunding: "退款中",
      refunded: "已退款",
      partially_refunded: "已部分退款",
    },
    DeliveryStatusMap: {
      pending: "備貨中",
      shipping: "發貨中",
      shipped: "已發貨",
      arrived: "已到達",
      collected: "已取貨",
      returned: "已退貨",
      returning: "退貨中",
    },
    TicketStatusMap: {
      0: "已發放",
      1: "待發放",
      2: "處理中",
      "-1": "失敗",
    },
    NumericStatusMap: {
      0: "0",
      1: "1",
      2: "2",
      "-1": "-1",
    },
    MemberTierValueMap: {
      Small: "小熊",
      Black: "黑熊",
      Silver: "銀熊",
      Golden: "金熊",
      Diamond: "鑽石熊",
    },
  }),
  actions: {
    isValidSku(Sku) {
      const result = {
        isValid: false,
        errorMessage: "",
      };

      if (Sku === "") {
        result.isValid = true;
        result.errorMessage = "";
        return result;
      }
      if (Sku) {
        if (Sku.length < 4) {
          result.isValid = false;
          result.errorMessage = "請輸入有效的商品貨號，至少4個字元。";
        } else {
          result.isValid = true;
          result.errorMessage = "";
        }
      }
      return result;
    },
    isValidProductName(ProductName) {
        const result = {
            isValid: false,
            errorMessage: "",
          };
      if (ProductName === "") {
        result.isValid = true;
        result.errorMessage = "";
        return result;
      }
      if (ProductName) {
        if (ProductName.length < 2) {
            result.isValid = false;
            result.errorMessage = "請輸入有效的商品名稱，至少2個字元。";
        } else {
            result.isValid = true;
            result.errorMessage = "";
        }
      }
      return result;
    },
    isValidPhone(phoneNumber) {
      const result = {
        isValid: false,
        errorMessage: "",
      };

      if (phoneNumber === "") {
        result.isValid = true;
        result.errorMessage = "";
        return result;
      }

      if (phoneNumber) {
        const regex = /^(?:\+?0)[9]\d{2,}([- ]?\d+)*$/;
        if (!regex.test(phoneNumber)) {
          result.isValid = false;
          result.errorMessage =
            "請輸入有效的註冊門號，以09開頭，且至少4個字元。";
        } else {
          result.isValid = true;
          result.errorMessage = "";
        }
      }

      return result;
    },
    isValidDayRealease (Day) {
        const result = {
            isValid: false,
            errorMessage: "",
          };
        if (!Day && Day !== 0) {
            result.isValid = false;
            result.errorMessage ="請輸入發放機制(天數)";
        } else if (Day < 0 || Day > 255) {
            result.isValid = false;
            result.errorMessage = "天數有誤，請輸入0~255天";
        } else {
         result.isValid = true;
            result.errorMessage = "";
        }
      return result;
      },
    isValidDate(value) {
      if (typeof value._value !== "undefined" && value._value === "") {
        return true;
      } else if (typeof value === "string" && value === "") {
        return true;
      } else {
        return false;
      }
    },
    formatDateToYYYYMMDD(value) {
      if(typeof value === "undefined") return '--';
      if (!(value instanceof Date)) {
        value = new Date(value);
      }
      if (isNaN(value.getTime())) {
        // 如果无法转换为有效的日期对象，这里可以处理错误情况
        return "Invalid Date";
      }
      const year = value.getFullYear();
      const month = String(value.getMonth() + 1).padStart(2, "0");
      const day = String(value.getDate()).padStart(2, "0");
      return `${year}-${month}-${day}`;
    },
    formatDate(value) {
      if (!value) return "";
      return value.split("T")[0]; // 获取日期部分
    }
  },
});

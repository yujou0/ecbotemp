import { defineStore } from "pinia";
import { ref } from "vue";

export const loadingStore = defineStore("home", () => {
  const IsLoading = ref(false);
  const ShowAlert = ref(false);
  const ShowAlertText = ref("");
  const ShowAlertIcon = ref("");
  const setIsLoading = (value) => {
    IsLoading.value = value;
  };

  return {
    IsLoading,
    ShowAlert,
    ShowAlertText,
    ShowAlertIcon,
    setIsLoading
  };
});

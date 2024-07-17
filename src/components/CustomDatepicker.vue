
<script lang="ts" setup>
import dayjs, { Dayjs } from "dayjs";
import { ref, watch } from "vue";
import locale from "ant-design-vue/es/date-picker/locale/zh_TW";
import { onMounted } from "vue";
const dateFormat = "YYYY/MM/DD";
const today = dayjs();
const startDate = today.subtract(6, "day");
const endDate = today;
type RangeValue = [Dayjs, Dayjs];
const datepickerStatus = ref("");
const selectedValue = ref<RangeValue>([startDate, endDate]);
const hackValue = ref<RangeValue>();
const datepickerErrorMsg = ref("");
const emits = defineEmits(["getReturnData"]); // 定義 emit 函數，用於發送事件
const dates = ref<RangeValue>();
  const props = defineProps(["label"]);
  const label = ref(props.label);

const disabledDate = (current: Dayjs) => {
  if (!dates.value || (dates.value as any).length === 0) {
    return false;
  }
  const tooLate = dates.value[0] && current.diff(dates.value[0], "days") > 91;
  const tooEarly = dates.value[1] && dates.value[1].diff(current, "days") > 91;
  return tooEarly || tooLate || current.isAfter(today, "day");
};

const onOpenChange = (open: boolean) => {
  if (open) {
    dates.value = [] as any;
    hackValue.value = [] as any;
  } else {
    hackValue.value = undefined;
  }
};

const onChange = (val: RangeValue) => {
  selectedValue.value = val;
};

const onCalendarChange = (val: RangeValue) => {
  dates.value = val;
};
// 当组件加载时，发送默认值
onMounted(() => {
  emitUpdateValue(selectedValue, datepickerStatus);
});

// 即时验证
watch([selectedValue, datepickerStatus], ([newVal, status]) => {
  validateDateRange(newVal);
  emitUpdateValue(newVal, status);
});

// 定義發送事件的方法
const emitUpdateValue = (value1, value2) => {
  emits("getReturnData", { value1, value2 });
};

const validateDateRange = (dateRange: [Dayjs, Dayjs]) => {
  const [start, end] = dateRange;
  const maxDateRange = 91; // 最大日期范围为92天
  const dateDiff = end.diff(start, "day");

  // 检查是否选择的日期大于当天
  if (end.isAfter(today, "day")) {
    datepickerErrorMsg.value = "開始/結束日期必須小於今天。";
    datepickerStatus.value = "error";
  }
  // 检查日期范围是否超过最大允许范围
  else if (dateDiff > maxDateRange) {
    datepickerErrorMsg.value = "請選擇 92 天內的日期區間";
    datepickerStatus.value = "error";
  } else {
    datepickerErrorMsg.value = "";
    datepickerStatus.value = "";
  }
};
</script>

<template>
  <div id="custom-datepicker">
    <div class="d-flex flex-column">
      <label class="custom-datepicker-label">{{ label }}
      </label>
      <a-range-picker
        placement="bottomRight"
        :autofocus="false"
        :locale="locale"
        :status="datepickerStatus"
        v-model:value="selectedValue"
        :allowClear="false"
        :format="dateFormat"
        @change="onChange"
        @openChange="onOpenChange"
        @calendarChange="onCalendarChange"
        :style="{ borderColor: datepickerStatus ? '#DC3545' : '' }"
      />
      <!-- :disabled-date="disabledDate" -->
      <i
        class="bi bi-calendar-week"
        style="font-size: 16px"
        :style="{ color: datepickerStatus ? '#DC3545' : '' }"
      ></i>
      <span
        class="datepicaker-error"
        :style="{ color: datepickerStatus ? '#DC3545' : '' }"
      >
        {{ datepickerErrorMsg }}
      </span>
    </div>
  </div>
</template>

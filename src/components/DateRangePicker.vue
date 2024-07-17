<template>
  <div class="date-range-picker">
    <input
      type="text"
      class="date-input"
      v-model="startDate"
      @focus="showCalendar = true"
      @click="showCalendar = !showCalendar"
    />
    <input type="text" class="date-input" v-model="endDate" @focus="showCalendar = true" />
    <div v-if="showCalendar" class="calendar-container">
      <!-- 在這裡放入日期範圍選擇器的內容 -->
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';

export default {
  setup() {
    const startDate = ref('');
    const endDate = ref('');
    const showCalendar = ref(false);

    return {
      startDate,
      endDate,
      showCalendar,
    };
  },
};
</script>

<style>
/* 您的樣式放在這裡 */
</style>

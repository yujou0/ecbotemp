<template>
    <div>
      <!-- 选项卡导航 -->
      <ul class="nav nav-tabs" role="tablist">
        <li class="nav-item" v-for="(tab, index) in tabs" :key="index">
          <a
            class="nav-link"
            :class="{ active: activeTabIndex === index }"
            @click="setActiveTab(index)"
            href="#"
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
          {{ tab.content }}
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { reactive, ref } from 'vue';
  
  export default {
    props: {
      tabs: {
        type: Array,
        required: true,
      },
    },
    setup(props) {
      const state = reactive({
        activeTabIndex: 0, // 默认选中第一个选项卡
      });
  
      const setActiveTab = (index) => {
        state.activeTabIndex = index;
      };
  
      return {
        activeTabIndex: state.activeTabIndex,
        setActiveTab,
      };
    },
  };
  </script>
  
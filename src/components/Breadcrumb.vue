<script setup>
import { useRoute } from "vue-router";
import { useSidebarStore } from '@/stores/sidebarStore';
const route = useRoute();
const sidebarStore = useSidebarStore(); // 引入 sidebarStore
// 辅助函数：解析路由路径，返回第一级和第二级的路由名称
function parseRouteSegments(path) {
  return path.split("/").filter((segment) => segment.trim() !== "");
}
// 计算属性：生成面包屑
const breadcrumbs = computed(() => {
  const matchedRoutes = route.matched;
  const breadcrumbs = [];

  for (const routeRecord of matchedRoutes) {
    if (routeRecord.name) {
      const routeSegments = parseRouteSegments(routeRecord.path);
      const firstLevelName = routeSegments[0];
      const secondLevelName = routeSegments[1];

      if (firstLevelName && secondLevelName) {
        // 使用 sidebarStore 中的數據生成面包屑
        const firstLevellabel = sidebarStore.sidebarConfig[firstLevelName]?.name || "";
        const secondLevellabel = sidebarStore.sidebarConfig[firstLevelName]?.submenus.find(submenu => submenu.route.toLowerCase() === `/${firstLevelName}/${secondLevelName}`)?.name || "";

        breadcrumbs.push({
          to: firstLevelName,
          label: firstLevellabel,
        });
        breadcrumbs.push({
          to: secondLevelName,
          label: secondLevellabel,
        });
      }
    }
  }

  return breadcrumbs;
});
</script>

<template>
  <div id="Breadcrumb">
    <nav aria-label="breadcrumb">
      <ol class="breadcrumb d-flex align-items-center">
        <router-link class="disabled" to="/"><i class="bi bi-house-door-fill"></i></router-link>
        <li class="custom-breadcrumb-item" v-for="item in breadcrumbs" :key="item.to">
        <i class="bi bi-chevron-right"></i>
          <router-link :to="item.to" class="disabled">{{ item.label }}</router-link>
        <i class="bi bi-chevron-right"></i>
        </li>
      </ol>
    </nav>
  </div>
</template>

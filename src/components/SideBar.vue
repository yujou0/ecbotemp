<script setup>
import { useRouter } from "vue-router";
import { useSidebarStore } from "@/stores/sidebarStore";
import { onMounted } from "vue";
import { loginStore } from "@/stores/login.js";
const login = loginStore();

const sidebarStore = useSidebarStore();
const sidebarConfig = sidebarStore.sidebarConfig;
const activeMenuList = ref([]);
const activeMenu = ref("");
const activeSubMenu = ref("");
const router = useRouter();

onMounted(() => {
  const parts = router.currentRoute.value.path.split("/");
  if (parts[1]) {
    toggleSubMenu(parts[1]);
    activeMenu.value = parts[1].toLowerCase();
  }
});

const toggleMenu = (menu) => {
  if (activeSubMenu.value == "") activeMenu.value = menu.toLowerCase();
  if (activeMenuList.value.includes(menu.toLowerCase())) {
    activeMenuList.value = activeMenuList.value.filter((item) => item.toLowerCase() !== menu.toLowerCase());
  } else {
    activeMenuList.value.push(menu.toLowerCase());
  }
};
const toggleSubMenu = (SubMenu) => {
  const parts = SubMenu.split("/");
  if (parts[1]) {
    activeSubMenu.value = parts[1].toLowerCase();
  activeMenu.value = parts[1].toLowerCase();
  }

};
const resetMenuFocus = () => {
  activeMenu.value = "";
  activeSubMenu.value = "";
  activeMenuList.lenght = 0;
};
</script>

<template>
  <div class="sidebar">
    <nav id="sidebar" :class="{ active: sidebarActive }">
      <div class="sidebar-header">
        <h3>
          <router-link @click="resetMenuFocus()" to="/"
            >{{login.siteTitle}}</router-link
          >
        </h3>
      </div>
      <ul class="list-unstyled components menuitems">
        <li
          v-for="(menu, key) in sidebarConfig"
          :key="key"
          :class="{ active: activeMenu.includes(key.toLowerCase()) }"
        >
          <a
            href="#"
            @click="toggleMenu(key)"
            class="d-flex justify-content-between"
            :class="{ openstate: activeMenu.includes(key.toLowerCase()) }"
          >
            <div><i :class="`bi ${menu.icon}`"></i>{{ menu.name }}</div>
            <i class="bi bi-chevron-down"></i>
          </a>
          <ul
            class="collapse list-unstyled sidebar-items"
            :class="{ show: activeMenuList.includes(key.toLowerCase()) }"
          >
            <li v-for="(submenu, index) in menu.submenus" :key="index">
              <router-link
                :to="submenu.route"
                active-class="active"
                :class="{
                  active: $route.matched.some(
                    ({ path }) => path === submenu.route
                  ),
                }"
                @click="toggleSubMenu(submenu.route)"
              >
                {{ submenu.name }}
              </router-link>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

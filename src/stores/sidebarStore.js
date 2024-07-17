import { defineStore } from 'pinia';

export const useSidebarStore = defineStore('sidebar', {
  state: () => ({
    sidebarConfig: {
      system: {
        name: '系統管理',
        icon: 'bi-gear',
        submenus: [
          { name: '使用者帳號管理', route: '/system/userAcount' },
        ],
      },
      info: {
        name: '資料查詢',
        icon: 'bi-search',
        submenus: [
          { name: '會員查詢', route: '/info/memeberSearch' },
          { name: '商品查詢', route: '/info/productSearch' },
          { name: '訂單查詢', route: '/info/orderSearch' },
          { name: '搭車金查詢', route: '/info/voucherSearch' },
        ],
      },
      coupon: {
        name: '優惠券管理',
        icon: 'bi-ticket-perforated',
        submenus: [
          { name: '優惠券管理', route: '/coupon/couponManagement' },
        ],
      },
    },
  }),
});

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import "virtual:svg-icons-register"
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import 'ant-design-vue/dist/reset.css';
// import '../src/styles/main.scss'
import '../src/dist/main.min.css';
import Antd from 'ant-design-vue';
const app = createApp(App);
app.use(createPinia())
app.use(router)
app.use(Antd)

// 安裝 BootstrapVue
app.mount('#app')

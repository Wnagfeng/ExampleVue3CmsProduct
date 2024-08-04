import './assets/main.css'
import "normalize.css";
import 'element-plus/es/components/message/style/css'
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { useLoginStore } from '@/stores/login'
import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(createPinia())

const loginStore = useLoginStore()
loginStore.loadRouter()
app.use(router)

app.mount('#app')

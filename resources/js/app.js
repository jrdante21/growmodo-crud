import '@/js/bootstrap.js'
import router from '@/js/router'
import store from '@/js/store'
import App from '@/js/components/App.vue'
import { createApp } from 'vue'

const app = createApp(App)
app.use(router)
app.use(store)
app.mount('#app')
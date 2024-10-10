import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import 'lazysizes';
import 'lazysizes/plugins/attrchange/ls.attrchange';
import 'lazysizes/plugins/blur-up/ls.blur-up'; // Optional plugin for a blur-up effect
import "lazysizes/plugins/unveilhooks/ls.unveilhooks";


import App from './App.vue'
import router from './router'



const app = createApp(App)


app.use(createPinia())
app.use(router)

app.mount('#app')

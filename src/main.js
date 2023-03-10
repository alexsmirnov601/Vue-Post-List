import { createApp } from 'vue'
import router from './components/router/router'
import App from './App.vue'
import components from './components/UI/index'
import './assets/main.css'

const app = createApp(App)

/* глобальная регистрация ui компоннетов, так мы можем использовать компоненты без импортов и регистрации */
components.forEach((component) => app.component(component.name, component))

app.use(router).mount('#app')

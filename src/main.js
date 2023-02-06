import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI/index'

const app = createApp(App)

/* глобальная регистрация ui компоннетов, так мы можем использовать компоненты без импортов и регистрации */
components.forEach((component) => app.component(component.name, component))

app.mount('#app')

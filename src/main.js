import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router' // Add this line

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import '@mdi/font/css/materialdesignicons.css'; // Import the Material Design Icons CSS
import 'vuetify/dist/vuetify.min.css'; // Import the Vuetify CSS

const vuetify = createVuetify({
  components,
  directives,
})


const app = createApp(App)
const pinia = createPinia()
app.use(vuetify)
app.use(router) // Use the router instance
app.use(pinia)
app.mount('#app')


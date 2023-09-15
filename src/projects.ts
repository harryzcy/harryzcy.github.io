import ProjectApp from './ProjectsApp.vue'
import { createApp } from 'vue'

;(globalThis as any).__VUE_OPTIONS_API__ = true
;(globalThis as any).__VUE_PROD_DEVTOOLS__ = false

createApp(ProjectApp).mount('#app')

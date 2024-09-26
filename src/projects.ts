/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { createApp } from 'vue'

import ProjectApp from './ProjectsApp.vue'
;(globalThis as any).__VUE_OPTIONS_API__ = true
;(globalThis as any).__VUE_PROD_DEVTOOLS__ = false

// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
createApp(ProjectApp).mount('#app')

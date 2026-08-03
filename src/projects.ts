import { createApp } from 'vue'

import ProjectApp from './ProjectsApp.vue'

globalThis.__VUE_OPTIONS_API__ = true
globalThis.__VUE_PROD_DEVTOOLS__ = false

// oxlint's type-aware backend cannot resolve .vue SFC imports, so ProjectApp
// is seen as `error typed` here. Verified by vue-tsc instead.
// oxlint-disable-next-line typescript/no-unsafe-argument
createApp(ProjectApp).mount('#app')

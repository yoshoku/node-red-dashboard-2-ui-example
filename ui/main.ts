/**
 * Used only for development (via `npm run dev`).
 *
 * This file is useful for testing your component in isolation from Node-RED.
 */
import { createApp, App } from 'vue'
import UIExample from './components/UIExample.vue'

const app: App = createApp(UIExample)
app.mount('#app')

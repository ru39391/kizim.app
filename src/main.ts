import { createApp } from 'vue'
import App from './App.vue'
import piniaStore from './store';

const app = createApp(App);

app.use(piniaStore);
app.mount('#app')

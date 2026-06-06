import { createApp } from 'vue';
import App from './App.vue';
import '@luaris/ui/styles.css';
import { registerComponents } from '@luaris/ui';

const app = createApp(App);
registerComponents(app, false).then(() => {
	app.mount('#app');
});

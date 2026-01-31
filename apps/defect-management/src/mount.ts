import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import './index.css';

const mount = (el: HTMLElement) => {
  const app = createApp(App);
  app.use(router);
  app.mount(el);
  
  return () => {
    app.unmount();
  };
};

export default mount;

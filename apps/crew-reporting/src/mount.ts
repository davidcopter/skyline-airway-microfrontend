import App from './App.svelte';
import './app.css';

const mount = (el: HTMLElement) => {
  const app = new App({
    target: el,
  });
  
  return () => {
    app.$destroy();
  };
};

export default mount;

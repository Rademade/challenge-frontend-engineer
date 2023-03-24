import { createApp } from "vue";
import { createPinia } from "pinia";
import App from "./App.vue";
import "./assets/main.css";
import VeeValidate from "vee-validate";

const app = createApp(App);

app.use(createPinia());
app.use(VeeValidate);

app.mount("#app");

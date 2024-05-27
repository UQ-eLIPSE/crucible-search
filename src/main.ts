import { createApp } from "vue";
import App from "@/App.vue";
import { createSearchPlugin } from "@/SearchPlugin.ts";
import router from "@/router/projectRoutes";

const app = createApp(App);
app.use(router);

createSearchPlugin(app, { router, getApi: "https://api.example.com" });

app.mount("#app");

import { createApp } from "vue";
import App from "@/App.vue";
import { createSearchFilterPlugin } from "@/SearchFilterPlugin.ts";
import { projectRoutes } from "@/router/projectRoutes";

const app = createApp(App);
app.use(projectRoutes);

createSearchFilterPlugin(app, {
  router: projectRoutes,
});

app.mount("#app");

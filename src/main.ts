import { createApp } from "vue";
import App from "@/App.vue";
import { createSearchPlugin } from "@/SearchPlugin.ts";
import { projectRoutes } from "@/router/projectRoutes";

const app = createApp(App);
app.use(projectRoutes);

createSearchPlugin(app, { router: projectRoutes });

app.mount("#app");

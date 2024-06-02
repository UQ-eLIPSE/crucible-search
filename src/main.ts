import { createApp } from "vue";
import App from "@/App.vue";
import { createSearchPlugin } from "@/SearchPlugin.ts";
import { router } from "@/router/projectRoutes";

const app = createApp(App);
app.use(router);

// * TEMPORARY STATIC URL TO FETCH
const staticApiUrl = "http://localhost:8080/api/resource/getResultByQueryTag";

createSearchPlugin(app, { router, getApi: staticApiUrl });

app.mount("#app");

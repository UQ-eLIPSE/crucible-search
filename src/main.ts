import { createApp } from "vue";
import router from "./router/pluginRoutes";
import CrucibleSearch from "./components/CrucibleSearch.vue";

const app = createApp(CrucibleSearch);
app.use(router);
app.mount("#app");

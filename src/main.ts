import { createApp } from "vue";
import router from "./router/projectRoutes";
import CrucibleSearch from "./components/CrucibleSearch.vue";

const app = createApp(CrucibleSearch);
app.use(router);
app.mount("#root");

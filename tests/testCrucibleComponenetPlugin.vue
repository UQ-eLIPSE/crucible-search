<template>
  <div id="app">
    <CrucibleSearch />
  </div>
</template>

<script setup>
import { createApp } from "vue";
import App from "./App.vue";
import { createSearchPlugin, defaultData } from "@/ViewerPlugin.ts";

const app = createApp(App);

const options = {
  dataLink: defaultData,
};

// Use your plugin
createSearchPlugin(app, options);

app.mount("#app");
</script>

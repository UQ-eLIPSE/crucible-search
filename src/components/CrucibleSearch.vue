<template>
  <div class="search-container">
    <h1>Crucible Resource Search</h1>
    <div class="search-box">
      <p>Try it - enter a Pokémon type (number):</p>
      <input
        type="text"
        placeholder="Enter a Tag"
        @keyup.enter="showResult(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
  <RouterLink to="/result-tag-search">Results</RouterLink>
  <RouterView></RouterView>
</template>

<script setup lang="ts">
// import { RouterView } from "vue-router";
import router from "@/router/pluginRoutes";
import { onMounted } from "vue";

onMounted(() => {
  console.log("CrucibleSearch mounted");
});
const showResult = (term: string) => {
  console.log("0", term);
  router.push({ path: "/result-tag-search", query: { tag: term } });
  console.log("2", term, router);
};
</script>

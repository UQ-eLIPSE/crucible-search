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
</template>

<script setup lang="ts">
import { onMounted } from "vue";
import { inject } from "vue";
const router = inject("router") as any;

onMounted(() => {
  console.log("CrucibleSearch mounted");
  console.log("router", router);
});
const showResult = (term: string | undefined) => {
  console.log("0", term);
  router.push({ path: "/result-tag-search", query: { tag: term || "1" } });
  console.log("2", term, router);
};
</script>

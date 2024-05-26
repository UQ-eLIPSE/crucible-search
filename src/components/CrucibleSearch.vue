<template>
  <div class="search-container">
    <h1>Crucible Resource Search</h1>
    <div class="search-box">
      <p>Tags Input</p>
      <input
        type="text"
        placeholder="Enter a Tag (try ditto)"
        @keyup.enter="showResult(($event.target as HTMLInputElement).value)"
        @input="backToHome(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@/router/injectRoute";
const router = useRouter();
const showResult = (term: string | undefined) => {
  router.push({ path: `/search-in-tag/${term || "1"}` });
};
const backToHome = (term: string | undefined) => {
  if (!term) {
    router.back();
  }
};
</script>

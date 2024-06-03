<template>
  <div class="search-container">
    <div class="search-box">
      <label for=""></label>
      <input
        type="text"
        placeholder="Enter a tag (e.g. VETS2011)"
        @keyup.enter="showResult(($event.target as HTMLInputElement).value)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "@/router/injectRoute";

const router = useRouter();
const showResult = (term: string | undefined) => {
  router.push({ path: "/search", query: { tag: term } });
};
</script>
<style scoped>
.search-container {
  display: inline-flex;
  padding: 0 1rem;
  margin: 0 auto;
}

input {
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 5px;
  margin-right: 1rem;
  padding: 0;
  font-size: 1.2rem;
  width: fit-content;
}
</style>

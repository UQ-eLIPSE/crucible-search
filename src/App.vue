<template>
  <div id="app">
    <div class="main">
      <CrucibleSearch />
      <RouterView />
      <div>
        <CrucibleFilter />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CrucibleFilter from "./components/CrucibleFilter.vue";
</script>
<style scoped>
.main {
  position: relative;
  margin: auto;
  display: flex;
  flex-direction: column;

  align-items: center;
  justify-content: center;
}
</style>

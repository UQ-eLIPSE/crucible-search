<template>
  <div id="app">
    <CrucibleSearch />
    <CrucibleFilter />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import CrucibleFilter from "./components/CrucibleFilter.vue";
</script>

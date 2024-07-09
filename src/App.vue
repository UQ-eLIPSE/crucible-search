<template>
  <div id="app">
    <CrucibleFilter />
    <CrucibleSearch />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import CrucibleFilter from "./components/CrucibleFilter.vue";
</script>

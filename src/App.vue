<template>
  <div id="app">
    <CrucibleFilter />
    <CrucibleSearch />
    <CrucibleFilter />
    <RouterView />
  </div>
</template>

<script setup lang="ts">
import CrucibleFilter from "./components/CrucibleFilter.vue";
</script>

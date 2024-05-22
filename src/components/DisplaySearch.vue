<template>
  <div class="card">
    here display the search data
    {{ searchResults }}
  </div>
</template>

<script setup lang="ts">
const { searchResults } = defineProps({
  searchResults: {
    type: Array,
    required: true,
  },
});
</script>

<style scoped>
.card {
  display: flex;
  margin: auto;
  width: 90vh;
}
@media screen and (max-width: 768px) {
  .card {
    font-size: 0.85rem;
    --responsive-padding-left: clamp(10px, 5vw, 20px);
    padding-left: var(--responsive-padding-left);
  }
}
</style>

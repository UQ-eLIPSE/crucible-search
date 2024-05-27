<template>
  <div class="search-results-container">
    <h2>Search Results</h2>
    <div v-if="searchResults.length" class="results">
      <ul>
        <li v-for="(result, index) in searchResults" :key="index">
          {{ result }}
        </li>
      </ul>
    </div>
    <p v-else class="no-results">No results found</p>
  </div>
</template>

<script setup lang="ts">
import { findData } from "./DataAccessLayer";

const searchResults = ref<string[]>([]);

import { ref, onMounted, watch } from "vue";
import { useRouter } from "@/router/injectRoute";
import { inject } from "vue";

const getApiFromHost = inject("$getApi") || "undefined";
const route = useRouter();
const tag = ref("");

onMounted(() => {
  console.log("getApiFromHost", getApiFromHost); // remove after integration API
  if (route) {
    tag.value = route.currentRoute.value.params.tag as string;
    fetchData(tag.value);
  } else {
    tag.value = "undefined";
  }
});
const fetchData = async (tag: string) => {
  if (tag) {
    const results = await findData(tag as string);
    searchResults.value = results;
  } else {
    searchResults.value = [];
  }
};
watch(route.currentRoute, (newRoute, oldRoute) => {
  const newTag = (newRoute.params.tag as string) || "";
  const oldTag = (oldRoute.params.tag as string) || "";
  if (newTag !== oldTag) {
    fetchData(newTag);
  }
});
</script>

<style scoped>
.search-results-container {
  background: #f3f4f6;
  border-radius: 10px;
  padding: 1rem;
  box-shadow: inset 0 0 10px #ccc;
  margin-top: 20px;
}

h2 {
  text-align: center;
  color: #2a52be;
}

.results {
  padding: 0.5rem;
  list-style: none;
}

.results li {
  background-color: white;
  padding: 0.5rem;
  margin-bottom: 0.25rem;
  border-radius: 5px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.results li:hover {
  transform: translateY(-2px);
}

.no-results {
  text-align: center;
  color: #888;
}

@media screen and (max-width: 768px) {
  .search-results-container {
    padding: 0.5rem;
  }

  h2 {
    font-size: 1.2rem;
  }
}
</style>

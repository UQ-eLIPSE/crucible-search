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
import { onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { findData } from "./DataAccessLayer";
// import router from "@/router/pluginRoutes";

const route = useRoute(); //router.currentRoute.value; //useRoute() || {};
const searchResults = ref<string[]>([]);

// Define a method to fetch data based on the current route's tag parameter
const fetchData = async () => {
  const tag = route.query?.tag || "1";
  console.log("Fetching data for tag:", tag);
  if (tag) {
    const results = await findData(tag as string);
    searchResults.value = results;
    console.log("Search results:", results);
  } else {
    searchResults.value = []; // Clear results if no tag is provided
  }
};

// Call fetchData on component mount
onMounted(fetchData);

// React to changes in the route's query parameter 'tag'
watch(
  () => route.query.tag,
  (newTag, oldTag) => {
    if (newTag !== oldTag) {
      fetchData();
    }
  },
);
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

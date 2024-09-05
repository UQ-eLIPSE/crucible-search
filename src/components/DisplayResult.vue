<template>
  <div class="search-results-container">
    <div class="container-description">
      <button @click="() => $router.back()">&crarr;</button>
      <div class="label-badges">
        ({{ searchResults.length }} records in total)
      </div>
    </div>
    <div v-if="searchResults.length" class="results">
      <ul>
        <li v-for="(result, index) in searchResults" :key="index">
          <a :href="result.url" target="_blank" class="linkToResource">
            {{ result.label }}
          </a>
        </li>
      </ul>
    </div>
    <p v-else class="no-results">No results found</p>
  </div>
</template>

<script setup lang="ts">
import { findTagsData, getFilteredResourcesByTitle } from "./DataAccessLayer";
import { ResourceInSearch } from "@/types";
import { inject } from "vue";
const getApisFromHost =
  (inject("$getApi") as string) ??
  "http://localhost:8080/api/resource/getResultByQueryTag";

const searchFilterApi =
  (inject("$filterResourcesApi") as string) ||
  "http://localhost:8080/api/resource/filterResources";

const searchResults = ref<ResourceInSearch[]>([
  { _id: "", label: "", tags: [""], url: "" },
]);

import { ref, onMounted, watch } from "vue";
import { useRouter } from "@/router/injectRoute";

const route = useRouter();
const searchResult = ref("");
const level = ref(5);

onMounted(async () => {
  if (route) {
    const query = route.currentRoute.value.query;
    searchResult.value = query.searchResult as string;
    level.value = Number(query.level);
    await fetchData(searchResult.value, level.value, query.type as string);
  } else {
    searchResult.value = "undefined";
  }
});
const fetchData = async (searchResult: string, level: number, type: string) => {
  if (!searchResult) return;

  switch (type) {
    case "tag":
      searchResults.value = await findTagsData(
        searchResult,
        level,
        getApisFromHost,
      );
      break;
    case "title":
      searchResults.value = await getFilteredResourcesByTitle(
        searchResult,
        searchFilterApi,
      );
      break;
    default:
      searchResults.value = [];
  }
};
watch(route.currentRoute, async (newRoute, oldRoute) => {
  const newSearchTerm = (newRoute.query.searchResult as string) || "";
  const oldSearchTerm = (oldRoute.query.searchResult as string) || "";
  if (newSearchTerm !== oldSearchTerm) {
    await fetchData(newSearchTerm, level.value, newRoute.query.type as string);
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

.container-description {
  display: flex;
  justify-content: space-between;
  padding: 0;
  color: #2a52be;
}

.container-description button {
  background-color: #2a52be;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 0.5rem;
  margin-right: 0.5rem;
  cursor: pointer;
  font-weight: bolder;
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

.tag-badges,
.label-badges {
  background-color: #f3f4f6;
  color: #49075e;
  padding: 0.25rem;
  margin-left: 0.25rem;
  border-radius: 5px;
  text-align: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  font-weight: 500;
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

<template>
  <div class="search-results-container">
    <div class="container-description">
      <button @click="() => $router.back()">&crarr;</button>
      <div class="badgesOfsearchData">
        ({{ searchResults.length }} records in total)
      </div>
    </div>
    <div v-if="searchResults.length" class="results">
      <ul>
        <li v-for="(result, index) in searchResults" :key="index">
          {{ result.label }}
          <span
            v-for="(tag, index_tag) in result.tags"
            :key="index_tag"
            class="badgesOfsearchData"
            >{{ tag }}</span
          >
        </li>
      </ul>
    </div>
    <p v-else class="no-results">No results found</p>
  </div>
</template>

<script setup lang="ts">
import { findData } from "./DataAccessLayer";
import { ResourceInSearch } from "@/types";

const searchResults = ref<ResourceInSearch[]>([{ label: "", tags: [""] }]);

import { ref, onMounted, watch } from "vue";
import { useRouter } from "@/router/injectRoute";

const route = useRouter();
const tag = ref("");

onMounted(() => {
  if (route) {
    tag.value = route.currentRoute.value.params.tag as string;
    fetchData(tag.value);
  } else {
    tag.value = "undefined";
  }
});
const fetchData = async (tag: string) => {
  const results = await findData(tag as string);

  if (results) searchResults.value = results;
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

.badgesOfsearchData {
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

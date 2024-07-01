<template>
  <div class="search-container">
    <div ref="searchBoxRef" class="search-container">
      <input
        v-model="searchTerm"
        type="text"
        placeholder="search for topic and courses"
        @input="filterResults"
        @focus="handleFocus"
        @keydown="handleKeyDown"
      />
      <ul v-if="filteredTags.length && searchTerm && dropdownVisible">
        <li v-for="tag in filteredTags" :key="tag" @click="selectTag(tag)">
          <template v-for="(char, index) in tag.split('')">
            <span v-if="!isSearchTerm(char)" :key="index">{{ char }}</span>
            <strong v-else :key="`strong-${index}`">{{ char }}</strong>
          </template>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "@/router/injectRoute";
import { findTags } from "./DataAccessLayer";
import { inject } from "vue";

const router = useRouter();
const searchTerm = ref("");
const filteredTags = ref<string[]>([]);
const dropdownVisible = ref(false);
const searchBoxRef = ref<HTMLElement | null>(null);
const searchTagsApi =
  (inject("$tagsApi") as string) ||
  "http://localhost:8080/api/resource/alltags";
const maxSearchResults = 10;

const isSearchTerm = (char: string) =>
  // for the highlighting of the strong for the dropdown menu
  searchTerm.value.toLowerCase().includes(char.toLowerCase());

const filterResults = async () => {
  if (searchTerm.value) {
    // fuzzy searched
    filteredTags.value = (
      await findTags(searchTerm.value, searchTagsApi)
    ).slice(0, maxSearchResults);
    dropdownVisible.value = true;
  } else {
    filteredTags.value = [];
    dropdownVisible.value = false;
  }
};

const selectTag = (tag: string) => {
  // TODO: add tests for this
  searchTerm.value = !filteredTags.value.includes(tag)
    ? filteredTags.value[0] // default to the first tag if not in the dropdown list
    : tag;
  dropdownVisible.value = false;
  router.push({ path: "/search", query: { tag: searchTerm.value } });
};

const handleFocus = () => {
  if (filteredTags.value.length && searchTerm.value) {
    dropdownVisible.value = true;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    selectTag(searchTerm.value);
    searchTerm.value = "";
  }
};

const handleClickOutside = (event: MouseEvent) => {
  if (
    searchBoxRef.value &&
    !searchBoxRef.value.contains(event.target as Node)
  ) {
    dropdownVisible.value = false;
  }
};

onMounted(() => {
  document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener("click", handleClickOutside);
});
</script>
<style scoped>
.search-container {
  display: inline-flex;
  padding: 0 1rem;
  margin: 0 auto;
  position: relative;
  width: 100%;
  max-width: 300px;
}

input {
  padding: 0.8rem 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  font-size: 1rem;
  width: 100%;
}

ul {
  position: absolute;
  border: 1px solid #ddd;
  border-radius: 8px;
  list-style-type: none;
  padding: 0;
  margin-top: 48px;
  width: 100%;
  background: white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  z-index: 1000;
  text-transform: capitalize;
}

li {
  padding: 10px;
  cursor: pointer;
  transition:
    background-color 0.3s,
    color 0.3s;
}

li:hover {
  background-color: #f0f0f0;
  color: #333;
}

ul:not(:hover) > li:first-child {
  background-color: #f0f0f0;
  color: #333;
}

li:not(:last-child) {
  border-bottom: 1px solid #eee;
}
</style>

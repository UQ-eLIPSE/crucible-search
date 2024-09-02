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
      <ul v-if="filteredResults.length && searchTerm && dropdownVisible">
        <li
          v-for="(result, idx) in filteredResults"
          :key="`${result.value}-${idx}`"
          @click="setSearchResult(result)"
        >
          <template v-for="(char, index) in result.value.split('')">
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
import { findTags, getFilteredResourcesByTitle } from "./DataAccessLayer";
import { inject, toRefs } from "vue";
import { DropdownResults } from "@/types";

const router = useRouter();
const searchTerm = ref("");
const filteredTags = ref<DropdownResults[]>([]);
const filteredTitles = ref<DropdownResults[]>([]);
const filteredResults = ref<DropdownResults[]>([]);
const dropdownVisible = ref(false);
const searchBoxRef = ref<HTMLElement | null>(null);
const searchTagsApi =
  (inject("$tagsApi") as string) ||
  "http://localhost:8080/api/resource/alltags";

const searchFilterApi =
  (inject("$filterResourcesApi") as string) ||
  "http://localhost:8080/api/resource/filterResources";
const maxSearchResults = 10;

const props = defineProps({
  level: {
    type: Number,
    default: 5,
  },
});

const { level } = toRefs(props);

const isSearchTerm = (char: string) =>
  // for the highlighting of the <strong> elements for the dropdown menu
  searchTerm.value.toLowerCase().includes(char.toLowerCase());

/** Replaces all underscores with spaces */
const formatTag = (tag: string) => tag.replace(/_/g, " ");

/** Replaces all spaces with underscores */
const unformatTag = (tag: string) => tag.replace(/ /g, "_");

const filterResults = async () => {
  if (searchTerm.value) {
    // fuzzy searched
    filteredTags.value = (await findTags(searchTerm.value, searchTagsApi))
      .map(formatTag)
      .map((tag) => ({ value: tag, type: "tag" }));

    const filteredResources = await getFilteredResourcesByTitle(
      searchTerm.value,
      searchFilterApi,
    );

    filteredTitles.value = filteredResources.map(
      (resource: { label: string }) => {
        return { value: resource.label, type: "title" };
      },
    );

    filteredResults.value = [
      ...filteredTags.value,
      ...filteredTitles.value,
    ].slice(0, maxSearchResults);

    dropdownVisible.value = true;
  } else {
    filteredTags.value = [];
    filteredTitles.value = [];
    dropdownVisible.value = false;
  }
};

const setSearchResult = (searchResult: DropdownResults) => {
  searchTerm.value = !filteredResults.value
    .map((result) => result.value)
    .includes(searchResult.value)
    ? filteredResults.value[0].value
    : searchResult.value;

  console.log("sedarch result:", searchResult);
  console.log("search term value:", searchTerm.value);

  dropdownVisible.value = false;

  router.push({
    path: "/search",
    query: {
      searchResult:
        searchResult.type === "tag"
          ? unformatTag(searchTerm.value)
          : searchTerm.value,
      level: Number(level.value),
      type: searchResult.type,
    },
  });
};

const handleFocus = () => {
  if (filteredTags.value.length && searchTerm.value) {
    dropdownVisible.value = true;
  }
};

const handleKeyDown = (event: KeyboardEvent) => {
  if (event.key === "Enter") {
    filteredResults.value.find((result) => result.value === searchTerm.value)
      ? setSearchResult({ value: searchTerm.value, type: "tag" })
      : setSearchResult(filteredResults.value[0]);
    searchTerm.value = "";
  } else if (event.key === "Tab") {
    event.preventDefault(); // Prevent the default tab key behavior
    searchTerm.value = filteredTags.value[0].value ?? searchTerm.value;
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

.search-suggestion {
  position: absolute;
  color: lightgray;
  z-index: 1;
  max-width: fit-content;
  border: none;
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
}

li {
  padding: 10px;
  cursor: pointer;
  transition: background-color 0.3s;
  color: black;
  text-transform: capitalize;
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

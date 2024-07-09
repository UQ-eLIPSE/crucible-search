<template>
  <div class="crucible-filter-panel">
    <div class="crucible-filters">
      <div
        v-for="(items, key) in category"
        :key="key"
        class="crucible-filter-dropdown"
      >
        <p @click="toggleDropdown(key)">{{ key }}</p>
        <ul v-show="showDropdown[key]" class="crucible-filter-dropdown-menu">
          <li
            v-for="(item, index) in items"
            :key="index"
            @click="getFilterTag(key, item)"
          >
            {{ item }}
          </li>
        </ul>
      </div>
    </div>
    <div class="crucible-filter-collection">
      <span
        v-for="(item, key) in filterTagArray"
        :key="key"
        @click="filterTagArray.splice(key, 1)"
      >
        {{ item.split(":")[1].replace("_", " ") }}
      </span>
      <div v-if="filterTagArray.length === 0" class="crucible-filter-dropdown">
        <span>All</span>
      </div>
      <button class="filter-btn" @click="applyFilter">Apply</button>
      <button class="filter-btn" @click="resetFilter">Empty</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
//ToDo: inject the taxonomyTags from the Crucible Main platform
import { taxonomyTags } from "@/resources";

const showDropdown = ref({} as Record<string, boolean>);
const filterTagArray = ref([] as string[]);

// Convert to Taxonomy Category Object array
const category = taxonomyTags.reduce(
  (acc, tag) => {
    const [key, value] = tag.split(":");
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(value.replace("_", " "));
    return acc;
  },
  {} as Record<string, string[]>,
);

// function to toggle drop down
const toggleDropdown = (key: string) => {
  showDropdown.value[key] = !showDropdown.value[key];
  Object.keys(showDropdown.value).forEach((k) => {
    if (k !== key) {
      showDropdown.value[k] = false;
    }
  });
};

// Filter tags send to back end to filter resource
const getFilterTag = (key: string, tag: string) => {
  showDropdown.value[key] = !showDropdown.value[key];
  if (!filterTagArray.value.includes(`${key}:${tag.replace(" ", "_")}`)) {
    filterTagArray.value.push(`${key}:${tag.replace(" ", "_")}`);
  }
};
const resetFilter = () => {
  showDropdown.value = {};
  filterTagArray.value = [];
};

const applyFilter = () => {
  console.log("Applying the filter", filterTagArray); //Todo: add API call to apply the filter
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}
.crucible-filter-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 1rem;
}

.crucible-filters ul {
  list-style: none;
}

.crucible-filters li {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(215, 229, 242);
  font-size: small;
  color: #49075e;
}

.crucible-filters li:hover {
  background: #cbcaca;
  cursor: pointer;
}

.crucible-filters {
  display: flex;
  flex-direction: row;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}
.crucible-filter-collection {
  display: flex;
  justify-content: center;
  align-items: last baseline;
  margin-top: 1rem;
}
.crucible-filter-collection span {
  padding: 0.5rem 1rem;
  margin-right: 0.5rem;
  border-radius: 2rem;
  background: rgb(19, 144, 190);
  color: white;
  font-size: small;
}

@media (max-width: 412px) {
  .crucible-filters {
    flex-direction: column;
    padding: 0;
  }
}

.crucible-filters p {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
  color: white;
}

.crucible-filters label:hover {
  background: rgb(19, 144, 190);
  color: white;
}

.crucible-filter-dropdown,
.crucible-filter-dropdown-menu {
  display: flex;
  flex-direction: column;
}
.filter-btn {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
  font-weight: 500;
  font-family: inherit;
  transition: border-color 0.25s;
  margin-left: 0.5rem;
  background-color: rgb(64, 255, 47);
}
</style>

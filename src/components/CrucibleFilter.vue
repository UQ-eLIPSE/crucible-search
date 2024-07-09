<template>
  <!-- <div class="crucible-filter-container"> -->
  <div class="crucible-filters">
    <div class="crucible-filter-dropdown">
      <label for="All" @click="resetFilter">All</label>
    </div>
    <div
      v-for="(items, key) in category"
      :key="key"
      class="crucible-filter-dropdown"
    >
      <label @click="toggleDropdown(key)">{{ key }}</label>
      <ol v-show="showDropdown[key]" class="crucible-filter-dropdown-menu">
        <li
          v-for="(item, index) in items"
          :key="index"
          @click="getFilterTag(item)"
        >
          {{ item }}
        </li>
      </ol>
    </div>
  </div>
  <!-- </div> -->
</template>

<script setup lang="ts">
import { ref } from "vue";
//ToDo: inject the taxonomyTags from the Crucible Main platform
import { taxonomyTags } from "@/resources";

const showDropdown = ref({} as Record<string, boolean>);

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
const getFilterTag = (tag: string) => {
  console.log(tag); //Todo: add API call to filter the results
};
const resetFilter = () => {
  showDropdown.value = {};
  console.log("Resetting the filter"); //Todo: add API call to reset the filter
};
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

ol {
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
  margin-top: 0.5rem;
  padding: 0.5rem;
  border-radius: 0.5rem;
  background-color: rgb(215, 229, 242);
}

li:hover {
  background: #cbcaca;
  cursor: pointer;
}

.crucible-filters {
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
  padding: 0 1rem;
}

@media (min-width: 480px) {
  .crucible-filters {
    flex-direction: row;
    padding: 0;
  }
}

@media (min-width: 768px) {
  .crucible-filters {
    max-width: 720px;
    margin: 0 auto;
  }
}

@media (min-width: 992px) {
  .crucible-filters {
    max-width: 960px;
  }
}

@media (min-width: 1200px) {
  .crucible-filters {
    max-width: 1200px;
  }
}

.crucible-filters * {
  display: inline-block;
}

.crucible-filters label {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
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
</style>

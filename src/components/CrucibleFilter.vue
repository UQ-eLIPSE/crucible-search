<template>
  <div class="crucible-filter-container">
    <div v-if="showFilter" class="crucible-filter-panel">
      <div>
        <button class="filter-btn" @click="applyFilter">Apply</button>
        <button class="filter-btn" @click="resetFilter">Clear</button>
      </div>
      <hr />
      <div class="crucible-filter-collection">
        <span
          v-for="(item, key) in filterTagArray"
          :key="key"
          @click="filterTagArray.splice(key, 1), getItemNames"
        >
          &#9746; {{ item.split(":")[1].replace("_", " ") }}
        </span>
      </div>
      <div class="crucible-filters">
        <div
          v-for="(items, key) in category"
          :key="key"
          class="crucible-filter-dropdown"
        >
          <h4 @click="toggleDropdown(key)">
            <span> {{ key }}</span>
            <CollapseBtn :show-dropdown="showDropdown[key]" />
          </h4>
          <ul v-show="showDropdown[key]" class="crucible-filter-dropdown-menu">
            <li
              v-for="(item, index) in items"
              :key="index"
              :class="itemNames.includes(item) ? 'selected-filter-tag' : ''"
              @click="getFilterTag(key, item)"
            >
              {{ item }}
            </li>
          </ul>
        </div>
      </div>
    </div>

    <button
      :class="
        showFilter
          ? 'crucible-filter-control svg-background'
          : 'crucible-filter-control'
      "
      @click="showFilter = !showFilter"
    >
      <span v-if="!showFilter">Filters</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import CollapseBtn from "./CollapseBtn.vue";
//ToDo: inject the taxonomyTags from the Crucible Main platform
import { taxonomyTags } from "@/resources";

const showFilter = ref<boolean>(false);
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
};

// Filter tags send to back end to filter resource
const getFilterTag = (key: string, tag: string) => {
  if (!filterTagArray.value.includes(`${key}:${tag.replace(" ", "_")}`)) {
    filterTagArray.value.push(`${key}:${tag.replace(" ", "_")}`);
  }
};
const getItemNames = () => {};
const itemNames = computed(() => {
  return filterTagArray.value.map((item) =>
    item.split(":")[1].replace("_", " "),
  );
});
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
.crucible-filter-container {
  position: absolute;
  right: 0;
  display: flex;
  align-items: top;
  gap: 0;
  background-color: whitesmoke;
  z-index: 1;
}
.crucible-filter-control {
  min-height: fit-content;
  max-height: 100px;
  border: none;
  padding: 0.3em 0.6em;
  text-align: center;
  color: whitesmoke;
  font-size: large;
  font-weight: 400;
  text-align: center;
  background-color: #49075e;
  border-radius: 20px 0px 0px 20px;
}

.svg-background {
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 16 16"><path fill="white" d="M8 0C3.582 0 0 1.119 0 2.5V4l6 6v5c0 .552.895 1 2 1s2-.448 2-1v-5l6-6V2.5C16 1.119 12.418 0 8 0M1.475 2.169c.374-.213.9-.416 1.52-.586C4.369 1.207 6.147 1 8 1s3.631.207 5.005.583c.62.17 1.146.372 1.52.586c.247.141.38.26.442.331c-.062.071-.195.19-.442.331c-.374.213-.9.416-1.52.586C11.631 3.793 9.853 4 8 4s-3.631-.207-5.005-.583c-.62-.17-1.146-.372-1.52-.586a1.741 1.741 0 0 1-.442-.331c.062-.071.195-.19.442-.331"/></svg>');
  background-size: 1em 1em;
  background-repeat: no-repeat;
  background-position: center;
}

.crucible-filter-control:hover {
  opacity: 0.8;
  transition: all 0.3s;
  cursor: pointer;
}

.crucible-filter-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
  max-width: fit-content;
  margin-right: 0;
}
.filter-btn {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.3em 0.6em;
  font-size: 0.8em;
  font-weight: 600;
  font-family: inherit;
  transition: border-color 0.25s;
  margin-top: 5px;
  margin-left: 0.5rem;
  background-color: transparent;
  color: #49075e;
  cursor: pointer;
  border-color: #49075e;
}
.filter-btn:hover {
  border-color: #9b0bc7;
}
hr {
  border: none;
  height: 1px;
  background-color: #333;
  margin: 1rem 0;
  width: 100%;
}
.crucible-filter-collection {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: last baseline;
  margin-bottom: 0.5rem;
  max-width: 20rem;
}
.crucible-filter-collection span {
  margin: 1px;
  margin-right: 0.5rem;
  border-radius: 0.2rem;
  cursor: pointer;
  color: #49075e;
}
.crucible-filters {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  text-align: center;
  min-width: 20rem;
}

@media (max-width: 412px) {
  .crucible-filters {
    flex-direction: column;
    padding: 0;
  }
}
.crucible-filters h4 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin: 0.25rem;
  border-radius: 2rem;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
  border: 1px solid #49075e;
  color: #49075e;
}

.crucible-filters h4:hover {
  background: #cbcaca;
  color: #49075e;
}
.crucible-filters ul {
  display: flex;
  justify-content: center;
  align-items: center;
  list-style: none;
}

.crucible-filters li {
  color: #49075e;
  text-wrap: wrap;
  max-width: 10rem;
  margin: 3px;
  font-weight: 500;
}

.crucible-filters li:hover {
  cursor: pointer;
}

.crucible-filters .selected-filter-tag {
  color: #333;
  cursor: default !important;
  border-radius: 0.5rem;
}

.crucible-filter-dropdown,
.crucible-filter-dropdown-menu {
  display: flex;
  flex-direction: column;
}
</style>

<template>
  <div>
    <label>
      <p>Try it - enter a pokeman type ( number)</p>
      <input
        v-model="searchTerm"
        type="text"
        placeholder="Enter a Tag"
        @input="searchCrucibles"
      />
    </label>
    <button @click="clearSearch">Clear</button>
    <DisplaySearch :search-results="searchResults" />
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { findData } from "./DataAccessLayer";
import DisplaySearch from "./DisplaySearch.vue";
const searchTerm = ref<string>("");
const searchResults = ref<string[]>([]);
const searchCrucibles = async () => {
  searchResults.value = await findData(searchTerm.value);
};

const clearSearch = () => {
  searchTerm.value = "";
};
</script>

<style>
@font-face {
  font-family: "icomoon";
  src:
    url("../public/fonts/icomoon.eot?tvt6dy#iefix") format("embedded-opentype"),
    url("../public/fonts/icomoon.ttf?tvt6dy") format("truetype"),
    url("../public/fonts/icomoon.woff?tvt6dy") format("woff"),
    url("../public/fonts/icomoon.svg?tvt6dy#icomoon") format("svg");
}
</style>

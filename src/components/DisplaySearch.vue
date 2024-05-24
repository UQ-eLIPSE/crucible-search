<template>
  <div class="search-container">
    <h1>Crucible Resource Search</h1>
    <div class="search-box">
      <p>Try it - enter a Pokémon type (number):</p>
      <input v-model="searchTerm" type="text" placeholder="Enter a Tag" />
      <button @click="navigateToResults">Search</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";

const searchTerm = ref("");
const router = useRouter();

const navigateToResults = () => {
  router.push({ path: "/results", query: { tag: searchTerm.value } });
};
</script>

<style scoped>
@font-face {
  font-family: "icomoon";
  src:
    url("../public/fonts/icomoon.eot?tvt6dy#iefix") format("embedded-opentype"),
    url("../public/fonts/icomoon.ttf?tvt6dy") format("truetype"),
    url("../public/fonts/icomoon.woff?tvt6dy") format("woff"),
    url("../public/fonts/icomoon.svg?tvt6dy#icomoon") format("svg");
}

.search-container {
  min-width: 350px;
  background: linear-gradient(145deg, #ffffff, #e1e1e1);
  padding: 1.5rem;
  border-radius: 50px;
  box-shadow:
    43px 55px 87px #b8b8b8,
    -43px -55px 87px #ffffff;
  margin: auto;
  margin-top: 50px;
  width: 70vh;
}

.search-box {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  text-align: left;
  padding-left: 0.5rem;
  margin-bottom: 40px;
}

h1 {
  text-align: center;
  color: #2a52be;
}

input[type="text"] {
  margin-left: 0.5rem;
}

button {
  color: #ffffff;
  background-color: #2a52be;
  cursor: pointer;
  padding: 0.5rem;
  border: none;
  align-self: center;
  border-radius: 10px;
  width: 10vh;
}

@media screen and (max-width: 768px) {
  h1 {
    font-size: 1.5rem;
  }
  .search-box {
    font-size: 0.85rem;
  }
}
</style>

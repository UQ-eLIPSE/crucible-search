<template>
  <h1>This is a Filter</h1>
  <div class="container">
    <input id="All" type="radio" name="categories" value="All" checked />
    <input id="CSS" type="radio" name="categories" value="CSS" />
    <input id="JavaScript" type="radio" name="categories" value="JavaScript" />
    <input id="jQuery" type="radio" name="categories" value="jQuery" />
    <input id="WordPress" type="radio" name="categories" value="WordPress" />
    <input id="Slider" type="radio" name="categories" value="Slider" />
    <input
      id="fullPage.js"
      type="radio"
      name="categories"
      value="fullPage.js"
    />

    <div class="filters">
      <div class="dropdown">
        <label for="All">All</label>
      </div>
      <div class="dropdown">
        <label for="CSS" @click="toggleDropdown">Course</label>
        <ol v-if="showDropdown" class="dropdown-menu">
          <li>Vet2011</li>
          <li>Vet2012</li>
        </ol>
      </div>
      <div>
        <label for="JavaScript">Topic</label>
        <ol>
          <li>Physiology</li>
        </ol>
      </div>
      <div>
        <label for="jQuery">Animals</label>
        <ol>
          <li>Horse</li>
        </ol>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const showDropdown = ref(false);
const toggleDropdown = () => {
  console.log("toggleDropdown");
  showDropdown.value = !showDropdown.value;
  console.log(showDropdown.value);
};
</script>
<style scoped>
:root {
  --black: #3a3a3a;
  --white: #fff;
  --green: #49b293;
}

* {
  margin: 0;
  padding: 0;
}

img {
  display: block;
  max-width: 100%;
  height: auto;
}

ol {
  list-style: none;
}

li {
  display: flex;
  flex-direction: column;
}

a {
  text-decoration: none;
  color: inherit;
}

body {
  margin: 50px 0;
  color: var(--black);
  font: 1rem/1.3 sans-serif;
}

.author-archive {
  padding: 1.5rem;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

h1 a {
  transition: all 0.1s;
}

h1 a:hover {
  background: #49b293;
  color: white;
}

input[type="radio"] {
  position: absolute;
  left: -9999px;
}

.filters {
  display: flex;
  justify-content: center;
  text-align: center;
  margin-bottom: 2rem;
}

.filters * {
  display: inline-block;
}

.filters label {
  padding: 0.5rem 1rem;
  margin-bottom: 0.25rem;
  border-radius: 2rem;
  min-width: 50px;
  line-height: normal;
  cursor: pointer;
  transition: all 0.1s;
}

.filters label:hover {
  background: var(--green);
  color: var(--white);
}

.dropdown,
.dropdown-menu {
  display: flex;
  flex-direction: column;
}

/* .dropdown {
    position: relative;
    display: inline-block;
}

.dropdown-menu {
    position: absolute;
    min-width: 160px;
    z-index: 1;
}

.dropdown:hover .dropdown-menu {
    display: block;
} */
</style>

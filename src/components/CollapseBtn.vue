<!--
Component: CollapseBtn.vue

Description:
This Vue component renders a collapsible button using an SVG arrow icon. The arrow rotates 180 degrees to indicate the collapse state.

Usage:
1. Use the <CollapseBtn /> tag in your template.
2. Bind the `showDropdown` prop to control the rotation of the arrow based on the collapse state.

Example:
<CollapseBtn :showDropdown="isDropdownShown" />

Props:
- showDropdown: Boolean (required)

Styling:
The component uses scoped CSS for basic styling and can be customized via external CSS as needed.

Dependencies:
- Vue 3

Notes:
- This component is developed in the Composition API.

-->
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    width="24"
    height="24"
    :class="
      showDropdown ? 'collapse-btn collapse-btn-rotation' : 'collapse-btn'
    "
  >
    <path d="M7.41 8.59L12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z" />
    <path fill="none" d="M0 0h24v24H0V0z" />
  </svg>
</template>

<script setup lang="ts">
const { showDropdown } = defineProps({ showDropdown: Boolean });
</script>
<style scoped>
* {
  margin: 0;
  padding: 0;
}

.collapse-btn {
  display: inline-block;
  max-width: fit-content;
  padding: 0;
  margin: 0;
}
.collapse-btn-rotation {
  display: inline-block;
  max-width: fit-content;
  transform: rotate(180deg);
  transform-origin: 50% 50%;
}
</style>

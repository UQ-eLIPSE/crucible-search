<template>
  <button class="filter-btn" @click="emit('click', actionType)">
    {{ buttonText }}
  </button>
</template>

<script setup lang="ts">
import { computed } from "vue";

type ActionType = "apply" | "clear" | "default"; // Add more action types as needed

const emit = defineEmits(["click"]);
const { actionType } = defineProps<{
  actionType: ActionType;
}>();

const buttonTextMap: Record<ActionType, string> = {
  apply: "Apply",
  clear: "Clear",
  default: "Default",
  // ... Add more
};

const buttonText = computed(() => buttonTextMap[actionType] || "Default");
</script>

<style>
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
</style>

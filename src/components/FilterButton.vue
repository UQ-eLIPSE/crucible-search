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
  padding: 0.2rem !important;
  font-size: 1rem;
  font-weight: 600;
  font-family: inherit;
  transition: background-color 0.25s !important;
  background-color: transparent !important;
  color: #49075e;
  cursor: pointer;
}

.filter-btn:hover {
  background-color: #49075e !important;
  color: white !important;
}
</style>

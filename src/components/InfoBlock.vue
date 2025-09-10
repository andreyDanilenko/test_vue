<template>
  <div class="flex items-center gap-2 bg-blue-50 border-l-4 border-blue-400 p-3 rounded-md">
    <svg class="w-5 h-5 text-blue-500 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
      <path fill-rule="evenodd" d="M18 10c0 4.418-3.582 8-8 8s-8-3.582-8-8 3.582-8 8-8 8 3.582 8 8zm-9-4a1 1 0 112 0 1 1 0 01-2 0zm1 3a1 1 0 00-1 1v3a1 1 0 102 0v-3a1 1 0 00-1-1z" clip-rule="evenodd" />
    </svg>
    <p class="text-sm text-blue-700">{{ text }}</p>
  </div>
</template>

<script lang="ts" setup>
defineProps({
  text: {
    type: String,
    required: true
  }
})
</script>

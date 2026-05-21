<script setup lang="ts">
defineProps<{
  filtered: boolean;
  isAdmin: boolean;
}>();

defineEmits<{ create: [] }>();
</script>

<template>
  <div class="flex flex-col items-center justify-center py-20 text-center">
    <UIcon
      name="i-lucide-layers"
      class="size-12 text-dimmed mb-4"
    />
    <p class="text-default font-medium">Belum ada batch</p>
    <p class="text-sm text-muted mt-1 mb-4">
      {{
        filtered
          ? 'Tidak ada batch dengan filter ini.'
          : 'Buat batch pertama untuk mulai mengelola kohort belajar.'
      }}
    </p>
    <UButton
      v-if="isAdmin && !filtered"
      label="Buat batch"
      icon="i-lucide-plus"
      @click="$emit('create')"
    />
  </div>
</template>

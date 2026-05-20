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
      name="i-lucide-book-open"
      class="size-12 text-dimmed mb-4"
    />
    <p class="text-default font-medium">Belum ada kursus</p>
    <p class="text-sm text-muted mt-1 mb-4">
      {{
        filtered
          ? 'Tidak ada kursus dengan filter ini.'
          : 'Buat kursus pertama untuk mulai mengelola program belajar.'
      }}
    </p>
    <UButton
      v-if="isAdmin && !filtered"
      label="Buat kursus"
      icon="i-lucide-plus"
      @click="$emit('create')"
    />
  </div>
</template>

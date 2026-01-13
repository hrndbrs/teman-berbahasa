<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

const title = computed(() => {
  if (props.error.statusCode === 404) {
    return 'Halaman Tidak Ditemukan';
  }
  return 'Terjadi Kesalahan';
});

const description = computed(() => {
  if (props.error.statusCode === 404) {
    return 'Maaf, halaman yang kamu cari tidak dapat ditemukan. Mungkin halaman tersebut sudah dihapus atau link yang kamu tuju salah.';
  }
  return 'Maaf, terjadi kesalahan saat memproses permintaan kamu.';
});

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <div
    class="flex min-h-dvh flex-col items-center justify-center bg-white px-6 py-24 text-center"
  >
    <div
      class="mb-8 flex size-24 items-center justify-center rounded-full bg-red-50"
    >
      <Icon
        v-if="error.statusCode === 404"
        name="lucide:file-question"
        class="size-12 text-red-500"
      />
      <Icon
        v-else
        name="lucide:alert-triangle"
        class="size-12 text-red-500"
      />
    </div>

    <h1 class="mb-4 text-4xl font-bold text-gray-900">
      {{ title }}
    </h1>

    <p class="mb-8 max-w-lg text-lg text-gray-600">
      {{ description }}
    </p>

    <div class="flex flex-col gap-4 sm:flex-row">
      <button
        @click="handleError"
        class="inline-flex items-center justify-center gap-2 rounded-lg bg-tb-blue-3 px-6 py-3 text-base font-semibold text-white transition hover:bg-blue-800"
      >
        <Icon
          name="lucide:house"
          class="size-5"
        />
        Kembali ke Beranda
      </button>
    </div>
  </div>
</template>

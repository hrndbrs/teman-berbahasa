<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <section
    id="cta"
    aria-labelledby="cta-heading"
    class="bg-tb-blue-1 relative overflow-hidden py-24"
  >
    <div class="relative z-10 container px-6 text-center">
      <h2
        id="cta-heading"
        class="text-tb-blue-3 mb-6 text-3xl font-bold md:text-5xl"
      >
        Siap Untuk Belajar?
      </h2>
      <p class="mx-auto mb-8 max-w-2xl text-lg text-blue-800 md:text-xl">
        Daftarkan dirimu sekarang dan mulai perjalananmu bersama Teman Berbahasa
      </p>
      <a
        :href="config.public.eventRegistrationUrl"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Daftar sekarang untuk mini course"
        class="bg-tb-blue-3 inline-block rounded-full px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-800"
      >
        Daftar Sekarang
      </a>
    </div>
  </section>
</template>

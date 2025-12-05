<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <section
    id="cta"
    aria-labelledby="cta-heading"
    class="relative overflow-hidden bg-tb-blue-1 py-24"
  >
    <div class="relative z-10 container px-6 text-center">
      <h2 id="cta-heading" class="mb-6 text-3xl font-bold text-tb-blue-3 md:text-5xl">
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
        class="inline-block rounded-full bg-tb-blue-3 px-8 py-4 text-lg font-semibold text-white shadow-lg transition hover:bg-blue-800"
      >
        Daftar Sekarang
      </a>
    </div>
  </section>
</template>

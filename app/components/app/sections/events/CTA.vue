<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <section
    id="cta"
    class="py-24 bg-tb-blue-1 relative overflow-hidden"
  >
    <div class="container mx-auto px-6 text-center relative z-10">
      <h2 class="text-3xl md:text-5xl font-bold text-tb-blue-3 mb-6">
        Siap Untuk Belajar?
      </h2>
      <p class="text-lg md:text-xl text-blue-800 mb-8 max-w-2xl mx-auto">
        Daftarkan dirimu sekarang dan mulai perjalananmu bersama Teman Berbahasa
      </p>
      <a
        :href="config.public.registrationUrl"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block bg-tb-blue-3 text-white font-semibold text-lg px-8 py-4 rounded-full hover:bg-blue-800 transition shadow-lg"
      >
        Daftar Sekarang
      </a>
    </div>
  </section>
</template>

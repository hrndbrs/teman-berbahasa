<script setup lang="ts">
const config = useRuntimeConfig();
</script>

<template>
  <section
    id="about"
    class="bg-tb-blue-3"
  >
    <div
      class="container flex min-h-96 flex-col items-start justify-between gap-8 px-6 py-16 md:min-h-128 md:flex-row md:items-center"
    >
      <!-- Left - Instagram Handle -->
      <div>
        <a
          :href="`https://instagram.com/${config.public.instagramHandle}`"
          target="_blank"
          rel="noopener noreferrer"
          class="text-xl font-semibold text-white transition hover:text-white/80 sm:text-2xl md:text-3xl"
        >
          @{{ config.public.instagramHandle }}
        </a>
      </div>

      <!-- Right - Description -->
      <div class="max-w-md">
        <p class="text-sm leading-relaxed text-white/80 md:text-base">
          Teman Berbahasa adalah teman perjalanan kamu untuk mengenal dunia
          lewat bahasa, budaya, dan cerita hidup, lewat cara belajar yang seru,
          interaktif, dan saling menginspirasi. <br /><br />
          Kami berupaya untuk memberikan pengalaman belajar bahasa Jepang yang
          seru dan mudah diakses. Melalui belajar bahasa Jepang bersama
          discussion partner, kamu bisa membangun komunitas yang suportif dan
          memperluas wawasanmu tentang Jepang.
        </p>
      </div>
    </div>
  </section>
</template>

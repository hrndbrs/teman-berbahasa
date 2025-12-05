<script setup lang="ts">
import { ref } from 'vue';
import { useGSAP, gsap } from '~/composables/useGSAP';

const config = useRuntimeConfig();

const sectionRef = ref<HTMLElement | null>(null);
const handleRef = ref<HTMLElement | null>(null);
const descriptionRef = ref<HTMLElement | null>(null);

useGSAP(
  () => {
    if (!sectionRef.value || !handleRef.value || !descriptionRef.value) return;

    gsap.from(handleRef.value, {
      opacity: 0,
      x: -30,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    gsap.from(descriptionRef.value, {
      opacity: 0,
      x: 30,
      duration: 0.8,
      delay: 0.2,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });
  },
  { scope: sectionRef }
);
</script>

<template>
  <section
    id="about"
    ref="sectionRef"
    class="bg-tb-blue-3"
  >
    <div
      class="container flex min-h-96 flex-col items-start justify-between gap-8 px-6 py-16 md:min-h-128 md:flex-row md:items-center"
    >
      <!-- Left - Instagram Handle -->
      <div ref="handleRef">
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
      <div
        ref="descriptionRef"
        class="max-w-md"
      >
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

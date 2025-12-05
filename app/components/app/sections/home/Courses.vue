<script setup lang="ts">
import { ref } from 'vue';
import { courses } from '#shared/data/courses';
import { useGSAP, gsap } from '~/composables/useGSAP';

const config = useRuntimeConfig();

const sectionRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const cardsRef = ref<HTMLElement[]>([]);

useGSAP(
  () => {
    if (!sectionRef.value || !headerRef.value) return;

    // Animate header
    gsap.from(headerRef.value, {
      opacity: 0,
      y: 40,
      duration: 0.8,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
    });

    // Animate cards with stagger
    if (cardsRef.value.length) {
      gsap.from(cardsRef.value, {
        opacity: 0,
        y: 50,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: headerRef.value,
          start: 'bottom 80%',
          toggleActions: 'play none none reverse',
        },
      });
    }
  },
  { scope: sectionRef }
);
</script>

<template>
  <section
    id="program"
    ref="sectionRef"
    class="bg-white py-20"
  >
    <div class="container px-6">
      <!-- Section Header -->
      <div
        ref="headerRef"
        class="mb-16 max-w-xl"
      >
        <h2
          class="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl"
        >
          Mudah Lulus JLPT<br />
          Dengan Teman<br />
          Berbahasa
        </h2>
        <p class="text-sm leading-relaxed text-gray-600">
          Kami menyediakan berbagai program pembelajaran bahasa Jepang yang
          dirancang untuk membantu kamu mencapai tujuan belajar dengan cara yang
          menyenangkan dan efektif.
        </p>
      </div>

      <!-- Feature Cards -->
      <div class="grid max-w-4xl gap-8 md:grid-cols-2">
        <div
          v-for="course in courses"
          ref="cardsRef"
          :key="course.title"
          class="rounded-lg border border-gray-200 p-6"
        >
          <div class="mb-4">
            <Icon
              :name="course.icon"
              class="size-8 text-gray-900"
            />
          </div>
          <h3 class="mb-3 text-lg font-bold text-gray-900">
            {{ course.title }}
          </h3>
          <p class="mb-4 text-sm leading-relaxed text-gray-600">
            {{ course.description }}
          </p>
          <a
            :href="config.public.registrationUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-block rounded-full bg-tb-blue-3 px-6 py-2 text-sm font-medium text-white transition hover:bg-blue-800"
          >
            Daftar sekarang
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

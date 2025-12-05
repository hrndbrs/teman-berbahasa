<script setup lang="ts">
import { ref } from 'vue';
import { useGSAP, gsap } from '~/composables/useGSAP';

const config = useRuntimeConfig();

const sectionRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);
const charsRef = ref<HTMLElement[]>([]);
const imageRef = ref<HTMLElement | null>(null);

useGSAP(
  () => {
    if (
      !sectionRef.value ||
      !charsRef.value.length ||
      !imageRef.value ||
      !contentRef.value
    )
      return;

    // Characters fall-in animation (once)
    gsap.from(charsRef.value, {
      opacity: 0,
      y: -100,
      duration: 1.6,
      stagger: 0.3,
      ease: 'expo.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        once: true,
      },
    });

    // Image enter animation (once)
    gsap.from(imageRef.value, {
      opacity: 0,
      x: 50,
      duration: 1.2,
      delay: 0.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top 80%',
        once: true,
      },
    });

    // Scroll exit animation (reversible)
    gsap.to(contentRef.value, {
      opacity: 0,
      y: -200,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'bottom 80%',
        end: 'bottom 20%',
        scrub: 2,
      },
    });
  },
  { scope: sectionRef }
);
</script>

<template>
  <section
    ref="sectionRef"
    class="min-h-dvh bg-white"
  >
    <div
      ref="contentRef"
      class="container flex min-h-dvh flex-col-reverse justify-end gap-16 px-6 pt-24 pb-12 sm:flex-row sm:justify-between sm:gap-8"
    >
      <!-- Left Content -->
      <div class="flex flex-col justify-end sm:flex-1">
        <!-- Japanese Characters -->
        <h1
          class="text-[8.75rem] leading-none font-bold tracking-tight text-[#4D4D4D] md:text-[17.25rem]"
        >
          <span
            :ref="(el) => charsRef.push(el as HTMLElement)"
            class="inline-block"
          >
            友
          </span>
          <span
            :ref="(el) => charsRef.push(el as HTMLElement)"
            class="inline-block"
          >
            達
          </span>
        </h1>
      </div>

      <!-- Right Content -->
      <div class="flex flex-col items-end gap-8 self-end sm:gap-25 md:max-w-xs">
        <!-- Hero Image -->
        <div
          ref="imageRef"
          class="w-1/2 overflow-hidden sm:w-full"
        >
          <NuxtImg
            src="https://images.unsplash.com/photo-1574236170880-fbbca132d83d?q=80&w=926&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Japanese temple with Mt. Fuji"
            class="w-full object-cover"
            loading="eager"
          />
        </div>
        <a
          :href="`https://instagram.com/${config.public.instagramHandle}`"
          target="_blank"
          class="text-sm text-gray-600 transition hover:text-tb-blue-3"
        >
          @{{ config.public.instagramHandle }}
        </a>
      </div>
    </div>
  </section>
</template>

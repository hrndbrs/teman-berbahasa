<script setup lang="ts">
import { ref } from 'vue';
import { useGSAP, gsap } from '~/composables/useGSAP';

const sectionRef = ref<HTMLElement | null>(null);
const imageWrapperRef = ref<HTMLElement | null>(null);
const contentRef = ref<HTMLElement | null>(null);

useGSAP(
  () => {
    if (!sectionRef.value || !imageWrapperRef.value || !contentRef.value)
      return;

    // Calculate scale needed to cover viewport from 80% width
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    const imageWidth = imageWrapperRef.value.offsetWidth;
    const imageHeight = imageWrapperRef.value.offsetHeight;

    const scaleX = viewportWidth / imageWidth;
    const scaleY = viewportHeight / imageHeight;
    const targetScale = Math.max(scaleX, scaleY) * 1.1; // Slightly more to ensure full coverage

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.value,
        start: 'top top',
        end: '+=50%',
        scrub: 2,
        pin: true,
      },
    });

    // Scale image to cover viewport and fade it out
    tl.fromTo(
      imageWrapperRef.value,
      {
        y: '70%',
      },
      {
        y: '0',
        scale: targetScale,
        opacity: 0.2,
        ease: 'none',
      }
    );
  },
  { scope: sectionRef }
);
</script>

<template>
  <section
    ref="sectionRef"
    aria-label="Mini Course Hero"
    class="relative h-dvh bg-white overflow-hidden flex items-center justify-center"
  >
    <!-- Hero Image -->
    <div
      ref="imageWrapperRef"
      class="w-4/5 aspect-[3/2] origin-center"
    >
      <NuxtImg
        src="https://images.unsplash.com/photo-1490806843957-31f4c9a91c65?w=1920&h=1080&fit=crop"
        alt="Mount Fuji with cherry blossoms"
        class="w-full h-full object-cover"
        loading="eager"
      />
    </div>

    <!-- Content Overlay -->
    <div
      ref="contentRef"
      class="absolute inset-0 z-10 flex items-center justify-center"
    >
      <div class="text-center text-gray-900">
        <h1 class="text-4xl md:text-6xl font-bold leading-tight">
          Teman<br />Berbahasa
        </h1>
        <p class="text-sm md:text-base mt-4">Mini Course</p>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue';

interface EventDate {
  start: string;
  end: string;
}

interface Event {
  id: number;
  title: string;
  description: string;
  dates: EventDate[];
  platform: string;
  duration: number;
  image: string;
  speaker_image: string;
}

defineProps<{
  events: Event[];
}>();

const containerRef = ref<HTMLElement | null>(null);
const panelsRef = ref<HTMLElement | null>(null);
const panelRefs = ref<HTMLElement[]>([]);
const contentRefs = ref<HTMLElement[]>([]);
const imagesContainerRef = ref<HTMLElement | null>(null);
const imagesPinRef = ref<HTMLElement | null>(null);
const imageRefs = ref<HTMLElement[]>([]);

useGSAP(
  () => {
    if (
      !containerRef.value ||
      !panelRefs.value.length ||
      !contentRefs.value.length
    )
      return;

    const panels = panelRefs.value;
    const contents = contentRefs.value;
    const images = imageRefs.value;

    // Create ScrollTrigger for each panel
    panels.forEach((panel, index) => {
      const content = contents[index];
      if (!content) return;

      const isLast = index === panels.length - 1;

      // Set initial state (first panel visible, others hidden)
      gsap.set(content, {
        opacity: index === 0 ? 1 : 0,
        y: index === 0 ? 0 : 30,
      });

      // Single ScrollTrigger to handle fade in/out for each panel

      ScrollTrigger.create({
        trigger: panel,
        start: 'top 50%',
        end: isLast ? 'top 20%' : 'bottom 20%',
        onEnter: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power2.out',
          });
        },
        onLeave: () => {
          if (!isLast) {
            gsap.to(content, {
              opacity: 0,
              y: -30,
              duration: 2,
              ease: 'power2.in',
            });
          }
        },
        onEnterBack: () => {
          gsap.to(content, {
            opacity: 1,
            y: 0,
            duration: 2,
            ease: 'power2.out',
          });
        },
        onLeaveBack: () => {
          gsap.to(content, {
            opacity: 0,
            y: 30,
            duration: 2,
            ease: 'power2.in',
          });
        },
      });

      // Image crossfade
      ScrollTrigger.create({
        trigger: panel,
        start: 'top center',
        end: 'bottom center',
        onEnter: () => {
          images.forEach((img, imgIndex) => {
            gsap.to(img, {
              opacity: imgIndex === index ? 1 : 0,
              duration: 0.02,
              ease: 'power2.inOut',
            });
          });
        },
        onEnterBack: () => {
          images.forEach((img, imgIndex) => {
            gsap.to(img, {
              opacity: imgIndex === index ? 1 : 0,
              duration: 0.02,
              ease: 'power2.inOut',
            });
          });
        },
      });
    });
  },
  { scope: containerRef }
);
</script>

<template>
  <section
    ref="containerRef"
    class="relative bg-white"
  >
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
        <!-- Left Side: Scrollable Content Panels -->
        <div ref="panelsRef">
          <div
            v-for="(event, index) in events"
            :id="`event-${event.id}`"
            :key="event.id"
            ref="panelRefs"
            class="panel flex items-center md:min-h-dvh"
            :data-index="index"
          >
            <div
              ref="contentRefs"
              class="panel-content py-16"
            >
              <p class="text-xs text-gray-400 uppercase tracking-wide mb-2">
                Mini Course
              </p>
              <h2
                class="text-3xl md:text-4xl font-bold text-gray-900 leading-tight mb-4"
              >
                {{ event.title }}
              </h2>
              <div class="text-xs text-gray-500 mb-4 space-y-1">
                <p
                  v-for="(date, idx) in event.dates"
                  :key="idx"
                >
                  {{ formatDate(date.start) }} {{ formatTime(date.start) }} via
                  {{ event.platform }}
                </p>
              </div>
              <p
                class="text-sm text-gray-600 mb-6 leading-relaxed text-justify"
              >
                {{ event.description }}
              </p>
              <a
                href="#cta"
                class="inline-block bg-tb-blue-3 text-white text-sm px-6 py-2 rounded-full hover:bg-blue-800 transition"
              >
                Daftar Sekarang
              </a>
            </div>
          </div>
        </div>

        <!-- Right Side: Pinned Images -->
        <div
          ref="imagesContainerRef"
          class="hidden md:block relative"
        >
          <div
            ref="imagesPinRef"
            class="h-dvh flex items-center justify-center sticky top-0"
          >
            <div class="relative w-full h-[70vh]">
              <div
                v-for="(event, index) in events"
                :key="event.id"
                ref="imageRefs"
                class="event-image absolute inset-0"
                :class="{
                  'opacity-100': index === 0,
                  'opacity-0': index !== 0,
                }"
              >
                <NuxtImg
                  :src="event.speaker_image"
                  :alt="event.title"
                  class="w-full h-full object-contain"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Mobile Images (shown inline) -->
    <div class="md:hidden">
      <div
        v-for="event in events"
        :key="`mobile-${event.id}`"
        class="px-6 pb-8"
      >
        <NuxtImg
          :src="event.speaker_image"
          :alt="event.title"
          class="w-full aspect-square object-contain"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.event-image {
  transition: opacity 0.5s ease-in-out;
}
</style>

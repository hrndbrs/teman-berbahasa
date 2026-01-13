<script setup lang="ts">
import type { Event } from '#shared/types/event';

defineProps<{
  events: Event[];
}>();

function isEventEnded(event: Event): boolean {
  if (!event.dates?.length) return false;
  const now = Date.now();
  return event.dates.every((d) => {
    const end = d.end || d.start;
    return new Date(end).getTime() < now;
  });
}

const containerRef = useTemplateRef('containerRef');
const panelsRef = useTemplateRef('panelsRef');
const panelRefs = useTemplateRef('panelRefs');
const contentRefs = useTemplateRef('contentRefs');
const imagesContainerRef = useTemplateRef('imagesContainerRef');
const imagesPinRef = useTemplateRef('imagesPinRef');
const imageRefs = useTemplateRef('imageRefs');

useGSAP(
  () => {
    if (
      !containerRef.value ||
      !panelRefs.value?.length ||
      !contentRefs.value?.length
    )
      return;

    const panels = panelRefs.value;
    const contents = contentRefs.value;
    const images = imageRefs.value || [];

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
    aria-label="Mini Course Details"
    class="relative bg-white"
  >
    <div class="container px-6">
      <div class="mx-auto grid max-w-5xl gap-8 md:grid-cols-2">
        <!-- Left Side: Scrollable Content Panels -->
        <div ref="panelsRef">
          <article
            v-for="(event, index) in events"
            :id="`event-${event.id}`"
            :key="event.id"
            ref="panelRefs"
            :aria-label="event.title"
            class="panel flex items-center md:min-h-dvh"
            :data-index="index"
          >
            <div
              ref="contentRefs"
              class="panel-content py-16"
            >
              <p class="mb-2 text-xs tracking-wide text-gray-400 uppercase">
                Mini Course
              </p>
              <h2
                class="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl"
              >
                {{ event.title }}
              </h2>
              <div class="mb-4 space-y-1 text-xs text-gray-500">
                <p
                  v-for="(date, idx) in event.dates"
                  :key="idx"
                >
                  {{ formatDate(date.start) }} {{ formatTime(date.start) }} via
                  {{ event.platform }}
                </p>
              </div>
              <p
                class="mb-6 text-justify text-sm leading-relaxed text-gray-600"
              >
                {{ event.description }}
              </p>
              <a
                v-if="!isEventEnded(event)"
                href="#cta"
                :aria-label="`Daftar sekarang untuk ${event.title}`"
                class="inline-block rounded-full bg-tb-blue-3 px-6 py-2 text-sm text-white transition hover:bg-blue-800"
              >
                Daftar Sekarang
              </a>
              <a
                v-else
                aria-disabled="true"
                tabindex="-1"
                class="inline-block cursor-not-allowed rounded-full bg-gray-200 px-6 py-2 text-sm text-gray-500 pointer-events-none"
              >
                Sudah Berakhir
              </a>
            </div>
          </article>
        </div>

        <!-- Right Side: Pinned Images -->
        <div
          ref="imagesContainerRef"
          class="relative hidden md:block"
        >
          <div
            ref="imagesPinRef"
            class="sticky top-0 flex h-dvh items-center justify-center"
          >
            <div class="relative h-[70vh] w-full">
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
                  class="h-full w-full object-contain"
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
          class="aspect-square w-full object-contain"
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

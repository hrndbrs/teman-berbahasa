<script setup lang="ts">
import type { Event } from '#shared/types/event';

defineProps<{
  events: Event[];
}>();
</script>

<template>
  <section aria-label="Mini Course Cards" class="bg-white py-12">
    <div class="container px-6">
      <div class="mx-auto grid max-w-4xl gap-6 sm:gap-8 md:grid-cols-2">
        <article
          v-for="event in events"
          :key="event.id"
          :aria-label="event.title"
          class="group"
        >
          <div class="mb-4 aspect-square overflow-hidden">
            <NuxtImg
              :src="event.image"
              :alt="event.title"
              class="h-full w-full object-cover"
              loading="lazy"
            />
          </div>
          <p class="mb-1 text-xs tracking-wide text-gray-400 uppercase">
            Mini Course
          </p>
          <h3 class="mb-2 text-lg font-bold text-gray-900">
            {{ event.title }}
          </h3>
          <p class="mb-3 text-xs text-gray-500">
            {{ formatDate(event.dates[0]?.start) }} via {{ event.platform }}
            {{ formatTime(event.dates[0]?.start) }}
          </p>
          <NuxtLink
            :href="`/events/#event-${event.id}`"
            :aria-label="`Lihat detail ${event.title}`"
            class="inline-block rounded-full bg-tb-blue-3 px-4 py-2 text-xs text-white transition hover:bg-blue-800"
          >
            Lihat Detail
          </NuxtLink>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
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
}

defineProps<{
  events: Event[];
}>();
</script>

<template>
  <section class="bg-white py-12">
    <div class="container mx-auto px-6">
      <div class="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <div
          v-for="event in events"
          :key="event.id"
          class="group"
        >
          <div class="overflow-hidden mb-4 aspect-square">
            <NuxtImg
              :src="event.image"
              :alt="event.title"
              class="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <p class="text-xs text-gray-400 uppercase tracking-wide mb-1">
            Mini Course
          </p>
          <h3 class="text-lg font-bold text-gray-900 mb-2">
            {{ event.title }}
          </h3>
          <p class="text-xs text-gray-500 mb-3">
            {{ formatDate(event.dates[0]?.start) }} via {{ event.platform }}
            {{ formatTime(event.dates[0]?.start) }}
          </p>
          <a
            :href="`#event-${event.id}`"
            class="inline-block bg-tb-blue-3 text-white text-xs px-4 py-2 rounded-full hover:bg-blue-800 transition"
          >
            Lihat Detail
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

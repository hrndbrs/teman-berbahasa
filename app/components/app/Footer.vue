<script setup lang="ts">
import type { EventSummary } from '#shared/types/event';

defineProps<{
  events?: EventSummary[];
}>();

const config = useRuntimeConfig();
</script>

<template>
  <footer
    id="contact"
    aria-label="Contact and site links"
    class="bg-gradient-to-r from-blue-700 to-blue-950 py-12 text-white"
  >
    <div class="container px-6">
      <div class="flex items-end justify-between">
        <!-- Left Column -->
        <div>
          <!-- Mini Courses -->
          <nav
            v-if="events?.length"
            aria-label="Mini Courses navigation"
            class="mb-8 space-y-1 text-sm"
          >
            <p class="mb-2 font-semibold text-white">Mini Courses</p>
            <NuxtLink
              v-for="event in events"
              :key="event.id"
              :to="`/events/#event-${event.id}`"
              class="block text-white/80 transition hover:text-white"
            >
              {{ event.title }}
            </NuxtLink>
          </nav>

          <!-- Contact Info -->
          <div class="space-y-2 text-sm">
            <a
              v-if="config.public.phoneNumber"
              :href="`https://wa.me/${config.public.phoneNumber}`"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Contact us on WhatsApp"
              class="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon
                name="mdi:whatsapp"
                class="size-4"
                aria-hidden="true"
              />
              <span>{{ formatPhoneNumber(config.public.phoneNumber) }}</span>
            </a>
            <a
              v-if="config.public.instagramHandle"
              :href="`https://instagram.com/${config.public.instagramHandle}`"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Follow us on Instagram"
              class="flex items-center gap-2 text-white/80 transition hover:text-white"
            >
              <Icon
                name="mdi:instagram"
                class="size-4"
                aria-hidden="true"
              />
              <span>@{{ config.public.instagramHandle }}</span>
            </a>
          </div>
        </div>

        <!-- Right Column - Logo -->
        <div>
          <Icon
            name="svg:tb-neutral"
            class="h-24 w-auto"
            aria-hidden="true"
          />
        </div>
      </div>
    </div>
  </footer>
</template>

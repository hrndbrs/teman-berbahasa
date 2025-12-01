<script setup lang="ts">
interface Event {
  id: number;
  title: string;
}

defineProps<{
  events?: Event[];
}>();

const config = useRuntimeConfig();
</script>

<template>
  <footer
    id="contact"
    class="bg-gradient-to-r from-blue-700 to-blue-950 text-white py-12"
  >
    <div class="container mx-auto px-6">
      <div class="flex items-end justify-between">
        <!-- Left Column -->
        <div>
          <!-- Mini Courses -->
          <nav
            v-if="events?.length"
            class="space-y-1 text-sm mb-8"
          >
            <p class="text-white font-semibold mb-2">Mini Courses</p>
            <a
              v-for="event in events"
              :key="event.id"
              :href="`#event-${event.id}`"
              class="block text-white/80 hover:text-white transition"
            >
              {{ event.title }}
            </a>
          </nav>

          <!-- Contact Info -->
          <div class="space-y-2 text-sm">
            <a
              v-if="config.public.phoneNumber"
              :href="`https://wa.me/${config.public.phoneNumber}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <Icon
                name="mdi:whatsapp"
                class="size-4"
              />
              <span>{{ formatPhoneNumber(config.public.phoneNumber) }}</span>
            </a>
            <a
              v-if="config.public.instagramHandle"
              :href="`https://instagram.com/${config.public.instagramHandle}`"
              target="_blank"
              rel="noopener noreferrer"
              class="flex items-center gap-2 text-white/80 hover:text-white transition"
            >
              <Icon
                name="mdi:instagram"
                class="size-4"
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
          />
        </div>
      </div>
    </div>
  </footer>
</template>

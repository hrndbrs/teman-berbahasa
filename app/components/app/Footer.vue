<script setup lang="ts">
import { courses } from '#shared/data/courses';

const { phoneNumber, instagramHandle, whatsappUrl, instagramUrl } = useContact();
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
          <!-- Courses -->
          <nav
            v-if="courses.length"
            aria-label="Courses navigation"
            class="mb-8 space-y-1 text-sm"
          >
            <p class="mb-2 font-semibold text-white">Program Belajar</p>
            <NuxtLink
              v-for="course in courses"
              :key="course.id"
              :to="`/courses/${course.slug}`"
              class="block text-white/80 transition hover:text-white"
            >
              {{ course.title }}
            </NuxtLink>
          </nav>

          <!-- Contact Info -->
          <div class="space-y-2 text-sm">
            <a
              v-if="phoneNumber"
              :href="whatsappUrl"
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
              <span>{{ formatPhoneNumber(phoneNumber) }}</span>
            </a>
            <a
              v-if="instagramHandle"
              :href="instagramUrl"
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
              <span>@{{ instagramHandle }}</span>
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

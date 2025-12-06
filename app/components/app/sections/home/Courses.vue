<script setup lang="ts">
import { courses, courseCategories } from '#shared/data/courses';
import type { CourseCategory } from '#shared/types/course';

const config = useRuntimeConfig();

const sectionRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);
const activeCategory = ref<CourseCategory>('Kelas Reguler');

const filteredCourses = computed(() =>
  courses.filter((course) => course.category === activeCategory.value)
);

useGSAP(
  () => {
    if (!sectionRef.value || !headerRef.value) return;

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
  },
  { scope: sectionRef }
);
</script>

<template>
  <section
    id="program"
    ref="sectionRef"
    aria-labelledby="program-heading"
    class="bg-white py-20"
  >
    <div class="container px-6">
      <!-- Section Header -->
      <div
        ref="headerRef"
        class="mb-12 max-w-xl"
      >
        <h2
          id="program-heading"
          class="mb-6 text-3xl leading-tight font-bold text-gray-900 md:text-4xl"
        >
          Jadwal Kelas
        </h2>
        <p class="text-sm leading-relaxed text-gray-600">
          Pilih jadwal kelas yang sesuai dengan waktu luang kamu dan mulai
          perjalanan belajar bahasa Jepang bersama Teman Berbahasa.
        </p>
      </div>

      <!-- Category Tabs -->
      <div
        role="tablist"
        aria-label="Kategori Kelas"
        class="mb-8 flex gap-8 border-b border-gray-200"
      >
        <button
          v-for="category in courseCategories"
          :key="category"
          role="tab"
          :aria-selected="activeCategory === category"
          :aria-controls="`panel-${category.replace(/\s+/g, '-').toLowerCase()}`"
          class="relative pb-3 text-sm font-medium transition md:text-base"
          :class="
            activeCategory === category
              ? 'text-tb-blue-3'
              : 'text-gray-500 hover:text-gray-700'
          "
          @click="activeCategory = category"
        >
          {{ category }}
          <span
            v-if="activeCategory === category"
            class="absolute bottom-0 left-0 h-0.5 w-full bg-tb-blue-3"
          />
        </button>
      </div>

      <!-- Course Cards -->
      <Transition
        name="slide-fade"
        mode="out-in"
      >
        <div
          :id="`panel-${activeCategory.replace(/\s+/g, '-').toLowerCase()}`"
          :key="activeCategory"
          role="tabpanel"
          :aria-label="`Daftar ${activeCategory}`"
          class="space-y-4"
        >
          <article
            v-for="course in filteredCourses"
            :key="course.id"
            :aria-label="course.title"
            class="overflow-hidden rounded-xl border border-gray-200"
          >
            <!-- Course Header -->
            <div class="border-b border-gray-100 bg-gray-50 p-6">
              <div
                class="flex flex-col items-end md:items-start md:flex-row justify-between gap-8"
              >
                <div class="md:max-w-lg">
                  <h3 class="mb-2 text-lg font-bold text-gray-900 md:text-xl">
                    {{ course.title }}
                  </h3>
                  <p class="text-sm leading-relaxed text-gray-600">
                    {{ course.description }}
                  </p>
                </div>
                <div class="flex shrink-0 flex-col items-end gap-2">
                  <span class="text-lg font-bold text-tb-blue-3 md:text-xl">
                    {{ formatCurrency(course.price) }}
                  </span>
                  <div class="flex items-center gap-1.5 text-sm text-gray-500">
                    <Icon
                      name="lucide:users"
                      class="size-4"
                      aria-hidden="true"
                    />
                    <span>Maks. {{ course.maxStudents }} orang / kelas</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Schedules List -->
            <ul
              class="divide-y divide-gray-100"
              aria-label="Jadwal tersedia"
            >
              <li
                v-for="schedule in course.schedules"
                :key="schedule.id"
                class="grid grid-cols-1 items-center gap-3 p-5 text-sm md:grid-cols-[1fr_1fr_1fr_auto] md:gap-6"
              >
                <dl class="contents">
                  <!-- Days -->
                  <div class="flex items-center gap-2">
                    <dt class="sr-only">Hari</dt>
                    <Icon
                      name="lucide:calendar"
                      class="size-4 text-gray-400"
                      aria-hidden="true"
                    />
                    <dd class="font-medium text-gray-900">
                      {{ schedule.days }}
                    </dd>
                  </div>

                  <!-- Time -->
                  <div class="flex items-center gap-2 text-gray-600">
                    <dt class="sr-only">Waktu</dt>
                    <Icon
                      name="lucide:clock"
                      class="size-4 text-gray-400"
                      aria-hidden="true"
                    />
                    <dd>{{ schedule.time }}</dd>
                  </div>

                  <!-- Start Date -->
                  <div class="flex items-center gap-2 text-gray-600">
                    <dt class="sr-only">Tanggal mulai</dt>
                    <Icon
                      name="lucide:play"
                      class="size-4 text-gray-400"
                      aria-hidden="true"
                    />
                    <dd>
                      Mulai
                      <NuxtTime
                        :datetime="schedule.startDate"
                        date-style="long"
                        locale="id-ID"
                        class="font-extrabold"
                      />
                    </dd>
                  </div>
                </dl>

                <!-- CTA Button -->
                <a
                  :href="
                    schedule.registrationUrl || config.public.registrationUrl
                  "
                  target="_blank"
                  rel="noopener noreferrer"
                  role="button"
                  :aria-label="`Daftar sekarang untuk ${course.title} - ${schedule.days}`"
                  class="inline-block rounded-md bg-tb-blue-3 px-5 py-2.5 text-center text-sm font-medium text-white transition hover:bg-blue-800 md:justify-self-end"
                >
                  Daftar Sekarang
                </a>
              </li>
            </ul>
          </article>

          <!-- Empty State -->
          <div
            v-if="filteredCourses.length === 0"
            class="py-12 text-center text-gray-500"
          >
            <p>Belum ada kelas tersedia untuk kategori ini.</p>
          </div>
        </div>
      </Transition>
    </div>
  </section>
</template>

<style scoped>
.slide-fade-enter-active {
  transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(0.4, 0, 1, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateX(50px);
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateX(-50px);
}
</style>

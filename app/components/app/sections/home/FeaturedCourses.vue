<script setup lang="ts">
import { courses } from '#shared/data/courses';

const sectionRef = ref<HTMLElement | null>(null);
const headerRef = ref<HTMLElement | null>(null);

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
      <div
        ref="headerRef"
        class="mb-12 flex flex-col items-start justify-between gap-6 md:flex-row md:items-end"
      >
        <div class="max-w-xl">
          <h2
            id="program-heading"
            class="mb-4 text-3xl leading-tight font-bold text-gray-900 md:text-4xl"
          >
            Pilihan Program Belajar
          </h2>
          <p class="text-sm leading-relaxed text-gray-600">
            Pilih program yang sesuai dengan kebutuhanmu, mulai dari kelas
            reguler hingga persiapan ujian JLPT.
          </p>
        </div>
        <NuxtLink
          to="/courses"
          class="inline-flex items-center gap-2 text-sm font-semibold text-tb-blue-3 hover:text-blue-800"
        >
          Lihat Semua Kelas
          <Icon
            name="lucide:arrow-right"
            class="size-4"
          />
        </NuxtLink>
      </div>

      <div
        v-if="courses.length > 0"
        class="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        <article
          v-for="course in courses"
          :key="course.id"
          class="flex flex-col overflow-hidden rounded-xl border border-gray-200 transition hover:shadow-md"
        >
          <div class="flex flex-1 flex-col p-6">
            <span
              class="mb-3 inline-block w-fit rounded-full bg-blue-50 px-3 py-1 text-xs font-medium text-tb-blue-3"
            >
              {{ course.category }}
            </span>
            <h3 class="mb-2 text-lg font-bold text-gray-900">
              {{ course.title }}
            </h3>
            <p class="mb-6 line-clamp-2 text-sm leading-relaxed text-gray-600">
              {{ course.description }}
            </p>

            <div class="mt-auto pt-6">
              <NuxtLink
                :to="`/courses/${course.slug}`"
                class="inline-flex w-full items-center justify-center gap-2 rounded-md border border-gray-200 bg-white px-4 py-2.5 text-center text-sm font-medium text-gray-700 transition hover:bg-gray-50 hover:text-gray-900"
              >
                Lihat Detail
                <Icon
                  name="lucide:arrow-right"
                  class="size-4"
                />
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>

      <div
        v-else
        class="flex flex-col items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-gray-50 py-12 text-center"
      >
        <div
          class="mb-4 flex size-16 items-center justify-center rounded-full bg-white shadow-sm"
        >
          <Icon
            name="lucide:calendar-clock"
            class="size-8 text-gray-400"
          />
        </div>
        <h3 class="mb-2 text-lg font-bold text-gray-900">
          Program Segera Hadir
        </h3>
        <p class="max-w-md text-sm text-gray-600">
          Nantikan program belajar terbaru dari Teman Berbahasa. Pantau terus
          media sosial kami untuk update terbaru!
        </p>
      </div>
    </div>
  </section>
</template>
